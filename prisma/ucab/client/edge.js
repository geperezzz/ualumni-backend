
Object.defineProperty(exports, "__esModule", { value: true });

const {
  PrismaClientKnownRequestError,
  PrismaClientUnknownRequestError,
  PrismaClientRustPanicError,
  PrismaClientInitializationError,
  PrismaClientValidationError,
  NotFoundError,
  getPrismaClient,
  sqltag,
  empty,
  join,
  raw,
  Decimal,
  Debug,
  objectEnumValues,
  makeStrictEnum,
  Extensions,
  warnOnce,
  defineDmmfProperty,
  Public,
} = require('./runtime/edge')


const Prisma = {}

exports.Prisma = Prisma
exports.$Enums = {}

/**
 * Prisma Client JS version: 5.6.0
 * Query Engine version: 79fb5193cf0a8fdbef536e4b4a159cad677ab1b9
 */
Prisma.prismaVersion = {
  client: "5.6.0",
  engine: "79fb5193cf0a8fdbef536e4b4a159cad677ab1b9"
}

Prisma.PrismaClientKnownRequestError = PrismaClientKnownRequestError;
Prisma.PrismaClientUnknownRequestError = PrismaClientUnknownRequestError
Prisma.PrismaClientRustPanicError = PrismaClientRustPanicError
Prisma.PrismaClientInitializationError = PrismaClientInitializationError
Prisma.PrismaClientValidationError = PrismaClientValidationError
Prisma.NotFoundError = NotFoundError
Prisma.Decimal = Decimal

/**
 * Re-export of sql-template-tag
 */
Prisma.sql = sqltag
Prisma.empty = empty
Prisma.join = join
Prisma.raw = raw
Prisma.validator = Public.validator

/**
* Extensions
*/
Prisma.getExtensionContext = Extensions.getExtensionContext
Prisma.defineExtension = Extensions.defineExtension

/**
 * Shorthand utilities for JSON filtering
 */
Prisma.DbNull = objectEnumValues.instances.DbNull
Prisma.JsonNull = objectEnumValues.instances.JsonNull
Prisma.AnyNull = objectEnumValues.instances.AnyNull

Prisma.NullTypes = {
  DbNull: objectEnumValues.classes.DbNull,
  JsonNull: objectEnumValues.classes.JsonNull,
  AnyNull: objectEnumValues.classes.AnyNull
}



/**
 * Enums
 */
exports.Prisma.TransactionIsolationLevel = makeStrictEnum({
  ReadUncommitted: 'ReadUncommitted',
  ReadCommitted: 'ReadCommitted',
  RepeatableRead: 'RepeatableRead',
  Serializable: 'Serializable'
});

exports.Prisma.StudentScalarFieldEnum = {
  email: 'email',
  names: 'names',
  surnames: 'surnames'
};

exports.Prisma.CareerScalarFieldEnum = {
  name: 'name'
};

exports.Prisma.CiapCourseScalarFieldEnum = {
  id: 'id',
  name: 'name',
  completionDate: 'completionDate'
};

exports.Prisma.StudentCareerScalarFieldEnum = {
  studentEmail: 'studentEmail',
  careerName: 'careerName',
  status: 'status',
  graduationDate: 'graduationDate'
};

exports.Prisma.SortOrder = {
  asc: 'asc',
  desc: 'desc'
};

exports.Prisma.QueryMode = {
  default: 'default',
  insensitive: 'insensitive'
};

exports.Prisma.NullsOrder = {
  first: 'first',
  last: 'last'
};
exports.StudentCareerStatus = exports.$Enums.StudentCareerStatus = {
  ONGOING: 'ONGOING',
  DROPPED: 'DROPPED',
  FINISHED: 'FINISHED'
};

exports.Prisma.ModelName = {
  Student: 'Student',
  Career: 'Career',
  CiapCourse: 'CiapCourse',
  StudentCareer: 'StudentCareer'
};
/**
 * Create the Client
 */
