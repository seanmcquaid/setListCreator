const chai = require("chai");
const chaiHttp = require("chai-http");
const expect = chai.expect;
const server = require("../../app");
const UsersModel = require("../../models/UsersModel");
const BandleaderSongListModel = require("../../models/BandleaderSongListModel");
const SetListsModel = require("../../models/SetListsModel");
const config = require("../../config/config");
const jwt = require("jsonwebtoken");

chai.use(chaiHttp);

describe("Bandleader Routes", () => {
  describe("addSong", () => {
    let token, songId;

    const userInfo = {
      username: "testBandleader",
      password: "testPassword",
      accountType: "bandleader",
    };

    const { username, password, accountType } = userInfo;

    before(async () => {
      return await UsersModel.register(username, password, accountType)
        .then((response) => {
          const specificUserInfo = response[0];
          const { id, accounttype } = specificUserInfo;
          token = jwt.sign(
            {
              id: id,
              username: specificUserInfo.username,
              accountType: accounttype,
            },
            config.jwtSecret,
            { expiresIn: 3600000 }
          );
        })
        .catch((err) => console.log(err));
    });

    it("addSong", (done) => {
      const body = {
        songName: "Treasure",
        artistName: "Bruno Mars",
        songKey: "F Major",
      };

      chai
        .request(server)
        .post("/bandleader/addSong")
        .set("Authorization", token)
        .send(body)
        .end((err, res) => {
          const expectedResponse = {
            songName: "Treasure",
            artistName: "Bruno Mars",
            songKey: "F Major",
            username: "testBandleader",
          };

          songId = res.body.songList[0].id;

          expect(res.body.songList.length).to.be.greaterThan(0);

          expect(res.body.songList[0].songname).to.be.equal(
            expectedResponse.songName
          );
          expect(res.body.songList[0].artistname).to.be.equal(
            expectedResponse.artistName
          );
          expect(res.body.songList[0].songkey).to.be.equal(
            expectedResponse.songKey
          );
          expect(res.body.songList[0].username).to.be.equal(
            expectedResponse.username
          );

          done();
        });
    });

    after(async () => UsersModel.deleteUser(username));

    after(async () => BandleaderSongListModel.deleteSong(username, songId));
  });

  describe("getSongs", () => {
    let token, songId;

    const userInfo = {
      username: "testBandleader",
      password: "testPassword",
      accountType: "bandleader",
    };

    const { username, password, accountType } = userInfo;

    before(async () => {
      return await UsersModel.register(username, password, accountType)
        .then((response) => {
          const specificUserInfo = response[0];
          const { id, accounttype } = specificUserInfo;
          token = jwt.sign(
            {
              id: id,
              username: specificUserInfo.username,
              accountType: accounttype,
            },
            config.jwtSecret,
            { expiresIn: 3600000 }
          );
        })
        .catch((err) => console.log(err));
    });

    const songInfo = {
      songName: "Treasure",
      artistName: "Bruno Mars",
      songKey: "F Major",
    };

    const { songName, artistName, songKey } = songInfo;

    before(async () => {
      return await BandleaderSongListModel.addSong(
        songName,
        artistName,
        songKey,
        username
      )
        .then((response) => {
          songId = response[0].id;
        })
        .catch((err) => console.log(err));
    });

    it("getSongs", (done) => {
      chai
        .request(server)
        .get("/bandleader/getSongs")
        .set("Authorization", token)
        .end((err, res) => {
          expect(res.body.songList.length).to.be.greaterThan(0);

          done();
        });
    });

    after(async () => UsersModel.deleteUser(username));

    after(async () => BandleaderSongListModel.deleteSong(username, songId));
  });

  describe("getSong", () => {
    let token, songId;

    const userInfo = {
      username: "testBandleader",
      password: "testPassword",
      accountType: "bandleader",
    };

    const { username, password, accountType } = userInfo;

    before(async () => {
      return await UsersModel.register(username, password, accountType)
        .then((response) => {
          const specificUserInfo = response[0];
          const { id, accounttype } = specificUserInfo;
          token = jwt.sign(
            {
              id: id,
              username: specificUserInfo.username,
              accountType: accounttype,
            },
            config.jwtSecret,
            { expiresIn: 3600000 }
          );
        })
        .catch((err) => console.log(err));
    });

    const songInfo = {
      songName: "Treasure",
      artistName: "Bruno Mars",
      songKey: "F Major",
    };

    const { songName, artistName, songKey } = songInfo;

    before(async () => {
      return await BandleaderSongListModel.addSong(
        songName,
        artistName,
        songKey,
        username
      )
        .then((response) => {
          songId = response[0].id;
        })
        .catch((err) => console.log(err));
    });

    it("getSong", (done) => {
      chai
        .request(server)
        .get(`/bandleader/getSong/${songId}`)
        .set("Authorization", token)
        .end((err, res) => {
          const expectedResponse = {
            songName: "Treasure",
            artistName: "Bruno Mars",
            songKey: "F Major",
            username: "testBandleader",
          };

          expect(res.body.songInfo.songname).to.be.equal(
            expectedResponse.songName
          );
          expect(res.body.songInfo.artistname).to.be.equal(
            expectedResponse.artistName
          );
          expect(res.body.songInfo.songkey).to.be.equal(
            expectedResponse.songKey
          );
          expect(res.body.songInfo.username).to.be.equal(
            expectedResponse.username
          );

          done();
        });
    });

    after(async () => UsersModel.deleteUser(username));

    after(async () => BandleaderSongListModel.deleteSong(username, songId));
  });

  describe("deleteSong", () => {
    let token, songId;

    const userInfo = {
      username: "testBandleader",
      password: "testPassword",
      accountType: "bandleader",
    };

    const { username, password, accountType } = userInfo;

    before(async () => {
      return await UsersModel.register(username, password, accountType)
        .then((response) => {
          const specificUserInfo = response[0];
          const { id, accounttype } = specificUserInfo;
          token = jwt.sign(
            {
              id: id,
              username: specificUserInfo.username,
              accountType: accounttype,
            },
            config.jwtSecret,
            { expiresIn: 3600000 }
          );
        })
        .catch((err) => console.log(err));
    });

    const songInfo = {
      songName: "Treasure",
      artistName: "Bruno Mars",
      songKey: "F Major",
    };

    const { songName, artistName, songKey } = songInfo;

    before(async () => {
      return await BandleaderSongListModel.addSong(
        songName,
        artistName,
        songKey,
        username
      )
        .then((response) => {
          songId = response[0].id;
        })
        .catch((err) => console.log(err));
    });

    it("deleteSong", (done) => {
      chai
        .request(server)
        .delete(`/bandleader/deleteSong/${songId}`)
        .set("Authorization", token)
        .end((err, res) => {
          expect(res.body.songList.length).to.be.equal(0);

          done();
        });
    });

    after(async () => UsersModel.deleteUser(username));
  });

  describe("editSong", () => {
    let token, songId;

    const userInfo = {
      username: "testBandleader",
      password: "testPassword",
      accountType: "bandleader",
    };

    const { username, password, accountType } = userInfo;

    before(async () => {
      return await UsersModel.register(username, password, accountType)
        .then((response) => {
          const specificUserInfo = response[0];
          const { id, accounttype } = specificUserInfo;
          token = jwt.sign(
            {
              id: id,
              username: specificUserInfo.username,
              accountType: accounttype,
            },
            config.jwtSecret,
            { expiresIn: 3600000 }
          );
        })
        .catch((err) => console.log(err));
    });

    const songInfo = {
      songName: "Treasure",
      artistName: "Bruno Mars",
      songKey: "F Major",
    };

    const { songName, artistName, songKey } = songInfo;

    before(async () => {
      return await BandleaderSongListModel.addSong(
        songName,
        artistName,
        songKey,
        username
      )
        .then((response) => {
          songId = response[0].id;
        })
        .catch((err) => console.log(err));
    });

    it("editSong", (done) => {
      const body = {
        songName: "Uptown Funk",
        artistName: "Bruno Mars",
        songKey: "D Minor",
      };

      chai
        .request(server)
        .patch(`/bandleader/editSong/${songId}`)
        .set("Authorization", token)
        .send(body)
        .end((err, res) => {
          const expectedResponse = {
            songName: "Uptown Funk",
            artistName: "Bruno Mars",
            songKey: "D Minor",
            username: "testBandleader",
          };

          expect(res.body.songList[0].songname).to.be.equal(
            expectedResponse.songName
          );
          expect(res.body.songList[0].artistname).to.be.equal(
            expectedResponse.artistName
          );
          expect(res.body.songList[0].songkey).to.be.equal(
            expectedResponse.songKey
          );
          expect(res.body.songList[0].username).to.be.equal(
            expectedResponse.username
          );

          done();
        });
    });

    after(async () => UsersModel.deleteUser(username));

    after(async () => BandleaderSongListModel.deleteSong(username, songId));
  });

  describe("getClientSongs", () => {
    let token, clientId;

    const bandleaderUsername = "testBandleader";
    const clientUsername = "testClient";

    const clientInfo = {
      username: clientUsername,
      password: "password",
      accountType: "client",
      bandleaderName: bandleaderUsername,
    };

    before(async () => {
      return await UsersModel.register(
        clientInfo.username,
        clientInfo.password,
        clientInfo.accountType,
        clientInfo.bandleaderName
      )
        .then((response) => {
          const specificUserInfo = response[0];
          const { id } = specificUserInfo;
          clientId = id;
        })
        .catch((err) => console.log(err));
    });

    const bandleaderInfo = {
      username: bandleaderUsername,
      password: "password",
      accountType: "bandleader",
    };

    before(async () => {
      return await UsersModel.register(
        bandleaderInfo.username,
        bandleaderInfo.password,
        bandleaderInfo.accountType
      )
        .then((response) => {
          const specificUserInfo = response[0];
          const { id, accounttype } = specificUserInfo;
          token = jwt.sign(
            {
              id: id,
              username: specificUserInfo.username,
              accountType: accounttype,
            },
            config.jwtSecret,
            { expiresIn: 3600000 }
          );
        })
        .catch((err) => console.log(err));
    });

    it("getClientSongs", (done) => {
      chai
        .request(server)
        .get(`/bandleader/getClientSongs/${clientId}`)
        .set("Authorization", token)
        .end((err, res) => {
          const expectedResponse = {
            userInfo: {
              id: clientId,
              username: clientUsername,
              accountType: clientInfo.accountType,
              bandleaderName: bandleaderUsername,
              setListAvailable: false,
            },
            requestedSongsList: [],
            doNotPlaySongsList: [],
          };

          expect(res.body.userInfo.id).to.be.equal(
            expectedResponse.userInfo.id
          );
          expect(res.body.userInfo.username).to.be.equal(
            expectedResponse.userInfo.username
          );
          expect(res.body.userInfo.accountType).to.be.equal(
            expectedResponse.userInfo.accountType
          );
          expect(res.body.userInfo.bandleaderName).to.be.equal(
            expectedResponse.userInfo.bandleaderName
          );
          expect(res.body.userInfo.setListAvailable).to.be.equal(
            expectedResponse.userInfo.setListAvailable
          );

          expect(res.body.requestedSongsList).to.be.eql(
            expectedResponse.requestedSongsList
          );
          expect(res.body.doNotPlaySongsList).to.be.eql(
            expectedResponse.doNotPlaySongsList
          );

          done();
        });
    });

    after(async () => await UsersModel.deleteUser(clientUsername));

    after(async () => await UsersModel.deleteUser(bandleaderUsername));
  });

  describe("getSuggestedSetList", () => {
    let token, clientId;

    const bandleaderUsername = "getCompletedSetList";

    const clientUsername = "client";

    const clientInfo = {
      username: clientUsername,
      password: "password",
      accountType: "client",
      bandleaderName: bandleaderUsername,
    };

    const { username, password, accountType, bandleaderName } = clientInfo;

    before(async () => {
      return await UsersModel.register(
        username,
        password,
        accountType,
        bandleaderName
      )
        .then((response) => {
          clientId = response[0].id;
        })
        .catch((err) => console.log(err));
    });

    const bandleaderInfo = {
      username: bandleaderUsername,
      password: "password",
      accountType: "bandleader",
    };

    before(async () => {
      return await UsersModel.register(
        bandleaderInfo.username,
        bandleaderInfo.password,
        bandleaderInfo.accountType
      )
        .then((response) => {
          const specificUserInfo = response[0];
          const { id, accounttype } = specificUserInfo;
          token = jwt.sign(
            {
              id: id,
              username: specificUserInfo.username,
              accountType: accounttype,
            },
            config.jwtSecret,
            { expiresIn: 3600000 }
          );
        })
        .catch((err) => console.log(err));
    });

    it("getSuggestedSetList", (done) => {
      chai
        .request(server)
        .get(`/bandleader/getSuggestedSetList/${clientId}`)
        .set("Authorization", token)
        .end((err, res) => {
          const expectedResponse = {
            suggestedSetList: [],
            additionalClientRequests: [],
            clientComments: [],
          };

          expect(res.body.suggestedSetList).to.be.eql(
            expectedResponse.suggestedSetList
          );
          expect(res.body.additionalClientRequests).to.be.eql(
            expectedResponse.additionalClientRequests
          );
          expect(res.body.clientComments).to.be.eql(
            expectedResponse.clientComments
          );

          done();
        });
    });

    after(async () => await UsersModel.deleteUser(username));

    after(async () => await UsersModel.deleteUser(bandleaderName));
  });

  describe("postCompletedSetList", () => {
    let token, clientId;

    const bandleaderUsername = "postCompletedSetList";

    const clientUsername = "client";

    const clientInfo = {
      username: clientUsername,
      password: "password",
      accountType: "client",
      bandleaderName: bandleaderUsername,
    };

    const { username, password, accountType, bandleaderName } = clientInfo;

    before(async () => {
      return await UsersModel.register(
        username,
        password,
        accountType,
        bandleaderName
      )
        .then((response) => {
          clientId = response[0].id;
        })
        .catch((err) => console.log(err));
    });

    const bandleaderInfo = {
      username: bandleaderUsername,
      password: "password",
      accountType: "bandleader",
    };

    before(async () => {
      return await UsersModel.register(
        bandleaderInfo.username,
        bandleaderInfo.password,
        bandleaderInfo.accountType
      )
        .then((response) => {
          const specificUserInfo = response[0];
          const { id, accounttype } = specificUserInfo;
          token = jwt.sign(
            {
              id: id,
              username: specificUserInfo.username,
              accountType: accounttype,
            },
            config.jwtSecret,
            { expiresIn: 3600000 }
          );
        })
        .catch((err) => console.log(err));
    });

    it("postCompletedSetList", (done) => {
      const body = {
        clientId,
        completedSetList: [{ info: "Completed Set List" }],
        bandleaderComments: ["Bandleader Comments"],
      };

      chai
        .request(server)
        .post("/bandleader/postCompletedSetList")
        .set("Authorization", token)
        .send(body)
        .end((err, res) => {
          const expectedResponse = {
            clientName: clientUsername,
            bandleaderName: bandleaderName,
            suggestedSetList: [{ info: "Completed Set List" }],
            bandleaderComments: ["Bandleader Comments"],
          };

          expect(res.body).to.eql(expectedResponse);

          done();
        });
    });

    after(async () => await UsersModel.deleteUser(username));

    after(async () => await UsersModel.deleteUser(bandleaderName));

    after(
      async () =>
        await SetListsModel.deleteSetList(clientUsername, bandleaderName)
    );
  });

  describe("getClientSetListInfo", () => {
    let token, clientId;

    const bandleaderUsername = "getCompletedSetList";

    const clientUsername = "client";

    const clientInfo = {
      username: clientUsername,
      password: "password",
      accountType: "client",
      bandleaderName: bandleaderUsername,
    };

    const { username, password, accountType, bandleaderName } = clientInfo;

    before(async () => {
      return await UsersModel.register(
        username,
        password,
        accountType,
        bandleaderName
      )
        .then((response) => {
          clientId = response[0].id;
        })
        .catch((err) => console.log(err));
    });

    const bandleaderInfo = {
      username: bandleaderUsername,
      password: "password",
      accountType: "bandleader",
    };

    before(async () => {
      return await UsersModel.register(
        bandleaderInfo.username,
        bandleaderInfo.password,
        bandleaderInfo.accountType
      )
        .then((response) => {
          const specificUserInfo = response[0];
          const { id, accounttype } = specificUserInfo;
          token = jwt.sign(
            {
              id: id,
              username: specificUserInfo.username,
              accountType: accounttype,
            },
            config.jwtSecret,
            { expiresIn: 3600000 }
          );
        })
        .catch((err) => console.log(err));
    });

    const setListInfo = {
      clientName: clientUsername,
      bandleaderName: bandleaderUsername,
      setList: [{ info: "Completed Set List" }],
      bandleaderComments: ["Bandleader", "Comments"],
    };

    before(
      async () =>
        await SetListsModel.addSetList(
          setListInfo.clientName,
          setListInfo.bandleaderName,
          setListInfo.setList,
          setListInfo.bandleaderComments
        )
    );

    it("getClientSetListInfo", (done) => {
      chai
        .request(server)
        .get(`/bandleader/getClientSetListInfo/${clientId}`)
        .set("Authorization", token)
        .end((err, res) => {
          const expectedResponse = {
            clientName: clientUsername,
            bandleaderName: bandleaderName,
            suggestedSetList: [{ info: "Completed Set List" }],
            bandleaderComments: ["Bandleader", "Comments"],
          };

          expect(res.body).to.eql(expectedResponse);

          done();
        });
    });

    after(async () => await UsersModel.deleteUser(username));

    after(async () => await UsersModel.deleteUser(bandleaderName));

    after(
      async () =>
        await SetListsModel.deleteSetList(
          setListInfo.clientName,
          setListInfo.bandleaderName
        )
    );
  });

  describe("editCompletedSetList", () => {
    let token, clientId;

    const bandleaderUsername = "testBandleader";

    const clientUsername = "testClient";

    const clientInfo = {
      username: clientUsername,
      password: "password",
      accountType: "client",
      bandleaderName: bandleaderUsername,
    };

    const { username, password, accountType, bandleaderName } = clientInfo;

    before(async () => {
      return await UsersModel.register(
        username,
        password,
        accountType,
        bandleaderName
      )
        .then((response) => {
          clientId = response[0].id;
        })
        .catch((err) => console.log(err));
    });

    const bandleaderInfo = {
      username: bandleaderUsername,
      password: "password",
      accountType: "bandleader",
    };

    before(async () => {
      return await UsersModel.register(
        bandleaderInfo.username,
        bandleaderInfo.password,
        bandleaderInfo.accountType
      )
        .then((response) => {
          const specificUserInfo = response[0];
          const { id, accounttype } = specificUserInfo;
          token = jwt.sign(
            {
              id: id,
              username: specificUserInfo.username,
              accountType: accounttype,
            },
            config.jwtSecret,
            { expiresIn: 3600000 }
          );
        })
        .catch((err) => console.log(err));
    });

    const setListInfo = {
      clientName: clientUsername,
      bandleaderName: bandleaderUsername,
      setList: [{ info: "Completed Set List Here" }],
      bandleaderComments: ["Song Comments Here"],
    };

    before(
      async () =>
        await SetListsModel.addSetList(
          setListInfo.clientName,
          setListInfo.bandleaderName,
          setListInfo.setList,
          setListInfo.bandleaderComments
        )
    );

    it("editCompletedSetList", (done) => {
      const body = {
        completedSetList: [{ info: "Completed Set List NOT Here" }],
        clientId,
        bandleaderComments: ["Bandleader", "Comments", "Here"],
      };

      chai
        .request(server)
        .patch("/bandleader/editCompletedSetList")
        .set("Authorization", token)
        .send(body)
        .end((err, res) => {
          const expectedResponse = {
            clientName: clientUsername,
            bandleaderName: bandleaderName,
            suggestedSetList: [{ info: "Completed Set List NOT Here" }],
            bandleaderComments: ["Bandleader", "Comments", "Here"],
          };

          console.log(res.body);

          expect(res.body).to.eql(expectedResponse);

          done();
        });
    });

    after(async () => await UsersModel.deleteUser(username));

    after(async () => await UsersModel.deleteUser(bandleaderName));

    after(
      async () =>
        await SetListsModel.deleteSetList(
          setListInfo.clientName,
          setListInfo.bandleaderName
        )
    );
  });
});
