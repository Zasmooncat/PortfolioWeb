import React from "react";
import video1 from "../../video/acid_palmeras.mp4"
import video2 from "../../video/BranchOfLife1.mp4"
import video3 from "../../video/dithercam.mp4"
import video4 from "../../video/movieout.3.mp4"
import video5 from "../../video/movieout.5.mp4"
import video6 from "../../video/moviet.9.mp4"
import video7 from "../../video/TDMovieOut.0.mp4"
import video8 from "../../video/TDMovieOut.4.mp4"
import video9 from "../../video/TDMovieOut.7.mp4"
import video10 from "../../video/vecteezy_abstract-moving-.mp4"




const videos = [video1, video2, video3, video4, video5, video6, video7, video8, video9, video10
];

const VideoArt = () => {
    return (
        <div className="video-container">
            {videos.map((video, index) => (
                <video key={index} src={video} autoPlay loop muted />
            ))}
        </div>
    );
};

export default VideoArt;