export default function decorate(block) {
  const assetPath = (block.dataset.videoasset || '').trim();

  if (!assetPath) {
    block.innerHTML = '<p>No video selected</p>';
    return;
  }

  let videoHtml = '';

  if (assetPath.includes('vimeo.com')) {
    const match = assetPath.match(/vimeo\.com\/(?:video\/)?(\d+)/);
    const videoId = match ? match[1] : null;
    if (videoId) {
      videoHtml = `
        <iframe
src="https://player.vimeo.com/video/${videoId}"
          width="640" height="360"
          frameborder="0"
          allow="autoplay; fullscreen; picture-in-picture"
          allowfullscreen>
        </iframe>`;
    } else {
      videoHtml = '<p>Invalid Vimeo URL</p>';
    }
  } else if (assetPath.endsWith('git statua.mp4')) {
    videoHtml = `
      <video controls width="640" height="360">
        <source src="${assetPath}" type="video/mp4">
        Your browser does not support the video tag.
      </video>`;
  } else {
    videoHtml = `
      <video controls width="640" height="360">
        <source src="${assetPath}">
        Your browser does not support the video tag.
      </video>`;
  }

  block.innerHTML = videoHtml;
}
