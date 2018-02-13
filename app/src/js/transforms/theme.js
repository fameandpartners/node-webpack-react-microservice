import { colorNames } from '../constants/BDCustomizationConstants';

function determineItemPrice(item, siteVersion) {
  if (siteVersion && siteVersion.toLowerCase() === 'usa') {
    return item.prices.usd_price;
  }

  return item.prices.aud_price;
}

function transformColorToImageUrls(colorCode) {
  const keyColorNames = Object.keys(colorNames);
  const keyColorNamesLength = keyColorNames.length;

  for (let i = 0; i < keyColorNamesLength; i += 1) {
    if (colorNames[keyColorNames[i]] === colorCode) { // we have a match
      // Transforming to format accepted by bridesmaids' filter
      return [{ color: keyColorNames[i] }];
    }
  }

  return keyColorNames[0];
}

function transformProductItems(collection, siteVersion) {
  return collection.map(item => ({
    id: item.id,
    product_name: item.product_name,
    color: item.color,
    color_count: item.color_count,
    style_number: item.style_number,
    customization_ids: item.customization_ids,
    length: item.length,
    price: determineItemPrice(item, siteVersion),
    image_urls: transformColorToImageUrls(item.color),
  }));
}

export function transformThemeCollection(themeData, siteVersion) {
  return {
    collection: transformProductItems(JSON.parse(themeData.data.theme.collection, siteVersion)),
    name: themeData.data.theme.name,
    presentation: themeData.data.theme.presentation,
  };
}


export default {
  transformThemeCollection,
};
