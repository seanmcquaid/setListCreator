import React from "react";
import SetListCreatorPage from "./SetListCreatorPage";
import BandleaderHomePage from "pages/BandleaderPages/BandleaderHomePage/BandleaderHomePage";
import configureStore from "store/configureStore";
import { render, waitFor, screen, fireEvent } from "@testing-library/react";
import { Route } from "react-router-dom";
import MockRouter from "testUtils/MockRouter";
import { Provider } from "react-redux";
import axios from "axios";

describe("<SetListCreatorPage/>", () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  test("Loading Spinner", async () => {
    const getSuggestedSetListResponse = {
      suggestedSetList: [
        {
          songname: "Uptown Funk",
          artistname: "Bruno Mars",
          id: 1,
        },
      ],
      additionalClientRequests: [
        {
          songname: "Treasure",
          artistname: "Bruno Mars",
          id: 2,
        },
      ],
    };

    jest
      .spyOn(axios, "get")
      .mockResolvedValueOnce({ data: { ...getSuggestedSetListResponse } });

    const store = configureStore();

    render(
      <Provider store={store}>
        <MockRouter initialRoute="/bandleader/createSetList/:clientId">
          <Route
            exact
            path="/bandleader/createSetList/:clientId"
            component={SetListCreatorPage}
          />
        </MockRouter>
      </Provider>
    );

    expect(screen.getByTestId("loadingSpinner")).toBeInTheDocument();

    await waitFor(() =>
      expect(screen.queryByTestId("loadingSpinner")).toBeNull()
    );
  });

  test("Suggested Set List loads", async () => {
    const getSuggestedSetListResponse = {
      suggestedSetList: [
        {
          songname: "Uptown Funk",
          artistname: "Bruno Mars",
          id: 1,
        },
      ],
      additionalClientRequests: [
        {
          songname: "Treasure",
          artistname: "Bruno Mars",
          id: 2,
        },
      ],
    };

    jest
      .spyOn(axios, "get")
      .mockResolvedValueOnce({ data: { ...getSuggestedSetListResponse } });

    const store = configureStore();

    render(
      <Provider store={store}>
        <MockRouter initialRoute="/bandleader/createSetList/:clientId">
          <Route
            exact
            path="/bandleader/createSetList/:clientId"
            component={SetListCreatorPage}
          />
        </MockRouter>
      </Provider>
    );

    await waitFor(() =>
      expect(screen.queryByTestId("loadingSpinner")).toBeNull()
    );

    expect(screen.getByText("Uptown Funk - Bruno Mars")).toBeInTheDocument();

    expect(screen.getByText("Treasure - Bruno Mars")).toBeInTheDocument();
  });

  test("Error on Suggested Set List load", async () => {
    const getSuggestedSetListResponse = {
      errorMessage: "Error here",
    };

    jest.spyOn(axios, "get").mockRejectedValueOnce({
      response: { data: { ...getSuggestedSetListResponse } },
    });

    const store = configureStore();

    render(
      <Provider store={store}>
        <MockRouter initialRoute="/bandleader/createSetList/:clientId">
          <Route
            exact
            path="/bandleader/createSetList/:clientId"
            component={SetListCreatorPage}
          />
        </MockRouter>
      </Provider>
    );

    await waitFor(() =>
      expect(screen.queryByTestId("loadingSpinner")).toBeNull()
    );

    expect(screen.getByText("Error here")).toBeInTheDocument();
  });

  test("Add Set List Comment", async () => {
    const getSuggestedSetListResponse = {
      suggestedSetList: [
        {
          songname: "Uptown Funk",
          artistname: "Bruno Mars",
          id: 1,
        },
      ],
      additionalClientRequests: [
        {
          songname: "Treasure",
          artistname: "Bruno Mars",
          id: 2,
        },
      ],
    };

    jest
      .spyOn(axios, "get")
      .mockResolvedValueOnce({ data: { ...getSuggestedSetListResponse } });

    const store = configureStore();

    render(
      <Provider store={store}>
        <MockRouter initialRoute="/bandleader/createSetList/:clientId">
          <Route
            exact
            path="/bandleader/createSetList/:clientId"
            component={SetListCreatorPage}
          />
        </MockRouter>
      </Provider>
    );

    await waitFor(() =>
      expect(screen.queryByTestId("loadingSpinner")).toBeNull()
    );

    fireEvent.change(screen.getByTestId("CommentsTextInput"), {
      target: { value: "Comment Here" },
    });
    expect(screen.getByTestId("CommentsTextInput").value).toEqual(
      "Comment Here"
    );

    fireEvent.click(screen.getByTestId("Add CommentButton"));

    expect(screen.getByTestId("CommentsTextInput").value).toEqual("");

    expect(screen.getByText("Comment Here")).toBeInTheDocument();
  });

  test("Add Song From Client Additional Request to Set List is removed from Client Additional Requests", async () => {
    const getSuggestedSetListResponse = {
      suggestedSetList: [],
      additionalClientRequests: [
        {
          songname: "Treasure",
          artistname: "Bruno Mars",
          id: 2,
        },
      ],
    };

    jest
      .spyOn(axios, "get")
      .mockResolvedValueOnce({ data: { ...getSuggestedSetListResponse } });

    const store = configureStore();

    render(
      <Provider store={store}>
        <MockRouter initialRoute="/bandleader/createSetList/:clientId">
          <Route
            exact
            path="/bandleader/createSetList/:clientId"
            component={SetListCreatorPage}
          />
        </MockRouter>
      </Provider>
    );

    await waitFor(() =>
      expect(screen.queryByTestId("loadingSpinner")).toBeNull()
    );

    fireEvent.click(screen.getByTestId("AddButton"));

    expect(screen.queryAllByText("Treasure - Bruno Mars").length).toEqual(1);
  });

  test("Send completed set list redirects to home when successful", async () => {
    const getSuggestedSetListResponse = {
      suggestedSetList: [
        {
          songname: "Uptown Funk",
          artistname: "Bruno Mars",
          id: 1,
        },
      ],
      additionalClientRequests: [
        {
          songname: "Treasure",
          artistname: "Bruno Mars",
          id: 2,
        },
      ],
    };

    jest
      .spyOn(axios, "get")
      .mockResolvedValueOnce({ data: { ...getSuggestedSetListResponse } });

    const store = configureStore();

    render(
      <Provider store={store}>
        <MockRouter initialRoute="/bandleader/createSetList/:clientId">
          <Route
            exact
            path="/bandleader/createSetList/:clientId"
            component={SetListCreatorPage}
          />
          <Route exact path="/bandleaderHome" component={BandleaderHomePage} />
        </MockRouter>
      </Provider>
    );

    await waitFor(() =>
      expect(screen.queryByTestId("loadingSpinner")).toBeNull()
    );

    jest.spyOn(axios, "post").mockResolvedValueOnce();

    fireEvent.click(screen.getByTestId("Send Set List to ClientButton"));

    await waitFor(() =>
      expect(screen.getByText("Band Leader Home Page")).toBeInTheDocument()
    );
  });

  test("Send completed set list displays error message when error occurs", async () => {
    const getSuggestedSetListResponse = {
      suggestedSetList: [
        {
          songname: "Uptown Funk",
          artistname: "Bruno Mars",
          id: 1,
        },
      ],
      additionalClientRequests: [
        {
          songname: "Treasure",
          artistname: "Bruno Mars",
          id: 2,
        },
      ],
    };

    jest
      .spyOn(axios, "get")
      .mockResolvedValueOnce({ data: { ...getSuggestedSetListResponse } });

    const store = configureStore();

    render(
      <Provider store={store}>
        <MockRouter initialRoute="/bandleader/createSetList/:clientId">
          <Route
            exact
            path="/bandleader/createSetList/:clientId"
            component={SetListCreatorPage}
          />
        </MockRouter>
      </Provider>
    );

    await waitFor(() =>
      expect(screen.queryByTestId("loadingSpinner")).toBeNull()
    );

    const postCompletedSetListResponse = {
      errorMessage: "Error Here",
    };

    jest.spyOn(axios, "post").mockRejectedValueOnce({
      response: { data: { ...postCompletedSetListResponse } },
    });

    fireEvent.click(screen.getByTestId("Send Set List to ClientButton"));

    await waitFor(() =>
      expect(screen.getByText("Error Here")).toBeInTheDocument()
    );
  });
});
