import React from "react";
import ClientListPage from "./ClientListPage";
import configureStore from "store/configureStore";
import { render, waitFor, screen, fireEvent } from "@testing-library/react";
import { Provider } from "react-redux";
import MockRouter from "testUtils/MockRouter";
import { Route } from "react-router-dom";
import axios from "axios";
import ClientInfoPage from "../ClientInfoPage/ClientInfoPage";

describe("<ClientListPage/>", () => {

    beforeEach(() => {
        jest.useFakeTimers();
    });

    afterEach(() => {
        jest.useRealTimers();
    });

    test("Client Page Redirect", async () => {
        const getBandleaderClientsActionResponse = {
            clientList : [
                {
                    id : 1,
                    username : "test user",
                    setlistavailable : true,
                    clientapproved : null,
                },
            ],
        };

        jest.spyOn(axios, "get").mockResolvedValueOnce({data : {...getBandleaderClientsActionResponse}});

        const store = configureStore();

        render(
            <Provider store={store}>
                <MockRouter initialRoute="/bandleader/clientList">
                    <Route exact path="/bandleader/clientList" component={ClientListPage}/>
                    <Route exact path="/bandleader/clientInfo/:clientId" component={ClientInfoPage}/>
                </MockRouter>
            </Provider>
        );

        await waitFor(() => expect(screen.getByText("test user")).toBeInTheDocument());

        const getClientSongsResponse = {
            doNotPlaySongsList : [],
            requestedSongsList : [],
            userInfo : {
                username : "test user",
            },
        };

        jest.spyOn(axios, "get").mockResolvedValueOnce({data : {...getClientSongsResponse}});

        fireEvent.click(screen.getByTestId("Go To Set List PageButton"));

        await waitFor(() => expect(screen.queryByTestId("loadingSpinner")).toBeNull());

        expect(screen.getByText("Client name : test user"));
    });

    test("Client Final Set List Page Redirect", async () => {
        const getBandleaderClientsActionResponse = {
            clientList : [
                {
                    id : 1,
                    username : "test user",
                    setlistavailable : true,
                    clientapproved : true,
                },
            ],
        };

        jest.spyOn(axios, "get").mockResolvedValueOnce({data : {...getBandleaderClientsActionResponse}});

        const store = configureStore();

        render(
            <Provider store={store}>
                <MockRouter initialRoute="/bandleader/clientList">
                    <Route exact path="/bandleader/clientList" component={ClientListPage}/>
                </MockRouter>
            </Provider>
        );

        await waitFor(() => expect(screen.getByText("test user")).toBeInTheDocument());
    });

    test("Client Edit Set List Page Redirect", async () => {
        const getBandleaderClientsActionResponse = {
            clientList : [
                {
                    id : 1,
                    username : "test user",
                    setlistavailable : false,
                    clientapproved : null,
                },
            ],
        };

        jest.spyOn(axios, "get").mockResolvedValueOnce({data : {...getBandleaderClientsActionResponse}});

        const store = configureStore();

        render(
            <Provider store={store}>
                <MockRouter initialRoute="/bandleader/clientList">
                    <Route exact path="/bandleader/clientList" component={ClientListPage}/>
                </MockRouter>
            </Provider>
        );

        await waitFor(() => expect(screen.getByText("test user")).toBeInTheDocument());
    });

});