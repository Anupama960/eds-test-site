export default function decorate(block) {
  const videos = Array.from(block.querySelectorAll('a'));

  if (!videos.length) return;

  // Main container
  const container = document.createElement('div');
  container.className = 'videoplaylist';

  // Main video section
  const mainVideoWrapper = document.createElement('div');
  mainVideoWrapper.className = 'main-video';

  const mainVideo = document.createElement('video');
  mainVideo.controls = true;
  mainVideo.src = videos[0].href; // first video
  mainVideoWrapper.append(mainVideo);

  // Playlist (right side)
  const playlistWrapper = document.createElement('div');
  playlistWrapper.className = 'playlist';

  videos.forEach((link, index) => {
    if (index === 0) return;

    const thumbWrapper = document.createElement('div');
    thumbWrapper.className = 'playlist-item';

    const thumb = document.createElement('video');
    thumb.className = 'playlist-video';
    thumb.src = link.href;
    thumb.muted = true;
    thumb.playsInline = true;
    thumb.preload = 'metadata';

    thumb.addEventListener('error', () => {
      const fallback = document.createElement('div');
      fallback.textContent = 'Video unavailable';
      fallback.className = 'video-fallback';
      thumbWrapper.replaceChild(fallback, thumb);
    });

    // Change main video on click
    thumb.addEventListener('click', () => {
      mainVideo.src = link.href;
      mainVideo.play();
      playlistWrapper.querySelectorAll('.playlist-item').forEach((item) => item.classList.remove('active'));
      thumbWrapper.classList.add('active');
    });

    thumbWrapper.appendChild(thumb);
    playlistWrapper.appendChild(thumb);
    // remove links from DOM after processing
  });

  // console.log('Playlist videos:', playlistWrapper.children.length);

  container.append(mainVideoWrapper, playlistWrapper);
  block.textContent = '';
  block.append(container);
}
