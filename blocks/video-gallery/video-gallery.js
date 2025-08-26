export default function decorate(block) {
  const mainContainer = document.createElement('div');
  mainContainer.className = 'gallery-main-video';

  const thumbContainer = document.createElement('div');
  thumbContainer.className = 'gallery-thumbnails';

  // Collect video links from DAM
  const links = Array.from(block.querySelectorAll('a'));
  if (!links.length) return;

  // Load first video in main container
  const firstVideo = document.createElement('video');
  firstVideo.src = links[0].href;
  firstVideo.controls = true;
  firstVideo.className = 'main-video';
  mainContainer.appendChild(firstVideo);

  // Create thumbnails for all videos
  links.forEach((link, index) => {
    const thumb = document.createElement('video');
    thumb.src = link.href;
    thumb.controls = false;
    thumb.muted = true;
    thumb.className = 'thumbnail-video';

    // On click, change main video
    thumb.addEventListener('click', () => {
      firstVideo.src = link.href;
      firstVideo.play();
    });

    thumbContainer.appendChild(thumb);
  });

  // Replace block content
  block.innerHTML = '';
  block.appendChild(mainContainer);
  block.appendChild(thumbContainer);
}
