import { Injectable } from '@nestjs/common';
import { CreateAlumniDto } from './dto/create-alumni.dto';
import { UpdateAlumniDto } from './dto/update-alumni.dto';
import { Prisma as PrismaUalumni } from 'prisma/ualumni/client';
import { Prisma as PrismaUcab } from 'prisma/ucab/client';
import {
  AlreadyExistsError,
  ForeignKeyError,
  NotFoundError,
  UnexpectedError,
} from 'src/common/errors/service.error';
import { RandomPage } from 'src/common/interfaces/random-page.interface';
import * as bcrypt from 'bcrypt';
import { Alumni } from './alumni.type';
import { Cron, CronExpression } from '@nestjs/schedule';
import { UalumniDbService } from 'src/ualumni-db/ualumni-db.service';
import { UcabDbService } from 'src/ucab-db/ucab-db.service';
import { AlumniFilterParamsDto } from './dto/alumni-filter-params.dto';
import { AlumniWithResume } from './alumni-with-resume.type';
import { RandomPaginationParamsDto } from 'src/common/dto/random-pagination-params.dto';

@Injectable()
export class AlumniService {
  constructor(
    private ualumniDbService: UalumniDbService,
    private ucabDbService: UcabDbService,
  ) {}

  public async findUcabDbAlumni(email: string) {
    return await this.ucabDbService.student.findUnique({
      where: {
        email: email,
        enrolledCareers: {
          some: {
            status: 'FINISHED',
          },
        },
      },
      include: {
        enrolledCareers: {
          where: {
            status: 'FINISHED',
          },
        },
      },
    });
  }

  @Cron(CronExpression.EVERY_12_HOURS)
  async synchronize() {
    try {
      // Get ualumni alumni
      const allUalumni = await this.ualumniDbService.alumni.findMany({
        include: {
          associatedUser: {
            select: {
              email: true,
            },
          },
          graduations: true,
        },
      });

      // Compare with ucab alumni
      for (let ualumniDbAlumni of allUalumni) {
        const ucabDbAlumni = (await this.findUcabDbAlumni(
          ualumniDbAlumni.associatedUser.email,
        ))!;
        for (let ucabDbCareer of ucabDbAlumni.enrolledCareers) {
          // Create graduation if not exists
          const ualumniDbCareer = ualumniDbAlumni.graduations.find(
            (ualumniDbCareer) =>
              ualumniDbCareer.careerName === ucabDbCareer.careerName,
          );

          if (!ualumniDbCareer) {
            await this.ualumniDbService.graduation.create({
              data: {
                alumniId: ualumniDbAlumni.id,
                careerName: ucabDbCareer.careerName,
                graduationDate: ucabDbCareer.graduationDate
                  ? ucabDbCareer.graduationDate
                  : new Date().toISOString(),
              },
            });
          }
        }
      }
    } catch (error) {
      if (error instanceof PrismaUalumni.PrismaClientKnownRequestError) {
        if (error.code === 'P2003') {
          throw new ForeignKeyError(
            `Cannot update. There is no career in UalumniDB with the given \`careerName\``,
            { cause: error },
          );
        }
      }
      throw new UnexpectedError('An unexpected situation ocurred', {
        cause: error,
      });
    }
  }

