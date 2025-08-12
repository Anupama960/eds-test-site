export default function decorate(block) {
  const assetPath = (block.dataset.videoasset || "").trim();

  if (!assetPath) {
    block.innerHTML = "<p>No video</p>";
    return;
  }

  const match = assetPath.match(/vimeo\.com\/(?.video\/)?(\d+)/);
  const videoId = match ? match[1] : null;

  const videoHtml = (
    <iframe
      src="https://player.vimeo.com/video/${videoId}"
      width="640"
      height="360"
      frameborder="0"
      allow="autoplay; fullscreen; picture-in-picture"
      allowfullscreen
    ></iframe>
  );

  block.innerHTML = videoHtml;
}
