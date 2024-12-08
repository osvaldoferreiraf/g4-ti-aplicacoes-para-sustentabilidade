import React from "react";
import Image from "next/image";
import PataAmarela from "../public/assets/img/PataAmarela.svg";

const videoUrls = [
  "https://www.youtube.com/embed/wl6RBLWvzpo",
  "https://www.youtube.com/embed/8MSplPL_S_0",
  "https://www.youtube.com/embed/01Wkpz8_Y-A",
  "https://www.youtube.com/embed/cFB4oP_o-WM",
  "https://www.youtube.com/embed/GxjmB4BMwyo",
  "https://www.youtube.com/embed/Z7IQNUA7i9Y",
  "https://www.youtube.com/embed/zTycQ3OP5-I",
];

export default function VideosPage() {
  return (
    <div>
      <div className="pata-videos">
        <Image src={PataAmarela} alt="pataAmarela" width={50} height={50} />
        <span className="videos-text">VÍDEOS</span>
      </div>
      <div className="videos-grid">
        {videoUrls.map((url, index) => (
          <div className="video-container" key={index}>
            <iframe
              src={url}
              title={`Video ${index + 1}`}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>
        ))}
      </div>
    </div>
  );
}
