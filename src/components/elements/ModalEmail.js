import { useCallback, useRef, useState } from 'react';
import { Button, TextField, Dialog, DialogActions, DialogTitle } from '@mui/material';
import { Email, Send } from '@mui/icons-material';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { sendMessageThunk } from '../../redux/actions/message';

function Modal() {
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState('');
  const dispatch = useDispatch();
  const params = useParams();
  const { id } = params;

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleChange = useCallback((e) => {
    setForm(e.target.value);
  }, []);

  const handleSend = (e) => {
    e.preventDefault();
    dispatch(sendMessageThunk(form, id));
    e.target.reset();
    setOpen(false);
  };

  return (
    <div className="email-modal-icon" style={{ display: 'inline-flex', alignContent: 'stretch' }}>
      <Button variant="outlined" onClick={handleClickOpen}>
        <Email />
      </Button>

      <Dialog className="email-modal" open={open} onClose={handleClose}>
        <DialogTitle>
          Отправьте сообщение пользователю на почту
        </DialogTitle>

        <form onSubmit={handleSend}>
          <TextField
            fullWidth
            onChange={handleChange}
            value={form}
            id="outlined-multiline-static"
            label="Напишите сообщение"
            multiline
            rows={4}
          />

          <DialogActions>
            <Button variant="outlined" onClick={handleClose}>Отмена</Button>
            <Button type="submit" variant="contained" onClick={handleSend} endIcon={<Send />}>Отправить</Button>
          </DialogActions>
        </form>
      </Dialog>
    </div>
  );
}

export default Modal;
