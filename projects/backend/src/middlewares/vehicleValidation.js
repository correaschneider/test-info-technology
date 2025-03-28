const AppError = require('../utils/AppError');

function validateRenavam(renavam) {
  // Convert to string and clean the value
  const value = renavam.toString();

  // Check if contains only numbers
  if (!/^\d+$/.test(value)) {
    return false;
  }

  // Remove any non-digit characters
  const cleanValue = value.replace(/\D/g, '');

  // Check if length is valid (9 or 11 digits)
  if (cleanValue.length !== 9 && cleanValue.length !== 11) {
    return false;
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
  return calculatedCheck === checkDigit;
}

function isPlateNull(plate) {
  if (!plate) {
    throw new AppError('Placa é obrigatória', 400);
  }
}

function isPlateValid(plate) {
  const plateRegex = /^[A-Z]{3}[0-9]{4}$|^[A-Z]{3}[0-9][A-Z][0-9]{2}$/;
  if (!plateRegex.test(plate)) {
    throw new AppError('Formato de placa inválido. Deve seguir o padrão AAA9999 ou AAA9A99', 400);
  }
}

function isChassiNull(chassi) {
  if (!chassi) {
    throw new AppError('Chassi é obrigatório', 400);
  }
}

function isChassiValid(chassi) {
  const chassiRegex = /^[0-9]{1}[A-Z]{2}[A-Z0-9]{5}[A-Z]{1}[0-9]{8}$/;
  if (!chassiRegex.test(chassi)) {
    throw new AppError('Formato de chassi inválido. Deve seguir o padrão 9AAAA99AA99999999', 400);
  }
}

function isRenavamNull(renavam) {
  if (!renavam) {
    throw new AppError('Renavam é obrigatório', 400);
  }
}

function isRenavamValid(renavam) {
  if (renavam.length !== 11) {
    throw new AppError('Renavam deve conter 11 dígitos', 400);
  }

  if (!validateRenavam(renavam)) {
    throw new AppError('Renavam inválido', 400);
  }
}

function isModelNull(model) {
  if (!model) {
    throw new AppError('Modelo é obrigatório', 400);
  }
}

function isBrandNull(brand) {
  if (!brand) {
    throw new AppError('Marca é obrigatória', 400);
  }
}

function isYearNull(year) {
  if (!year) {
    throw new AppError('Ano é obrigatório', 400);
  }
}

function validateVehicleCreate(req, _res, next) {
  const { plate, chassi, renavam, model, brand, year } = req.body;

  isPlateNull(plate);
  isPlateValid(plate);

  isChassiNull(chassi);
  isChassiValid(chassi);

  isRenavamNull(renavam);
  isRenavamValid(renavam);

  isModelNull(model);
  isBrandNull(brand);
  isYearNull(year);

  next();
}

function validateVehicleUpdate(req, _res, next) {
  const { plate, chassi, renavam } = req.body;

  if (plate) {
    isPlateValid(plate);
  }

  if (chassi) {
    isChassiValid(chassi);
  }

  if (renavam) {
    isRenavamValid(renavam);
  }

  next();
}

module.exports = {
  validateVehicleCreate,
  validateVehicleUpdate,
};
