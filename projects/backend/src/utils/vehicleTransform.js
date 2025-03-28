function convertBigIntToString(data) {
  if (Array.isArray(data)) {
    return data.map((item) => convertBigIntToString(item));
  }
  if (typeof data === 'object' && data !== null) {
    const result = {};
    for (const [key, value] of Object.entries(data)) {
      result[key] = convertBigIntToString(value);
    }
    return result;
  }
  if (typeof data === 'bigint') {
    return data.toString();
  }
  return data;
}

module.exports = {
  convertBigIntToString,
};