const config = {
  "generator": {
    "name": "client",
    "provider": {
      "fromEnvVar": null,
      "value": "prisma-client-js"
    },
    "output": {
      "value": "/home/gabriel/coding-projects/ualumni-backend/prisma/ucab/client",
      "fromEnvVar": null
    },
    "config": {
      "engineType": "library"
    },
    "binaryTargets": [
      {
        "fromEnvVar": null,
        "value": "debian-openssl-3.0.x",
        "native": true
      }
    ],
    "previewFeatures": [],
    "isCustomOutput": true
  },
  "relativeEnvPaths": {
    "rootEnvPath": "../../../.env",
    "schemaEnvPath": "../../../.env"
  },
  "relativePath": "..",
  "clientVersion": "5.6.0",
  "engineVersion": "79fb5193cf0a8fdbef536e4b4a159cad677ab1b9",
  "datasourceNames": [
    "db"
  ],
  "activeProvider": "postgresql",
  "inlineDatasources": {
    "db": {
      "url": {
        "fromEnvVar": "UCAB_DATABASE_URL",
        "value": null
      }
    }
  },
  "inlineSchema": "Z2VuZXJhdG9yIGNsaWVudCB7CiAgcHJvdmlkZXIgPSAicHJpc21hLWNsaWVudC1qcyIKICBvdXRwdXQgICA9ICIuL2NsaWVudCIKfQoKZGF0YXNvdXJjZSBkYiB7CiAgcHJvdmlkZXIgPSAicG9zdGdyZXNxbCIKICB1cmwgICAgICA9IGVudigiVUNBQl9EQVRBQkFTRV9VUkwiKQp9Cgptb2RlbCBTdHVkZW50IHsKICBlbWFpbCAgICAgICAgICAgU3RyaW5nICAgICAgICAgIEBpZAogIG5hbWVzICAgICAgICAgICBTdHJpbmcKICBzdXJuYW1lcyAgICAgICAgU3RyaW5nCiAgZW5yb2xsZWRDYXJlZXJzIFN0dWRlbnRDYXJlZXJbXQogIGNvdXJzZXNUYWtlbiAgICBDaWFwQ291cnNlW10KfQoKbW9kZWwgQ2FyZWVyIHsKICBuYW1lICAgICAgICAgICAgIFN0cmluZyAgICAgICAgICBAaWQKICBlbnJvbGxlZFN0dWRlbnRzIFN0dWRlbnRDYXJlZXJbXQp9Cgptb2RlbCBDaWFwQ291cnNlIHsKICBpZCAgICAgICAgICAgICAgIFN0cmluZyAgICBAaWQgQGRlZmF1bHQodXVpZCgpKSBAZGIuVXVpZAogIG5hbWUgICAgICAgICAgICAgU3RyaW5nCiAgY29tcGxldGlvbkRhdGUgICBEYXRlVGltZSAgQGRiLkRhdGUKICBlbnJvbGxlZFN0dWRlbnRzIFN0dWRlbnRbXQp9CgplbnVtIFN0dWRlbnRDYXJlZXJTdGF0dXMgewogIE9OR09JTkcKICBEUk9QUEVECiAgRklOSVNIRUQKfQoKbW9kZWwgU3R1ZGVudENhcmVlciB7CiAgc3R1ZGVudCAgICAgICAgU3R1ZGVudCAgICAgICAgICAgICBAcmVsYXRpb24oZmllbGRzOiBbc3R1ZGVudEVtYWlsXSwgcmVmZXJlbmNlczogW2VtYWlsXSkKICBzdHVkZW50RW1haWwgICBTdHJpbmcKICBjYXJlZXIgICAgICAgICBDYXJlZXIgICAgICAgICAgICAgIEByZWxhdGlvbihmaWVsZHM6IFtjYXJlZXJOYW1lXSwgcmVmZXJlbmNlczogW25hbWVdKQogIGNhcmVlck5hbWUgICAgIFN0cmluZwogIHN0YXR1cyAgICAgICAgIFN0dWRlbnRDYXJlZXJTdGF0dXMKICBncmFkdWF0aW9uRGF0ZSBEYXRlVGltZT8gICAgICAgICAgIEBkYi5EYXRlCgogIEBAaWQoW3N0dWRlbnRFbWFpbCwgY2FyZWVyTmFtZV0pCn0K",
  "inlineSchemaHash": "53b5dd4752740f6d01907e8aad3e433f783792886f93ffc94f4edd9f812ad9a6"
}
config.dirname = '/'

