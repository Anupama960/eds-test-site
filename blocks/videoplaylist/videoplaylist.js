export default function decorate(block) {
  // Try JSON first
  const data = block.querySelector('[data-videos]');
  let videos = [];

  if (data) {
    try {
      videos = JSON.parse(data.getAttribute('data-videos'));
    } catch (e) {
      console.error('Invalid JSON in data-videos:', e);
    }
  }

  // If no JSON found, try to read thumbnails from .video-thumbs-area
  if (!videos.length) {
    const thumbArea = block.querySelector('.video-thumbs-area, .simplebar-content-wrapper');
    if (thumbArea) {
      videos = Array.from(thumbArea.querySelectorAll('video, source'))
        .map(el => el.src)
        .filter(src => src);
    }
  }

  if (!videos.length) return;

  // Create main container with flex
  const container = document.createElement('div');
  container.className = 'video-playlist';

  // Main video wrapper
  const mainVideoWrapper = document.createElement('div');
  mainVideoWrapper.className = 'main-video';

  const mainVideo = document.createElement('video');
  mainVideo.controls = true;
  mainVideo.src = videos[0];
  mainVideoWrapper.appendChild(mainVideo);

  // Playlist wrapper
  const playlistWrapper = document.createElement('div');
  playlistWrapper.className = 'playlist';

  // Build playlist
  videos.slice(1).forEach((src) => createPlaylistItem(src));

  function createPlaylistItem(src) {
    const item = document.createElement('div');
    item.className = 'playlist-item';

    const thumb = document.createElement('video');
    thumb.className = 'playlist-video';
    thumb.src = src;
    thumb.muted = true;
    thumb.playsInline = true;
    thumb.preload = 'metadata';

    item.appendChild(thumb);

    thumb.addEventListener('click', () => {
      const currentMainSrc = mainVideo.src;
      mainVideo.src = src;
      mainVideo.play();

      // Swap the clicked video with the main one
      item.innerHTML = '';
      const oldThumb = document.createElement('video');
      oldThumb.className = 'playlist-video';
      oldThumb.src = currentMainSrc;
      oldThumb.muted = true;
      oldThumb.playsInline = true;
      oldThumb.preload = 'metadata';
      item.appendChild(oldThumb);
    });

    playlistWrapper.appendChild(item);
  }

  container.appendChild(mainVideoWrapper);
  container.appendChild(playlistWrapper);

  block.innerHTML = '';
  block.appendChild(container);
}
