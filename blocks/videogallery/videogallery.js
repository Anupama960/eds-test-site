export default function decorate(block) {
  const links = Array.from(block.querySelectorAll('a'));
  if (!links.length) return;

  const container = document.createElement('div');
  container.className = 'videogallery videoplaylist--with-thumbs';

  const innerWrapper = document.createElement('div');
  innerWrapper.className = 'videoplaylist-inner';

  const videoArea = document.createElement('div');
  videoArea.className = 'video-area';

  function getVideoElement(url, autoplay = false) {
    const isYoutube = url.includes('youtube.com') || url.includes('youtu.be');
    const isVimeo = url.includes('vimeo.com');

    if (isYoutube) {
      const videoId = new URL(url).searchParams.get('v') || url.split('/').pop();
      const params = new URLSearchParams({
        autoplay: autoplay ? 1 : 0,
        rel: 0,
        playsinline: 1,
      });
      const iframe = document.createElement('iframe');
      iframe.src = `https://www.youtube.com/embed/${videoId}?${params.toString()}`;
      iframe.setAttribute('frameborder', '0');
      iframe.setAttribute('allow', 'autoplay; encrypted-media; picture-in-picture');
      iframe.setAttribute('allowfullscreen', '');
      iframe.className = 'main-video';
      return iframe;
    }

    if (isVimeo) {
      const videoId = url.split('/').pop();
      const params = new URLSearchParams({
        autoplay: autoplay ? 1 : 0,
        playsinline: 1,
      });
      const iframe = document.createElement('iframe');
      iframe.src = `https://player.vimeo.com/video/${videoId}?${params.toString()}`;
      iframe.setAttribute('frameborder', '0');
      iframe.setAttribute('allow', 'autoplay; fullscreen; picture-in-picture');
      iframe.setAttribute('allowfullscreen', '');
      iframe.className = 'main-video';
      return iframe;
    }

    const video = document.createElement('video');
    video.src = url;
    video.controls = true;
    if (autoplay) video.autoplay = true;
    video.setAttribute('playsinline', '');
    video.setAttribute('preload', 'metadata');
    video.className = 'main-video';
    return video;
  }

  let mainVideo = getVideoElement(links[0].href);
  videoArea.appendChild(mainVideo);

  const thumbsArea = document.createElement('div');
  thumbsArea.className = 'video-thumbs-area';

  const thumbsContainer = document.createElement('div');
  thumbsContainer.className = 'video-thumbs';

  links.forEach((link, index) => {
    const thumbWrapper = document.createElement('div');
    thumbWrapper.className = `video-thumb ${index === 0 ? 'active' : ''}`;
    thumbWrapper.dataset.videoNum = index;

    const thumb = document.createElement('video');
    thumb.className = 'playlist-video';
    thumb.src = link.href;
    thumb.muted = true;
    thumb.setAttribute('playsinline', '');
    thumb.setAttribute('preload', 'metadata');

    thumbWrapper.addEventListener('click', () => {
      const newMain = getVideoElement(link.href, true);
      videoArea.innerHTML = '';
      videoArea.appendChild(newMain);
      mainVideo = newMain;

      thumbsContainer.querySelectorAll('.video-thumb')
        .forEach((el) => el.classList.remove('active'));
      thumbWrapper.classList.add('active');
    });

    thumbWrapper.appendChild(thumb);
    thumbsContainer.appendChild(thumbWrapper);
  });

  thumbsArea.appendChild(thumbsContainer);

  innerWrapper.append(videoArea, thumbsArea);
  container.append(innerWrapper);
  block.append(container);
}
