import { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../../context/user';
import '../../App.scss';

function AuthCheck({ children }) {
  const { user } = useContext(UserContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      navigate('/');
    }
  }, []);

  return (
    <div>{ children }</div>
  );
}

export default AuthCheck;
