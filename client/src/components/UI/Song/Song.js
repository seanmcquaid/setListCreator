import React from "react";
import PropTypes from "prop-types";
import Button from "../Button/Button";
import styles from "./Song.module.css";

const Song = props => {
    const {songName, artistName, songKey,deleteSongHandler} = props;
    return(
        <div className={styles.songContainer}>
            <h4 className={styles.songName}>Song Name : {songName}</h4>
            <h5 className={styles.artistName}>Artist Name : {artistName}</h5>
            {songKey ? 
                <p className={styles.songKey}>Key : {songKey}</p> :
                null
            }
            <Button 
                onClick={() => deleteSongHandler(songName, artistName, songKey ? songKey : null)}
                type="button"
                title="Remove"
            />
        </div>
    )
};

Song.propTypes = {
    songName : PropTypes.string.isRequired,
    artistName : PropTypes.string.isRequired,
    songKey : PropTypes.string,
    deleteSongHandler : PropTypes.func.isRequired
};

export default Song;