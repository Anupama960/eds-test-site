export default function decorate(block) {
  const videos = Array.from(block.querySelectorAll('a'));
  if (!videos.length) return;

  // Main container
  const container = document.createElement('div');
  container.className = 'videoplaylist videoplaylist--with-thumbs';

  // Main video area
  const videoArea = document.createElement('div');
  videoArea.className = 'video-area';

  const mainVideo = document.createElement('video');
  mainVideo.controls = true;
  mainVideo.src = videos[0].href;
  mainVideo.setAttribute('playsinline', '');
  mainVideo.setAttribute('preload', 'metadata');
  mainVideo.className = 'main-video';
  videoArea.appendChild(mainVideo);

  // Thumbnails wrapper
  const thumbsArea = document.createElement('div');
  thumbsArea.className = 'video-thumbs-area';

  const thumbsContainer = document.createElement('div');
  thumbsContainer.className = 'video-thumbs';

  videos.forEach((link, index) => {
    const thumbWrapper = document.createElement('div');
    thumbWrapper.className = `video-thumb ${index === 0 ? 'active' : ''}`;
    thumbWrapper.dataset.videoNum = index;

    const thumb = document.createElement('video');
    thumb.className = 'playlist-video';
    thumb.src = link.href;
    thumb.muted = true;
    thumb.setAttribute('playsinline', '');
    thumb.setAttribute('preload', 'metadata');

    // Click event for switching main video
    thumbWrapper.addEventListener('click', () => {
      mainVideo.src = link.href;
      mainVideo.play();

      // Update active class
      // document.querySelectorAll('.video-thumb').forEach((el) => el.classList.remove('active'));
      thumbsContainer.querySelectorAll('.video-thumb').forEach((el) => el.classList.remove('active'));
      thumbWrapper.classList.add('active');
    });

    thumbWrapper.appendChild(thumb);
    thumbsContainer.appendChild(thumbWrapper);
  });

  thumbsArea.appendChild(thumbsContainer);
  container.append(videoArea, thumbsArea);

  block.textContent = '';
  block.append(container);
}
