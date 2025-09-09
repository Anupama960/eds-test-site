export default function decorate(block) {
  const links = Array.from(block.querySelectorAll('a'));
  if (!links.length) return;

  const container = document.createElement('div');
  container.className = 'videogallery videogallery--with-thumbs';

  const innerWrapper = document.createElement('div');
  innerWrapper.className = 'videoplaylist-inner';

  const videoArea = document.createElement('div');
  videoArea.className = 'video-area';

  function getVideoElement(url, autoplay = false) {
    const isYoutube = url.includes('youtube.com') || url.includes('youtu.be');
    const isVimeo = url.includes('vimeo.com');

    if (isYoutube) {
      let videoId;
      try {
        const parsedUrl = new URL(url);
        videoId = parsedUrl.searchParams.get('v') || parsedUrl.pathname.split('/').pop();
      } catch (e) {
        videoId = url.split('/').pop();
      }
      videoId = videoId.split('?')[0];

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
      const videoId = url.split('/').pop().split('?')[0];
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

  function getThumbnailUrl(url) {
    if (url.includes('youtube.com') || url.includes('youtu.be')) {
      let videoId;
      try {
        const parsedUrl = new URL(url);
        videoId = parsedUrl.searchParams.get('v') || parsedUrl.pathname.split('/').pop();
      } catch (e) {
        videoId = url.split('/').pop();
      }
      videoId = videoId.split('?')[0];
      return `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`;
    }
    if (url.includes('vimeo.com')) {
      const videoId = url.split('/').pop().split('?')[0];
      return `https://vumbnail.com/${videoId}.jpg`;
    }
    if (url.includes('/content/dam/')) {
      return url.replace(/\.mp4$/, '.thumb.jpg');
    }
    return null;
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

    const thumb = document.createElement('img');
    thumb.src = getThumbnailUrl(link.href) || 'default-thumbnail.jpg';
    thumb.alt = `Thumbnail ${index + 1}`;
    thumb.loading = 'lazy';
    thumb.className = 'playlist-thumbnail';

    thumbWrapper.addEventListener('click', () => {
      const newMain = getVideoElement(link.href, true);
      videoArea.innerHTML = '';
      videoArea.appendChild(newMain);

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
