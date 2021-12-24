export const numbers = [
	"tinyint", "smallint", "mediumint", "bigint",
	"int64", "unsigned big int", "float", "float4", "float8", "smallmoney", "money", 
	"float", "double", "dec", "decimal", "smalldecimal", "fixed", "numeric", "real", "double precision", "number",
	"int", "int2", "int4", "int8", "integer", "tinyint", "smallint", "mediumint", "bigint", "dec", "decimal", "smalldecimal", "fixed", "numeric", "number",
]

export const strings = [
	"tinytext", "mediumblob", "mediumtext", "blob", "text", "ntext", "citext", "hstore", "longblob", "longtext", "alphanum", "shorttext", "bytes", "bytea",
	"datetime", "datetime2", "datetimeoffset", "time", "time with time zone", "time without time zone", "timestamp", "timestamp without time zone", "timestamp with time zone", "timestamp with local time zone",
	"character varying", "varying character", "char varying", "nvarchar", "national varchar", "character", "native character", "varchar", "char", "nchar", "national char", "varchar2", "nvarchar2", "alphanum", "shorttext", "raw", "binary", "varbinary", "string",
]

export const bools = [
	"boolean", "bool", "bfile", "bit", "bit varying", "varbit", "varbinary"
]

export const generated = [
	'increment', 'rowid', 'uuid'
]

export const getDataType = (name: string): string => { 
	if (bools.indexOf(name) >= 0) return 'boolean'
	if (numbers.indexOf(name) >= 0) return 'number'

	return 'string'
}

export const getDataSequelizetype = {
	int4: (_: any) => `DataTypes.TINYINT`,
	byte: (_: any) => `DataTypes.TINYINT`,
	tinyint: (_:any) => `DataTypes.TINYNIT`,

	bit: (_: any) => `DataTypes.BOOLEAN`,
	boolean: (_: any) => `DataTypes.BOOLEAN`,

	char: (length: number) => `DataTypes.CHAR(${length})`,
	float: (length: number) => `DataTypes.FLOAT(${length})`,
	double: (length: number) => `DataTypes.DOUBLE(${length})`,

	int: (length: number) => `DataTypes.INTEGER({ length: ${length} })`,
	integer: (length: number) => `DataTypes.INTEGER({ length: ${length} })`,

	long: (length: number) => `DataTypes.BIGINT(${length})`,
	short: (length: number) => `DataTypes.SMALLINT( ${length})`,

	text: (_: any) => `DataTypes.TEXT`,
	string: (length: number) => `DataTypes.STRING(${length})`,
	varchar: (length: number) => `DataTypes.STRING(${length})`,

	date: (_: any) => `DataTypes.DATE`,
	timestamp: (_: any) => `DataTypes.TIME`,
}

