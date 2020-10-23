export const normalizeName = (data) => {
  if (typeof data !== 'string') return '';

  const name = data.toLowerCase();
  return name.replace(/^./, name[0].toUpperCase());
};

export const getRegionName = (region) => {
  if (!region) {
    return null;
  } else if (/^м\./i.test(region)) {
    return region
      .toLowerCase()
      .replace(/(\.)(.)/, (_, dot, suffix) => `. ${suffix.toUpperCase()}`);
  } else if (/крим/i.test(region)) {
    const regionName = normalizeName(region);
    return regionName.replace(/крим/i, 'Крим');
  }

  const regionName = normalizeName(region);
  return `${regionName} обл.`;
};

export const getDistrictName = (district) => {
  if (!district) return '';
  const districtName = normalizeName(district);
  return `${districtName} р-н.`;
};

export const getSettlementInfo = ({ name, region, district }) => {
  const settlementName = normalizeName(name);
  const regionString = getRegionName(region);
  const districtString = getDistrictName(district);

  const settlementDetails = [regionString, districtString]
    .filter(i => i)
    .join(', ');

  return `${settlementName} (${settlementDetails})`;
};
