export default function decorate(block) {
  // Create containers
  const mainContainer = document.createElement('div');
  mainContainer.className = 'gallery-main-video';
  const thumbContainer = document.createElement('div');
  thumbContainer.className = 'gallery-thumbnails';

  block.append(mainContainer, thumbContainer);

  // Collect video links
  const links = Array.from(block.querySelectorAll('a'));
  if (!links.length) return;

  // Function to create video iframe
  function createVideo(url) {
    const iframe = document.createElement('iframe');
    iframe.src = url;
    iframe.width = '560';
    iframe.height = '315';
    iframe.frameBorder = '0';
    iframe.allow = 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture';
    iframe.allowFullscreen = true;
    return iframe;
  }

  // Load first video in main container
  const firstLink = links[0];
  const firstVideo = createVideo(firstLink.href);
  mainContainer.append(firstVideo);

  // Build thumbnails
  links.forEach((link, index) => {
    const thumb = document.createElement('button');
    thumb.className = 'gallery-thumb';
    thumb.textContent = `Video ${index + 1}`;

    thumb.addEventListener('click', () => {
      mainContainer.innerHTML = '';
      const video = createVideo(link.href);
      mainContainer.append(video);
    });

    thumbContainer.append(thumb);
  });
}
