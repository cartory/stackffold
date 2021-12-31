import data from "./data.json"
import sequelize from "../src/utils/sequelize"

import {
	//
	Place,
	Career,
	Subject,
	Movement,
	JobTitle,
	Equipment,
	PlaceType,
	Place_Place,
	EquipmentUnit,
	EquipmentType,
	EquipmentBrand,
	MovementReason,
	Requirement,
	Subject_Career,
} from "../src/utils/models"

import { IPlace } from "../src/models/Place"
import { IJobTitle } from "../src/models/JobTitle"

const keyPlace = {
	módulo: "module",
	aula: "classroom",
	oficina: "office",
	facultad: "faculty",
	universidad: "university",
}

const modules = [
	[123, ["03"]],
	[232, ["09", 10, 11, 12]],
	[236, [41, 42, 43, 44, 45, 46, 48]],
]

const seedPlaces = async (places: IPlace[] = [], placeParent_id: number = null) => {
	for (const place of places) {
		const placeTypeName = place.name.split(" ")[0].toLocaleLowerCase()
		const type = await PlaceType.findOne({ where: { name: keyPlace[placeTypeName] } })

		const rowPlace = await Place.create({ ...place, Typeid: type.getDataValue("id") })

		if (placeParent_id) {
			await Place_Place.create({
				placeParent_id,
				placeChild_id: rowPlace.getDataValue("id"),
			})
		}

		await seedPlaces(place.places, rowPlace.getDataValue("id"))
	}
}

const seedJobTitles = async (jobs: IJobTitle[] = [], supJobTitleId: number = null) => {
	for (const job of jobs) {
		const jobTitle = await JobTitle.create({ ...job, supJopTitleId: supJobTitleId })
		await seedJobTitles(job.subJobs, jobTitle.getDataValue("id"))
	}
}

const seedEquipments = async (module: number, rooms: (string | number)[], reason_id: number) => {
	for (let i = 0; i < rooms.length; i++) {
		const room = rooms[i].toString()
		const equipments: any[] = require(`./json/${module}-${room}.json`)
		try {
			for (let j = 0; j < equipments.length; j++) {
				const equipment = equipments[j]

				const placeTo = await Place.findOne({ where: { code: Number.parseInt(room) } })
				const unit = await EquipmentUnit.findOne({ where: { name: equipment["unit"] } })
				const type = await EquipmentType.findOne({ where: { name: equipment["equipmentType"] } })
				const brand = await EquipmentBrand.findOne({ where: { name: equipment["equipmentBrand"] } })

				const equipmentDB = await Equipment.create({
					code: equipment["code"],
					state: equipment["state"],
					description: equipment["description"],
					observations: equipment["observations"],
					Unitid: unit.getDataValue("id"),
					Placeid: placeTo.getDataValue("id"),
					EquipmentTypeid: type?.getDataValue("id"),
					EquipmentBrandid: brand?.getDataValue("id"),
				})

				await Movement.create({
					Reasonid: reason_id,
					placeTo_id: placeTo.getDataValue("id"),
					Equipmentid: equipmentDB.getDataValue("id"),
				})
			}
		} catch (err) {
			console.error(err)
		}
	}
}

const seedRequirements = async (req, careersKey: object) => {
	const { subject, preReqs = [], careers = [], semester } = req
	const dbSubject = await Subject.findOne({ where: { code: subject } })

	for (let i = 0; i < careers.length; i++) {
		const careerId = careersKey[careers[i]]
		for (let j = 0; j < preReqs.length; j++) {
			const preReqSubject = await Subject.findOne({ where: { code: preReqs[j] } })
			await Requirement.create({
				Careerid: careerId,
				subjectPreqId: dbSubject.getDataValue("id"),
				subjectReqId: preReqSubject.getDataValue("id"),
			})
		}
		await Subject_Career.create({
			semester: semester,
			Careerid: careerId,
			Subjectid: dbSubject.getDataValue("id"),
		})
	}
}

const seedSubjectReqs = async (subjectReq, careersKey) => {
	const { semester } = subjectReq
	delete subjectReq["semester"]

	for (const key in subjectReq) {
		const careerId = careersKey[key]
		const subjects = subjectReq[key]

		for (let index = 0; index < subjects.length; index++) {
			const subject = await Subject.findOne({ where: { code: subjects[index] } })
			const sc = await Subject_Career.create({
				Careerid: careerId,
				semester: semester,
				Subjectid: subject.getDataValue("id"),
			})
		}
	}
}

sequelize
	.authenticate()
	.then(async () => {
		await sequelize.dropAllSchemas({ logging: true })
		await sequelize.sync({ alter: true })

		const [careers] = await Promise.all([
			//
			Career.bulkCreate(data.careers),
			Subject.bulkCreate(data.subjects),
			EquipmentUnit.bulkCreate(data.units),
			PlaceType.bulkCreate(data.placeTypes),
			MovementReason.bulkCreate(data.reasons),
			EquipmentType.bulkCreate(data.equipment_types),
			EquipmentBrand.bulkCreate(data.equipment_brands),
		])

		const [_, __, reason] = await Promise.all([
			//
			seedPlaces([data.place]),
			seedJobTitles([data.jobTitle]),
			MovementReason.findOne({ where: { name: "transaction" } }),
		])

		for (let index = 0; index < modules.length; index++) {
			await seedEquipments(modules[index][0] as number, modules[index][1] as (number | string)[], reason.getDataValue("id"))
		}

		for (let index = 0; index < data.reqs.length; index++) {
			await seedRequirements(data.reqs[index], {
				"187-3": careers[0].getDataValue("id"),
				"187-4": careers[1].getDataValue("id"),
				"187-5": careers[2].getDataValue("id"),
			})
		}

		for (let index = 0; index < data["subjectReqs"].length; index++) {
			await seedSubjectReqs(data["subjectReqs"][index], {
				"187-3": careers[0].getDataValue("id"),
				"187-4": careers[1].getDataValue("id"),
				"187-5": careers[2].getDataValue("id"),
			})
		}

		const placeFicct = await Place.findOne({ where: { code: "FICCT" } })
		for (let index = 0; index < careers.length; index++) {
			await careers[index].update({ Placeid: placeFicct.getDataValue("id") })
		}
	})
	.finally(() => process.exit(0))
	.catch((err) => console.error(err))
