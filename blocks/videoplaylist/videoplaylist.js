export default function decorate(block) {
  const links = Array.from(block.querySelectorAll('a'));
  if (links.length === 0) return;

  // Create layout containers
  const layout = document.createElement('div');
  layout.className = 'video-playlist-layout';

  const main = document.createElement('div');
  main.className = 'video-playlist-main';

  const thumbs = document.createElement('div');
  thumbs.className = 'video-playlist-thumbnails';

  layout.append(main, thumbs);
  block.innerHTML = '';
  block.append(layout);

  const autoplay = block.classList.contains('autoplay');

  function createVideo(url, isMain = false) {
    const video = document.createElement('video');
    video.src = url;
    video.controls = true;
    video.playsInline = true;
    video.muted = !isMain;
    video.width = isMain ? 640 : 160;
    video.height = isMain ? 360 : 90;
    if (autoplay && isMain) {
      video.autoplay = true;
    }
    return video;
  }

  // Render main video
  const firstVideo = createVideo(links[0].href, true);
  main.append(firstVideo);

  // Render thumbnails
  links.slice(1).forEach((link) => {
    const thumb = createVideo(link.href);
    thumb.addEventListener('click', () => {
      main.innerHTML = '';
      const newMain = createVideo(link.href, true);
      main.append(newMain);
    });
    thumbs.append(thumb);
  });
}
