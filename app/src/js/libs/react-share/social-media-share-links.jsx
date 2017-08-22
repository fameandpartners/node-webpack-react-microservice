/* eslint-disable prefer-template */
import assert from 'assert';

import { objectToGetParams } from './utils';


export function twitter(url, { title, via, hashtags = [] }) {
  assert(url, 'twitter.url');
  assert(Array.isArray(hashtags), 'twitter.hashtags is not an array');

  return 'https://twitter.com/share' + objectToGetParams({
    url,
    text: title,
    via,
    hashtags: hashtags.join(','),
  });
}

export function facebook(url, { quote, hashtag }) {
  assert(url, 'facebook.url');

  return 'https://www.facebook.com/sharer/sharer.php' + objectToGetParams({
    u: url,
    quote,
    hashtag,
  });
}

export function pinterest(url, { media, description }) {
  assert(url, 'pinterest.url');
  assert(media, 'pinterest.media');

  return 'https://pinterest.com/pin/create/button/' + objectToGetParams({
    url,
    media,
    description,
  });
}