  async create(createAlumniDto: CreateAlumniDto): Promise<Alumni> {
    const ucabDbAlumni = await this.findUcabDbAlumni(createAlumniDto.email);
    if (!ucabDbAlumni) {
      throw new NotFoundError(
        `The given email (${createAlumniDto.email}) doesn't belong to an UCAB alumni`,
      );
    }

    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(createAlumniDto.password, salt);

    try {
      const createdAlumni = await this.ualumniDbService.$transaction(
        async (tx) => {
          const createdAlumni = await tx.alumni.create({
            data: {
              birthDate: ucabDbAlumni.birthDate,
              address: ucabDbAlumni.address,
              associatedUser: {
                create: {
                  email: createAlumniDto.email,
                  names: ucabDbAlumni.names,
                  surnames: ucabDbAlumni.surnames,
                  password: hashedPassword,
                  role: 'ALUMNI',
                },
              },
              resume: {
                create: {},
              },
            },
          });

          await Promise.all(
            ucabDbAlumni.enrolledCareers.map((career) =>
              tx.graduation.create({
                data: {
                  alumniId: createdAlumni.id,
                  careerName: career.careerName,
                  graduationDate: career.graduationDate!,
                },
              }),
            ),
          );

          return await tx.alumni.findUniqueOrThrow({
            where: { id: createdAlumni.id },
            include: {
              associatedUser: {
                select: {
                  email: true,
                  names: true,
                  surnames: true,
                  password: true,
                },
              },
              graduations: {
                select: {
                  careerName: true,
                  graduationDate: true,
                },
              },
            },
          });
        },
      );

      const { associatedUser: userProps, ...rest } = createdAlumni;
      return { ...userProps, ...rest };
    } catch (error) {
      if (error instanceof PrismaUalumni.PrismaClientKnownRequestError) {
        if (error.code === 'P2002') {
          throw new AlreadyExistsError(
            `There already exists an alumni with the given \`email\` (${createAlumniDto.email})`,
            { cause: error },
          );
        }
      }
      throw new UnexpectedError('An unexpected situation ocurred', {
        cause: error,
      });
    }
  }

