import axios from "axios";
import {
    ADD_BANDLEADER_SONG_LOADING,
    ADD_BANDLEADER_SONG_SUCCESS,
    ADD_BANDLEADER_SONG_ERROR,
    GET_BANDLEADER_SONGS_LOADING,
    GET_BANDLEADER_SONGS_SUCCESS,
    GET_BANDLEADER_SONGS_ERROR,
    DELETE_BANDLEADER_SONG_LOADING,
    DELETE_BANDLEADER_SONG_SUCCESS,
    DELETE_BANDLEADER_SONG_ERROR
} from "./bandLeaderActionTypes";
import { tokenConfig } from "../authActions/authActions";

export const addBandleaderSongAction = (songName, artistName, songKey) => async dispatch => {

    await dispatch({
        type : ADD_BANDLEADER_SONG_LOADING
    })

    const requestBody = {songName, artistName, songKey};
    const headers = tokenConfig();

    axios.post(`${window.apiHost}/bandLeader/addSong`, requestBody, headers)
        .then(async response => {
            await dispatch({
                type : ADD_BANDLEADER_SONG_SUCCESS,
                payload : response.data
            });
        })
        .catch(async err => {
            await dispatch({
                type : ADD_BANDLEADER_SONG_ERROR,
                payload : err.response
            });
        });

};

export const deleteBandleaderSongAction = (songName, artistName, songKey) => async dispatch => {

    await dispatch({
        type : DELETE_BANDLEADER_SONG_LOADING,
    })

    const requestBody = {songName, artistName, songKey};
    const headers = tokenConfig();

    const config = {
        data : requestBody,
        headers : headers.headers
    }

    axios.delete(`${window.apiHost}/bandLeader/deleteSong`, config)
            .then(async response => {
                await dispatch({
                    type : DELETE_BANDLEADER_SONG_SUCCESS,
                    payload : response.data
                });
            })
            .catch(async err => {
                await dispatch({
                    type : DELETE_BANDLEADER_SONG_ERROR,
                    payload : err.response
                });
            });

}

export const getBandleaderSongsAction = () => async dispatch => {
    await dispatch({
        type : GET_BANDLEADER_SONGS_LOADING,
    })

    const headers = tokenConfig();

     axios.get(`${window.apiHost}/bandLeader/getSongs`, headers)
        .then(async response => {
            await dispatch({
                type : GET_BANDLEADER_SONGS_SUCCESS,
                payload : response.data
            });
        })
        .catch(async err => {
            await dispatch({
                type : GET_BANDLEADER_SONGS_ERROR,
                payload : err.response
            });
        });
};