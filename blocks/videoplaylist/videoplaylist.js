export default function decorate(block) {
  // Try JSON first
  const data = block.querySelector('[data-videos]');
  let videos = [];

  if (data) {
    try {
      videos = JSON.parse(data.getAttribute('data-videos'));
    } catch (e) {
      // console.error('Invalid JSON in data-videos:', e);
    }
  }

  // If no JSON, read from DOM thumbnails
  if (!videos.length) {
    const thumbArea = block.querySelector('.video-thumbs-area, .simplebar-content-wrapper');
    if (thumbArea) {
      videos = Array.from(thumbArea.querySelectorAll('video, source'))
        .map((el) => el.src)
        .filter((src) => src);
    }
  }

  if (!videos.length) return;

  // Destructure videos: first = main, rest = playlist
  const [mainSrc, ...playlistSrcs] = videos;

  // Main container
  const container = document.createElement('div');
  container.className = 'video-playlist';

  // Main video wrapper
  const mainVideoWrapper = document.createElement('div');
  mainVideoWrapper.className = 'main-video';

  const mainVideo = document.createElement('video');
  mainVideo.controls = true;
  mainVideo.src = mainSrc;
  mainVideoWrapper.appendChild(mainVideo);

  // Playlist wrapper
  const playlistWrapper = document.createElement('div');
  playlistWrapper.className = 'playlist';

  // Define function BEFORE using it
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

    // Click to swap videos
    thumb.addEventListener('click', () => {
      const currentMainSrc = mainVideo.src;
      mainVideo.src = src;
      mainVideo.play();

      // Replace clicked video with old main
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

  // Build playlist items
  playlistSrcs.forEach((src) => createPlaylistItem(src));

  container.appendChild(mainVideoWrapper);
  container.appendChild(playlistWrapper);

  block.innerHTML = '';
  block.appendChild(container);
}
