import { useContext, useEffect, useState } from 'react';
import { TextField, Typography, Switch, Button, InputAdornment, IconButton, Input, FormControl, InputLabel, OutlinedInput } from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { useLocation } from 'react-router-dom';
import { toast } from 'react-toastify';
import { UserContext } from '../context/user';
import '../App.scss';
import 'react-toastify/dist/ReactToastify.css';

function Auth() {
  const [regToggle, setRegToggle] = useState(false);
  const { handleAuth, message, setMessage } = useContext(UserContext);
  const [switched, setSwitched] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [isValidEmail, setIsValidEmail] = useState(false);
  const location = useLocation();
  const from = location.state?.from?.pathname || '/';

  useEffect(() => {
    setMessage('');
  }, []);

  const regAuthToggle = (e) => {
    e.preventDefault();
    const titles = document.querySelectorAll('.auth-title-text');
    setSwitched(!switched);
    titles.forEach((el) => el.classList.toggle('auth-off'));
    setRegToggle(!regToggle);
    toast.dismiss(); // Скрытие всплывашки при переходе с регистрации на логин и обратно
  };

  const sendForm = async (e) => {
    e.preventDefault();
    const data = Object.fromEntries(new FormData(e.target));
    handleAuth(data, regToggle, from);
  };

  const label = { inputProps: { 'aria-label': 'Switch demo' } };
  return (
    <div className="auth-container">
      <div className="auth-title">
        <Typography onClick={(e) => regAuthToggle(e)} variant="h4" className="auth-title-text" gutterBottom component="div">
          Авторизация
        </Typography>

        <Switch {...label} checked={switched} onClick={(e) => regAuthToggle(e)} />

        <Typography onClick={(e) => regAuthToggle(e)} variant="h4" className="auth-title-text auth-off" gutterBottom component="div">
          Регистрация
        </Typography>
      </div>

      <form onSubmit={sendForm} id="auth-form" className="auth-form">
        {regToggle ? (
          <TextField
            required
            name="name"
            label="Имя"
            variant="outlined"
          />
        ) : null}

        <FormControl required sx={{ width: '100%' }} variant="outlined">
          <InputLabel htmlFor="email">Почта</InputLabel>
          <OutlinedInput
            required
            id="email"
            name="email"
            label="Почта"
            variant="outlined"
            type="email"
        //     endAdornment={(
        //       <InputAdornment position="end">git@github.com:zzzookie/hotim-domoy-2022.git
        //         <Button variant="text" type="button" className="form-button" size="small">
        //           Проверить
        //         </Button>
        //       </InputAdornment>
        // )}
          />
        </FormControl>

        <FormControl required sx={{ width: '100%' }} variant="outlined">
          <InputLabel htmlFor="password">Пароль</InputLabel>
          <OutlinedInput
            required
            id="password"
            name="password"
            label="Пароль"
            type={showPassword ? 'text' : 'password'}
            autoComplete="current-password"
            variant="outlined"
            endAdornment={(
              <InputAdornment sx={{ ml: "-6px" }} position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={() => setShowPassword((show) => !show)}
                  onMouseDown={(e) => e.preventDefault()}
                >
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
          )}
          />
        </FormControl>

        <Button variant="contained" type="submit" className="form-button" size="large">
          Отправить
        </Button>
      </form>

      {message && (
        <div className="toast-njksonkio">
          {toast.info(message, {
            position: toast.POSITION.BOTTOM_CENTER,
          })}
        </div>
      )}
    </div>
  );
}

export default Auth;
