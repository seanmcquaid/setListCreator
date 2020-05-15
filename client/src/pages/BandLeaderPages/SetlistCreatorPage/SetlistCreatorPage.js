import React, { useEffect, useState } from "react";
import axios from "axios";
import { tokenConfig } from "actions/authActions/authActions";
import {apiHost} from "config";
import Text from "components/Text/Text";
import Button from "components/Button/Button";
import styles from "./SetlistCreatorPage.module.css";
import SongList from "components/SongList/SongList";
import Input from "components/Input/Input";
import CommentsList from "components/CommentsList/CommentsList";
import LoadingSpinner from "components/LoadingSpinner/LoadingSpinner";

const SetListCreatorPage = props => {
    const {clientId} = props.match.params;
    const [isLoading, setIsLoading] = useState(true);
    const [suggestedSetList, setSuggestedSetList] = useState([]);
    const [additionalClientRequests, setAdditionalClientRequests] = useState([]);
    const [setListComment, setSetListComment] = useState("");
    const [setListComments, setSetListComments] = useState([]);

    useEffect(() => {
        if(isLoading){
            const headers = tokenConfig();
            axios.get(`${apiHost}/bandleader/getSuggestedSetList/${clientId}`, headers)
            .then(async response => {
                setSuggestedSetList(response.data.suggestedSetList);
                setAdditionalClientRequests(response.data.additionalClientRequests);
            })
            .catch(async err => {
                console.log(err);
            })
            const timer = setTimeout(() => setIsLoading(false), 1500);
            return () => clearTimeout(timer);
        }
        
    }, [isLoading, clientId]);

    const setListCommentOnChangeHandler = event => {
        setSetListComment(event.target.value);
    };

    const addSetListCommentHandler = () => {
        setSetListComments([...setListComments, setListComment]);
        setSetListComment("");
    };

    const addSongToSetlist = song => {
        setSuggestedSetList([...suggestedSetList, song]);
        setAdditionalClientRequests(additionalClientRequests.filter(additionalClientRequest => additionalClientRequest !== song));
    };

    const sendCompletedSetlist = () => {
        const headers = tokenConfig();

        const requestBody = {
            completedSetList : suggestedSetList,
            clientId,
            bandLeaderComments : setListComments,
        };

        axios.post(`${apiHost}/bandleader/postCompletedSetList`, requestBody, headers)
            .then(response => {
                props.history.push("/bandleaderHome")
            })
            .catch(err => {
                console.log(err);
            })
    };

    if(isLoading){
        return <LoadingSpinner isLoading={isLoading}/>;
    }

    return (
        <div className={styles.setListCreatorPageContainer}>
            <div className={styles.headerContainer}>
                <Text headerText={true}>Set List Creator</Text>
                <Button type="button" title="Send Setlist to Client" onClick={sendCompletedSetlist}/>
            </div>
            <div className={styles.commentsContainer}>
                <Text headerText={true}>Comments List</Text>
                <CommentsList list={setListComments}/>
                <Input 
                    name="setListComments"
                    title="Comments"
                    type="text"
                    placeholder="Enter comments on the setlist for the client here"
                    value={setListComment}
                    onChangeHandler={setListCommentOnChangeHandler}
                />
                <Button type="button" title="Add Comment" onClick={addSetListCommentHandler}/>
            </div>
            <div className={styles.songsContainer}>
                <div className={styles.suggestedSetListContainer}>
                    <Text headerText={true}>Suggested Set List</Text>
                    <SongList list={suggestedSetList}/>
                </div>
                <div className={styles.additionalClientRequestsContainer}>
                    <Text headerText={true}>Additional Client Requests</Text>
                    <SongList list={additionalClientRequests} songOnClick={addSongToSetlist}/>
                </div>
            </div>
        </div>
    )
};

export default SetListCreatorPage;