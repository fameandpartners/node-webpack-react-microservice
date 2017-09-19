export function sizeProfilePresence(selectedDressSize, selectedHeightValue) {
  return typeof selectedDressSize === 'number' && (typeof selectedHeightValue === 'number' || typeof selectedHeightValue === 'string');
}

export default {
  sizeProfilePresence,
};