  async findPageRandomly(
    { pageNumber, itemsPerPage, randomizationSeed }: RandomPaginationParamsDto,
    {
      alumniName,
      careersNames,
      positionsOfInterest,
      skills,
      industriesOfInterest,
      skillCategories,
    }: AlumniFilterParamsDto,
  ): Promise<RandomPage<Alumni>> {
    randomizationSeed ??= Math.random();

    try {
      let [_, __, filteredAlumni] = await this.ualumniDbService.$transaction([
        this.ualumniDbService.$queryRaw`
          CREATE EXTENSION IF NOT EXISTS unaccent
        `,
        this.ualumniDbService.$queryRaw`
          SELECT 0
          FROM (
            SELECT setseed(${randomizationSeed})
          ) AS randomization_seed
        `,
        this.ualumniDbService.$queryRaw<{ id: string; totalCount: number }[]>`
          WITH filtered_by_visibility AS (
            SELECT a."id", u."names", u."surnames", g."careerName", p."positionName", i."industryName", rt."skillName", rt."skillCategoryName"
            FROM "User" u INNER JOIN "Alumni" a USING("id")
            LEFT JOIN "Resume" r ON a."id" = r."ownerId"
            LEFT JOIN "PositionOfInterest" p ON r."ownerId" = p."resumeOwnerId"
            LEFT JOIN "IndustryOfInterest" i ON r."ownerId" = i."resumeOwnerId"
            LEFT JOIN "ResumeTechnicalSkill" rt ON r."ownerId" = rt."resumeOwnerId"
            LEFT JOIN "Graduation" g ON a."id" = g."alumniId"
            WHERE r."isVisible" = TRUE
              ${
                positionsOfInterest
                  ? PrismaUalumni.sql`AND p."isVisible" = TRUE`
                  : PrismaUalumni.empty
              }
              ${
                industriesOfInterest
                  ? PrismaUalumni.sql`AND i."isVisible" = TRUE`
                  : PrismaUalumni.empty
              }
              ${
                skills
                  ? PrismaUalumni.sql`AND rt."isVisible" = TRUE`
                  : PrismaUalumni.empty
              }
          ), filtered_by_name AS (
            SELECT "id", "careerName", "positionName", "industryName", "skillName", "skillCategoryName"
	          FROM filtered_by_visibility
            WHERE CONCAT(unaccent("names"), ' ', unaccent("surnames")) ILIKE unaccent(${
              alumniName ? `%${alumniName.replaceAll(' ', '%')}%` : '%'
            })
          ), filtered_by_career AS (
            SELECT "id", "positionName", "industryName", "skillName", "skillCategoryName"
            FROM filtered_by_name
	          ${
              careersNames
                ? PrismaUalumni.sql`
                    WHERE "careerName" IN (${PrismaUalumni.join(careersNames)})`
                : PrismaUalumni.empty
            }
            GROUP BY "id", "positionName", "industryName", "skillName", "skillCategoryName"
            ${
              careersNames
                ? PrismaUalumni.sql`
                    HAVING COUNT(*) = ${careersNames.length}`
                : PrismaUalumni.empty
            }
          ), filtered_by_position AS (
            SELECT "id", "industryName", "skillName", "skillCategoryName"
            FROM filtered_by_career
            ${
              positionsOfInterest
                ? PrismaUalumni.sql`
                    WHERE "positionName" IN (${PrismaUalumni.join(
                      positionsOfInterest,
                    )})`
                : PrismaUalumni.empty
            }
            GROUP BY "id", "industryName", "skillName", "skillCategoryName"
            ${
              positionsOfInterest
                ? PrismaUalumni.sql`
                    HAVING COUNT(*) = ${positionsOfInterest.length}`
                : PrismaUalumni.empty
            }
          ), filtered_by_industry AS (
            SELECT "id", "skillName", "skillCategoryName"
            FROM filtered_by_position
            ${
              industriesOfInterest
                ? PrismaUalumni.sql`
                    WHERE "industryName" IN (${PrismaUalumni.join(
                      industriesOfInterest,
                    )})`
                : PrismaUalumni.empty
            }
            GROUP BY "id", "skillName", "skillCategoryName"
            ${
              industriesOfInterest
                ? PrismaUalumni.sql`
                    HAVING COUNT(*) = ${industriesOfInterest.length}`
                : PrismaUalumni.empty
            }
          ), filtered_by_skill_categories AS (
            SELECT "id"
            FROM filtered_by_industry
            GROUP BY "id"
            ${
              skillCategories
                ? PrismaUalumni.sql`
                    HAVING ${PrismaUalumni.join(
                      skillCategories.map((skillCategory) => {
                        return PrismaUalumni.sql`bool_or("skillCategoryName" ILIKE ${skillCategory})`;
                      }),
                      ' AND ',
                    )}`
                : PrismaUalumni.empty
            }
          ), 
          filtered_by_skills AS (
            SELECT "id"
            FROM filtered_by_industry
            WHERE "id" IN (SELECT "id" FROM filtered_by_skill_categories)
            GROUP BY "id"
            ${
              skills
                ? PrismaUalumni.sql`
                    HAVING ${PrismaUalumni.join(
                      skills.map(({ categoryName, skillName }) => {
                        return PrismaUalumni.sql`bool_or("skillCategoryName" ILIKE ${categoryName} AND "skillName" ILIKE ${skillName})`;
                      }),
                      ' AND ',
                    )}`
                : PrismaUalumni.empty
            }
          ),filtered_total_count AS (
            SELECT COUNT("id") AS "totalCount"
            FROM filtered_by_skills
          )
         
          SELECT "id", "totalCount"
          FROM filtered_by_skills, filtered_total_count
          GROUP BY "id", "totalCount"
          ORDER BY random()
          LIMIT ${itemsPerPage}
          OFFSET ${itemsPerPage * (pageNumber - 1)}
        `,
      ]);
      const stringTotalCount = filteredAlumni[0]
        ? filteredAlumni[0].totalCount.toString()
        : '0n';
      const numberOfItems = Number(stringTotalCount.replace('n', ''));

      const result = await this.ualumniDbService.alumni.findMany({
        where: {
          id: {
            in: filteredAlumni.map((alumni) => alumni.id),
          },
        },
        include: {
          associatedUser: {
            select: {
              email: true,
              password: true,
              names: true,
              surnames: true,
            },
          },
          graduations: {
            select: {
              careerName: true,
              graduationDate: true,
            },
          },
        },
      });

      return {
        items: result.map(({ associatedUser, ...alumniProps }) => ({
          ...associatedUser,
          ...alumniProps,
        })),
        meta: {
          pageNumber,
          itemsPerPage,
          numberOfItems,
          numberOfPages: Math.ceil(numberOfItems / itemsPerPage),
          randomizationSeed,
        },
      };
    } catch (error) {
      throw new UnexpectedError('An unexpected situation ocurred', {
        cause: error,
      });
    }
  }

