import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function chassisValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const value = control.value?.toUpperCase();

    if (!value) {
      return null;
    }

    // Remove any spaces or special characters
    const cleanValue = value.replace(/[^A-Z0-9]/g, '');

    // Check if length is exactly 17 characters
    if (cleanValue.length !== 17) {
      return { invalidLength: true };
    }

    // Check if contains invalid characters (O, Q, I)
    if (/[OQI]/.test(cleanValue)) {
      return { invalidCharacters: true };
    }

    // Check WMI (World Manufacturer Identifier) - first 3 characters
    const wmi = cleanValue.substring(0, 3);
    if (!/^[A-Z0-9]{3}$/.test(wmi)) {
      return { invalidWMI: true };
    }

    // Check VDS (Vehicle Description Section) - characters 4-9
    const vds = cleanValue.substring(3, 9);
    if (!/^[A-Z0-9]{6}$/.test(vds)) {
      return { invalidVDS: true };
    }

    // Check VIS (Vehicle Identification Section) - characters 10-17
    const vis = cleanValue.substring(9);
    if (!/^[A-Z0-9]{8}$/.test(vis)) {
      return { invalidVIS: true };
    }

    return null;
  };
}