import React from "react";
import PropTypes from "prop-types";

export default function YoutubeEmbed({ embedId }: { embedId: string }) {
    return (
        <div className="overflow-hidden pb-[56.25%] relative h-0 w-full">
            <iframe
                width="853"
                height="480"
                src={`https://www.youtube.com/embed/${embedId}`}
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                title="Embedded youtube"
                className="left-0 top-0 absolute w-full h-full"
            />
        </div>
    );
}

YoutubeEmbed.propTypes = {
    embedId: PropTypes.string.isRequired,
};
