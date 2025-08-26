export default function decorate(block) {
  // Create containers
  const mainContainer = document.createElement('div');
  mainContainer.className = 'gallery-main-video';

  const thumbContainer = document.createElement('div');
  thumbContainer.className = 'gallery-thumbnails';

  // Collect all video links (only DAM assets)
  const links = Array.from(block.querySelectorAll('a'));
  if (!links.length) return;

  // Helper to create video element
  function createVideoElement(url, autoplay = false) {
    const video = document.createElement('video');
    video.src = url;
    video.controls = true;
    video.playsInline = true;
    video.autoplay = autoplay;
    video.muted = autoplay; // muted if autoplay
    video.setAttribute('preload', 'metadata');
    return video;
  }

  // Load the first video in main container
  const firstVideoUrl = links[0].href;
  let mainVideo = createVideoElement(firstVideoUrl, true);
  mainContainer.append(mainVideo);

  // Create thumbnails for remaining videos
  links.forEach((link, index) => {
    if (index === 0) return; // skip first video
    const thumb = document.createElement('video');
    thumb.src = link.href;
    thumb.muted = true;
    thumb.controls = false;
    thumb.className = 'gallery-thumb';

    // On click → replace main video
    thumb.addEventListener('click', () => {
      mainContainer.innerHTML = '';
      mainVideo = createVideoElement(link.href, true);
      mainContainer.append(mainVideo);
    });

    thumbContainer.append(thumb);
  });

  // Append to block
  block.innerHTML = '';
  block.append(mainContainer);
  block.append(thumbContainer);
}
