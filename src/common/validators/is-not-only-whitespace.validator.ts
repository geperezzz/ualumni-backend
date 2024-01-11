import { ValidationArguments, ValidatorConstraint, ValidatorConstraintInterface } from 'class-validator';

@ValidatorConstraint({ name: 'isNotOnlyWhitespace', async: false })
export class IsNotOnlyWhitespace implements ValidatorConstraintInterface {
  validate(text: string) {
    return text.trim().length > 0;
  }

  defaultMessage(args: ValidationArguments) {
    return `\`${args.property}\` must not be only whitespace`;
  }
}