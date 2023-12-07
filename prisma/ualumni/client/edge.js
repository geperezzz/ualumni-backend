
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
 * Query Engine version: e95e739751f42d8ca026f6b910f5a2dc5adeaeee
 */
Prisma.prismaVersion = {
  client: "5.6.0",
  engine: "e95e739751f42d8ca026f6b910f5a2dc5adeaeee"
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

exports.Prisma.JobOfferScalarFieldEnum = {
  id: 'id',
  description: 'description',
  companyName: 'companyName',
  companyContact: 'companyContact',
  companyLogo: 'companyLogo',
  department: 'department',
  position: 'position',
  offerLocation: 'offerLocation',
  offerTimestamp: 'offerTimestamp',
  isVisible: 'isVisible',
  visibleSince: 'visibleSince',
  careerName: 'careerName',
  contractTypeName: 'contractTypeName'
};

exports.Prisma.JobOfferTechnicalSkillScalarFieldEnum = {
  jobOfferId: 'jobOfferId',
  technicalSkillName: 'technicalSkillName',
  technicalSkillCategoryName: 'technicalSkillCategoryName'
};

exports.Prisma.ContractTypeScalarFieldEnum = {
  name: 'name'
};

exports.Prisma.CareerScalarFieldEnum = {
  name: 'name'
};

exports.Prisma.UserScalarFieldEnum = {
  email: 'email',
  password: 'password',
  names: 'names',
  surnames: 'surnames',
  role: 'role'
};

exports.Prisma.AlumniScalarFieldEnum = {
  email: 'email',
  address: 'address',
  telephoneNumber: 'telephoneNumber'
};

exports.Prisma.SessionScalarFieldEnum = {
  id: 'id',
  sid: 'sid',
  data: 'data',
  expiresAt: 'expiresAt'
};

exports.Prisma.GraduationScalarFieldEnum = {
  careerName: 'careerName',
  alumniEmail: 'alumniEmail',
  graduationDate: 'graduationDate'
};

exports.Prisma.JobApplicationScalarFieldEnum = {
  jobOfferId: 'jobOfferId',
  alumniWhoAppliedEmail: 'alumniWhoAppliedEmail',
  applicationTimestamp: 'applicationTimestamp'
};

exports.Prisma.ResumeScalarFieldEnum = {
  ownerEmail: 'ownerEmail',
  numberOfDownloads: 'numberOfDownloads',
  isVisible: 'isVisible',
  visibleSince: 'visibleSince',
  aboutMe: 'aboutMe'
};

exports.Prisma.CiapCourseScalarFieldEnum = {
  id: 'id',
  name: 'name',
  date: 'date'
};

exports.Prisma.ResumeCiapCourseScalarFieldEnum = {
  resumeOwnerEmail: 'resumeOwnerEmail',
  courseId: 'courseId',
  isVisible: 'isVisible'
};

exports.Prisma.SoftSkillScalarFieldEnum = {
  name: 'name'
};

exports.Prisma.ResumeSoftSkillScalarFieldEnum = {
  resumeOwnerEmail: 'resumeOwnerEmail',
  skillName: 'skillName',
  isVisible: 'isVisible'
};

exports.Prisma.SkillCategoryScalarFieldEnum = {
  name: 'name'
};

exports.Prisma.TechnicalSkillScalarFieldEnum = {
  name: 'name',
  categoryName: 'categoryName'
};

exports.Prisma.ResumeTechnicalSkillScalarFieldEnum = {
  resumeOwnerEmail: 'resumeOwnerEmail',
  skillName: 'skillName',
  skillCategoryName: 'skillCategoryName',
  isVisible: 'isVisible'
};

exports.Prisma.LanguageScalarFieldEnum = {
  name: 'name'
};

exports.Prisma.ResumeLanguageScalarFieldEnum = {
  resumeOwnerEmail: 'resumeOwnerEmail',
  languageName: 'languageName',
  masteryLevel: 'masteryLevel',
  isVisible: 'isVisible'
};

exports.Prisma.PortfolioItemScalarFieldEnum = {
  resumeOwnerEmail: 'resumeOwnerEmail',
  title: 'title',
  sourceLink: 'sourceLink',
  isVisible: 'isVisible'
};

exports.Prisma.HigherEducationStudyScalarFieldEnum = {
  resumeOwnerEmail: 'resumeOwnerEmail',
  title: 'title',
  institution: 'institution',
  endDate: 'endDate',
  isVisible: 'isVisible'
};

exports.Prisma.PositionOfInterestScalarFieldEnum = {
  resumeOwnerEmail: 'resumeOwnerEmail',
  positionName: 'positionName',
  isVisible: 'isVisible'
};

exports.Prisma.IndustryOfInterestScalarFieldEnum = {
  resumeOwnerEmail: 'resumeOwnerEmail',
  industryName: 'industryName',
  isVisible: 'isVisible'
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
exports.Role = exports.$Enums.Role = {
  ADMIN: 'ADMIN',
  ALUMNI: 'ALUMNI'
};

exports.Prisma.ModelName = {
  JobOffer: 'JobOffer',
  JobOfferTechnicalSkill: 'JobOfferTechnicalSkill',
  ContractType: 'ContractType',
  Career: 'Career',
  User: 'User',
  Alumni: 'Alumni',
  Session: 'Session',
  Graduation: 'Graduation',
  JobApplication: 'JobApplication',
  Resume: 'Resume',
  CiapCourse: 'CiapCourse',
  ResumeCiapCourse: 'ResumeCiapCourse',
  SoftSkill: 'SoftSkill',
  ResumeSoftSkill: 'ResumeSoftSkill',
  SkillCategory: 'SkillCategory',
  TechnicalSkill: 'TechnicalSkill',
  ResumeTechnicalSkill: 'ResumeTechnicalSkill',
  Language: 'Language',
  ResumeLanguage: 'ResumeLanguage',
  PortfolioItem: 'PortfolioItem',
  HigherEducationStudy: 'HigherEducationStudy',
  PositionOfInterest: 'PositionOfInterest',
  IndustryOfInterest: 'IndustryOfInterest'
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
      "value": "/home/gabriel/coding-projects/ualumni-backend/prisma/ualumni/client",
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
  "engineVersion": "e95e739751f42d8ca026f6b910f5a2dc5adeaeee",
  "datasourceNames": [
    "db"
  ],
  "activeProvider": "postgresql",
  "inlineDatasources": {
    "db": {
      "url": {
        "fromEnvVar": "UALUMNI_DATABASE_URL",
        "value": null
      }
    }
  },
  "inlineSchema": "Z2VuZXJhdG9yIGNsaWVudCB7CiAgcHJvdmlkZXIgPSAicHJpc21hLWNsaWVudC1qcyIKICBvdXRwdXQgICA9ICIuL2NsaWVudCIKfQoKZGF0YXNvdXJjZSBkYiB7CiAgcHJvdmlkZXIgPSAicG9zdGdyZXNxbCIKICB1cmwgICAgICA9IGVudigiVUFMVU1OSV9EQVRBQkFTRV9VUkwiKQp9Cgptb2RlbCBKb2JPZmZlciB7CiAgaWQgICAgICAgICAgICAgICBTdHJpbmcgICAgICAgICAgICAgICAgICAgQGlkIEBkZWZhdWx0KHV1aWQoKSkgQGRiLlV1aWQKICBkZXNjcmlwdGlvbiAgICAgIFN0cmluZwogIGNvbXBhbnlOYW1lICAgICAgU3RyaW5nCiAgY29tcGFueUNvbnRhY3QgICBTdHJpbmcKICBjb21wYW55TG9nbyAgICAgIFN0cmluZwogIGRlcGFydG1lbnQgICAgICAgU3RyaW5nCiAgcG9zaXRpb24gICAgICAgICBTdHJpbmcKICBvZmZlckxvY2F0aW9uICAgIFN0cmluZwogIG9mZmVyVGltZXN0YW1wICAgRGF0ZVRpbWUKICBpc1Zpc2libGUgICAgICAgIEJvb2xlYW4gICAgICAgICAgICAgICAgICBAZGVmYXVsdCh0cnVlKQogIHZpc2libGVTaW5jZSAgICAgRGF0ZVRpbWUgICAgICAgICAgICAgICAgIEBkZWZhdWx0KG5vdygpKQogIGNhcmVlciAgICAgICAgICAgQ2FyZWVyICAgICAgICAgICAgICAgICAgIEByZWxhdGlvbihmaWVsZHM6IFtjYXJlZXJOYW1lXSwgcmVmZXJlbmNlczogW25hbWVdKQogIGNhcmVlck5hbWUgICAgICAgU3RyaW5nCiAgYXBwbGljYXRpb25zICAgICBKb2JBcHBsaWNhdGlvbltdCiAgY29udHJhY3RUeXBlICAgICBDb250cmFjdFR5cGUgICAgICAgICAgICAgQHJlbGF0aW9uKGZpZWxkczogW2NvbnRyYWN0VHlwZU5hbWVdLCByZWZlcmVuY2VzOiBbbmFtZV0pCiAgY29udHJhY3RUeXBlTmFtZSBTdHJpbmcKICB0ZWNobmljYWxTa2lsbHMgIEpvYk9mZmVyVGVjaG5pY2FsU2tpbGxbXQp9Cgptb2RlbCBKb2JPZmZlclRlY2huaWNhbFNraWxsIHsKICBqb2JPZmZlciAgICAgICAgICAgICAgICAgICBKb2JPZmZlciAgICAgICBAcmVsYXRpb24oZmllbGRzOiBbam9iT2ZmZXJJZF0sIHJlZmVyZW5jZXM6IFtpZF0pCiAgam9iT2ZmZXJJZCAgICAgICAgICAgICAgICAgU3RyaW5nICAgICAgICAgQGRiLlV1aWQKICB0ZWNobmljYWxTa2lsbCAgICAgICAgICAgICBUZWNobmljYWxTa2lsbCBAcmVsYXRpb24oZmllbGRzOiBbdGVjaG5pY2FsU2tpbGxOYW1lLCB0ZWNobmljYWxTa2lsbENhdGVnb3J5TmFtZV0sIHJlZmVyZW5jZXM6IFtuYW1lLCBjYXRlZ29yeU5hbWVdKQogIHRlY2huaWNhbFNraWxsTmFtZSAgICAgICAgIFN0cmluZwogIHRlY2huaWNhbFNraWxsQ2F0ZWdvcnlOYW1lIFN0cmluZwoKICBAQGlkKFtqb2JPZmZlcklkLCB0ZWNobmljYWxTa2lsbE5hbWUsIHRlY2huaWNhbFNraWxsQ2F0ZWdvcnlOYW1lXSkKfQoKbW9kZWwgQ29udHJhY3RUeXBlIHsKICBuYW1lICAgICAgICAgICAgICAgIFN0cmluZyAgICAgQGlkCiAgY29udHJhY3RzT2ZUaGlzVHlwZSBKb2JPZmZlcltdCn0KCm1vZGVsIENhcmVlciB7CiAgbmFtZSAgICAgICAgICAgIFN0cmluZyAgICAgICAgICBAaWQKICBqb2JPZmZlcnMgICAgICAgSm9iT2ZmZXJbXQogIGdyYWR1YXRpb25zICAgICBHcmFkdWF0aW9uW10KICBza2lsbENhdGVnb3JpZXMgU2tpbGxDYXRlZ29yeVtdCn0KCmVudW0gUm9sZSB7CiAgQURNSU4KICBBTFVNTkkKfQoKbW9kZWwgVXNlciB7CiAgZW1haWwgICAgICAgICAgICBTdHJpbmcgIEBpZAogIHBhc3N3b3JkICAgICAgICAgU3RyaW5nCiAgbmFtZXMgICAgICAgICAgICBTdHJpbmcKICBzdXJuYW1lcyAgICAgICAgIFN0cmluZwogIHJvbGUgICAgICAgICAgICAgUm9sZQogIGFzc29jaWF0ZWRBbHVtbmkgQWx1bW5pPwp9Cgptb2RlbCBBbHVtbmkgewogIGFzc29jaWF0ZWRVc2VyICBVc2VyICAgICAgICAgICAgIEByZWxhdGlvbihmaWVsZHM6IFtlbWFpbF0sIHJlZmVyZW5jZXM6IFtlbWFpbF0sIG9uVXBkYXRlOiBDYXNjYWRlLCBvbkRlbGV0ZTogQ2FzY2FkZSkKICBlbWFpbCAgICAgICAgICAgU3RyaW5nICAgICAgICAgICBAaWQKICBhZGRyZXNzICAgICAgICAgU3RyaW5nPwogIHRlbGVwaG9uZU51bWJlciBTdHJpbmc/CiAgam9iQXBwbGljYXRpb25zIEpvYkFwcGxpY2F0aW9uW10KICByZXN1bWUgICAgICAgICAgUmVzdW1lPwogIGdyYWR1YXRpb25zICAgICBHcmFkdWF0aW9uW10KfQoKbW9kZWwgU2Vzc2lvbiB7CiAgaWQgICAgICAgIFN0cmluZyAgIEBpZAogIHNpZCAgICAgICBTdHJpbmcgICBAdW5pcXVlCiAgZGF0YSAgICAgIFN0cmluZwogIGV4cGlyZXNBdCBEYXRlVGltZQp9Cgptb2RlbCBHcmFkdWF0aW9uIHsKICBjYXJlZXIgICAgICAgICBDYXJlZXIgICBAcmVsYXRpb24oZmllbGRzOiBbY2FyZWVyTmFtZV0sIHJlZmVyZW5jZXM6IFtuYW1lXSkKICBjYXJlZXJOYW1lICAgICBTdHJpbmcKICBhbHVtbmkgICAgICAgICBBbHVtbmkgICBAcmVsYXRpb24oZmllbGRzOiBbYWx1bW5pRW1haWxdLCByZWZlcmVuY2VzOiBbZW1haWxdKQogIGFsdW1uaUVtYWlsICAgIFN0cmluZwogIGdyYWR1YXRpb25EYXRlIERhdGVUaW1lIEBkYi5EYXRlCgogIEBAaWQoW2NhcmVlck5hbWUsIGFsdW1uaUVtYWlsXSkKfQoKbW9kZWwgSm9iQXBwbGljYXRpb24gewogIGpvYk9mZmVyICAgICAgICAgICAgICBKb2JPZmZlciBAcmVsYXRpb24oZmllbGRzOiBbam9iT2ZmZXJJZF0sIHJlZmVyZW5jZXM6IFtpZF0pCiAgam9iT2ZmZXJJZCAgICAgICAgICAgIFN0cmluZyAgIEBkYi5VdWlkCiAgYWx1bW5pV2hvQXBwbGllZCAgICAgIEFsdW1uaSAgIEByZWxhdGlvbihmaWVsZHM6IFthbHVtbmlXaG9BcHBsaWVkRW1haWxdLCByZWZlcmVuY2VzOiBbZW1haWxdKQogIGFsdW1uaVdob0FwcGxpZWRFbWFpbCBTdHJpbmcKICBhcHBsaWNhdGlvblRpbWVzdGFtcCAgRGF0ZVRpbWUKCiAgQEBpZChbam9iT2ZmZXJJZCwgYWx1bW5pV2hvQXBwbGllZEVtYWlsXSkKfQoKbW9kZWwgUmVzdW1lIHsKICBvd25lciAgICAgICAgICAgICAgICAgIEFsdW1uaSAgICAgICAgICAgICAgICAgQHJlbGF0aW9uKGZpZWxkczogW293bmVyRW1haWxdLCByZWZlcmVuY2VzOiBbZW1haWxdLCBvblVwZGF0ZTogQ2FzY2FkZSwgb25EZWxldGU6IENhc2NhZGUpCiAgb3duZXJFbWFpbCAgICAgICAgICAgICBTdHJpbmcgICAgICAgICAgICAgICAgIEBpZAogIG51bWJlck9mRG93bmxvYWRzICAgICAgSW50ICAgICAgICAgICAgICAgICAgICBAZGVmYXVsdCgwKQogIGlzVmlzaWJsZSAgICAgICAgICAgICAgQm9vbGVhbiAgICAgICAgICAgICAgICBAZGVmYXVsdChmYWxzZSkKICB2aXNpYmxlU2luY2UgICAgICAgICAgIERhdGVUaW1lICAgICAgICAgICAgICAgQGRlZmF1bHQobm93KCkpCiAgYWJvdXRNZSAgICAgICAgICAgICAgICBTdHJpbmc/CiAga25vd25MYW5ndWFnZXMgICAgICAgICBSZXN1bWVMYW5ndWFnZVtdCiAgcG9ydGZvbGlvICAgICAgICAgICAgICBQb3J0Zm9saW9JdGVtW10KICBoaWdoZXJFZHVjYXRpb25TdHVkaWVzIEhpZ2hlckVkdWNhdGlvblN0dWR5W10KICB0ZWNobmljYWxTa2lsbHMgICAgICAgIFJlc3VtZVRlY2huaWNhbFNraWxsW10KICBzb2Z0U2tpbGxzICAgICAgICAgICAgIFJlc3VtZVNvZnRTa2lsbFtdCiAgY2lhcENvdXJzZXMgICAgICAgICAgICBSZXN1bWVDaWFwQ291cnNlW10KICBwb3NpdGlvbnNPZkludGVyZXN0ICAgIFBvc2l0aW9uT2ZJbnRlcmVzdFtdCiAgaW5kdXN0cmllc09mSW50ZXJlc3QgICBJbmR1c3RyeU9mSW50ZXJlc3RbXQp9Cgptb2RlbCBDaWFwQ291cnNlIHsKICBpZCAgICAgICAgICAgICAgICAgU3RyaW5nICAgICAgICAgICAgIEBpZCBAZGVmYXVsdCh1dWlkKCkpIEBkYi5VdWlkCiAgbmFtZSAgICAgICAgICAgICAgIFN0cmluZwogIGRhdGUgICAgICAgICAgICAgICBEYXRlVGltZSAgICAgICAgICAgQGRiLkRhdGUKICByZXN1bWVzTGlzdGluZ1RoaXMgUmVzdW1lQ2lhcENvdXJzZVtdCgogIEBAdW5pcXVlKFtuYW1lLCBkYXRlXSkKfQoKbW9kZWwgUmVzdW1lQ2lhcENvdXJzZSB7CiAgcmVzdW1lICAgICAgICAgICBSZXN1bWUgICAgIEByZWxhdGlvbihmaWVsZHM6IFtyZXN1bWVPd25lckVtYWlsXSwgcmVmZXJlbmNlczogW293bmVyRW1haWxdKQogIHJlc3VtZU93bmVyRW1haWwgU3RyaW5nCiAgY291cnNlICAgICAgICAgICBDaWFwQ291cnNlIEByZWxhdGlvbihmaWVsZHM6IFtjb3Vyc2VJZF0sIHJlZmVyZW5jZXM6IFtpZF0pCiAgY291cnNlSWQgICAgICAgICBTdHJpbmcgICAgIEBkYi5VdWlkCiAgaXNWaXNpYmxlICAgICAgICBCb29sZWFuCgogIEBAaWQoW3Jlc3VtZU93bmVyRW1haWwsIGNvdXJzZUlkXSkKfQoKbW9kZWwgU29mdFNraWxsIHsKICBuYW1lICAgICAgICAgICAgICAgU3RyaW5nICAgICAgICAgICAgQGlkCiAgcmVzdW1lc0xpc3RpbmdUaGlzIFJlc3VtZVNvZnRTa2lsbFtdCn0KCm1vZGVsIFJlc3VtZVNvZnRTa2lsbCB7CiAgcmVzdW1lICAgICAgICAgICBSZXN1bWUgICAgQHJlbGF0aW9uKGZpZWxkczogW3Jlc3VtZU93bmVyRW1haWxdLCByZWZlcmVuY2VzOiBbb3duZXJFbWFpbF0pCiAgcmVzdW1lT3duZXJFbWFpbCBTdHJpbmcKICBza2lsbCAgICAgICAgICAgIFNvZnRTa2lsbCBAcmVsYXRpb24oZmllbGRzOiBbc2tpbGxOYW1lXSwgcmVmZXJlbmNlczogW25hbWVdKQogIHNraWxsTmFtZSAgICAgICAgU3RyaW5nCiAgaXNWaXNpYmxlICAgICAgICBCb29sZWFuCgogIEBAaWQoW3Jlc3VtZU93bmVyRW1haWwsIHNraWxsTmFtZV0pCn0KCm1vZGVsIFNraWxsQ2F0ZWdvcnkgewogIG5hbWUgICAgICAgICAgICBTdHJpbmcgICAgICAgICAgIEBpZAogIHRlY2huaWNhbFNraWxscyBUZWNobmljYWxTa2lsbFtdCiAgcmVsYXRlZENhcmVlcnMgIENhcmVlcltdCn0KCm1vZGVsIFRlY2huaWNhbFNraWxsIHsKICBuYW1lICAgICAgICAgICAgICAgICBTdHJpbmcKICBjYXRlZ29yeSAgICAgICAgICAgICBTa2lsbENhdGVnb3J5ICAgICAgICAgICAgQHJlbGF0aW9uKGZpZWxkczogW2NhdGVnb3J5TmFtZV0sIHJlZmVyZW5jZXM6IFtuYW1lXSkKICBjYXRlZ29yeU5hbWUgICAgICAgICBTdHJpbmcKICByZXN1bWVzTGlzdGluZ1RoaXMgICBSZXN1bWVUZWNobmljYWxTa2lsbFtdCiAgam9iT2ZmZXJzTGlzdGluZ1RoaXMgSm9iT2ZmZXJUZWNobmljYWxTa2lsbFtdCgogIEBAaWQoW25hbWUsIGNhdGVnb3J5TmFtZV0pCn0KCm1vZGVsIFJlc3VtZVRlY2huaWNhbFNraWxsIHsKICByZXN1bWUgICAgICAgICAgICBSZXN1bWUgICAgICAgICBAcmVsYXRpb24oZmllbGRzOiBbcmVzdW1lT3duZXJFbWFpbF0sIHJlZmVyZW5jZXM6IFtvd25lckVtYWlsXSkKICByZXN1bWVPd25lckVtYWlsICBTdHJpbmcKICBza2lsbCAgICAgICAgICAgICBUZWNobmljYWxTa2lsbCBAcmVsYXRpb24oZmllbGRzOiBbc2tpbGxOYW1lLCBza2lsbENhdGVnb3J5TmFtZV0sIHJlZmVyZW5jZXM6IFtuYW1lLCBjYXRlZ29yeU5hbWVdKQogIHNraWxsTmFtZSAgICAgICAgIFN0cmluZwogIHNraWxsQ2F0ZWdvcnlOYW1lIFN0cmluZwogIGlzVmlzaWJsZSAgICAgICAgIEJvb2xlYW4KCiAgQEBpZChbcmVzdW1lT3duZXJFbWFpbCwgc2tpbGxOYW1lLCBza2lsbENhdGVnb3J5TmFtZV0pCn0KCm1vZGVsIExhbmd1YWdlIHsKICBuYW1lICAgIFN0cmluZyAgICAgICAgICAgQGlkCiAga25vd25CeSBSZXN1bWVMYW5ndWFnZVtdCn0KCm1vZGVsIFJlc3VtZUxhbmd1YWdlIHsKICByZXN1bWUgICAgICAgICAgIFJlc3VtZSAgIEByZWxhdGlvbihmaWVsZHM6IFtyZXN1bWVPd25lckVtYWlsXSwgcmVmZXJlbmNlczogW293bmVyRW1haWxdKQogIHJlc3VtZU93bmVyRW1haWwgU3RyaW5nCiAgbGFuZ3VhZ2UgICAgICAgICBMYW5ndWFnZSBAcmVsYXRpb24oZmllbGRzOiBbbGFuZ3VhZ2VOYW1lXSwgcmVmZXJlbmNlczogW25hbWVdKQogIGxhbmd1YWdlTmFtZSAgICAgU3RyaW5nCiAgbWFzdGVyeUxldmVsICAgICBJbnQKICBpc1Zpc2libGUgICAgICAgIEJvb2xlYW4KCiAgQEBpZChbcmVzdW1lT3duZXJFbWFpbCwgbGFuZ3VhZ2VOYW1lXSkKfQoKbW9kZWwgUG9ydGZvbGlvSXRlbSB7CiAgcmVzdW1lICAgICAgICAgICBSZXN1bWUgIEByZWxhdGlvbihmaWVsZHM6IFtyZXN1bWVPd25lckVtYWlsXSwgcmVmZXJlbmNlczogW293bmVyRW1haWxdKQogIHJlc3VtZU93bmVyRW1haWwgU3RyaW5nCiAgdGl0bGUgICAgICAgICAgICBTdHJpbmcKICBzb3VyY2VMaW5rICAgICAgIFN0cmluZwogIGlzVmlzaWJsZSAgICAgICAgQm9vbGVhbgoKICBAQGlkKFtyZXN1bWVPd25lckVtYWlsLCB0aXRsZV0pCn0KCm1vZGVsIEhpZ2hlckVkdWNhdGlvblN0dWR5IHsKICByZXN1bWUgICAgICAgICAgIFJlc3VtZSAgIEByZWxhdGlvbihmaWVsZHM6IFtyZXN1bWVPd25lckVtYWlsXSwgcmVmZXJlbmNlczogW293bmVyRW1haWxdKQogIHJlc3VtZU93bmVyRW1haWwgU3RyaW5nCiAgdGl0bGUgICAgICAgICAgICBTdHJpbmcKICBpbnN0aXR1dGlvbiAgICAgIFN0cmluZwogIGVuZERhdGUgICAgICAgICAgRGF0ZVRpbWUgQGRiLkRhdGUKICBpc1Zpc2libGUgICAgICAgIEJvb2xlYW4KCiAgQEBpZChbcmVzdW1lT3duZXJFbWFpbCwgdGl0bGVdKQp9Cgptb2RlbCBQb3NpdGlvbk9mSW50ZXJlc3QgewogIHJlc3VtZSAgICAgICAgICAgUmVzdW1lICBAcmVsYXRpb24oZmllbGRzOiBbcmVzdW1lT3duZXJFbWFpbF0sIHJlZmVyZW5jZXM6IFtvd25lckVtYWlsXSkKICByZXN1bWVPd25lckVtYWlsIFN0cmluZwogIHBvc2l0aW9uTmFtZSAgICAgU3RyaW5nCiAgaXNWaXNpYmxlICAgICAgICBCb29sZWFuCgogIEBAaWQoW3Jlc3VtZU93bmVyRW1haWwsIHBvc2l0aW9uTmFtZV0pCn0KCm1vZGVsIEluZHVzdHJ5T2ZJbnRlcmVzdCB7CiAgcmVzdW1lICAgICAgICAgICBSZXN1bWUgIEByZWxhdGlvbihmaWVsZHM6IFtyZXN1bWVPd25lckVtYWlsXSwgcmVmZXJlbmNlczogW293bmVyRW1haWxdKQogIHJlc3VtZU93bmVyRW1haWwgU3RyaW5nCiAgaW5kdXN0cnlOYW1lICAgICBTdHJpbmcKICBpc1Zpc2libGUgICAgICAgIEJvb2xlYW4KCiAgQEBpZChbcmVzdW1lT3duZXJFbWFpbCwgaW5kdXN0cnlOYW1lXSkKfQo=",
  "inlineSchemaHash": "14b64d7f7e012905a16c3ea35d2efabda6d397043882acf77b1f89a7a58853e6"
}
config.dirname = '/'

config.runtimeDataModel = JSON.parse("{\"models\":{\"JobOffer\":{\"dbName\":null,\"fields\":[{\"name\":\"id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":true,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"String\",\"default\":{\"name\":\"uuid\",\"args\":[]},\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"description\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"companyName\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"companyContact\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"companyLogo\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"department\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"position\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"offerLocation\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"offerTimestamp\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"DateTime\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"isVisible\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"Boolean\",\"default\":true,\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"visibleSince\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"DateTime\",\"default\":{\"name\":\"now\",\"args\":[]},\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"career\",\"kind\":\"object\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Career\",\"relationName\":\"CareerToJobOffer\",\"relationFromFields\":[\"careerName\"],\"relationToFields\":[\"name\"],\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"careerName\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":true,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"applications\",\"kind\":\"object\",\"isList\":true,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"JobApplication\",\"relationName\":\"JobApplicationToJobOffer\",\"relationFromFields\":[],\"relationToFields\":[],\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"contractType\",\"kind\":\"object\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"ContractType\",\"relationName\":\"ContractTypeToJobOffer\",\"relationFromFields\":[\"contractTypeName\"],\"relationToFields\":[\"name\"],\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"contractTypeName\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":true,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"technicalSkills\",\"kind\":\"object\",\"isList\":true,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"JobOfferTechnicalSkill\",\"relationName\":\"JobOfferToJobOfferTechnicalSkill\",\"relationFromFields\":[],\"relationToFields\":[],\"isGenerated\":false,\"isUpdatedAt\":false}],\"primaryKey\":null,\"uniqueFields\":[],\"uniqueIndexes\":[],\"isGenerated\":false},\"JobOfferTechnicalSkill\":{\"dbName\":null,\"fields\":[{\"name\":\"jobOffer\",\"kind\":\"object\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"JobOffer\",\"relationName\":\"JobOfferToJobOfferTechnicalSkill\",\"relationFromFields\":[\"jobOfferId\"],\"relationToFields\":[\"id\"],\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"jobOfferId\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":true,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"technicalSkill\",\"kind\":\"object\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"TechnicalSkill\",\"relationName\":\"JobOfferTechnicalSkillToTechnicalSkill\",\"relationFromFields\":[\"technicalSkillName\",\"technicalSkillCategoryName\"],\"relationToFields\":[\"name\",\"categoryName\"],\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"technicalSkillName\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":true,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"technicalSkillCategoryName\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":true,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false}],\"primaryKey\":{\"name\":null,\"fields\":[\"jobOfferId\",\"technicalSkillName\",\"technicalSkillCategoryName\"]},\"uniqueFields\":[],\"uniqueIndexes\":[],\"isGenerated\":false},\"ContractType\":{\"dbName\":null,\"fields\":[{\"name\":\"name\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":true,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"contractsOfThisType\",\"kind\":\"object\",\"isList\":true,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"JobOffer\",\"relationName\":\"ContractTypeToJobOffer\",\"relationFromFields\":[],\"relationToFields\":[],\"isGenerated\":false,\"isUpdatedAt\":false}],\"primaryKey\":null,\"uniqueFields\":[],\"uniqueIndexes\":[],\"isGenerated\":false},\"Career\":{\"dbName\":null,\"fields\":[{\"name\":\"name\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":true,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"jobOffers\",\"kind\":\"object\",\"isList\":true,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"JobOffer\",\"relationName\":\"CareerToJobOffer\",\"relationFromFields\":[],\"relationToFields\":[],\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"graduations\",\"kind\":\"object\",\"isList\":true,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Graduation\",\"relationName\":\"CareerToGraduation\",\"relationFromFields\":[],\"relationToFields\":[],\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"skillCategories\",\"kind\":\"object\",\"isList\":true,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"SkillCategory\",\"relationName\":\"CareerToSkillCategory\",\"relationFromFields\":[],\"relationToFields\":[],\"isGenerated\":false,\"isUpdatedAt\":false}],\"primaryKey\":null,\"uniqueFields\":[],\"uniqueIndexes\":[],\"isGenerated\":false},\"User\":{\"dbName\":null,\"fields\":[{\"name\":\"email\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":true,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"password\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"names\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"surnames\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"role\",\"kind\":\"enum\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Role\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"associatedAlumni\",\"kind\":\"object\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Alumni\",\"relationName\":\"AlumniToUser\",\"relationFromFields\":[],\"relationToFields\":[],\"isGenerated\":false,\"isUpdatedAt\":false}],\"primaryKey\":null,\"uniqueFields\":[],\"uniqueIndexes\":[],\"isGenerated\":false},\"Alumni\":{\"dbName\":null,\"fields\":[{\"name\":\"associatedUser\",\"kind\":\"object\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"User\",\"relationName\":\"AlumniToUser\",\"relationFromFields\":[\"email\"],\"relationToFields\":[\"email\"],\"relationOnDelete\":\"Cascade\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"email\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":true,\"isReadOnly\":true,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"address\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"telephoneNumber\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"jobApplications\",\"kind\":\"object\",\"isList\":true,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"JobApplication\",\"relationName\":\"AlumniToJobApplication\",\"relationFromFields\":[],\"relationToFields\":[],\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"resume\",\"kind\":\"object\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Resume\",\"relationName\":\"AlumniToResume\",\"relationFromFields\":[],\"relationToFields\":[],\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"graduations\",\"kind\":\"object\",\"isList\":true,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Graduation\",\"relationName\":\"AlumniToGraduation\",\"relationFromFields\":[],\"relationToFields\":[],\"isGenerated\":false,\"isUpdatedAt\":false}],\"primaryKey\":null,\"uniqueFields\":[],\"uniqueIndexes\":[],\"isGenerated\":false},\"Session\":{\"dbName\":null,\"fields\":[{\"name\":\"id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":true,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"sid\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":true,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"data\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"expiresAt\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"DateTime\",\"isGenerated\":false,\"isUpdatedAt\":false}],\"primaryKey\":null,\"uniqueFields\":[],\"uniqueIndexes\":[],\"isGenerated\":false},\"Graduation\":{\"dbName\":null,\"fields\":[{\"name\":\"career\",\"kind\":\"object\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Career\",\"relationName\":\"CareerToGraduation\",\"relationFromFields\":[\"careerName\"],\"relationToFields\":[\"name\"],\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"careerName\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":true,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"alumni\",\"kind\":\"object\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Alumni\",\"relationName\":\"AlumniToGraduation\",\"relationFromFields\":[\"alumniEmail\"],\"relationToFields\":[\"email\"],\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"alumniEmail\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":true,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"graduationDate\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"DateTime\",\"isGenerated\":false,\"isUpdatedAt\":false}],\"primaryKey\":{\"name\":null,\"fields\":[\"careerName\",\"alumniEmail\"]},\"uniqueFields\":[],\"uniqueIndexes\":[],\"isGenerated\":false},\"JobApplication\":{\"dbName\":null,\"fields\":[{\"name\":\"jobOffer\",\"kind\":\"object\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"JobOffer\",\"relationName\":\"JobApplicationToJobOffer\",\"relationFromFields\":[\"jobOfferId\"],\"relationToFields\":[\"id\"],\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"jobOfferId\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":true,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"alumniWhoApplied\",\"kind\":\"object\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Alumni\",\"relationName\":\"AlumniToJobApplication\",\"relationFromFields\":[\"alumniWhoAppliedEmail\"],\"relationToFields\":[\"email\"],\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"alumniWhoAppliedEmail\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":true,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"applicationTimestamp\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"DateTime\",\"isGenerated\":false,\"isUpdatedAt\":false}],\"primaryKey\":{\"name\":null,\"fields\":[\"jobOfferId\",\"alumniWhoAppliedEmail\"]},\"uniqueFields\":[],\"uniqueIndexes\":[],\"isGenerated\":false},\"Resume\":{\"dbName\":null,\"fields\":[{\"name\":\"owner\",\"kind\":\"object\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Alumni\",\"relationName\":\"AlumniToResume\",\"relationFromFields\":[\"ownerEmail\"],\"relationToFields\":[\"email\"],\"relationOnDelete\":\"Cascade\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"ownerEmail\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":true,\"isReadOnly\":true,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"numberOfDownloads\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"Int\",\"default\":0,\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"isVisible\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"Boolean\",\"default\":false,\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"visibleSince\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"DateTime\",\"default\":{\"name\":\"now\",\"args\":[]},\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"aboutMe\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"knownLanguages\",\"kind\":\"object\",\"isList\":true,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"ResumeLanguage\",\"relationName\":\"ResumeToResumeLanguage\",\"relationFromFields\":[],\"relationToFields\":[],\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"portfolio\",\"kind\":\"object\",\"isList\":true,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"PortfolioItem\",\"relationName\":\"PortfolioItemToResume\",\"relationFromFields\":[],\"relationToFields\":[],\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"higherEducationStudies\",\"kind\":\"object\",\"isList\":true,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"HigherEducationStudy\",\"relationName\":\"HigherEducationStudyToResume\",\"relationFromFields\":[],\"relationToFields\":[],\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"technicalSkills\",\"kind\":\"object\",\"isList\":true,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"ResumeTechnicalSkill\",\"relationName\":\"ResumeToResumeTechnicalSkill\",\"relationFromFields\":[],\"relationToFields\":[],\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"softSkills\",\"kind\":\"object\",\"isList\":true,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"ResumeSoftSkill\",\"relationName\":\"ResumeToResumeSoftSkill\",\"relationFromFields\":[],\"relationToFields\":[],\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"ciapCourses\",\"kind\":\"object\",\"isList\":true,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"ResumeCiapCourse\",\"relationName\":\"ResumeToResumeCiapCourse\",\"relationFromFields\":[],\"relationToFields\":[],\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"positionsOfInterest\",\"kind\":\"object\",\"isList\":true,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"PositionOfInterest\",\"relationName\":\"PositionOfInterestToResume\",\"relationFromFields\":[],\"relationToFields\":[],\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"industriesOfInterest\",\"kind\":\"object\",\"isList\":true,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"IndustryOfInterest\",\"relationName\":\"IndustryOfInterestToResume\",\"relationFromFields\":[],\"relationToFields\":[],\"isGenerated\":false,\"isUpdatedAt\":false}],\"primaryKey\":null,\"uniqueFields\":[],\"uniqueIndexes\":[],\"isGenerated\":false},\"CiapCourse\":{\"dbName\":null,\"fields\":[{\"name\":\"id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":true,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"String\",\"default\":{\"name\":\"uuid\",\"args\":[]},\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"name\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"date\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"DateTime\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"resumesListingThis\",\"kind\":\"object\",\"isList\":true,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"ResumeCiapCourse\",\"relationName\":\"CiapCourseToResumeCiapCourse\",\"relationFromFields\":[],\"relationToFields\":[],\"isGenerated\":false,\"isUpdatedAt\":false}],\"primaryKey\":null,\"uniqueFields\":[[\"name\",\"date\"]],\"uniqueIndexes\":[{\"name\":null,\"fields\":[\"name\",\"date\"]}],\"isGenerated\":false},\"ResumeCiapCourse\":{\"dbName\":null,\"fields\":[{\"name\":\"resume\",\"kind\":\"object\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Resume\",\"relationName\":\"ResumeToResumeCiapCourse\",\"relationFromFields\":[\"resumeOwnerEmail\"],\"relationToFields\":[\"ownerEmail\"],\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"resumeOwnerEmail\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":true,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"course\",\"kind\":\"object\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"CiapCourse\",\"relationName\":\"CiapCourseToResumeCiapCourse\",\"relationFromFields\":[\"courseId\"],\"relationToFields\":[\"id\"],\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"courseId\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":true,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"isVisible\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Boolean\",\"isGenerated\":false,\"isUpdatedAt\":false}],\"primaryKey\":{\"name\":null,\"fields\":[\"resumeOwnerEmail\",\"courseId\"]},\"uniqueFields\":[],\"uniqueIndexes\":[],\"isGenerated\":false},\"SoftSkill\":{\"dbName\":null,\"fields\":[{\"name\":\"name\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":true,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"resumesListingThis\",\"kind\":\"object\",\"isList\":true,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"ResumeSoftSkill\",\"relationName\":\"ResumeSoftSkillToSoftSkill\",\"relationFromFields\":[],\"relationToFields\":[],\"isGenerated\":false,\"isUpdatedAt\":false}],\"primaryKey\":null,\"uniqueFields\":[],\"uniqueIndexes\":[],\"isGenerated\":false},\"ResumeSoftSkill\":{\"dbName\":null,\"fields\":[{\"name\":\"resume\",\"kind\":\"object\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Resume\",\"relationName\":\"ResumeToResumeSoftSkill\",\"relationFromFields\":[\"resumeOwnerEmail\"],\"relationToFields\":[\"ownerEmail\"],\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"resumeOwnerEmail\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":true,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"skill\",\"kind\":\"object\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"SoftSkill\",\"relationName\":\"ResumeSoftSkillToSoftSkill\",\"relationFromFields\":[\"skillName\"],\"relationToFields\":[\"name\"],\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"skillName\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":true,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"isVisible\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Boolean\",\"isGenerated\":false,\"isUpdatedAt\":false}],\"primaryKey\":{\"name\":null,\"fields\":[\"resumeOwnerEmail\",\"skillName\"]},\"uniqueFields\":[],\"uniqueIndexes\":[],\"isGenerated\":false},\"SkillCategory\":{\"dbName\":null,\"fields\":[{\"name\":\"name\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":true,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"technicalSkills\",\"kind\":\"object\",\"isList\":true,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"TechnicalSkill\",\"relationName\":\"SkillCategoryToTechnicalSkill\",\"relationFromFields\":[],\"relationToFields\":[],\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"relatedCareers\",\"kind\":\"object\",\"isList\":true,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Career\",\"relationName\":\"CareerToSkillCategory\",\"relationFromFields\":[],\"relationToFields\":[],\"isGenerated\":false,\"isUpdatedAt\":false}],\"primaryKey\":null,\"uniqueFields\":[],\"uniqueIndexes\":[],\"isGenerated\":false},\"TechnicalSkill\":{\"dbName\":null,\"fields\":[{\"name\":\"name\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"category\",\"kind\":\"object\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"SkillCategory\",\"relationName\":\"SkillCategoryToTechnicalSkill\",\"relationFromFields\":[\"categoryName\"],\"relationToFields\":[\"name\"],\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"categoryName\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":true,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"resumesListingThis\",\"kind\":\"object\",\"isList\":true,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"ResumeTechnicalSkill\",\"relationName\":\"ResumeTechnicalSkillToTechnicalSkill\",\"relationFromFields\":[],\"relationToFields\":[],\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"jobOffersListingThis\",\"kind\":\"object\",\"isList\":true,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"JobOfferTechnicalSkill\",\"relationName\":\"JobOfferTechnicalSkillToTechnicalSkill\",\"relationFromFields\":[],\"relationToFields\":[],\"isGenerated\":false,\"isUpdatedAt\":false}],\"primaryKey\":{\"name\":null,\"fields\":[\"name\",\"categoryName\"]},\"uniqueFields\":[],\"uniqueIndexes\":[],\"isGenerated\":false},\"ResumeTechnicalSkill\":{\"dbName\":null,\"fields\":[{\"name\":\"resume\",\"kind\":\"object\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Resume\",\"relationName\":\"ResumeToResumeTechnicalSkill\",\"relationFromFields\":[\"resumeOwnerEmail\"],\"relationToFields\":[\"ownerEmail\"],\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"resumeOwnerEmail\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":true,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"skill\",\"kind\":\"object\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"TechnicalSkill\",\"relationName\":\"ResumeTechnicalSkillToTechnicalSkill\",\"relationFromFields\":[\"skillName\",\"skillCategoryName\"],\"relationToFields\":[\"name\",\"categoryName\"],\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"skillName\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":true,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"skillCategoryName\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":true,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"isVisible\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Boolean\",\"isGenerated\":false,\"isUpdatedAt\":false}],\"primaryKey\":{\"name\":null,\"fields\":[\"resumeOwnerEmail\",\"skillName\",\"skillCategoryName\"]},\"uniqueFields\":[],\"uniqueIndexes\":[],\"isGenerated\":false},\"Language\":{\"dbName\":null,\"fields\":[{\"name\":\"name\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":true,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"knownBy\",\"kind\":\"object\",\"isList\":true,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"ResumeLanguage\",\"relationName\":\"LanguageToResumeLanguage\",\"relationFromFields\":[],\"relationToFields\":[],\"isGenerated\":false,\"isUpdatedAt\":false}],\"primaryKey\":null,\"uniqueFields\":[],\"uniqueIndexes\":[],\"isGenerated\":false},\"ResumeLanguage\":{\"dbName\":null,\"fields\":[{\"name\":\"resume\",\"kind\":\"object\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Resume\",\"relationName\":\"ResumeToResumeLanguage\",\"relationFromFields\":[\"resumeOwnerEmail\"],\"relationToFields\":[\"ownerEmail\"],\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"resumeOwnerEmail\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":true,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"language\",\"kind\":\"object\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Language\",\"relationName\":\"LanguageToResumeLanguage\",\"relationFromFields\":[\"languageName\"],\"relationToFields\":[\"name\"],\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"languageName\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":true,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"masteryLevel\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Int\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"isVisible\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Boolean\",\"isGenerated\":false,\"isUpdatedAt\":false}],\"primaryKey\":{\"name\":null,\"fields\":[\"resumeOwnerEmail\",\"languageName\"]},\"uniqueFields\":[],\"uniqueIndexes\":[],\"isGenerated\":false},\"PortfolioItem\":{\"dbName\":null,\"fields\":[{\"name\":\"resume\",\"kind\":\"object\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Resume\",\"relationName\":\"PortfolioItemToResume\",\"relationFromFields\":[\"resumeOwnerEmail\"],\"relationToFields\":[\"ownerEmail\"],\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"resumeOwnerEmail\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":true,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"title\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"sourceLink\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"isVisible\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Boolean\",\"isGenerated\":false,\"isUpdatedAt\":false}],\"primaryKey\":{\"name\":null,\"fields\":[\"resumeOwnerEmail\",\"title\"]},\"uniqueFields\":[],\"uniqueIndexes\":[],\"isGenerated\":false},\"HigherEducationStudy\":{\"dbName\":null,\"fields\":[{\"name\":\"resume\",\"kind\":\"object\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Resume\",\"relationName\":\"HigherEducationStudyToResume\",\"relationFromFields\":[\"resumeOwnerEmail\"],\"relationToFields\":[\"ownerEmail\"],\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"resumeOwnerEmail\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":true,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"title\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"institution\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"endDate\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"DateTime\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"isVisible\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Boolean\",\"isGenerated\":false,\"isUpdatedAt\":false}],\"primaryKey\":{\"name\":null,\"fields\":[\"resumeOwnerEmail\",\"title\"]},\"uniqueFields\":[],\"uniqueIndexes\":[],\"isGenerated\":false},\"PositionOfInterest\":{\"dbName\":null,\"fields\":[{\"name\":\"resume\",\"kind\":\"object\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Resume\",\"relationName\":\"PositionOfInterestToResume\",\"relationFromFields\":[\"resumeOwnerEmail\"],\"relationToFields\":[\"ownerEmail\"],\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"resumeOwnerEmail\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":true,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"positionName\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"isVisible\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Boolean\",\"isGenerated\":false,\"isUpdatedAt\":false}],\"primaryKey\":{\"name\":null,\"fields\":[\"resumeOwnerEmail\",\"positionName\"]},\"uniqueFields\":[],\"uniqueIndexes\":[],\"isGenerated\":false},\"IndustryOfInterest\":{\"dbName\":null,\"fields\":[{\"name\":\"resume\",\"kind\":\"object\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Resume\",\"relationName\":\"IndustryOfInterestToResume\",\"relationFromFields\":[\"resumeOwnerEmail\"],\"relationToFields\":[\"ownerEmail\"],\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"resumeOwnerEmail\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":true,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"industryName\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"isVisible\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Boolean\",\"isGenerated\":false,\"isUpdatedAt\":false}],\"primaryKey\":{\"name\":null,\"fields\":[\"resumeOwnerEmail\",\"industryName\"]},\"uniqueFields\":[],\"uniqueIndexes\":[],\"isGenerated\":false}},\"enums\":{\"Role\":{\"values\":[{\"name\":\"ADMIN\",\"dbName\":null},{\"name\":\"ALUMNI\",\"dbName\":null}],\"dbName\":null}},\"types\":{}}")
defineDmmfProperty(exports.Prisma, config.runtimeDataModel)
config.getQueryEngineWasmModule = undefined

config.injectableEdgeEnv = () => ({
  parsed: {
    UALUMNI_DATABASE_URL: typeof globalThis !== 'undefined' && globalThis['UALUMNI_DATABASE_URL'] || typeof process !== 'undefined' && process.env && process.env.UALUMNI_DATABASE_URL || undefined
  }
})

if (typeof globalThis !== 'undefined' && globalThis['DEBUG'] || typeof process !== 'undefined' && process.env && process.env.DEBUG || undefined) {
  Debug.enable(typeof globalThis !== 'undefined' && globalThis['DEBUG'] || typeof process !== 'undefined' && process.env && process.env.DEBUG || undefined)
}

const PrismaClient = getPrismaClient(config)
exports.PrismaClient = PrismaClient
Object.assign(exports, Prisma)

