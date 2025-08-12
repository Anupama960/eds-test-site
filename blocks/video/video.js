export default function decorate(block) {
  let videoPath = (block.dataset.videoasset || "").trim();

  if (!videoPath) {
    block.innerHTML = "<p>No video</p>";
    return;
  }

  if (videoPath.startsWith('/content/dam')) {
    videoPath = '${window.location.origin}${videoPath}';
  }


  block.innerHTML = <video controls width="640" height="360">
        <source src="${videoPath}" type="video/mp4" />
        doesn't support video tag.
    </video>;
}
