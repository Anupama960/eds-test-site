export default function decorate(block) {
  // Collect all video URLs from the block (anchor or plain text)
  const videoUrls = [...block.querySelectorAll('a')]
    .map(a => a.href)
    .concat(
      [...block.querySelectorAll('span, div, p')]
        .map(el => el.textContent.trim())
        .filter(url => url.endsWith('.mp4'))
    );

  if (!videoUrls.length) return;

  block.innerHTML = '';

  const galleryContainer = document.createElement('div');
  galleryContainer.className = 'video-gallery';

  const mainContainer = document.createElement('div');
  mainContainer.className = 'gallery-main-video';

  const thumbContainer = document.createElement('div');
  thumbContainer.className = 'gallery-thumbnails';

  // First video in center
  const firstVideo = document.createElement('video');
  firstVideo.controls = true;
  firstVideo.src = videoUrls[0];
  mainContainer.append(firstVideo);

  // Other videos as thumbnails
  videoUrls.forEach((url, index) => {
    if (index === 0) return;
    const thumb = document.createElement('div');
    thumb.className = 'gallery-thumb';
    thumb.textContent = `Video ${index+1}`;
    thumb.addEventListener('click', () => {
      mainContainer.innerHTML = '';
      const newVideo = document.createElement('video');
      newVideo.controls = true;
      newVideo.src = url;
      mainContainer.append(newVideo);
    });
    thumbContainer.append(thumb);
  });

  galleryContainer.append(mainContainer, thumbContainer);
  block.append(galleryContainer);
}
