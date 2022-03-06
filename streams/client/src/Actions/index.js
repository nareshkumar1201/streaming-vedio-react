import StreamsAxios from "../apis/streamsaxios";
import history from "../history";
import {
  SIGN_IN,
  SIGN_OUT,
  CREATE_STREAM,
  FETCH_STREAMS,
  FETCH_STREAM,
  DELETE_STREAM,
  EDIT_STREAM,
} from "./types";

export const signIn = (userId) => {
  return {
    type: "SIGN_IN",
    payload: userId,
  };
};

export const signOut = () => {
  return {
    type: "SIGN_OUT",
  };
};

export const createStream = (formValues) => {
  return async (dispatch, getState) => {
    const { userId } = getState().auth;
    const response = await StreamsAxios.post("/streams", {
      ...formValues,
      userId,
    });
    dispatch({ type: CREATE_STREAM, payload: response.data });
    //Doing programatic Navigation
    history.push("/");
  };
};

export const fetchStreams = () => {
  return async (dispatch) => {
    const response = await StreamsAxios.get("/streams");
    dispatch({
      type: "FETCH_STREAMS",
      payload: response.data,
    });
  };
};

export const fetchStream = (streamId) => {
  return async (dispatch) => {
    const response = await StreamsAxios.get(`/streams/${streamId}`);
    dispatch({
      type: "FETCH_STREAM",
      payload: response.data,
    });
  };
};

export const editStream = (streamId, formValues) => {
  return async (dispatch) => {
    const response = await StreamsAxios.patch(
      `/streams/${streamId}`,
      formValues
    );
    dispatch({
      type: "EDIT_STREAM",
      payload: response.data,
    });
    history.push("/");
  };
};

export const deleteStream = (streamId) => {
  return async (dispatch) => {
    await StreamsAxios.delete(`/streams/${streamId}`);
    dispatch({
      type: "DELETE_STREAM",
      payload: streamId,
    });
    history.push("/");
  };
};
