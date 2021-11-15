import {useState} from "react";
import Home from "../components/Home";
import FbLogin from "../components/FbLogin";

const Main = () => {
    const [loggedIn, setLoggedIn] = useState(false);
    const [postPreprocess, setPostPreprocess ] = useState(false);
    const fbResponse = (res) => {
        // res get the data returned from facebook login including the access token etc
        console.log(res)
        setLoggedIn(true)
    }
    const preprocessPost = async (file) => {
        const data = new FormData();
        data.append("uploaded_file", file);
        data.append("text", "hello")
        const resp = await fetch("http://localhost:3005/api/process_post", {
            method: "POST", // *GET, POST, PUT, DELETE, etc.
            body: data, // body data type must match "Content-Type" header
        })
            .then(response => response.json());
        console.log(resp);
    }

    return (
      <>
          {loggedIn &&
            <Home
                preprocessPost={preprocessPost}
            />
          }
          {!loggedIn &&
            <FbLogin
                fbResponse={fbResponse}
            />
          }
      </>
    );
}

export default Main