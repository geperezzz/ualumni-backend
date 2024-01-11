import { ValidationArguments, ValidatorConstraint, ValidatorConstraintInterface, isDate } from 'class-validator';

@ValidatorConstraint({ name: 'isBefore', async: false })
export class IsBefore implements ValidatorConstraintInterface {
  validate(propertyValue: any, args: ValidationArguments): boolean {
    if (!isDate(propertyValue)) {
      throw new Error(`The \`${args.property}\` property of \`${args.object}\` is not a Date`);
    }
    const priorDate = propertyValue;
    const laterDates = this.getLaterDates(args);
    return laterDates.every((laterDate) => laterDate > priorDate);
  }

  private getLaterDates(args: ValidationArguments): Date[] {
    return args.constraints.map(
      (constraint: { propertyName: string, isOptional?: boolean }): Date | null => {
        if ((args.object as any)[constraint.propertyName] === undefined) {
          if (!constraint.isOptional) {
            throw new Error(`\`${args.targetName}\` does not have a property named \`${constraint.propertyName}\``);
          }
          return null;
        }

        const propertyValue = (args.object as any)[constraint.propertyName];
        if (!isDate(propertyValue)) {
          throw new Error(`The \`${constraint.propertyName}\` property of \`${args.object}\` is not a Date`);
        }
        
        return propertyValue;
      }
    ).filter((laterDate): laterDate is Date => laterDate !== null);
  }

  defaultMessage(args: ValidationArguments): string {
    const priorDate = args.property;
    const laterDates = args.constraints.map((constraint: { propertyName: string, isOptional?: boolean }) => {
      return `\`${constraint.propertyName}\``;
    });
    return `\`${priorDate}\` must be a date prior to all of the following: ${laterDates.join(', ')}`;
  }
}