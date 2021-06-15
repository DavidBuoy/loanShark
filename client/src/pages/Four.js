import "./video.css";
import video from "../video/ocean.mp4";

function init() {
  return (
    <div>
      <video id="myVideo" autoPlay loop muted>
        <source src={video} type="video/mp4" />
      </video>

      <div className="text-over-video">
        <h1>404 Page Not Found</h1>
        <a className="bigger-text" href="/">
          Head for Clearer Waters!
        </a>
      </div>
    </div>
  );
}

export default init;