  async findPageWithResumeRandomly(
    { pageNumber, itemsPerPage, randomizationSeed }: RandomPaginationParamsDto,
    {
      alumniName,
      careersNames,
      positionsOfInterest,
      skills,
      industriesOfInterest,
      skillCategories,
    }: AlumniFilterParamsDto,
  ): Promise<RandomPage<AlumniWithResume>> {
    randomizationSeed ??= Math.random();
    try {
      let [_, __, filteredAlumni] = await this.ualumniDbService.$transaction([
        this.ualumniDbService.$queryRaw`
          CREATE EXTENSION IF NOT EXISTS unaccent
        `,
        this.ualumniDbService.$queryRaw`
          SELECT 0
          FROM (
            SELECT setseed(${randomizationSeed})
          ) AS randomization_seed
        `,
        this.ualumniDbService.$queryRaw<{ id: string; totalCount: number }[]>`
          WITH filtered_by_visibility AS (
            SELECT a."id", u."names", u."surnames", g."careerName", p."positionName", i."industryName", rt."skillName", rt."skillCategoryName"
            FROM "User" u INNER JOIN "Alumni" a USING("id")
            LEFT JOIN "Resume" r ON a."id" = r."ownerId"
            LEFT JOIN "PositionOfInterest" p ON r."ownerId" = p."resumeOwnerId"
            LEFT JOIN "IndustryOfInterest" i ON r."ownerId" = i."resumeOwnerId"
            LEFT JOIN "ResumeTechnicalSkill" rt ON r."ownerId" = rt."resumeOwnerId"
            LEFT JOIN "Graduation" g ON a."id" = g."alumniId"
            WHERE r."isVisible" = TRUE
              ${
                positionsOfInterest
                  ? PrismaUalumni.sql`AND p."isVisible" = TRUE`
                  : PrismaUalumni.empty
              }
              ${
                industriesOfInterest
                  ? PrismaUalumni.sql`AND i."isVisible" = TRUE`
                  : PrismaUalumni.empty
              }
              ${
                skills
                  ? PrismaUalumni.sql`AND rt."isVisible" = TRUE`
                  : PrismaUalumni.empty
              }
          ), filtered_by_name AS (
            SELECT "id", "careerName", "positionName", "industryName", "skillName", "skillCategoryName"
	          FROM filtered_by_visibility
            WHERE CONCAT(unaccent("names"), ' ', unaccent("surnames")) ILIKE unaccent(${
              alumniName ? `%${alumniName.replaceAll(' ', '%')}%` : '%'
            })
          ), filtered_by_career AS (
            SELECT "id", "positionName", "industryName", "skillName", "skillCategoryName"
            FROM filtered_by_name
	          ${
              careersNames
                ? PrismaUalumni.sql`
                    WHERE "careerName" IN (${PrismaUalumni.join(careersNames)})`
                : PrismaUalumni.empty
            }
            GROUP BY "id", "positionName", "industryName", "skillName", "skillCategoryName"
            ${
              careersNames
                ? PrismaUalumni.sql`
                    HAVING COUNT(*) = ${careersNames.length}`
                : PrismaUalumni.empty
            }
          ), filtered_by_position AS (
            SELECT "id", "industryName", "skillName", "skillCategoryName"
            FROM filtered_by_career
            ${
              positionsOfInterest
                ? PrismaUalumni.sql`
                    WHERE "positionName" IN (${PrismaUalumni.join(
                      positionsOfInterest,
                    )})`
                : PrismaUalumni.empty
            }
            GROUP BY "id", "industryName", "skillName", "skillCategoryName"
            ${
              positionsOfInterest
                ? PrismaUalumni.sql`
                    HAVING COUNT(*) = ${positionsOfInterest.length}`
                : PrismaUalumni.empty
            }
          ), filtered_by_industry AS (
            SELECT "id", "skillName", "skillCategoryName"
            FROM filtered_by_position
            ${
              industriesOfInterest
                ? PrismaUalumni.sql`
                    WHERE "industryName" IN (${PrismaUalumni.join(
                      industriesOfInterest,
                    )})`
                : PrismaUalumni.empty
            }
            GROUP BY "id", "skillName", "skillCategoryName"
            ${
              industriesOfInterest
                ? PrismaUalumni.sql`
                    HAVING COUNT(*) = ${industriesOfInterest.length}`
                : PrismaUalumni.empty
            }
          ), filtered_by_skill_categories AS (
            SELECT "id"
            FROM filtered_by_industry
            GROUP BY "id"
            ${
              skillCategories
                ? PrismaUalumni.sql`
                    HAVING ${PrismaUalumni.join(
                      skillCategories.map((skillCategory) => {
                        return PrismaUalumni.sql`bool_or("skillCategoryName" ILIKE ${skillCategory})`;
                      }),
                      ' AND ',
                    )}`
                : PrismaUalumni.empty
            }
          ), 
          filtered_by_skills AS (
            SELECT "id"
            FROM filtered_by_industry
            WHERE "id" IN (SELECT "id" FROM filtered_by_skill_categories)
            GROUP BY "id"
            ${
              skills
                ? PrismaUalumni.sql`
                    HAVING ${PrismaUalumni.join(
                      skills.map(({ categoryName, skillName }) => {
                        return PrismaUalumni.sql`bool_or("skillCategoryName" ILIKE ${categoryName} AND "skillName" ILIKE ${skillName})`;
                      }),
                      ' AND ',
                    )}`
                : PrismaUalumni.empty
            }
          ),filtered_total_count AS (
            SELECT COUNT("id") AS "totalCount"
            FROM filtered_by_skills
        
          )
         
          SELECT "id", "totalCount"
          FROM filtered_by_skills, filtered_total_count
          GROUP BY "id", "totalCount"
          ORDER BY random()
          LIMIT ${itemsPerPage}
          OFFSET ${itemsPerPage * (pageNumber - 1)}
        `,
      ]);
      const stringTotalCount = filteredAlumni[0]
        ? filteredAlumni[0].totalCount.toString()
        : '0n';
      const numberOfItems = Number(stringTotalCount.replace('n', ''));

      const resumesPromises = filteredAlumni.map(({ id }) => {
        return this.ualumniDbService.resume.findUniqueOrThrow({
          where: { ownerId: id },
          select: {
            reminderSent: true,
            numberOfDownloads: true,
            isVisible: true,
            visibleSince: true,
            aboutMe: true,
            ciapCourses: {
              where: { isVisible: true },
              select: {
                course: {
                  select: {
                    id: true,
                    name: true,
                    date: true,
                  },
                },
                isVisible: true,
              },
            },
            knownLanguages: {
              where: { isVisible: true },
              select: {
                languageName: true,
                masteryLevel: true,
                isVisible: true,
              },
            },
            technicalSkills: {
              where: { isVisible: true },
              select: {
                skillName: true,
                skillCategoryName: true,
                isVisible: true,
              },
            },
            higherEducationStudies: {
              where: { isVisible: true },
              select: {
                title: true,
                institution: true,
                endDate: true,
                isVisible: true,
              },
            },
            industriesOfInterest: {
              where: { isVisible: true },
              select: {
                industryName: true,
                isVisible: true,
              },
            },
            portfolio: {
              where: { isVisible: true },
              select: {
                title: true,
                isVisible: true,
                sourceLink: true,
              },
            },
            positionsOfInterest: {
              where: { isVisible: true },
              select: {
                positionName: true,
                isVisible: true,
              },
            },
            softSkills: {
              where: { isVisible: true },
              select: {
                skillName: true,
                isVisible: true,
              },
            },
            workExperiences: {
              where: { isVisible: true },
              select: {
                number: true,
                companyName: true,
                description: true,
                position: true,
                startDate: true,
                endDate: true,
                isVisible: true,
              },
            },
            owner: {
              include: {
                graduations: {
                  select: {
                    careerName: true,
                    graduationDate: true,
                  },
                },
                associatedUser: {
                  select: {
                    email: true,
                    password: true,
                    names: true,
                    surnames: true,
                  },
                },
              },
            },
          },
        });
      });

      const resumes = await Promise.all(resumesPromises);

      const items: AlumniWithResume[] = resumes.map((resume) => {
        return {
          id: resume.owner.id,
          email: resume.owner.associatedUser.email,
          names: resume.owner.associatedUser.names,
          surnames: resume.owner.associatedUser.surnames,
          password: resume.owner.associatedUser.password,
          birthDate: resume.owner.birthDate,
          address: resume.owner.address,
          graduations: resume.owner.graduations,
          resume: {
            reminderSent: resume.reminderSent,
            aboutMe: resume.aboutMe,
            numberOfDownloads: resume.numberOfDownloads,
            isVisible: resume.isVisible,
            visibleSince: resume.visibleSince,
            ciapCourses: resume.ciapCourses.map((ciapCourse) => {
              return {
                id: ciapCourse.course.id,
                name: ciapCourse.course.name,
                date: ciapCourse.course.date,
                isVisible: ciapCourse.isVisible,
              };
            }),
            knownLanguages: resume.knownLanguages,
            technicalSkills: resume.technicalSkills,
            higherEducationStudies: resume.higherEducationStudies,
            industriesOfInterest: resume.industriesOfInterest,
            portfolio: resume.portfolio,
            positionsOfInterest: resume.positionsOfInterest,
            softSkills: resume.softSkills,
            workExperiences: resume.workExperiences,
          },
        };
      });

      return {
        items,
        meta: {
          pageNumber,
          itemsPerPage,
          numberOfItems,
          numberOfPages: Math.ceil(numberOfItems / itemsPerPage),
          randomizationSeed,
        },
      };
    } catch (error) {
      console.log(error);
      throw new UnexpectedError('An unexpected situation ocurred', {
        cause: error,
      });
    }
  }

