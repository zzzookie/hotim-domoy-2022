import { useContext, useEffect, useState } from 'react';
import { Button, IconButton, TextField, Dialog } from '@mui/material';
import { Send, Cancel, Chat as ChatIcon } from '@mui/icons-material';
import { useParams } from 'react-router-dom';
import { UserContext } from '../../context/user';
import { API, PORT } from './Chat';

const socket = new WebSocket(`wss://${API}:${PORT}`);

function ModalForChat({ id }) {
  const [open, setOpen] = useState(false);
  const { user } = useContext(UserContext);
  const [value, setValue] = useState("");
  const userNamed = user.name;
  const userId = user.id;
  const iD = useParams();
  const roomId = (iD.id);

  const [conversation, setConversation] = useState([]);

  useEffect(() => {
    socket.send(JSON.stringify({ type: 'GET_MESSAGES', roomId }));
  }, []);

  useEffect(() => {
    socket.onopen = () => {
      console.log('socket opened');
      socket.send(JSON.stringify({ type: 'CONNECTION', postId: id, userNamed, userID: userId }));
    };
    socket.onmessage = (messageEvent) => {
      const { type, payload } = JSON.parse(messageEvent.data);
      switch (type) {
        case 'GET_MESSAGES':
          setConversation(payload);
          break;
        case 'NEW_MESSAGES':
          console.log(payload);
          setConversation((prev) => [...prev, payload]);
          break;

        default:
          break;
      }
    };
  }, [socket, conversation]);

  const sendMessage = async (e) => {
    e.preventDefault();

    socket.send(JSON.stringify({ type: 'NEW_MESSAGES', payload: { message: value, id: user.id, postId: id, userNamed } }));
    setTimeout(() => {
      socket.send(JSON.stringify({ type: 'GET_MESSAGES' }));
    }, 70);

    setValue("");
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div className="chat-modal-icon">
      <Button
        onClick={handleClickOpen}
        variant="contained"
        disableElevation
        startIcon={<ChatIcon />}
      >
        Чат
      </Button>

      <Dialog className="chat-modal" open={open} onClose={handleClose}>

        <div className="chat-wrapper">
          <div className="chat-box">

            {conversation && conversation.map((el, index) => (
              <div className={el.userId === user.id ? 'message own-message' : 'message incoming-message'} key={index}>
                <span className="message-name">
                  {el.userName}
                </span>
                <span className="message-text">{el.message}</span>
              </div>
            ))}

          </div>
        </div>

        <form name="chat" onSubmit={sendMessage} className="chat-form">
          <TextField
            label="Ваше сообщение"
            id="inputMessage"
            className="form-control"
            multiline
            maxRows={4}
            value={value}
            onChange={(e) => setValue(e.target.value)}
          />
          <Button size="large" className="chat-send-button" type="submit" variant="contained" endIcon={<Send />}>Отправить</Button>
        </form>

        <div className="dialog-overlay">
          <IconButton onClick={handleClose} aria-label="delete">
            <Cancel />
          </IconButton>
        </div>
      </Dialog>
    </div>
  );
}

export default ModalForChat;
