export default function decorate(block) {
  const links = Array.from(block.querySelectorAll('a'));

  if (!links.length) return;

  // Create layout containers
  const layoutContainer = document.createElement('div');
  layoutContainer.className = 'gallery-layout';

  const mainContainer = document.createElement('div');
  mainContainer.className = 'gallery-main-video';

  const thumbContainer = document.createElement('div');
  thumbContainer.className = 'gallery-thumbnails';

  layoutContainer.append(mainContainer, thumbContainer);
  block.innerHTML = '';
  block.append(layoutContainer);

  // Function to embed video
  function embedDAMVideo(url) {
    const video = document.createElement('video');
    video.src = url;
    video.controls = true;
    video.width = 640;
    video.height = 360;
    return video;
  }

  // Show first video in main container
  const firstLink = links[0];
  const firstVideo = embedDAMVideo(firstLink.href);
  mainContainer.append(firstVideo);

  // Create thumbnails for the rest
  links.forEach((link, index) => {
    if (index === 0) return;

    const thumbVideo = embedDAMVideo(link.href);
    thumbVideo.width = 160;
    thumbVideo.height = 90;
    thumbVideo.muted = true;
    thumbVideo.playsInline = true;

    thumbVideo.addEventListener('click', () => {
      mainContainer.innerHTML = '';
      const newMainVideo = embedDAMVideo(link.href);
      mainContainer.append(newMainVideo);
    });

    thumbContainer.append(thumbVideo);
  });
}
