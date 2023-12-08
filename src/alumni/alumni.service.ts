import { Injectable } from '@nestjs/common';
import { CreateAlumniDto } from './dto/create-alumni.dto';
import { UpdateAlumniDto } from './dto/update-alumni.dto';
import { Prisma } from 'prisma/ualumni/client';
import {
  AlreadyExistsError,
  NotFoundError,
  UnexpectedError,
} from 'src/common/errors/service.error';
import { RandomPage } from 'src/common/interfaces/random-page.interface';
import * as bcrypt from 'bcrypt';
import { Alumni } from './alumni.type';
import { AlumniDto } from './dto/alumni.dto';
import { FilterRandomPaginationParamsDto } from './dto/filter-random-pagination-params.dto';
import { UalumniDbService } from 'src/ualumni-db/ualumni-db.service';
import { UcabDbService } from 'src/ucab-db/ucab-db.service';

@Injectable()
export class AlumniService {
  constructor(
    private ualumniDbService: UalumniDbService,
    private ucabDbService: UcabDbService,
  ) {}

  private async findUcabDbAlumni(email: string) {
    try {
      return await this.ucabDbService.student.findUniqueOrThrow({
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
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === '2025') {
          throw new NotFoundError(
            `The given email (${email}) doesn't belong to an UCAB alumni`,
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
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(createAlumniDto.password, salt);

    try {
      const createdAlumni = await this.ualumniDbService.$transaction(
        async (tx) => {
          await tx.alumni.create({
            data: {
              address: ucabDbAlumni.address,
              telephoneNumber: ucabDbAlumni.telephoneNumber,
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
                  alumniEmail: createAlumniDto.email,
                  careerName: career.careerName,
                  graduationDate: career.graduationDate!,
                },
              }),
            ),
          );

          return await tx.alumni.findUniqueOrThrow({
            where: { email: createAlumniDto.email },
            include: {
              associatedUser: {
                select: {
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
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
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

  async findPageRandomly({
    pageNumber,
    itemsPerPage,
    randomizationSeed,
    alumniName,
    careersNames,
    positionsOfInterest,
    skillsNames,
    industriesOfInterest,
    skillCategories,
  }: FilterRandomPaginationParamsDto): Promise<RandomPage<Alumni>> {
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
        this.ualumniDbService.$queryRaw<
          { email: string; totalCount: number }[]
        >`
          WITH filtered_by_visibility AS (
            SELECT a."email", u."names", u."surnames", g."careerName", p."positionName", i."industryName", rt."skillName", rt."skillCategoryName"
            FROM "User" u INNER JOIN "Alumni" a USING("email")
            LEFT JOIN "Resume" r ON a."email" = r."ownerEmail"
            LEFT JOIN "PositionOfInterest" p ON r."ownerEmail" = p."resumeOwnerEmail"
            LEFT JOIN "IndustryOfInterest" i ON r."ownerEmail" = i."resumeOwnerEmail"
            LEFT JOIN "ResumeTechnicalSkill" rt ON r."ownerEmail" = rt."resumeOwnerEmail"
            LEFT JOIN "Graduation" g ON a."email" = g."alumniEmail"
            WHERE r."isVisible" = TRUE
              ${
                positionsOfInterest
                  ? Prisma.sql`AND p."isVisible" = TRUE`
                  : Prisma.empty
              }
              ${
                industriesOfInterest
                  ? Prisma.sql`AND i."isVisible" = TRUE`
                  : Prisma.empty
              }
              ${
                skillsNames
                  ? Prisma.sql`AND rt."isVisible" = TRUE`
                  : Prisma.empty
              }
          ), filtered_by_name AS (
            SELECT "email", "careerName", "positionName", "industryName", "skillName", "skillCategoryName"
	          FROM filtered_by_visibility
            WHERE CONCAT(unaccent("names"), ' ', unaccent("surnames")) ILIKE unaccent(${
              alumniName ? `%${alumniName.replaceAll(' ', '%')}%` : '%'
            })
          ), filtered_by_career AS (
            SELECT "email", "positionName", "industryName", "skillName", "skillCategoryName"
            FROM filtered_by_name
	          ${
              careersNames
                ? Prisma.sql`
                    WHERE "careerName" IN (${Prisma.join(careersNames)})`
                : Prisma.empty
            }
            GROUP BY "email", "positionName", "industryName", "skillName", "skillCategoryName"
            ${
              careersNames
                ? Prisma.sql`
                    HAVING COUNT(*) = ${careersNames.length}`
                : Prisma.empty
            }
          ), filtered_by_position AS (
            SELECT "email", "industryName", "skillName", "skillCategoryName"
            FROM filtered_by_career
            ${
              positionsOfInterest
                ? Prisma.sql`
                    WHERE "positionName" IN (${Prisma.join(
                      positionsOfInterest,
                    )})`
                : Prisma.empty
            }
            GROUP BY "email", "industryName", "skillName", "skillCategoryName"
            ${
              positionsOfInterest
                ? Prisma.sql`
                    HAVING COUNT(*) = ${positionsOfInterest.length}`
                : Prisma.empty
            }
          ), filtered_by_industry AS (
            SELECT "email", "skillName", "skillCategoryName"
            FROM filtered_by_position
            ${
              industriesOfInterest
                ? Prisma.sql`
                    WHERE "industryName" IN (${Prisma.join(
                      industriesOfInterest,
                    )})`
                : Prisma.empty
            }
            GROUP BY "email", "skillName", "skillCategoryName"
            ${
              industriesOfInterest
                ? Prisma.sql`
                    HAVING COUNT(*) = ${industriesOfInterest.length}`
                : Prisma.empty
            }
          ), filtered_by_skills AS (
            SELECT "email", "skillCategoryName"
            FROM filtered_by_industry
            ${
              skillsNames
                ? Prisma.sql`
                    WHERE "skillName" IN (${Prisma.join(skillsNames)})`
                : Prisma.empty
            }
            GROUP BY "email", "skillCategoryName"
            ${
              skillsNames
                ? Prisma.sql`
                    HAVING COUNT(*) = ${skillsNames.length}`
                : Prisma.empty
            }
          ), filtered_by_skill_categories AS (
            SELECT "email", COUNT("email") AS "filteredAlumniCount"
            FROM filtered_by_skills
            ${
              skillCategories
                ? Prisma.sql`
                    WHERE "skillCategoryName" IN (${Prisma.join(
                      skillCategories,
                    )}) `
                : Prisma.empty
            }
            GROUP BY "email"
            ${
              skillCategories
                ? Prisma.sql`
                    HAVING COUNT(*) = ${skillCategories.length}`
                : Prisma.empty
            }
          ), filtered_total_count AS (
            SELECT MAX("filteredAlumniCount") AS "totalCount"
            FROM filtered_by_skill_categories
        
          )
         
          SELECT "email", "totalCount"
          FROM filtered_by_skill_categories, filtered_total_count
          GROUP BY "email", "totalCount"
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
          email: {
            in: filteredAlumni.map((alumni) => alumni.email),
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
              graduationDate: true
            }
          }
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

  async findPageWithResumeRandomly({
    pageNumber,
    itemsPerPage,
    randomizationSeed,
    alumniName,
    careersNames,
    positionsOfInterest,
    skillsNames,
    industriesOfInterest,
    skillCategories,
  }: FilterRandomPaginationParamsDto): Promise<RandomPage<any>> {
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
        this.ualumniDbService.$queryRaw<
          { email: string; totalCount: number }[]
        >`
          WITH filtered_by_visibility AS (
            SELECT a."email", u."names", u."surnames", g."careerName", p."positionName", i."industryName", rt."skillName", rt."skillCategoryName"
            FROM "User" u INNER JOIN "Alumni" a USING("email")
            LEFT JOIN "Resume" r ON a."email" = r."ownerEmail"
            LEFT JOIN "PositionOfInterest" p ON r."ownerEmail" = p."resumeOwnerEmail"
            LEFT JOIN "IndustryOfInterest" i ON r."ownerEmail" = i."resumeOwnerEmail"
            LEFT JOIN "ResumeTechnicalSkill" rt ON r."ownerEmail" = rt."resumeOwnerEmail"
            LEFT JOIN "Graduation" g ON a."email" = g."alumniEmail"
            WHERE r."isVisible" = TRUE
              ${
                positionsOfInterest
                  ? Prisma.sql`AND p."isVisible" = TRUE`
                  : Prisma.empty
              }
              ${
                industriesOfInterest
                  ? Prisma.sql`AND i."isVisible" = TRUE`
                  : Prisma.empty
              }
              ${
                skillsNames
                  ? Prisma.sql`AND rt."isVisible" = TRUE`
                  : Prisma.empty
              }
          ), filtered_by_name AS (
            SELECT "email", "careerName", "positionName", "industryName", "skillName", "skillCategoryName"
	          FROM filtered_by_visibility
            WHERE CONCAT(unaccent("names"), ' ', unaccent("surnames")) ILIKE unaccent(${
              alumniName ? `%${alumniName.replaceAll(' ', '%')}%` : '%'
            })
          ), filtered_by_career AS (
            SELECT "email", "positionName", "industryName", "skillName", "skillCategoryName"
            FROM filtered_by_name
	          ${
              careersNames
                ? Prisma.sql`
                    WHERE "careerName" IN (${Prisma.join(careersNames)})`
                : Prisma.empty
            }
            GROUP BY "email", "positionName", "industryName", "skillName", "skillCategoryName"
            ${
              careersNames
                ? Prisma.sql`
                    HAVING COUNT(*) = ${careersNames.length}`
                : Prisma.empty
            }
          ), filtered_by_position AS (
            SELECT "email", "industryName", "skillName", "skillCategoryName"
            FROM filtered_by_career
            ${
              positionsOfInterest
                ? Prisma.sql`
                    WHERE "positionName" IN (${Prisma.join(
                      positionsOfInterest,
                    )})`
                : Prisma.empty
            }
            GROUP BY "email", "industryName", "skillName", "skillCategoryName"
            ${
              positionsOfInterest
                ? Prisma.sql`
                    HAVING COUNT(*) = ${positionsOfInterest.length}`
                : Prisma.empty
            }
          ), filtered_by_industry AS (
            SELECT "email", "skillName", "skillCategoryName"
            FROM filtered_by_position
            ${
              industriesOfInterest
                ? Prisma.sql`
                    WHERE "industryName" IN (${Prisma.join(
                      industriesOfInterest,
                    )})`
                : Prisma.empty
            }
            GROUP BY "email", "skillName", "skillCategoryName"
            ${
              industriesOfInterest
                ? Prisma.sql`
                    HAVING COUNT(*) = ${industriesOfInterest.length}`
                : Prisma.empty
            }
          ), filtered_by_skills AS (
            SELECT "email", "skillCategoryName"
            FROM filtered_by_industry
            ${
              skillsNames
                ? Prisma.sql`
                    WHERE "skillName" IN (${Prisma.join(skillsNames)})`
                : Prisma.empty
            }
            GROUP BY "email", "skillCategoryName"
            ${
              skillsNames
                ? Prisma.sql`
                    HAVING COUNT(*) = ${skillsNames.length}`
                : Prisma.empty
            }
          ), filtered_by_skill_categories AS (
            SELECT "email", COUNT("email") AS "filteredAlumniCount"
            FROM filtered_by_skills
            ${
              skillCategories
                ? Prisma.sql`
                    WHERE "skillCategoryName" IN (${Prisma.join(
                      skillCategories,
                    )}) `
                : Prisma.empty
            }
            GROUP BY "email"
            ${
              skillCategories
                ? Prisma.sql`
                    HAVING COUNT(*) = ${skillCategories.length}`
                : Prisma.empty
            }
          ), filtered_total_count AS (
            SELECT MAX("filteredAlumniCount") AS "totalCount"
            FROM filtered_by_skill_categories
        
          )
         
          SELECT "email", "totalCount"
          FROM filtered_by_skill_categories, filtered_total_count
          GROUP BY "email", "totalCount"
          ORDER BY random()
          LIMIT ${itemsPerPage}
          OFFSET ${itemsPerPage * (pageNumber - 1)}
        `,
      ]);
      const stringTotalCount = filteredAlumni[0]
        ? filteredAlumni[0].totalCount.toString()
        : '0n';
      const numberOfItems = Number(stringTotalCount.replace('n', ''));

      const items = await this.ualumniDbService.alumni.findMany({
        where: {
          email: {
            in: filteredAlumni.map((alumni) => alumni.email),
          },
        },
        include: {
          associatedUser: {
            select: {
              password: true,
              names: true,
              surnames: true,
            },
          },
          resume: {
            include: {
              ciapCourses: {
                select: {
                  course: {
                    select: {
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
                  skillCategoryName: true,
                  skillName: true,
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
                  sourceLink: true,
                  isVisible: true,
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
      throw new UnexpectedError('An unexpected situation ocurred', {
        cause: error,
      });
    }
  }

  async findOne(email: string): Promise<Alumni | null> {
    try {
      let alumni = await this.ualumniDbService.alumni.findFirst({
        where: { email },
        include: {
          associatedUser: {
            select: {
              password: true,
              names: true,
              surnames: true,
            },
          },
          graduations: {
            select: {
              careerName: true,
              graduationDate: true
            }
          }
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

  async update(
    email: string,
    updateAlumniDto: UpdateAlumniDto,
  ): Promise<Alumni> {
    try {
      let updatedAlumni = await this.ualumniDbService.alumni.update({
        where: { email },
        data: {
          associatedUser: {
            update: updateAlumniDto,
          },
        },
        include: {
          associatedUser: {
            select: {
              password: true,
              names: true,
              surnames: true,
            },
          },
          graduations: {
            select: {
              careerName: true,
              graduationDate: true
            }
          }
        },
      });
      
      const { associatedUser: userProps, ...rest } = updatedAlumni;
      return { ...userProps, ...rest };
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === 'P2025') {
          throw new NotFoundError(
            `There is no alumni with the given \`email\` (${email})`,
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

  async remove(email: string): Promise<Alumni> {
    try {
      const removedAlumni = await this.ualumniDbService.alumni.delete({
        where: { email },
        include: {
          associatedUser: {
            select: {
              password: true,
              names: true,
              surnames: true,
            },
          },
          graduations: {
            select: {
              careerName: true,
              graduationDate: true
            }
          }
        }
      });

      const { associatedUser: userProps, ...rest } = removedAlumni;
      return { ...userProps, ...rest };
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === 'P2025') {
          throw new NotFoundError(
            `There is no alumni with the given \`email\` (${email})`,
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
