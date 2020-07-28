import { useReducer, useEffect } from "react";

function reducer(state, action) {
  switch (action.type) {
    case "LOADING":
      return {
        loading: true,
        users: null,
        error: null,
      };
    case "SUCCESS":
      return {
        loading: false,
        users: action.user,
        error: null,
      };

    case "ERROR":
      return {
        loading: false,
        users: null,
        error: action.error,
      };
    default:
      return state;
  }
}

function useAsync(callback, deps = []) {
  const [state, dispatch] = useReducer(reducer, {
    loading: false,
    users: null,
    error: null,
  });
  const fatchData = async () => {
    dispatch({ type: "LOADING" });
    try {
      const user = await callback();
      dispatch({ type: "SUCCESS", user });
    } catch (e) {
      dispatch({ type: "ERROR", error: e });
    }
  };
  useEffect(() => {
    fatchData();
    //eslint-disable-next-line
  }, deps);
  return [state, fatchData];
}

export default useAsync;
