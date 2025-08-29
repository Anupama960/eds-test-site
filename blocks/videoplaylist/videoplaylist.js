export default function decorate(block) {
  const sources = Array.from(block.querySelectorAll('.videosource a, .videosource'));
  const urls = sources.map((el) => el.href || el.textContent.trim()).filter(Boolean);
  if (!urls.length) return;

  block.textContent = '';

  const container = document.createElement('div');
  container.className = 'videoplaylist videoplaylist--with-thumbs';

  const videoArea = document.createElement('div');
  videoArea.className = 'video-area';

  const mainVideo = document.createElement('video');
  mainVideo.controls = true;
  mainVideo.src = urls[0].href;
  mainVideo.setAttribute('playsinline', '');
  mainVideo.setAttribute('preload', 'metadata');
  mainVideo.className = 'main-video';
  videoArea.appendChild(mainVideo);

  const thumbsArea = document.createElement('div');
  thumbsArea.className = 'video-thumbs-area';

  const thumbsContainer = document.createElement('div');
  thumbsContainer.className = 'video-thumbs';

  urls.forEach((url, index) => {
    const thumbWrapper = document.createElement('div');
    thumbWrapper.className = `video-thumb ${index === 0 ? 'active' : ''}`;
    thumbWrapper.dataset.videoNum = index;

    const thumb = document.createElement('video');
    thumb.className = 'playlist-video';
    thumb.src = url;
    thumb.muted = true;
    thumb.setAttribute('playsinline', '');
    thumb.setAttribute('preload', 'metadata');

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

  // block.textContent = '';
  block.append(container);
}
