export default function decorate(block) {
  const links = [...block.querySelectorAll('a')];
  if (!links.length) return;

  // Clear block
  block.innerHTML = '';

  // Containers
  const mainContainer = document.createElement('div');
  mainContainer.className = 'gallery-main-video';

  const thumbContainer = document.createElement('div');
  thumbContainer.className = 'gallery-thumbnails';

  block.append(mainContainer, thumbContainer);

  // Main video (first one)
  const mainVideo = document.createElement('video');
  mainVideo.controls = true;
  mainVideo.src = links[0].href;
  mainContainer.append(mainVideo);

  // Thumbnails for all videos
  links.forEach((link, index) => {
    const thumb = document.createElement('video');
    thumb.src = link.href;
    thumb.muted = true;
    thumb.className = 'thumbnail';
    thumbContainer.append(thumb);

    // Switch video on click
    thumb.addEventListener('click', () => {
      mainVideo.src = link.href;
      mainVideo.play();
    });
  });
}
 