import { AbstractControl, ValidatorFn, Validators } from "@angular/forms";


// General Validators:
export class GeneralValidators
{
  // Integer Validator:
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


  // Range Validator:
  static range(min: number, max: number): ValidatorFn {
    return (c: AbstractControl): { [key: string]: boolean } | null => {
      if (c.value && (isNaN(c.value) || c.value < min || c.value > max)) {
        return { range: true };
      }
      return null;
    };
  }

}
