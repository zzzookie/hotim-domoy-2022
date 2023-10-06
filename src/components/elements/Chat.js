import { useState, useEffect, useContext } from 'react';
import { useParams } from 'react-router-dom';
import { UserContext } from '../../context/user';

export const API = "hotim-domoy-api.onrender.com";
export const PORT = "5432";
const socket = new WebSocket(`wss://${API}:${PORT}`);

function Chat({ id }) {
  const { user } = useContext(UserContext);
  const [value, setValue] = useState("");
  const [ownMessage, setOwnMessage] = useState(false);
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

  return (
    <div className="row py-5">
      <div className="col-4">
        <div className="card">
          <div className="card-body">
            <form name="chat" onSubmit={sendMessage} className="row justify-content-end">
              <input value={value} onChange={(e) => setValue(e.target.value)} name="message" type="text" id="inputMessage" className="form-control" />
              <button type="submit" className="my-1 btn btn-outline-success">OK</button>
            </form>
          </div>
          <div className="flex-container" style={{ overflow: 'hidden' }}>
            <div className="chatBox">
              {conversation && conversation.map((el, index) => (
                <div key={index}>
                  <span className={user ? 'own-message-name' : 'message-name'}>
                    {el.userName}
                    {' '}
                    :
                  </span>
                  <br />
                  <span className={user ? 'own-message-message' : 'message-message'}>{el.message}</span>
                </div>

              ))}

            </div>
          </div>
        </div>
      </div>
    </div>

  );
}

export default Chat;
