import {
  REGISTER_ERROR,
  LOGIN_ERROR,
  CHECK_TOKEN_ERROR,
  EDIT_USER_INFO_ERROR,
  GET_USER_INFO_ERROR,
} from "actions/authActions/authActionTypes";
import {
  ADD_BANDLEADER_SONG_ERROR,
  EDIT_BANDLEADER_SONG_ERROR,
  GET_BANDLEADER_SONGS_ERROR,
  DELETE_BANDLEADER_SONG_ERROR,
} from "actions/bandleaderActions/bandleaderActionTypes";
import {
  GET_CLIENT_SONGS_ERROR,
  ADD_CLIENT_REQUESTED_SONG_ERROR,
  ADD_CLIENT_DO_NOT_PLAY_SONG_ERROR,
  DELETE_CLIENT_SONG_ERROR,
  EDIT_CLIENT_SONG_ERROR,
} from "../../actions/clientActions/clientActionTypes";
import { CLEAR_ERROR_MESSAGE } from "actions/errorActions/errorActionTypes";

const initialState = {
  errorMessage: "",
};

const errorReducer = (state = initialState, action) => {
  switch (action.type) {
    case REGISTER_ERROR:
    case LOGIN_ERROR:
    case CHECK_TOKEN_ERROR:
    case EDIT_USER_INFO_ERROR:
    case ADD_BANDLEADER_SONG_ERROR:
    case EDIT_BANDLEADER_SONG_ERROR:
    case GET_BANDLEADER_SONGS_ERROR:
    case DELETE_BANDLEADER_SONG_ERROR:
    case GET_CLIENT_SONGS_ERROR:
    case ADD_CLIENT_REQUESTED_SONG_ERROR:
    case ADD_CLIENT_DO_NOT_PLAY_SONG_ERROR:
    case DELETE_CLIENT_SONG_ERROR:
    case EDIT_CLIENT_SONG_ERROR:
    case GET_USER_INFO_ERROR:
      if (action.payload) {
        return {
          ...state,
          errorMessage: action.payload.errorMessage,
        };
      }
      return {
        ...initialState,
      };
    case CLEAR_ERROR_MESSAGE:
      return {
        ...initialState,
      };
    default:
      return {
        ...state,
      };
  }
};

export default errorReducer;
