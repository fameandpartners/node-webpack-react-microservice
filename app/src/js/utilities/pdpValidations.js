export function sizeProfilePresence(selectedDressSize, selectedHeightValue) {
  return typeof selectedDressSize === 'number' && (typeof selectedHeightValue === 'number' || typeof selectedHeightValue === 'string');
}

export function dressSizePresence(selectedDressSize) {
  return typeof selectedDressSize === 'number';
}


export default {
  sizeProfilePresence,
  dressSizePresence,
};
