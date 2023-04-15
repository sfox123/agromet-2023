import React, { useEffect, useState } from "react";
import {Routes, Route,  } from "react-router-dom";
import "./styles/Main.sass";
import Nav from "./views/Nav";
import Admin from "./views/pages/Admin";
import ASC from "./views/pages/ASC";
import Editor from "./views/pages/Editor";
import Map from "./views/pages/Map";
import Protected from "./routes/Protected";
import { Secured } from "./routes/secured";
import { EditSecured } from "./routes/editSecured";
import { ApiContext } from "./context/ApiContext";
import { createBrowserRouter } from "react-router-dom";
import { CookiesProvider, useCookies } from "react-cookie";
import Axios from "./api/api";

function App() {
  const [user, setUser] = useState([[1, 2]]);
  const [apiData, setApiData] = useState("");
  const [admin, setAdmin] = useState("");
  const [cookies] = useCookies(["isLoggedinASC", "AscID"]);

  useEffect(() => {
    async function fetchData() {
      await Axios.get("/apiCall")
        .then((res) => setApiData(res.data))
        .catch((err) => console.error(err));
    }
    async function getASC() {
      const id = cookies.AscID;
      await Axios.get(`/getEditor/${id}`)
        .then((res) => setAdmin(res.data))
        .catch((err) => console.error(err));
    }
    fetchData();
    if (cookies.isLoggedinASC) {
      getASC();
    }
  }, []);

  return (
    <ApiContext.Provider value={{ user, setUser, apiData, admin }}>
      <CookiesProvider>
      <Routes>
       <Route path="/" element={<Nav/>} />
       <Route path="/admin" element={
        <Protected>
          <Admin/>
        </Protected>
       } />
       <Route path="/asc" element={
        <Secured>
          <ASC/>
        </Secured>
       } />
       <Route path="/editor" element={
        <EditSecured>
          <Editor/>
        </EditSecured>
       } />
    </Routes>
    </CookiesProvider>
    </ApiContext.Provider>
  );
}

export default App;