  async findOneWithResume(id: string): Promise<AlumniWithResume | null> {
    try {
      const resume = await this.ualumniDbService.resume.findUnique({
        where: { ownerId: id },
        select: {
          reminderSent: true,
          numberOfDownloads: true,
          isVisible: true,
          visibleSince: true,
          aboutMe: true,
          ciapCourses: {
            select: {
              course: {
                select: {
                  id: true,
                  name: true,
                  date: true,
                },
              },
              isVisible: true,
            },
          },
          knownLanguages: {
            select: {
              languageName: true,
              masteryLevel: true,
              isVisible: true,
            },
          },
          technicalSkills: {
            select: {
              skillName: true,
              skillCategoryName: true,
              isVisible: true,
            },
          },
          higherEducationStudies: {
            select: {
              title: true,
              institution: true,
              endDate: true,
              isVisible: true,
            },
          },
          industriesOfInterest: {
            select: {
              industryName: true,
              isVisible: true,
            },
          },
          portfolio: {
            select: {
              title: true,
              isVisible: true,
              sourceLink: true,
            },
          },
          positionsOfInterest: {
            select: {
              positionName: true,
              isVisible: true,
            },
          },
          softSkills: {
            select: {
              skillName: true,
              isVisible: true,
            },
          },
          workExperiences: {
            select: {
              number: true,
              companyName: true,
              description: true,
              position: true,
              startDate: true,
              endDate: true,
              isVisible: true,
            },
          },
          owner: {
            include: {
              graduations: {
                select: {
                  careerName: true,
                  graduationDate: true,
                },
              },
              associatedUser: {
                select: {
                  email: true,
                  password: true,
                  names: true,
                  surnames: true,
                },
              },
            },
          },
        },
      });

      return resume
        ? {
            id: resume.owner.id,
            email: resume.owner.associatedUser.email,
            names: resume.owner.associatedUser.names,
            surnames: resume.owner.associatedUser.surnames,
            password: resume.owner.associatedUser.password,
            birthDate: resume.owner.birthDate,
            address: resume.owner.address,
            graduations: resume.owner.graduations,
            resume: {
              reminderSent: resume.reminderSent,
              aboutMe: resume.aboutMe,
              numberOfDownloads: resume.numberOfDownloads,
              isVisible: resume.isVisible,
              visibleSince: resume.visibleSince,
              ciapCourses: resume.ciapCourses.map((ciapCourse) => {
                return {
                  id: ciapCourse.course.id,
                  name: ciapCourse.course.name,
                  date: ciapCourse.course.date,
                  isVisible: ciapCourse.isVisible,
                };
              }),
              knownLanguages: resume.knownLanguages,
              technicalSkills: resume.technicalSkills,
              higherEducationStudies: resume.higherEducationStudies,
              industriesOfInterest: resume.industriesOfInterest,
              portfolio: resume.portfolio,
              positionsOfInterest: resume.positionsOfInterest,
              softSkills: resume.softSkills,
              workExperiences: resume.workExperiences,
            },
          }
        : null;
    } catch (error) {
      throw new UnexpectedError('An unexpected situation ocurred', {
        cause: error,
      });
    }
  }

