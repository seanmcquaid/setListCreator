import React, {useState, useEffect} from "react";
import axios from "axios";
import {connect} from "react-redux";
import { tokenConfig } from "../../../actions/authActions/authActions";

const BandLeaderEditSongPage = props => {
    const [songInfo, setSongInfo] = useState([]);

    useEffect(() => {
        const headers = tokenConfig();
        axios.get(`${window.apiHost}/bandLeader/getSong/${props.songId}`, headers)
            .then(response => {

            })
            .catch(err => {

            });
    }, [])
    

    return(
        <div>
            Band Leader Edit Song Page
            
        </div>
    )
};

const mapStateToProps = state => ({

});

const mapDispatchToProps = dispatch => ({
    
});

export default connect(mapStateToProps, mapDispatchToProps)(BandLeaderEditSongPage);