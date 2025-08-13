export default function decorate(block) {
  const videoPath = block.children[0]?.textContent?.trim();

  if (!videoPath) {
    block.textContent = 'No video';
    return;
  }

  const isVimeo = videoPath.includes('vimeo.com');

  block.innerHTML = '';

  if (isVimeo) {
    const iframe = document.createElement('iframe');
    iframe.src = videoPath.replace('vimeo.com', 'player.vimeo.com/video');
    iframe.width = '640';
    iframe.height = '360';
    iframe.allow = 'autoplay; fullscreen; picture-in-picture';
    iframe.allowFullscreen = true;

    block.appendChild(iframe);
  } else {
    const videoEl = document.createElement('video');
    videoEl.controls = true;
    videoEl.preload = "metadata";

    const source = document.createElement("source");
    source.src = videoPath;
    source.type = videoPath.endsWith(".webm") ? "video/webm" : "video/mp4";

    videoEl.appendChild(source);

    block.appendChild(videoEl);
  }
}
