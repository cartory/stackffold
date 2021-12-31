import { QueryTypes } from "sequelize"
import sequelize from "../utils/sequelize"

interface querySubjectOptions {
	limit: number
	offset: number
	semester?: number
	careerId?: number
}

export const querySubjects = async (query: querySubjectOptions) => {
	const sql = `SELECT DISTINCT s.*
    FROM Subject s
        JOIN Subject_Career sc ON id = sc.Subjectid
        JOIN Career c ON sc.Careerid = c.id
    WHERE
        s.deletedAt is null
        and ${query.semester != null ? `sc.semester = ${query.semester}` : "true"} 
        and ${query.careerId != null ? `c.id = ${query.careerId}` : "true"}
    LIMIT ${query.limit}
    OFFSET ${query.offset * query.limit}`

	try {
		const subjects = await sequelize.query(sql, {
			type: QueryTypes.SELECT,
		})

		return subjects.map((subject) => {
			delete subject["deletedAt"]
			delete subject["createdAt"]
			delete subject["updatedAt"]
			return subject
		})
	} catch (err) {
		console.error(err)
	}

	return []
}
