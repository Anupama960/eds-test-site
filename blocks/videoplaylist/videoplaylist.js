function decorate(block) {
  // Get all videos from DAM references
  const videoElements = Array.from(block.querySelectorAll('a'));
  if (!videoElements.length) return;

  const videos = videoElements.map(el => el.href);

  // Create main container
  const container = document.createElement('div');
  container.className = 'videoplaylist';

  // Create main video wrapper
  const mainVideoWrapper = document.createElement('div');
  mainVideoWrapper.className = 'main-video';

  const mainVideo = document.createElement('video');
  mainVideo.controls = true;
  mainVideo.src = videos[0];
  mainVideoWrapper.appendChild(mainVideo);

  // Create playlist wrapper (right side)
  const playlistWrapper = document.createElement('div');
  playlistWrapper.className = 'playlist';

  // Add thumbnails for rest of the videos
  videos.forEach((src, index) => {
    if (index === 0) return; // skip main video

    const thumbWrapper = document.createElement('div');
    thumbWrapper.className = 'playlist-item';

    const thumb = document.createElement('video');
    thumb.className = 'playlist-video';
    thumb.src = src;
    thumb.muted = true;
    thumb.playsInline = true;
    thumb.preload = 'metadata';

    // Click event to switch main video
    thumb.addEventListener('click', () => {
      mainVideo.src = src;
      mainVideo.play();
      playlistWrapper.querySelectorAll('.playlist-item').forEach(item => {
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
