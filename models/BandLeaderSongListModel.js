const database = require("../database/database");

const BandLeaderSongListModel = {

    addSong : (songName, artistName, songKey, username) => {
        database.query("INSERT INTO bandleadersonglist (songname, artistname, songkey, username) values($1, $2, $3, $4)", [songName, artistName, songKey, username]);
        return database.query("SELECT songname, artistname, songkey FROM bandleadersonglist where username=$1", [username]);
    }

};

module.exports = BandLeaderSongListModel;