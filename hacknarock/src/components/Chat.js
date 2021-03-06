import React, { useState, useEffect } from "react";
import { Paper, TextField } from "@material-ui/core";
import CloseIcon from "@material-ui/icons/Close";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import SendIcon from "@material-ui/icons/Send";
import Button from "@material-ui/core/Button";
import Shadow from "./Shadow";
import Message from "./Message";

const Chat = ({ onHide, name, messages, userid, onSend, roomid }) => {
	const [text, setText] = useState('');
	const [imgURL, setImg] = useState('');
  
	const onSubmit = (e) => {
	  e.preventDefault()
	  if (!text) return;
	  onSend(userid, text, roomid)
	  setText('')
	}  

  // Get image from server
  useEffect(() => {
    const getImage = async (id) => {
      const imageFromServer = await fetchImage(id);
      if (imageFromServer) setImg(imageFromServer);
    };
    getImage(roomid);
  }, []);

  const fetchImage = async (id) => {
    const res = await fetch("http://localhost:5000/rooms/img/" + roomid);
    const data = await res.json();
    const url = data['url']
    return url;
  };

  return (
    <>
      <Shadow />
      <div className="chat">
        <Paper elevation={3}>
          <div className="top">
            <div className="flex-grow">
              <AppBar position="static">
                <Toolbar>
                  <Typography variant="h6" className="flex-grow">
                    {name}
                  </Typography>
                  <IconButton
                    color="inherit"
                    aria-label="close"
                    className="flex-grow"
                    onClick={onHide}
                  >
                    <CloseIcon />
                  </IconButton>
                </Toolbar>
              </AppBar>
            </div>
          </div>

          
            { imgURL && (
            <div className="img_placeholder">
              <img alt="room" src={imgURL} />
            </div>
            )}
          

          <div className="content">
            {messages.map((message) => (
              <Message key={message.id} author={message.author_id} msg={message.data} date={message.creation_date} />
            ))}
          </div>

		  <form className="message" onSubmit={onSubmit}>
				<TextField
				id="msg"
				label="Aa"
				variant="outlined"
				className="flex-grow"
				value={text}
                onChange={(e) => setText(e.target.value)}
				/>

				<Button
				variant="contained"
				color="primary"
				type="submit"
				startIcon={<SendIcon />}
				/>
          </form>
        </Paper>
      </div>
    </>
  );
};


export default Chat;
