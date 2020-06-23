import React from "react";
import LandingPage from "./LandingPage";
import ReduxThunk from "redux-thunk";
import { render, fireEvent } from "@testing-library/react";
import { configureMockStore } from "@jedmao/redux-mock-store";
import MockRouter from "testUtils/MockRouter";
import { Provider } from "react-redux";
import { Route } from "react-router-dom";
import ClientLoginPage from "pages/ClientPages/ClientLoginPage/ClientLoginPage";
import BandleaderLoginPage from "pages/BandleaderPages/BandleaderLoginPage/BandleaderLoginPage";

describe("<LandingPage/>", () => {
    const middleware = [ReduxThunk];
    const mockStore = configureMockStore(middleware);

    test("Renders correctly", () => {
        const initialState = {
            auth : {
                isAuthenticated : false,
            },
            error : {
                errorMessage : "",
            },
        };

        const store = mockStore(initialState);

        const {getByText} = render(
            <Provider store={store}>
                <MockRouter initialRoute="/">
                    <Route exact path="/" component={LandingPage}/>
                </MockRouter>
            </Provider>
        );

        expect(getByText("Set List Creator")).toBeInTheDocument();
    });

    describe("LinkButtons route correctly", () => {
        test("Client Login Button routes correctly", async () => {
            const initialState = {
                auth : {
                    isAuthenticated : false,
                },
                error : {
                    errorMessage : "",
                },
            };

            const store = mockStore(initialState);

            const {getByText, queryByText} = render(
                <Provider store={store}>
                    <MockRouter initialRoute="/">
                        <Route exact path="/" component={LandingPage}/>
                        <Route exact path="/clientLogin" component={ClientLoginPage}/>
                    </MockRouter>
                </Provider>
            );

            expect(getByText("Set List Creator")).toBeInTheDocument();

            fireEvent.click(getByText("Client"));

            expect(queryByText("Set List Creator")).toBeNull();

            expect(getByText("Client Login")).toBeInTheDocument();
        });

        test("Bandleader Login Button routes correctly", () => {
            const initialState = {
                auth : {
                    isAuthenticated : false,
                },
                error : {
                    errorMessage : "",
                },
            };

            const store = mockStore(initialState);

            const {getByText, queryByText} = render(
                <Provider store={store}>
                    <MockRouter initialRoute="/">
                        <Route exact path="/" component={LandingPage}/>
                        <Route exact path="/bandleaderLogin" component={BandleaderLoginPage}/>
                    </MockRouter>
                </Provider>
            );

            expect(getByText("Set List Creator")).toBeInTheDocument();

            fireEvent.click(getByText("Bandleader"));

            expect(queryByText("Set List Creator")).toBeNull();

            expect(getByText("Band Leader Login")).toBeInTheDocument();
        });
    });
});