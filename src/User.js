import React from "react";
import axios from "axios";
import useAsync from "./useAsync";

function User({ id }) {
  const [state] = useAsync(`https://jsonplaceholder.typicode.com/users/${id}`, [
    id,
  ]);
  const { loading, data, error } = state;

  if (loading) return <div>로딩중...</div>;
  if (error) return <div>에러가 발생</div>;
  if (!data) return null;

  return (
    <div>
      <h2>{data.username}</h2>
      <p>
        <b>Email:</b>
        {data.email}
      </p>
    </div>
  );
}

export default User;
