import { AbstractControl, FormGroup, ValidationErrors, ValidatorFn } from '@angular/forms';

/** This class is being used to make the custom validators and it contains
 * All the custom validators function
 */
export class CustomValidators {

  /** Validate a password if it has atleast 8 chars and contains,
   * LowerCase, UpperCase, Number and Special Character
   */
  public static passwordValidator(control: AbstractControl): any | null {
    const regex = '^(?=.*\\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$';
    const reg = new RegExp(regex);
    if (control.value) {
      return reg.test(control.value) ? true : 'Entered password is not valid';
    }
    return 'Entered password is not valid';
  }

  /** Validate a Indian phone number of 10 digits and also allow to enter country code */
  public static phoneValidation(control: AbstractControl): any | null {
    const regex = '^((\\+)?(\\d{2}[-]))?(\\d{10}){1}?$';
    const reg = new RegExp(regex);
    if (control.value) {
      return reg.test(control.value) ? true : 'Entered mobile number is not valid';
    }
    return 'Entered mobile number is not valid';
  }

  /** Validate if a formControl value matched to another one
   * it is being used in Confirm Password option currently
   * @param controlName This is the field which value will be used to test e.g Password
   * @param matchingControlName This is the field from which we want to take a value and check e.g Confirm Password
   */
  public static mustMatch(controlName: string, matchingControlName: string) {
    return (formGroup: FormGroup) => {
      const control = formGroup.controls[controlName];
      const matchingControl = formGroup.controls[matchingControlName];

      if (matchingControl.errors && !matchingControl.errors.mustMatch) {
        // return if another validator has already found an error on the matchingControl
        return;
      }

      // set error on matchingControl if validation fails
      if (control.value !== matchingControl.value) {
        matchingControl.setErrors({ mustMatch: true });
      } else {
        matchingControl.setErrors(null);
      }
    };
  }
  /* This Validation is used to validate the card weather it is visa or master card **/
  public static cardNumberValidator(control: AbstractControl): any | null {
    const visaPattern = /^(?:4[0-9]{12}(?:[0-9]{3})?)$/;
    const mastPattern = /^(?:5[1-5][0-9]{14})$/;
    var isVisa = visaPattern.test(control.value) === true;
    var isMast = mastPattern.test(control.value) === true;
    if (isVisa || isMast) {
      // at least one regex matches, so the card number is valid.
      if (isVisa) {
        // Visa-specific logic goes here
      }
      else if (isMast) {
        // Mastercard-specific logic goes here
      }
    }
    else {
      //console.log("Please enter a valid card number.");
      return 'Entered Card number is not valid';
    }
  }

  public static cardCvvValidator(control: AbstractControl): any | null {
    const regex = '^[0-9]{3,4}$';
    const reg = new RegExp(regex);
    if (control.value) {
      return reg.test(control.value) ? true : 'Entered CVV number is not valid';
    }
    return 'Entered CVV number is not valid';
  }




}


