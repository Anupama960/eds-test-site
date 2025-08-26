const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

function getVideoElement(source, autoplay, background, isThumb = false) {
  const video = document.createElement('video');
  if (!isThumb) video.setAttribute('controls', '');
  if (autoplay) video.setAttribute('autoplay', '');
  if (background) {
    video.setAttribute('loop', '');
    video.setAttribute('playsinline', '');
    video.removeAttribute('controls');
    video.addEventListener('canplay', () => {
      video.muted = true;
if (autoplay) video.play();
    });
  }

  const sourceEl = document.createElement('source');
  sourceEl.setAttribute('src', source);
  sourceEl.setAttribute('type', `video/${source.split('.').pop()}`);
  video.append(sourceEl);

  // Thumbnail styling
  if (isThumb) {
    video.muted = true;
    video.playsInline = true;
    video.loop = true;
    video.autoplay = true;
  }

  return video;
}

export default async function decorate(block) {
  const links = Array.from(block.querySelectorAll(''));
  if (!links.length) return;

  block.textContent = "";
  block.dataset.embedLoaded = false;

  const autoplay = block.classList.contains('autoplay');

  // Main gallery container (flex layout handled in CSS)
  const galleryWrapper = document.createElement('div');
  galleryWrapper.className = 'video-gallery-wrapper';

  // Main video container
  const mainContainer = document.createElement('div');
  mainContainer.className = 'gallery-main-video';

  // Thumbnail container
  const thumbContainer = document.createElement('div');
  thumbContainer.className = 'gallery-thumbnails';

  galleryWrapper.append(mainContainer, thumbContainer);
  block.append(galleryWrapper);

  // Load the first video as main
  const firstVideoUrl = links[0].href;
  const mainVideo = getVideoElement(firstVideoUrl, autoplay, false);
  mainVideo.classList.add('main-video');
  mainContainer.append(mainVideo);
  block.dataset.embedLoaded = true;

  // Create thumbnails for the rest
  links.forEach((link, index) => {
    const isFirst = index === 0;
    const thumbVideo = getVideoElement(link.href, false, false, true);
    thumbVideo.classList.add('thumb-video');

    if (!isFirst) {
      thumbVideo.addEventListener('click', () => {
        mainContainer.innerHTML = "';
        const newVideo = getVideoElement(link.href, true, false);
        newVideo.classList.add('main-video');
        mainContainer.append(newVideo);
newVideo.play();
      });
    }

    thumbContainer.append(thumbVideo);
  });
 
  // Auto play on scroll
  if (autoplay) {
    const observer = new IntersectionObserver((entries) => {
      if (entries.some((e) => e.isIntersecting)) {
        observer.disconnect();
        if (!prefersReducedMotion.matches) {
          const video = mainContainer.querySelector('video');
          if (video) {
            video.muted = true;
video.play();
          }
        }
      }
    });
    observer.observe(block);
  }
}
