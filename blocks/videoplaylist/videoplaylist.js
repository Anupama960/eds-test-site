export default function decorate(block) {
  // Collect all video URLs from anchor tags inside block
  const links = block.querySelectorAll('a');
  const videoUrls = Array.from(links).map((link) => link.href);

  if (!videoUrls.length) return;

  // Destructure first and remaining videos
  const [firstVideo, ...otherVideos] = videoUrls;

  // Clear the block content
  block.textContent = '';

  // Main container
  const container = document.createElement('div');
  container.className = 'videoplaylist videoplaylist--with-thumbs';

  // Main video area
  const videoArea = document.createElement('div');
  videoArea.className = 'video-area';

  const mainVideo = document.createElement('video');
  mainVideo.controls = true;
  mainVideo.src = firstVideo;
  mainVideo.setAttribute('playsinline', '');
  mainVideo.setAttribute('preload', 'metadata');
  mainVideo.className = 'main-video';
  videoArea.appendChild(mainVideo);

  // Thumbnails area
  const thumbsArea = document.createElement('div');
  thumbsArea.className = 'video-thumbs-area';

  const thumbsContainer = document.createElement('div');
  thumbsContainer.className = 'video-thumbs';

  // Add the first video as the first thumbnail
  const allVideos = [firstVideo, ...otherVideos];

  allVideos.forEach((url, index) => {
    const thumbWrapper = document.createElement('div');
    thumbWrapper.className = `video-thumb ${index === 0 ? 'active' : ''}`;
    thumbWrapper.dataset.videoNum = index;

    const thumb = document.createElement('video');
    thumb.className = 'playlist-video';
    thumb.src = url;
    thumb.muted = true;
    thumb.setAttribute('playsinline', '');
    thumb.setAttribute('preload', 'metadata');

    // On click, update main video
    thumbWrapper.addEventListener('click', () => {
      mainVideo.src = url;
      mainVideo.play();

      thumbsContainer.querySelectorAll('.video-thumb').forEach((el) => el.classList.remove('active'));
      thumbWrapper.classList.add('active');
    });

    thumbWrapper.appendChild(thumb);
    thumbsContainer.appendChild(thumbWrapper);
  });

  thumbsArea.appendChild(thumbsContainer);
  container.append(videoArea, thumbsArea);

  block.append(container);
}
