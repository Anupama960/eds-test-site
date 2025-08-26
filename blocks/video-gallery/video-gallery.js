export default function decorate(block) {
  const links = [...block.querySelectorAll('a')];
  if (!links.length) return;

  const mainContainer = document.createElement('div');
  mainContainer.className = 'gallery-main-video';
  block.append(mainContainer);

  const thumbContainer = document.createElement('div');
  thumbContainer.className = 'gallery-thumbnails';
  block.append(thumbContainer);

  // Show first video
  const firstLink = links[0];
  const video = document.createElement('video');
  video.controls = true;
  video.src = firstLink.href;
  mainContainer.append(video);

  // Add thumbnails
  links.forEach((link) => {
    const thumb = document.createElement('video');
    thumb.src = link.href;
    thumb.muted = true;
    thumb.className = 'thumbnail';
    thumbContainer.append(thumb);

    thumb.addEventListener('click', () => {
      video.src = link.href;
      video.play();
    });
  });
}
 