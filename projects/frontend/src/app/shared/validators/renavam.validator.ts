import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function renavamValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const value = control.value?.toString();

    if (!value) {
      return null;
    }

    // Check if contains only numbers
    if (!/^\d+$/.test(value)) {
      return { nonNumeric: true };
    }

    // Remove any non-digit characters
    const cleanValue = value.replace(/\D/g, '');

    // Check if length is valid (9 or 11 digits)
    if (cleanValue.length !== 9 && cleanValue.length !== 11) {
      return { invalidLength: true };
    }

    // If 9 digits, pad with zeros to make it 11 digits
    const normalizedValue = cleanValue.padStart(11, '0');

    // Get the check digit (last digit)
    const checkDigit = parseInt(normalizedValue.slice(-1));

    // Get the number without the check digit
    const numberWithoutCheck = normalizedValue.slice(0, -1);

    // Calculate the check digit
    let calculatedCheck = 0;
    let multiplier = 2;

    // Calculate sum of products
    for (let i = numberWithoutCheck.length - 1; i >= 0; i--) {
      calculatedCheck += parseInt(numberWithoutCheck[i]) * multiplier;
      multiplier++;
      if (multiplier > 9) {
        multiplier = 2;
      }
    }

    // Calculate modulo 11
    calculatedCheck = calculatedCheck % 11;

    // Calculate final check digit
    calculatedCheck = 11 - calculatedCheck;
    if (calculatedCheck > 9) {
      calculatedCheck = 0;
    }

    // Compare calculated check digit with provided check digit
    if (calculatedCheck !== checkDigit) {
      return { invalidCheckDigit: true };
    }

    return null;
  };
}