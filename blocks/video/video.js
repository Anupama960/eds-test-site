export default function decorate(block) {
  const {videoPath} = block.dataset;

  if (!videoPath) {
    block.textContent = 'No video';
    return;
  }

  const videoEl = document.createElement('video');
  videoEl.setAttribute('controls', true);
  videoEl.setAttribute('preload', 'metadata');

  const source = document.createElement('source');
  source.src = videoPath;
  source.type = 'video/mp4';

  videoEl.appendChild(source);
  block.innerHTML = '';
  block.appendChild(videoEl);
}
