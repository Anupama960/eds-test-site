export default function decorate(block) {
  const assetPath = (block.dataset.videoasset || "").trim();

  if (!videoPath) {
    block.innerHTML = "<p>No video</p>";
    return;
  }

  const videoHtml = 
    <video controls width="640" height="360">
        <source src="${videoPath}" type="video/mp4" />
        doesn't support video tag.
    </video>
     

  block.innerHTML = videoHtml;
}
