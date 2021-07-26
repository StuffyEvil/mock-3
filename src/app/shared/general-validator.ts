


// Number Validator:

import { AbstractControl, ValidatorFn } from "@angular/forms";

//  - only validator for Integer right now
export class GeneralValidators
{
  // Integer Validator
  static notInt(): ValidatorFn
  {
    return (c: AbstractControl): { [key: string]: boolean } | null =>
    {
      if (c.value && (isNaN(c.value) || !Number.isInteger(c.value)))
      {
        return { notInt: true };
      }

      // Else:
      return null;
    }
  }

  // Null Validator
  static notNull
}
