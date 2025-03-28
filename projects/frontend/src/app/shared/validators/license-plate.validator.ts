import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function licensePlateValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const value = control.value?.toUpperCase();

    if (!value) {
      return null;
    }

    // Remove any spaces or special characters
    const cleanValue = value.replace(/[^A-Z0-9]/g, '');

    // Check if length is exactly 7 characters
    if (cleanValue.length !== 7) {
      return { invalidLength: true };
    }

    // Check if first three characters are letters
    const letters = cleanValue.substring(0, 3);
    if (!/^[A-Z]{3}$/.test(letters)) {
      return { invalidLetters: true };
    }

    // Check for old format (AAA9999)
    const oldFormat = /^[A-Z]{3}[0-9]{4}$/;
    // Check for Mercosul format (AAA9A99)
    const mercosulFormat = /^[A-Z]{3}[0-9][A-Z][0-9]{2}$/;

    if (!oldFormat.test(cleanValue) && !mercosulFormat.test(cleanValue)) {
      return { invalidFormat: true };
    }

    return null;
  };
}