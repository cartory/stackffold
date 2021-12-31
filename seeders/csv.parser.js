const fs = require("fs")
const csv = require("csv-parser")
const { Parser } = require("json2csv")

const { equipment_brands, equipment_types } = require("./data.json")

const modules = [
	[123, ["03"]],
	[232, ["09", 10, 11, 12]],
	[236, [41, 42, 43, 44, 45, 46, 48]],
]

const csv2json = (module, rooms = []) => {
	if (!rooms.length) return

	let results = []
	let room = rooms.pop()
	let stream = fs.createReadStream(`${__dirname}/csv/${module}-${room}.csv`)

	const parser = new Parser({
		fields: ["assignment", "code", "state", "description", "observations", "unit", "equipmentType", "equipmentBrand"],
	})

	stream
		.pipe(csv({ separator: ";" }))
		.on("error", (err) => console.error(err))
		.on("data", (data) => {
			delete data[""]

			let brandIndex = equipment_brands.findIndex(({ name }) => {
				return data.DESCRIPCION.toUpperCase().includes(name.toUpperCase())
			})

			let typeIndex = equipment_types.findIndex(({ name }) => {
				return data.DESCRIPCION.toUpperCase().includes(name.toUpperCase())
			})

			results.push({
				assignment: data.NROASIGNACION,
				code: data.CODIGO,
				state: data.ESTADO,
				description: data.DESCRIPCION,
				observations: data.OBSERVACION,
				unit: data.UND,
				equipmentType: typeIndex < 0 ? null : equipment_types[typeIndex]["name"],
				equipmentBrand: brandIndex < 0 ? null : equipment_brands[brandIndex]["name"],
			})
		})
		.on("end", () => {
			stream.close()
			csv2json(module, rooms)
			fs.writeFileSync(`seeders/json/${module}-${room}.json`, JSON.stringify(results), {
				encoding: "utf-8",
			})
		})
}

modules.forEach(([module, rooms]) => {
	csv2json(module, rooms)
	console.log(module, "csv2json Done!")
})
