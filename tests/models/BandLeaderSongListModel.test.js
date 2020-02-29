const BandLeaderSongListModel = require("../../models/BandLeaderSongListModel");
const expect = require("chai").expect;

describe("BandLeaderSongListModel", () => {

    describe("addSong", () => {
        let id;
        
        const songInfo = {
            songName : "Uptown Funk",
            artistName : "Bruno Mars",
            songKey : "D Minor",
            username : "testuser@gmail.com"
        };

        const {songName, artistName, songKey, username} = songInfo;

        it("addSong", async () => {
    
            await BandLeaderSongListModel.addSong(songName, artistName, songKey, username)
                                        .then(async response => {
                                            const expectedResponse = { 
                                                username: "testuser@gmail.com",
                                                songname: "Uptown Funk",
                                                songkey: "D Minor",
                                                artistname: "Bruno Mars" 
                                            };
    
                                            const songsResponse = response[0];

                                            id = songsResponse.id;
                                            
                                            expect(expectedResponse.username).to.equal(songsResponse.username);
                                            expect(expectedResponse.songname).to.equal(songsResponse.songname);
                                            expect(expectedResponse.songkey).to.equal(songsResponse.songkey);
                                            expect(expectedResponse.artistname).to.equal(songsResponse.artistname);
                                        })
                                        .catch(err => console.log(err));
        });

        afterEach(done => {
            BandLeaderSongListModel.deleteSong(username, id)
                                        .then(response => done())
                                        .catch(err => console.log(err));
        });
    });


    describe("getSongs", done => {
        let id, id2;
        
        const songInfo = {
            songName : "Uptown Funk",
            artistName : "Bruno Mars",
            songKey : "D Minor",
            username : "testuser@gmail.com"
        };

        const songInfo2 = {
            songName : "Treasure",
            artistName : "Bruno Mars",
            songKey : "Eb Major",
            username : "testuser@gmail.com"
        };

        const {songName, artistName, songKey, username} = songInfo;

        beforeEach(done => {
            BandLeaderSongListModel.addSong(songName, artistName, songKey, username)
                                        .then(async response => {
                                            id = response[0].id
                                        })
                                        .catch(err => console.log(err));
            BandLeaderSongListModel.addSong(songInfo2.songName, songInfo2.artistName, songInfo2.songKey, songInfo2.username)
                                        .then(async response => {
                                            id2 = response[0].id
                                            done();
                                        })
                                        .catch(err => console.log(err));
        });

        it("getSongs", async () => {
            return await BandLeaderSongListModel.getSongs(username)
                                        .then(async response => {
                                            expect(response.length).to.equal(2);
                                        })
                                        .catch(err => console.log(err));

        });

        afterEach(done => {
            BandLeaderSongListModel.deleteSong(username, id)
                                        .then(response => {})
                                        .catch(err => console.log(err));
            BandLeaderSongListModel.deleteSong(username , id2)
                                        .then(response => done())
                                        .catch(err => console.log(err));
        });

    });

    describe("getSong", () => {
        let id;
        
        const songInfo = {
            songName : "Uptown Funk",
            artistName : "Bruno Mars",
            songKey : "D Minor",
            username : "testuser@gmail.com"
        };

        const {songName, artistName, songKey, username} = songInfo;

        beforeEach(done => {
            BandLeaderSongListModel.addSong(songName, artistName, songKey, username)
                                        .then(response => {
                                            id = response[0].id
                                            done();
                                        })
                                        .catch(err => console.log(err));
        });

        it("getSong", async () => {
            await BandLeaderSongListModel.getSong(songInfo.username, id)
                                .then(async response => {
                                    
                                    const expectedResponse = { 
                                        username: "testuser@gmail.com",
                                        songname: "Uptown Funk",
                                        songkey: "D Minor",
                                        artistname: "Bruno Mars" 
                                    };

                                    const songsResponse = response[0];

                                    id = songsResponse.id;
                                    
                                    expect(expectedResponse.username).to.equal(songsResponse.username);
                                    expect(expectedResponse.songname).to.equal(songsResponse.songname);
                                    expect(expectedResponse.songkey).to.equal(songsResponse.songkey);
                                    expect(expectedResponse.artistname).to.equal(songsResponse.artistname);
                                })
                                .catch(err => console.log(err));
        });

        afterEach(done => {
            BandLeaderSongListModel.deleteSong(username , id)
                                        .then(response => done())
                                        .catch(err => console.log(err));
        });

    });

    describe("deleteSong", () => {
        let id;
        
        const songInfo = {
            songName : "Uptown Funk",
            artistName : "Bruno Mars",
            songKey : "D Minor",
            username : "testuser@gmail.com"
        };

        const {songName, artistName, songKey, username} = songInfo;

        beforeEach(done => {
            BandLeaderSongListModel.addSong(songName, artistName, songKey, username)
                                        .then(response => {
                                            id = response[0].id
                                            done();
                                        })
                                        .catch(err => console.log(err));
        });

        it("deleteSong", async () => {
            await BandLeaderSongListModel.deleteSong(username, id)
                                        .then(response => {
                                            // console.log(response);
                                        })
                                        .catch(err => console.log(err));
        });

    });

    describe("editSong", () => {
        let id;
        
        const songInfo = {
            songName : "Uptown Funk",
            artistName : "Bruno Mars",
            songKey : "D Minor",
            username : "testuser@gmail.com"
        };

        const {songName, artistName, songKey, username} = songInfo;

        beforeEach(done => {
            BandLeaderSongListModel.addSong(songName, artistName, songKey, username)
                                        .then(response => {
                                            id = response[0].id
                                            console.log(response)
                                            done();
                                        })
                                        .catch(err => console.log(err));
        });

        it("editSong", async () => {

            const updatedSong = {
                songName : "Treasure",
                artistName : "Bruno Mars",
                songKey : "Eb Major",
                username : "testuser@gmail.com"
            };

            console.log(id);

            await BandLeaderSongListModel.editSong(id, updatedSong.songName, updatedSong.artistName, updatedSong.songKey, updatedSong.username)
                                .then(async response => {
                                    console.log(response);
                                })
                                .catch(err => console.log(err));
        });

        afterEach(done => {
            return BandLeaderSongListModel.deleteSong(username , id)
                                        .then(response => {
                                            console.log(response)
                                            done()
                                        })
                                        .catch(err => console.log(err));
        });
    })

});