import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function notZeroValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const value = parseInt(control.value);
    if (value === 0) {
      return { notZero: true };
    }
    return null;
  };
}

export function minMinus999Validator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const value = parseInt(control.value);
    if (value < -99) {
      return { min: true };
    }
    return null;
  };
}

export function max999Validator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const value = parseInt(control.value);
    if (value > 99) {
      return { max: true };
    }
    return null;
  };
}

export function minOneValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const value = parseInt(control.value);
    if (value < 1) {
      return { min: true };
    }
    return null;
  };
}

export function max730Validator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const value = parseInt(control.value);
    if (value > 730) {
      return { max: true };
    }
    return null;
  };
}
