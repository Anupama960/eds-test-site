export default function decorate(block) {
  const videoElements = Array.from(block.querySelectorAll('a'));
  if (videoElements.length === 0) return;

  // Use array destructuring
  const videos = videoElements.map((el) => el.href);
  const [mainSrc, ...playlistSrcs] = videos;

  // Main container
  const container = document.createElement('div');
  container.className = 'videoplaylist';

  // Main video
  const mainVideoWrapper = document.createElement('div');
  mainVideoWrapper.className = 'main-video';

  const mainVideo = document.createElement('video');
  mainVideo.controls = true;
  mainVideo.src = mainSrc;
  mainVideoWrapper.appendChild(mainVideo);

  // Playlist wrapper
  const playlistWrapper = document.createElement('div');
  playlistWrapper.className = 'playlist';

  playlistSrcs.forEach((src) => {
    const thumbWrapper = document.createElement('div');
    thumbWrapper.className = 'playlist-item';

    const thumb = document.createElement('video');
    thumb.className = 'playlist-video';
    thumb.src = src;
    thumb.muted = true;
    thumb.playsInline = true;
    thumb.preload = 'metadata';

    thumb.addEventListener('click', () => {
      mainVideo.src = src;
      mainVideo.play();
      playlistWrapper.querySelectorAll('.playlist-item').forEach((item) => {
        item.classList.remove('active');
      });
      thumbWrapper.classList.add('active');
    });

    thumbWrapper.appendChild(thumb);
    playlistWrapper.appendChild(thumbWrapper);
  });

  container.appendChild(mainVideoWrapper);
  container.appendChild(playlistWrapper);

  block.innerHTML = '';
  block.appendChild(container);
}
