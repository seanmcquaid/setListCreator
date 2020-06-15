import {
    ADD_BANDLEADER_SONG_LOADING,
    ADD_BANDLEADER_SONG_SUCCESS,
    ADD_BANDLEADER_SONG_ERROR,
    EDIT_BANDLEADER_SONG_LOADING,
    EDIT_BANDLEADER_SONG_ERROR,
    EDIT_BANDLEADER_SONG_SUCCESS,
    GET_BANDLEADER_SONGS_LOADING,
    GET_BANDLEADER_SONGS_SUCCESS,
    GET_BANDLEADER_SONGS_ERROR,
    GET_BANDLEADER_CLIENTS_LOADING,
    GET_BANDLEADER_CLIENTS_SUCCESS,
    GET_BANDLEADER_CLIENTS_ERROR,
    DELETE_BANDLEADER_SONG_LOADING,
    DELETE_BANDLEADER_SONG_SUCCESS,
    DELETE_BANDLEADER_SONG_ERROR,
} from "actions/bandleaderActions/bandleaderActionTypes";
import { LOGOUT_SUCCESS } from "actions/authActions/authActionTypes";
import bandleaderReducer from "./bandleaderReducer";

const initialState = {
    clientList : [],
    songList : [],
    isLoading : false,
};

describe("bandleaderReducer", () => {
    describe("LOADING", () => {
        test("ADD_BANDLEADER_SONG_LOADING", () => {
            const action = {
                type : ADD_BANDLEADER_SONG_LOADING,
            };

            const expectedResult = {
                clientList : [],
                songList : [],
                isLoading : true,
            };

            expect(bandleaderReducer(initialState, action)).toEqual(expectedResult);
        });

        test("GET_BANDLEADER_SONGS_LOADING", () => {
            const action = {
                type : GET_BANDLEADER_SONGS_LOADING,
            };

            const expectedResult = {
                clientList : [],
                songList : [],
                isLoading : true,
            };

            expect(bandleaderReducer(initialState, action)).toEqual(expectedResult);
        });

        test("DELETE_BANDLEADER_SONG_LOADING", () => {
            const action = {
                type : DELETE_BANDLEADER_SONG_LOADING,
            };

            const expectedResult = {
                clientList : [],
                songList : [],
                isLoading : true,
            };

            expect(bandleaderReducer(initialState, action)).toEqual(expectedResult);
        });

        test("EDIT_BANDLEADER_SONG_LOADING", () => {
            const action = {
                type : EDIT_BANDLEADER_SONG_LOADING,
            };

            const expectedResult = {
                clientList : [],
                songList : [],
                isLoading : true,
            };

            expect(bandleaderReducer(initialState, action)).toEqual(expectedResult);
        });

        test("GET_BANDLEADER_CLIENTS_LOADING", () => {
            const action = {
                type : GET_BANDLEADER_CLIENTS_LOADING,
            };

            const expectedResult = {
                clientList : [],
                songList : [],
                isLoading : true,
            };

            expect(bandleaderReducer(initialState, action)).toEqual(expectedResult);
        });
    });
});