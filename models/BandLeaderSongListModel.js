const database = require("../database/database");

const BandLeaderSongListModel = {

    addSong : async (songName, artistName, songKey, username) => {
        await database.query("INSERT INTO bandleadersonglist (songname, artistname, songkey, username) values($1, $2, $3, $4)", [songName, artistName, songKey, username]);
        return database.query("SELECT * FROM bandleadersonglist where username=$1", [username]);
    },

    getSongs : async username => {
        return database.query("SELECT * FROM bandleadersonglist where username=$1", [username]);
    },

    getSong : async (username, songId) => {
        return database.query("SELECT * FROM bandleadersonglist where username=$1 AND id=$2", [username, songId]);
    },

    deleteSong : async (username, songId) => {
        await database.query("DELETE FROM bandleadersonglist WHERE username=$1 AND id=$2 RETURNING *", [username, songId]);
        return database.query("SELECT * FROM bandleadersonglist where username=$1", [username]);
    },

    getListOfMatchedSongs : async (clientName, bandLeaderName) => {
        
    },

    editSong : async () => {
        await database.query("UPDATE QUERY HERE");
        return await database.query("SELECT UPDATED SONG HERE TO SHOW INFO");
    }

};

module.exports = BandLeaderSongListModel;