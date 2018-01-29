/* eslint-disable no-bitwise */
export function luminanceFromHex(hexStr) {
  if (!hexStr) {
    console.log('INVALID OR MISSING HEX VALUE!');
    return 250;
  }

  const cleanHexStr = hexStr.length === 7 ? hexStr.substring(1) : hexStr;
  const rgb = parseInt(cleanHexStr, 16);   // convert rrggbb to decimal
  const r = (rgb >> 16) & 0xff;  // bitwise extract red
  const g = (rgb >> 8) & 0xff;  // bitwise extract green
  const b = (rgb >> 0) & 0xff;  // bitwise extract blue
  return (0.2126 * r) + (0.7152 * g) + (0.0722 * b); // per ITU-R BT.709
}

export function isDarkLuminance({ hexValue }) {
  return luminanceFromHex(hexValue) < 70;
}

export function isExtremeLightLuminance({ hexValue }) {
  return luminanceFromHex(hexValue) > 240;
}

export function isNormalLightLuminance({ hexValue }) {
  return luminanceFromHex(hexValue) > 200;
}

export function separateHexColorsInString(hexStr = '') {
  const hexStringClean = (hexStr === null) ? '' : hexStr;
  const rexi = /#(\w+)(?!\w)/g;
  return hexStringClean.match(rexi);
}

function generateDuoToneSwatchBackground(start, end) {
  return `linear-gradient(45deg, ${end} 0%, ${end} 50%, ${start} 51%, ${start} 100%)`;
}

export function generateBackgroundValueFromColor({ patternUrl, hexValue }) {
  if (patternUrl) {
    return `url(${patternUrl})`;
  }

  const hexValArr = separateHexColorsInString(hexValue);
  if (hexValArr && hexValArr.length === 2) {
    return generateDuoToneSwatchBackground(hexValArr[0], hexValArr[1]);
  }

  return hexValue;
}


export default {
  luminanceFromHex,
  isDarkLuminance,
  isExtremeLightLuminance,
  isNormalLightLuminance,
  generateBackgroundValueFromColor,
  separateHexColorsInString,
};
