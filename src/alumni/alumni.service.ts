import { Injectable } from '@nestjs/common';
import { CreateAlumniDto } from './dto/create-alumni.dto';
import { UpdateAlumniDto } from './dto/update-alumni.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import {
  Alumni,
  Graduation,
  IndustryOfInterest,
  PositionOfInterest,
  Prisma,
  Resume,
  ResumeTechnicalSkill,
} from '@prisma/client';
import {
  AlreadyExistsError,
  NotFoundError,
  UnexpectedError,
} from 'src/common/errors/service.error';
import { RandomPaginationParamsDto } from 'src/common/dto/random-pagination-params.dto';
import { RandomPage } from 'src/common/interfaces/random-page.interface';
import * as bcrypt from 'bcrypt';
import { FilteredRandomPaginationParams } from './dto/filtered-random-pagination-params.dto';

@Injectable()
export class AlumniService {
  constructor(private prismaService: PrismaService) {}

  async create(createAlumniDto: CreateAlumniDto): Promise<Alumni> {
    let salt = await bcrypt.genSalt();
    let hashedPassword = await bcrypt.hash(createAlumniDto.password, salt);

    try {
      return await this.prismaService.alumni.create({
        data: {
          ...createAlumniDto,
          password: hashedPassword,
          resume: {
            create: {},
          },
        },
      });
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
  }: RandomPaginationParamsDto): Promise<RandomPage<Alumni>> {
    randomizationSeed ??= Math.random();

    try {
      let [_, items, numberOfItems] = await this.prismaService.$transaction([
        this.prismaService.$queryRaw`
          SELECT 0
          FROM (
            SELECT setseed(${randomizationSeed})
          ) AS randomization_seed
        `,
        this.prismaService.$queryRaw<Alumni[]>`
          SELECT *
          FROM "Alumni"
          ORDER BY random()
          LIMIT ${itemsPerPage}
          OFFSET ${itemsPerPage * (pageNumber - 1)}
        `,
        this.prismaService.alumni.count(),
      ]);

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

  async findPageRandomlyFiltered({
    pageNumber,
    itemsPerPage,
    randomizationSeed,
    alumniName,
    careersNames,
    positionsOfInterest,
    skillsNames,
    industriesOfInterest,
    skillCategories,
  }: FilteredRandomPaginationParams): Promise<RandomPage<Alumni>> {
    randomizationSeed ??= Math.random();
    if (typeof careersNames === 'string') {
      careersNames = [careersNames];
    }
    if (typeof positionsOfInterest === 'string') {
      positionsOfInterest = [positionsOfInterest];
    }
    if (typeof skillsNames === 'string') {
      skillsNames = [skillsNames];
    }
    if (typeof industriesOfInterest === 'string') {
      industriesOfInterest = [industriesOfInterest];
    }
    if (typeof skillCategories === 'string') {
      skillCategories = [skillCategories];
    }
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
        this.prismaService.$queryRaw<Alumni[]>`
          WITH filtered_by_visibility AS (
            SELECT a."email", a."names", a."surnames", g."careerName", p."positionName", i."industryName", rt."skillName", rt."skillCategoryName"
            FROM "Alumni" a LEFT JOIN "Resume" r ON a."email" = r."ownerEmail"
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
            SELECT "email"
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
          )
         
          SELECT *
          FROM filtered_by_skill_categories
          ORDER BY random()
        `,
      ]);

      const numberOfItems = filteredAlumni.length;

      const items = await this.prismaService.alumni.findMany({
        where: {
          email: {
            in: filteredAlumni.map((alumni) => alumni.email),
          },
        },
        include: {
          resume: {
            include: {
              ciapCourses: true,
              positionsOfInterest: true,
              industriesOfInterest: true,
              higherEducationStudies: true,
              knownLanguages: true,
              portfolio: true,
              softSkills: true,
              technicalSkills: true,
            },
          },
          graduation: true,
        },
        take: itemsPerPage,
        skip: itemsPerPage * (pageNumber - 1),
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
      return await this.prismaService.alumni.findFirst({
        where: { email },
      });
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
      return await this.prismaService.alumni.update({
        where: { email },
        data: updateAlumniDto,
      });
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
      let [_, removedAlumni] = await this.prismaService.$transaction([
        this.prismaService.alumni.update({
          where: { email },
          data: {
            resume: {
              delete: true,
            },
          },
        }),
        this.prismaService.alumni.delete({
          where: { email },
        }),
      ]);

      return removedAlumni;
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