  async findOneWithResumeOnlyVisibles(
    id: string,
  ): Promise<AlumniWithResume | null> {
    try {
      const resume = await this.ualumniDbService.resume.findUnique({
        where: { ownerId: id },
        select: {
          reminderSent: true,
          numberOfDownloads: true,
          isVisible: true,
          visibleSince: true,
          aboutMe: true,
          ciapCourses: {
            where: { isVisible: true },
            select: {
              course: {
                select: {
                  id: true,
                  name: true,
                  date: true,
                },
              },
              isVisible: true,
            },
          },
          knownLanguages: {
            where: { isVisible: true },
            select: {
              languageName: true,
              masteryLevel: true,
              isVisible: true,
            },
          },
          technicalSkills: {
            where: { isVisible: true },
            select: {
              skillName: true,
              skillCategoryName: true,
              isVisible: true,
            },
          },
          higherEducationStudies: {
            where: { isVisible: true },
            select: {
              title: true,
              institution: true,
              endDate: true,
              isVisible: true,
            },
          },
          industriesOfInterest: {
            where: { isVisible: true },
            select: {
              industryName: true,
              isVisible: true,
            },
          },
          portfolio: {
            where: { isVisible: true },
            select: {
              title: true,
              isVisible: true,
              sourceLink: true,
            },
          },
          positionsOfInterest: {
            where: { isVisible: true },
            select: {
              positionName: true,
              isVisible: true,
            },
          },
          softSkills: {
            where: { isVisible: true },
            select: {
              skillName: true,
              isVisible: true,
            },
          },
          workExperiences: {
            where: { isVisible: true },
            select: {
              number: true,
              companyName: true,
              description: true,
              position: true,
              startDate: true,
              endDate: true,
              isVisible: true,
            },
          },
          owner: {
            include: {
              graduations: {
                select: {
                  careerName: true,
                  graduationDate: true,
                },
              },
              associatedUser: {
                select: {
                  email: true,
                  password: true,
                  names: true,
                  surnames: true,
                },
              },
            },
          },
        },
      });

      return resume
        ? {
            id: resume.owner.id,
            email: resume.owner.associatedUser.email,
            names: resume.owner.associatedUser.names,
            surnames: resume.owner.associatedUser.surnames,
            password: resume.owner.associatedUser.password,
            birthDate: resume.owner.birthDate,
            address: resume.owner.address,
            graduations: resume.owner.graduations,
            resume: {
              reminderSent: resume.reminderSent,
              aboutMe: resume.aboutMe,
              numberOfDownloads: resume.numberOfDownloads,
              isVisible: resume.isVisible,
              visibleSince: resume.visibleSince,
              ciapCourses: resume.ciapCourses.map((ciapCourse) => {
                return {
                  id: ciapCourse.course.id,
                  name: ciapCourse.course.name,
                  date: ciapCourse.course.date,
                  isVisible: ciapCourse.isVisible,
                };
              }),
              knownLanguages: resume.knownLanguages,
              technicalSkills: resume.technicalSkills,
              higherEducationStudies: resume.higherEducationStudies,
              industriesOfInterest: resume.industriesOfInterest,
              portfolio: resume.portfolio,
              positionsOfInterest: resume.positionsOfInterest,
              softSkills: resume.softSkills,
              workExperiences: resume.workExperiences,
            },
          }
        : null;
    } catch (error) {
      throw new UnexpectedError('An unexpected situation ocurred', {
        cause: error,
      });
    }
  }

