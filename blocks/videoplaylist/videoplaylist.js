export default function decorate(block) {
  const links = Array.from(block.querySelectorAll('a'));
  if (links.length === 0) return;

  // Containers
  const mainContainer = document.createElement('div');
  mainContainer.className = 'playlist-main-video';

  const sideContainer = document.createElement('div');
  sideContainer.className = 'playlist-side-videos';

  block.innerHTML = '';

  // Main video
  const mainVideo = document.createElement('video');
  mainVideo.setAttribute('controls', '');
  mainVideo.src = links[0].href;
  mainContainer.appendChild(mainVideo);

  // Side videos
  links.forEach((link, idx) => {
    if (idx === 0) return;
    const thumb = document.createElement('video');
    thumb.setAttribute('controls', '');
    thumb.src = link.href;
    thumb.className = 'playlist-thumb';

    thumb.addEventListener('click', () => {
      mainVideo.src = link.href;
      mainVideo.play();
    });

    sideContainer.appendChild(thumb);
  });

  block.appendChild(mainContainer);
  block.appendChild(sideContainer);
}
