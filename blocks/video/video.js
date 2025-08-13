export default function decorate(block) {
  const videoPath = block.children[0]?.textContent?.trim();

  if (!videoPath) {
    block.textContent = 'No video';
    return;
  }

  const videoEl = document.createElement('video');
  videoEl.controls = true;
  videoEl.preload = 'metadata';

  const source = document.createElement('source');
  source.src = videoPath;
  source.type = videoPath.endsWith('.webm') ? 'video/webm' : 'video/mp4';

  videoEl.appendChild(source);

  block.innerHTML = '';
  block.appendChild(videoEl);
}