config.runtimeDataModel = JSON.parse("{\"models\":{\"Student\":{\"dbName\":null,\"fields\":[{\"name\":\"email\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":true,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"names\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"surnames\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"enrolledCareers\",\"kind\":\"object\",\"isList\":true,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"StudentCareer\",\"relationName\":\"StudentToStudentCareer\",\"relationFromFields\":[],\"relationToFields\":[],\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"coursesTaken\",\"kind\":\"object\",\"isList\":true,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"CiapCourse\",\"relationName\":\"CiapCourseToStudent\",\"relationFromFields\":[],\"relationToFields\":[],\"isGenerated\":false,\"isUpdatedAt\":false}],\"primaryKey\":null,\"uniqueFields\":[],\"uniqueIndexes\":[],\"isGenerated\":false},\"Career\":{\"dbName\":null,\"fields\":[{\"name\":\"name\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":true,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"enrolledStudents\",\"kind\":\"object\",\"isList\":true,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"StudentCareer\",\"relationName\":\"CareerToStudentCareer\",\"relationFromFields\":[],\"relationToFields\":[],\"isGenerated\":false,\"isUpdatedAt\":false}],\"primaryKey\":null,\"uniqueFields\":[],\"uniqueIndexes\":[],\"isGenerated\":false},\"CiapCourse\":{\"dbName\":null,\"fields\":[{\"name\":\"id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":true,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"String\",\"default\":{\"name\":\"uuid\",\"args\":[]},\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"name\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"completionDate\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"DateTime\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"enrolledStudents\",\"kind\":\"object\",\"isList\":true,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Student\",\"relationName\":\"CiapCourseToStudent\",\"relationFromFields\":[],\"relationToFields\":[],\"isGenerated\":false,\"isUpdatedAt\":false}],\"primaryKey\":null,\"uniqueFields\":[],\"uniqueIndexes\":[],\"isGenerated\":false},\"StudentCareer\":{\"dbName\":null,\"fields\":[{\"name\":\"student\",\"kind\":\"object\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Student\",\"relationName\":\"StudentToStudentCareer\",\"relationFromFields\":[\"studentEmail\"],\"relationToFields\":[\"email\"],\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"studentEmail\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":true,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"career\",\"kind\":\"object\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Career\",\"relationName\":\"CareerToStudentCareer\",\"relationFromFields\":[\"careerName\"],\"relationToFields\":[\"name\"],\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"careerName\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":true,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"status\",\"kind\":\"enum\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"StudentCareerStatus\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"graduationDate\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"DateTime\",\"isGenerated\":false,\"isUpdatedAt\":false}],\"primaryKey\":{\"name\":null,\"fields\":[\"studentEmail\",\"careerName\"]},\"uniqueFields\":[],\"uniqueIndexes\":[],\"isGenerated\":false}},\"enums\":{\"StudentCareerStatus\":{\"values\":[{\"name\":\"ONGOING\",\"dbName\":null},{\"name\":\"DROPPED\",\"dbName\":null},{\"name\":\"FINISHED\",\"dbName\":null}],\"dbName\":null}},\"types\":{}}")
defineDmmfProperty(exports.Prisma, config.runtimeDataModel)
config.getQueryEngineWasmModule = undefined

config.injectableEdgeEnv = () => ({
  parsed: {
    UCAB_DATABASE_URL: typeof globalThis !== 'undefined' && globalThis['UCAB_DATABASE_URL'] || typeof process !== 'undefined' && process.env && process.env.UCAB_DATABASE_URL || undefined
  }
})

if (typeof globalThis !== 'undefined' && globalThis['DEBUG'] || typeof process !== 'undefined' && process.env && process.env.DEBUG || undefined) {
  Debug.enable(typeof globalThis !== 'undefined' && globalThis['DEBUG'] || typeof process !== 'undefined' && process.env && process.env.DEBUG || undefined)
}

const PrismaClient = getPrismaClient(config)
exports.PrismaClient = PrismaClient
Object.assign(exports, Prisma)

