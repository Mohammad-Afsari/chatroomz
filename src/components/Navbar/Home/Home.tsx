import { List, ListItem, Paper, Typography } from "@mui/material";
import SentimentSatisfiedAltIcon from "@mui/icons-material/SentimentSatisfiedAlt";
import ThumbUpAltIcon from "@mui/icons-material/ThumbUpAlt";
import { useEffect, useState } from "react";

const Home = () => {
  const [joke, setJoke] = useState<string>();
  const [delivery, setDelivery] = useState<string>();

  const messages = [
    "Welcome to the gang! We are thrilled to have you on board.",
    "Thank you for choosing to use our chatroom service.",
    "Any news, updates or relavent information to the users will be posted here on the homepage.",
    "Feel free to create a channel and chat away with friends, family or meet someone new!",
  ];

  const notes = [
    "Only chatroom creators have admin rights on deleting the channel they initially created.",
    "This application is under constant development with new functionality being added on a regular basis.",
    "Emoticons, gifs, file uploads will be added in a later version of this application.",
    "This application can be used for all devices and is mobile friendly.",
    "What are you waiting for? Go catch up with your buddies!",
  ];

  useEffect(() => {
    const options = {
      method: "GET",
      headers: {
        "X-RapidAPI-Key": "e194fa4255mshd8a7c2d57f60b66p11d4e7jsn789a5e4ae07b",
        "X-RapidAPI-Host": "jokeapi-v2.p.rapidapi.com",
      },
    };
    fetch(
      "https://jokeapi-v2.p.rapidapi.com/joke/Any?format=json&contains=C%2523&idRange=0-150&blacklistFlags=nsfw%2Cracist",
      options
    ).then((res) =>
      res.json().then((data) => {
        setJoke(data.setup);
        setDelivery(data.delivery);
      })
    );
  }, []);

  return (
    <>
      <Typography variant="h5" sx={{ color: "#90caf9" }}>
        Welcome to ChatRoomz!{" "}
      </Typography>{" "}
      <ul>
        {messages?.map((msg, index) => {
          return (
            <li key={index}>
              <Typography variant="h6">{msg}</Typography>
            </li>
          );
        })}
      </ul>
      <Typography variant="h5" sx={{ color: "#90caf9" }}>
        Notes:{" "}
      </Typography>{" "}
      <ul>
        {notes?.map((n, index) => {
          return (
            <li key={index}>
              <Typography variant="h6">{n}</Typography>
            </li>
          );
        })}
      </ul>
      <Typography variant="h5" sx={{ color: "#90caf9" }}>
        Contact:{" "}
      </Typography>{" "}
      <ul>
        <li>
          {" "}
          <Typography variant="h6">
            If you have any issues using the application and wish to get in
            touch via email to
          </Typography>{" "}
          <span
            style={{
              color: "#90caf9",
              textDecoration: "underline",
            }}
          >
            <Typography variant="h6">mohammad.afsari.pro@gmail.com</Typography>
          </span>
        </li>
        <li>
          <Typography variant="h6">
            Contributions, issues and feature requests are welcome. Please visit
            the respository of this application
          </Typography>{" "}
          <a
            href="https://github.com/Mohammad-Afsari/chatroomz"
            style={{ textDecoration: "underline", color: "#90caf9" }}
          >
            <Typography
              variant="h6"
              sx={{ textDecoration: "none", color: "#90caf9" }}
            >
              here.
            </Typography>
          </a>{" "}
        </li>
        <li>
          <Typography variant="h6">
            If you want to show your support, please share the link of this
            application to your friends and family.
          </Typography>
        </li>
      </ul>
      <Typography variant="h5" sx={{ color: "#90caf9" }}>
        Joke of the day:
        <Typography variant="h6" component="div" sx={{ color: "white" }}>
          {joke}
        </Typography>
        <Typography variant="h6" component="div" sx={{ color: "white" }}>
          ...{delivery}
        </Typography>
      </Typography>
    </>
  );
};

export default Home;
