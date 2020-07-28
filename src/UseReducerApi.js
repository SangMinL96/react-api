import React, { useState } from "react";
import axios from "axios";
import useAsync from "./useAsync";
import User from "./User";

async function getUsers() {
  const response = await axios.get(
    "https://jsonplaceholder.typicode.com/users"
  );
  return response.data;
}
// function reducer(state, action) {
//   switch (action.type) {
//     case "LOADING":
//       return {
//         loading: true,
//         users: null,
//         error: null,
//       };
//     case "SUCCESS":
//       return {
//         loading: false,
//         users: action.user,
//         error: null,
//       };

//     case "ERROR":
//       return {
//         loading: false,
//         users: null,
//         error: action.error,
//       };
//     default:
//       return state;
//   }
// }

function UseStateApi() {
  // const [state, dispatch] = useReducer(reducer, {
  //   users: null,
  //   error: null,
  //   loading: false,
  // });
  // useEffect(() => {
  //   const fetchUsers = async () => {
  //     dispatch({ type: "LOADING" });
  //     try {
  //       const response = await axios.get(
  //         "https://jsonplaceholder.typicode.com/users"
  //       );
  //       dispatch({
  //         type: "SUCCESS",
  //         user: response.data,
  //       });
  //     } catch (e) {
  //       dispatch({
  //         type: "ERROR",
  //         error: "에러가 발생햇습니다",
  //       });
  //     }
  //   };
  //   fetchUsers();
  // }, []);
  const [state, fatchData] = useAsync(getUsers, [], true);
  const [userId, setUserId] = useState(null);
  const { users, error, loading } = state;
  if (loading) return <div>로딩중...</div>;
  if (error) return <div>에러가 발생</div>;
  if (!users) return <button onClick={fatchData}>불러오기</button>;
  return (
    <>
      <ul>
        {users.map((user) => (
          <li key={user.id} onClick={() => setUserId(user.id)}>
            {user.username}({user.name})
          </li>
        ))}
      </ul>
      <button onClick={fatchData}>다시불러오기</button>
      {userId && <User id={userId} />}
    </>
  );
}

export default UseStateApi;
