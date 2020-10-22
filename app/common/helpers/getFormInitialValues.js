export const getFormInitialValues = ({
  selectedRegion,
  selectedDistrict,
  selectedSettlement,
  location,
}) => ({
  region_id: selectedRegion && {
    name: selectedRegion.id,
    title: selectedRegion.name,
  },
  district_id: selectedDistrict && {
    name: selectedDistrict.id,
    title: selectedDistrict.district,
  },
  settlement_id: selectedSettlement && {
    name: selectedSettlement.id,
    title: selectedSettlement.name,
  },
  name: location.query.name || '',
  koatuu: location.query.koatuu || '',
});
