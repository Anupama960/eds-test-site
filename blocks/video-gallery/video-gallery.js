export default function decorate(block) {
  const links = [...block.querySelectorAll('a')];
  if (!links.length) return;

  // Create main container
  const mainContainer = document.createElement('div');
  mainContainer.className = 'gallery-main-video';

  // Create thumbnail container
  const thumbContainer = document.createElement('div');
  thumbContainer.className = 'gallery-thumbnails';

  // Loop through videos
  links.forEach((link, index) => {
    const videoUrl = link.href;

    if (index === 0) {
      // First video → main player
      const video = document.createElement('video');
      video.src = videoUrl;
      video.controls = true;
      video.setAttribute('playsinline', '');
      mainContainer.appendChild(video);
    } else {
      // Rest → thumbnails
      const thumb = document.createElement('video');
      thumb.src = videoUrl;
      thumb.muted = true;
      thumb.setAttribute('playsinline', '');
      thumbContainer.appendChild(thumb);

      // On click → replace main video
      thumb.addEventListener('click', () => {
        const mainVideo = mainContainer.querySelector('video');
        mainVideo.src = videoUrl;
        mainVideo.play();
      });
    }
  });

  // Clear block and append new structure
  block.innerHTML = '';
  block.appendChild(mainContainer);
  block.appendChild(thumbContainer);
}
