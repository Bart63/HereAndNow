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

const Chat = ({ onHide, name, messages, userid, onSend }) => {
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

          <div className="content">
            {messages.map((message) => (
              <Message key={message.id} author={message.author_id} msg={message.data} date={message.creationDate} />
            ))}
          </div>

          <div className="message">
            <TextField
              id="msg"
              label="Aa"
              variant="outlined"
              className="flex-grow"
            />

            <Button
              variant="contained"
              color="primary"
              startIcon={<SendIcon />}
            />
          </div>
        </Paper>
      </div>
    </>
  );
};


export default Chat;
