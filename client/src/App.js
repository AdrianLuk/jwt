import React, { useEffect, useState } from "react";
import axios from "axios";

function App() {
  const [user, setUser] = useState({});
  const getUser = async () => {
    const res = await axios.post(`http://localhost:5000/auth`, {
      username: "test",
      password: "test"
    });
    setUser(res.data);
  };
  useEffect(() => {
    getUser();
  }, []);
  useEffect(() => {
    console.log(user);
  }, [user]);
  return (
    <div>
      <h1>{JSON.stringify(user)}</h1>
    </div>
  );
}

export default App;
