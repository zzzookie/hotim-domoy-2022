import { RestartAlt, Search } from '@mui/icons-material';
import { Button, Typography } from '@mui/material';
import { useId } from 'react';
import { AddressSuggestions } from 'react-dadata';
import 'react-dadata/dist/react-dadata.css';

export default function MapAddress({ deleteLable, addressСoordinates, coord, inputCoord, setInputCoord }) {
  const id = useId();

  const inputHandler = (e) => {
    setInputCoord((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="newpost-map-address">
        {coord.adress
          ? (
            <Typography variant="body1" component="div" className="newpost-map-address-string" gutterBottom>
              {coord.adress}
            </Typography>
          )
          : (
            <AddressSuggestions
              token="7fa23e2d6ccf152e411f23cc5401b7984e61ec5c"
              value={inputCoord}
              onChange={setInputCoord}
              uid={id}
              placeholder="Введите адрес"
              minChars="4"
              delay="400"
              inputProps={{ placeholder: 'Адрес', required: true }}
            />
          )}
        {coord.adress
          ? <Button startIcon={<RestartAlt />} className="newpost-map-address-button" variant="outlined" onClick={deleteLable} type="button">Очистить</Button>
          : <Button startIcon={<Search />} className="newpost-map-address-button" variant="outlined" onClick={addressСoordinates} type="button">Поиск</Button>}

      </div>
    </form>

  );
}