  async findOne(id: string): Promise<Alumni | null> {
    try {
      let alumni = await this.ualumniDbService.alumni.findFirst({
        where: { id },
        include: {
          associatedUser: {
            select: {
              email: true,
              password: true,
              names: true,
              surnames: true,
            },
          },
          graduations: {
            select: {
              careerName: true,
              graduationDate: true,
            },
          },
        },
      });

      if (!alumni) {
        return null;
      }

      const { associatedUser: userProps, ...rest } = alumni;
      return { ...userProps, ...rest };
    } catch (error) {
      throw new UnexpectedError('An unexpected situation ocurred', {
        cause: error,
      });
    }
  }

  async findOneByEmail(email: string) {
    try {
      let alumni = await this.ualumniDbService.alumni.findFirst({
        where: {
          associatedUser: {
            email,
          },
        },
        include: {
          associatedUser: {
            select: {
              email: true,
              password: true,
              names: true,
              surnames: true,
            },
          },
          graduations: {
            select: {
              careerName: true,
              graduationDate: true,
            },
          },
        },
      });

      if (!alumni) {
        return null;
      }

      const { associatedUser: userProps, ...rest } = alumni;
      return { ...userProps, ...rest };
    } catch (error) {
      throw new UnexpectedError('An unexpected situation ocurred', {
        cause: error,
      });
    }
  }

