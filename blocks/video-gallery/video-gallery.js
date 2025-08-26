const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

function getVideoElement(source, autoplay, background) {
  const video = document.createElement("video");
  video.setAttribute("controls", "");
  if (autoplay) video.setAttribute("autoplay", "");
  if (background) {
    video.setAttribute("loop", "");
    video.setAttribute("playsinline", "");
    video.removeAttribute("controls");
    video.addEventListener("canplay", () => {
      video.muted = true;
if (autoplay) video.play();
    });
  }

  const sourceEl = document.createElement("source");
  sourceEl.setAttribute("src", source);
  sourceEl.setAttribute("type", `video/${source.split(".").pop()}`);
  video.append(sourceEl);

  return video;
}

export default async function decorate(block) {
  const links = Array.from(block.querySelectorAll("a"));
  if (!links.length) return;

  block.textContent = "";
  block.dataset.embedLoaded = false;

  const autoplay = block.classList.contains("autoplay");

  // Main container
  const mainContainer = document.createElement("div");
  mainContainer.className = "gallery-main-video";
  block.append(mainContainer);

  // Thumbnail container
  const thumbContainer = document.createElement("div");
  thumbContainer.className = "gallery-thumbnails";
  block.append(thumbContainer);

  // Load first video
  const firstVideoUrl = links[0].href;
  const firstVideoEl = getVideoElement(firstVideoUrl, autoplay, false);
  mainContainer.append(firstVideoEl);
  block.dataset.embedLoaded = true;

  // Add thumbnails for switching videos
  links.forEach((link, index) => {
    const thumb = document.createElement("div");
    thumb.className = "gallery-thumb";
    thumb.textContent = `Video ${index + 1}`; // can be replaced with thumbnail preview
    thumb.addEventListener("click", () => {
      mainContainer.innerHTML = "";
      const newVideo = getVideoElement(link.href, true, false);
      mainContainer.append(newVideo);
    });
    thumbContainer.append(thumb);
  });

  // Auto play on scroll
  if (autoplay) {
    const observer = new IntersectionObserver((entries) => {
      if (entries.some((e) => e.isIntersecting)) {
        observer.disconnect();
        if (!prefersReducedMotion.matches) {
          const video = mainContainer.querySelector("video");
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
