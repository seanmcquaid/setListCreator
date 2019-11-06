import React, {useState, useEffect} from "react";
import Container from "../../UI/Container/Container";
import Text from "../../UI/Text/Text";
import Input from "../../UI/Input/Input";
import Button from "../../UI/Button/Button";
import styles from "./AddSongsPage.module.css";
import {addSongAction, getSongsAction} from "../../../actions/bandLeaderActions/bandLeaderActions";
import {useDispatch, useSelector} from "react-redux";
import Song from "../../UI/Song/Song";

const AddSongsPage = props => {
    const [songName, setSongName] = useState("");
    const [artistName, setArtistName] = useState("");
    const [songKey, setSongKey] = useState("");
    const [currentSongs, setCurrentSongs] = useState([]);
    const songsFromDatabase = useSelector(state => state.bandLeader.songList);

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getSongsAction());
        setCurrentSongs(songsFromDatabase);
    }, [dispatch, songsFromDatabase])

    const songNameOnChangeHandler = event => {
        setSongName(event.target.value);
    };

    const artistNameOnChangeHandler = event => {
        setArtistName(event.target.value);
    };
    
    const songKeyOnChangeHandler = event => {
        setSongKey(event.target.value);
    };

    const addSongSubmitHandler = event => {
        event.preventDefault();
        dispatch(addSongAction(songName, artistName, songKey));
        setSongName("");
        setArtistName("");
        setSongKey("");
    };

    const deleteSongHandler = (songName, artistName, songKey) => {
        
    };

    const songsList = currentSongs.map((song, key) => {
        return <Song
                    key={key}
                    songName={song.songname}
                    artistName={song.artistname}
                    songKey={song.songkey}
                    deleteSongHandler={deleteSongHandler}
                />
    });

    return(
        <Container centered={true}>
            <Text headerText={true}>Add Songs Page</Text>
            <form className={styles.addSongForm} onSubmit={addSongSubmitHandler}>
                <Input
                    name="songName"
                    title="Song Name"
                    type="text"
                    placeholder="Enter song name here"
                    value={songName}
                    onChangeHandler={songNameOnChangeHandler}
                />
                <Input
                    name="artistName"
                    title="Artist Name"
                    type="text"
                    placeholder="Enter artist name here"
                    value={artistName}
                    onChangeHandler={artistNameOnChangeHandler}
                />
                <Input
                    name="keyName"
                    title="Key"
                    type="text"
                    placeholder="Enter key here"
                    value={songKey}
                    onChangeHandler={songKeyOnChangeHandler}
                />
                <Button title="Add Song" type="submit"/>
            </form>
            <div className={styles.songsListContainer}>
                {songsList}
            </div>
        </Container>
    )
};

export default AddSongsPage;