  async update(id: string, updateAlumniDto: UpdateAlumniDto): Promise<Alumni> {
    try {
      let updatedAlumni = await this.ualumniDbService.alumni.update({
        where: { id },
        data: {
          address: updateAlumniDto.address,
          associatedUser: {
            update: {
              email: updateAlumniDto.email,
              password: updateAlumniDto.password,
              names: updateAlumniDto.names,
              surnames: updateAlumniDto.surnames,
            },
          },
        },
        include: {
          associatedUser: {
            select: {
              email: true,
              password: true,
              names: true,
              surnames: true,
            },
          },
          graduations: {
            select: {
              careerName: true,
              graduationDate: true,
            },
          },
        },
      });

      const { associatedUser: userProps, ...rest } = updatedAlumni;
      return { ...userProps, ...rest };
    } catch (error) {
      if (error instanceof PrismaUalumni.PrismaClientKnownRequestError) {
        if (error.code === 'P2025') {
          throw new NotFoundError(
            `There is no alumni with the given \`id\` (${id})`,
            { cause: error },
          );
        }
        if (error.code === 'P2002') {
          throw new AlreadyExistsError(
            `Cannot update the \`email\` to \`${updateAlumniDto.email}\`, there already exists an alumni with the same \`email\``,
            { cause: error },
          );
        }
      }
      throw new UnexpectedError('An unexpected situation ocurred', {
        cause: error,
      });
    }
  }

  async remove(id: string): Promise<Alumni> {
    try {
      const [removedAlumni, _] = await this.ualumniDbService.$transaction([
        this.ualumniDbService.alumni.delete({
          where: { id },
          include: {
            associatedUser: {
              select: {
                email: true,
                password: true,
                names: true,
                surnames: true,
              },
            },
            graduations: {
              select: {
                careerName: true,
                graduationDate: true,
              },
            },
          },
        }),
        this.ualumniDbService.user.delete({
          where: { id },
        }),
      ]);

      const { associatedUser: userProps, ...rest } = removedAlumni;
      return { ...userProps, ...rest };
    } catch (error) {
      if (error instanceof PrismaUalumni.PrismaClientKnownRequestError) {
        if (error.code === 'P2025') {
          throw new NotFoundError(
            `There is no alumni with the given \`id\` (${id})`,
            { cause: error },
          );
        }
      }
      throw new UnexpectedError('An unexpected situation ocurred', {
        cause: error,
      });
    }
  }
}
