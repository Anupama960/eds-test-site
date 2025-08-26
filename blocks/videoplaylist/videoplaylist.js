export default function decorate(block) {
  // Simulated mock video links
  const mockLinks = [
    'https://example.com/video1.mp4',
    'https://example.com/video2.mp4',
    'https://example.com/video3.mp4',
  ];

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

  // Main video
  const firstVideo = createVideo(mockLinks[0], true);
  main.append(firstVideo);

  // Thumbnails
  mockLinks.slice(1).forEach((url) => {
    const thumb = createVideo(url);
    thumb.addEventListener('click', () => {
      main.innerHTML = '';
      const newMain = createVideo(url, true);
      main.append(newMain);
    });
    thumbs.append(thumb);
  });
}
