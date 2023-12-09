import { Injectable } from '@nestjs/common';
import { CreateAlumniDto } from './dto/create-alumni.dto';
import { UpdateAlumniDto } from './dto/update-alumni.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { Prisma } from '@prisma/client';
import {
  AlreadyExistsError,
  NotFoundError,
  UnexpectedError,
} from 'src/common/errors/service.error';
import { RandomPaginationParamsDto } from 'src/common/dto/random-pagination-params.dto';
import { RandomPage } from 'src/common/interfaces/random-page.interface';
import * as bcrypt from 'bcrypt';
import { Alumni } from './alumni.type';
import { AlumniFilterParamsDto } from './dto/alumni-filter-params.dto';
import { AlumniWithResume } from './alumni-with-resume.type';
@Injectable()
export class AlumniService {
  constructor(private prismaService: PrismaService) {}

  async create(createAlumniDto: CreateAlumniDto): Promise<Alumni> {
    let salt = await bcrypt.genSalt();
    let hashedPassword = await bcrypt.hash(createAlumniDto.password, salt);

    try {
      const createdUser = await this.prismaService.user.create({
        data: {
          ...createAlumniDto,
          password: hashedPassword,
          role: 'ALUMNI',
          associatedAlumni: {
            create: {
              resume: {
                create: {},
              },
            },
          },
        },
        select: {
          email: true,
          names: true,
          surnames: true,
          password: true,
          associatedAlumni: {
            select: {
              address: true,
              telephoneNumber: true,
              graduations: {
                select: {
                  careerName: true,
                  graduationDate: true,
                },
              },
            },
          },
        },
      });
      return {
        email: createdUser.email,
        names: createdUser.names,
        surnames: createdUser.surnames,
        password: createdUser.password,
        address: createdUser.associatedAlumni?.address ?? null,
        telephoneNumber: createdUser.associatedAlumni?.telephoneNumber ?? null,
        careers: createdUser.associatedAlumni?.graduations ?? [],
      };
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
      let [_, __, filteredAlumni] = await this.prismaService.$transaction([
        this.prismaService.$queryRaw`
          CREATE EXTENSION IF NOT EXISTS unaccent
        `,
        this.prismaService.$queryRaw`
          SELECT 0
          FROM (
            SELECT setseed(${randomizationSeed})
          ) AS randomization_seed
        `,
        this.prismaService.$queryRaw<{ email: string; totalCount: number }[]>`
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
              ${skills ? Prisma.sql`AND rt."isVisible" = TRUE` : Prisma.empty}
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
          ), filtered_by_skill_categories AS (
            SELECT "email", "skillName", "skillCategoryName"
            FROM filtered_by_industry
            ${
              skillCategories
                ? Prisma.sql`
                    WHERE "skillCategoryName" IN (${Prisma.join(
                      skillCategories,
                    )}) `
                : Prisma.empty
            }
            GROUP BY "email", "skillName", "skillCategoryName"
            ${
              skillCategories
                ? Prisma.sql`
                    HAVING COUNT(*) = ${skillCategories.length}`
                : Prisma.empty
            }
          ), 
          filtered_by_skills AS (
            SELECT "email", COUNT("email") AS "filteredAlumniCount"
            FROM filtered_by_skill_categories
            GROUP BY "email"
            ${
              skills
                ? Prisma.sql`
                    HAVING ${Prisma.join(
                      skills.map(({ categoryName, skillName }) => {
                        return Prisma.sql`bool_or("skillCategoryName" ILIKE ${categoryName} AND "skillName" ILIKE ${skillName})`;
                      }),
                      ' AND ',
                    )}`
                : Prisma.empty
            }
          ),filtered_total_count AS (
            SELECT MAX("filteredAlumniCount") AS "totalCount"
            FROM filtered_by_skills
        
          )
         
          SELECT "email", "totalCount"
          FROM filtered_by_skills, filtered_total_count
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

      const result = await this.prismaService.alumni.findMany({
        where: {
          email: {
            in: filteredAlumni.map((alumni) => alumni.email),
          },
        },
        select: {
          address: true,
          telephoneNumber: true,
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
        items: result.map((alumni) => {
          return {
            email: alumni.associatedUser.email,
            names: alumni.associatedUser.names,
            surnames: alumni.associatedUser.surnames,
            password: alumni.associatedUser.password,
            address: alumni.address,
            telephoneNumber: alumni.telephoneNumber,
            careers: alumni.graduations,
          };
        }),
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
      let [_, __, filteredAlumni] = await this.prismaService.$transaction([
        this.prismaService.$queryRaw`
          CREATE EXTENSION IF NOT EXISTS unaccent
        `,
        this.prismaService.$queryRaw`
          SELECT 0
          FROM (
            SELECT setseed(${randomizationSeed})
          ) AS randomization_seed
        `,
        this.prismaService.$queryRaw<{ email: string; totalCount: number }[]>`
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
              ${skills ? Prisma.sql`AND rt."isVisible" = TRUE` : Prisma.empty}
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
          ), filtered_by_skill_categories AS (
            SELECT "email", "skillName", "skillCategoryName"
            FROM filtered_by_industry
            ${
              skillCategories
                ? Prisma.sql`
                    WHERE "skillCategoryName" IN (${Prisma.join(
                      skillCategories,
                    )}) `
                : Prisma.empty
            }
            GROUP BY "email", "skillName", "skillCategoryName"
            ${
              skillCategories
                ? Prisma.sql`
                    HAVING COUNT(*) = ${skillCategories.length}`
                : Prisma.empty
            }
          ), 
          filtered_by_skills AS (
            SELECT "email", COUNT("email") AS "filteredAlumniCount"
            FROM filtered_by_skill_categories
            GROUP BY "email"
            ${
              skills
                ? Prisma.sql`
                    HAVING ${Prisma.join(
                      skills.map(({ categoryName, skillName }) => {
                        return Prisma.sql`bool_or("skillCategoryName" ILIKE ${categoryName} AND "skillName" ILIKE ${skillName})`;
                      }),
                      ' AND ',
                    )}`
                : Prisma.empty
            }
          ),filtered_total_count AS (
            SELECT MAX("filteredAlumniCount") AS "totalCount"
            FROM filtered_by_skills
        
          )
         
          SELECT "email", "totalCount"
          FROM filtered_by_skills, filtered_total_count
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

      const resumesPromises = filteredAlumni.map(({ email }) => {
        return this.prismaService.resume.findUniqueOrThrow({
          where: { ownerEmail: email },
          select: {
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
            owner: {
              select: {
                address: true,
                telephoneNumber: true,
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
          email: resume.owner.associatedUser.email,
          names: resume.owner.associatedUser.names,
          surnames: resume.owner.associatedUser.surnames,
          password: resume.owner.associatedUser.password,
          address: resume.owner.address,
          telephoneNumber: resume.owner.telephoneNumber,
          careers: resume.owner.graduations,
          resume: {
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

  async findOneWithResume(email: string): Promise<AlumniWithResume | null> {
    try {
      const resume = await this.prismaService.resume.findUniqueOrThrow({
        where: { ownerEmail: email },
        select: {
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
          owner: {
            select: {
              address: true,
              telephoneNumber: true,
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

      return {
        email: resume.owner.associatedUser.email,
        names: resume.owner.associatedUser.names,
        surnames: resume.owner.associatedUser.surnames,
        password: resume.owner.associatedUser.password,
        address: resume.owner.address,
        telephoneNumber: resume.owner.telephoneNumber,
        careers: resume.owner.graduations,
        resume: {
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
        },
      };
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

  async findOne(email: string): Promise<Alumni | null> {
    try {
      let result = await this.prismaService.alumni.findFirst({
        where: { email },
        select: {
          associatedUser: {
            select: {
              email: true,
              password: true,
              names: true,
              surnames: true,
            },
          },
          address: true,
          telephoneNumber: true,
          graduations: {
            select: {
              careerName: true,
              graduationDate: true,
            },
          },
        },
      });
      return result
        ? {
            email: result.associatedUser.email,
            names: result.associatedUser.names,
            surnames: result.associatedUser.surnames,
            password: result.associatedUser.password,
            address: result.address,
            telephoneNumber: result.telephoneNumber,
            careers: result.graduations,
          }
        : null;
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
      let result = await this.prismaService.alumni.update({
        where: { email },
        data: {
          associatedUser: {
            update: updateAlumniDto,
          },
        },
        select: {
          associatedUser: {
            select: {
              email: true,
              password: true,
              names: true,
              surnames: true,
            },
          },
          address: true,
          telephoneNumber: true,
          graduations: {
            select: {
              careerName: true,
              graduationDate: true,
            },
          },
        },
      });
      return {
        email: result.associatedUser.email,
        names: result.associatedUser.names,
        surnames: result.associatedUser.surnames,
        password: result.associatedUser.password,
        address: result.address,
        telephoneNumber: result.telephoneNumber,
        careers: result.graduations,
      };
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
      const deletedUser = await this.prismaService.user.delete({
        where: { email },
        select: {
          email: true,
          password: true,
          names: true,
          surnames: true,
          associatedAlumni: {
            select: {
              address: true,
              telephoneNumber: true,
              graduations: {
                select: {
                  careerName: true,
                  graduationDate: true,
                },
              },
            },
          },
        },
      });
      return {
        email: deletedUser.email,
        names: deletedUser.names,
        surnames: deletedUser.surnames,
        password: deletedUser.password,
        address: deletedUser.associatedAlumni?.address ?? null,
        telephoneNumber: deletedUser.associatedAlumni?.telephoneNumber ?? null,
        careers: deletedUser.associatedAlumni?.graduations ?? [],
      };
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
