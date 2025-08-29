export default function decorate(block) {
  const links = Array.from(block.querySelectorAll('a'));
  if (!links.length) return;

  // Main container
  const container = document.createElement('div');
  container.className = 'videoplaylist videoplaylist--with-thumbs';

  // ✅ New wrapper for flex layout
  const playerWrapper = document.createElement('div');
  playerWrapper.className = 'video-player-wrapper';

  // Main video area
  const videoArea = document.createElement('div');
  videoArea.className = 'video-area';

  const mainVideo = document.createElement('video');
  mainVideo.controls = true;
  mainVideo.src = links[0].href; // first video as main
  mainVideo.setAttribute('playsinline', '');
  mainVideo.setAttribute('preload', 'metadata');
  mainVideo.className = 'main-video';
  videoArea.appendChild(mainVideo);

  // Playlist area
  const thumbsArea = document.createElement('div');
  thumbsArea.className = 'video-thumbs-area';

  const thumbsContainer = document.createElement('div');
  thumbsContainer.className = 'video-thumbs';

  links.forEach((link, index) => {
    const thumbWrapper = document.createElement('div');
    thumbWrapper.className = `video-thumb ${index === 0 ? 'active' : ''}`;
    thumbWrapper.dataset.videoNum = index;

    const thumb = document.createElement('video');
    thumb.className = 'playlist-video';
    thumb.src = link.href;
    thumb.muted = true;
    thumb.setAttribute('playsinline', '');
    thumb.setAttribute('preload', 'metadata');

    thumbWrapper.addEventListener('click', () => {
      mainVideo.src = link.href;
      mainVideo.play();

      thumbsContainer.querySelectorAll('.video-thumb').forEach((el) => el.classList.remove('active'));
      thumbWrapper.classList.add('active');
    });

    thumbWrapper.appendChild(thumb);
    thumbsContainer.appendChild(thumbWrapper);
  });

  thumbsArea.appendChild(thumbsContainer);

  // ✅ Append video and thumbs inside new wrapper
  playerWrapper.append(videoArea, thumbsArea);

  // Append everything inside container
  container.appendChild(playerWrapper);

  // Replace original block content
  block.textContent = '';
  block.append(container);
}
