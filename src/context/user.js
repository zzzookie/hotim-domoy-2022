import { createContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export const UserContext = createContext();

function UserContextProvider({ children }) {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(true);

  const BASE_URL = process.env.REACT_APP_BASE_URL;

  useEffect(() => {
    fetch(`${BASE_URL}/auth`, { credentials: 'include' })
      .then((res) => res.json())
      .then((res) => setUser(res))
      .finally(() => setLoading(false));
  }, []);

  const handleLogout = () => fetch(`${BASE_URL}/auth/logout`, { credentials: 'include' })
    .then(() => {
      setUser(null);
    })
    .catch(console.log);

  const handleAuth = async (data, regToggle, from) => {
    const fetchUrl = regToggle ? `${BASE_URL}/auth/register` : `${BASE_URL}/auth/login`;
    const response = await fetch(fetchUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json;charset=utf-8' },
      body: JSON.stringify(data),
      credentials: 'include',
    });

    if (response.ok) {
      const result = await response.json();
      if (result.id) {
        setUser(result);
        if (from) {
          navigate(from);
        } else {
          navigate('/');
        }
      } else {
        setMessage(result.message);
      }
    }
  };

  const handleUpdate = async (data) => {
    let result;
    const fetchUrl = `${BASE_URL}/auth/update`;
    const response = await fetch(fetchUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json;charset=utf-8' },
      body: JSON.stringify(data),
      credentials: 'include',
    });

    if (response.ok) {
      result = await response.json();
      if (result.id) {
        setUser({ id: result.id, name: result.name, email: result.email });
        setMessage(result.message);
        return result;
      }
      setMessage(result.message);
    }
    return result;
  };

  const handleDelete = async () => {
    try {
      const response = await fetch(`${BASE_URL}/lk/avatar`, {
        method: 'delete',
        credentials: 'include',
      });
      const result = await response.json();
      setUser(result);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <UserContext.Provider
      value={{
        user,
        handleAuth,
        handleLogout,
        handleUpdate,
        loading,
        message,
        setMessage,
        handleDelete,
      }}
    >
      {children}
    </UserContext.Provider>
  );
}

export default UserContextProvider;
