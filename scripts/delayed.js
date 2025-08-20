// add delayed functionality here
import { loadScript } from './aem.js';

const hasVideoComponent = document.querySelectorAll('.video-wrapper')?.length;

if (hasVideoComponent) {
  await loadScript('https://player.vimeo.com/api/player.js');
}