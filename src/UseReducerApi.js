import React, { useReducer, useEffect } from "react";
import axios from "axios";

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

function UseStateApi() {
  const [state, dispatch] = useReducer(reducer, {
    users: null,
    error: null,
    loading: false,
  });
  useEffect(() => {
    const fetchUsers = async () => {
      dispatch({ type: "LOADING" });
      try {
        const response = await axios.get(
          "https://jsonplaceholder.typicode.com/users"
        );
        dispatch({
          type: "SUCCESS",
          user: response.data,
        });
      } catch (e) {
        dispatch({
          type: "ERROR",
          error: "에러가 발생햇습니다",
        });
      }
    };
    fetchUsers();
  }, []);
  const { users, error, loading } = state;
  if (loading) return <div>로딩중...</div>;
  if (error) return <div>에러가 발생</div>;
  if (!users) return null;
  return (
    <ul>
      {users.map((user) => (
        <li key={user.id}>
          {user.username}({user.name})
        </li>
      ))}
    </ul>
  );
}

export default UseStateApi;
