import React, {useState, useEffect} from "react";
import {connect} from "react-redux";
import Loading from "components/Loading/Loading";
import {Redirect, Route} from "react-router-dom";
import {checkTokenAction} from "actions/authActions/authActions";

const ProtectedClientRoute = ({accountType, isAuthenticated, token, checkTokenAction, ...props}) => {
    const [isLoadingPage, setIsLoadingPage] = useState(true);

    useEffect(() => {
        if(token && isLoadingPage){
            checkTokenAction();
        }
        setIsLoadingPage(false);
    }, [checkTokenAction, token, isLoadingPage])


    if(isLoadingPage === true){
        return <Route {...props} component={Loading}/>;
    }


    if(isAuthenticated && accountType === "client"){
        return <Route {...props} component={props.component}/>;
    }

    if(isAuthenticated === true && accountType !== null){
        if(isLoadingPage === false && accountType !== "client"){
            console.log("redirect - isLoading and accounttype")
            console.log(isLoadingPage, accountType);
            return <Redirect to="/"/>;
        }
    }


    if(isLoadingPage === false && isAuthenticated === true){
        return <Redirect to="/"/>;
    }

    if(isAuthenticated === false && isLoadingPage === false && accountType !== null){
        return <Redirect to="/"/>;
    }

    if(isAuthenticated === false && isLoadingPage === false && accountType === null){
        return null;
    }

    console.log("props");

    return <Redirect to="/"/>;

};

const mapStateToProps = state => ({
    accountType : state.auth.accountType,
    isAuthenticated : state.auth.isAuthenticated,
    token : state.auth.token,
});

const mapDispatchToProps = dispatch => ({
    checkTokenAction : () => dispatch(checkTokenAction()),
})

export default connect(mapStateToProps, mapDispatchToProps)(ProtectedClientRoute);