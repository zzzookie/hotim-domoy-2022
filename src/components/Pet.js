import '../App.scss';
import { useCallback, useContext, useEffect, useState } from 'react';
import { Avatar, Button, IconButton, Paper, Stack, Typography } from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Call, PinDrop, Restore } from '@mui/icons-material';
import { makeLikeThunk } from '../redux/actions/adverts';
import { UserContext } from '../context/user';
import ModalEmail from './elements/ModalEmail';
// import BasicModal from './elements/ModalForChat';
import Gallery from './elements/Gallery';
import MapSmall from './elements/MapSmall';

const BASE_URL = process.env.REACT_APP_BASE_URL;

export default function Pet() {
  const dispatch = useDispatch();
  const params = useParams();
  const { id } = params;
  const { likes } = useSelector((state) => state);
  const [pet, setPet] = useState({});
  const [showPhone, setShowPhone] = useState(false);
  const [showMap, setShowMap] = useState(false);
  const [flag, setFlag] = useState(false);
  const navigate = useNavigate();
  const { user } = useContext(UserContext);

  useEffect(() => {
    fetch(`${BASE_URL}/adverts/${id}`)
      .then((res) => res.json())
      .then((res) => {
        setPet(res.post);
      });
  }, []);

  const handleNav = () => navigate('/auth');

  const mapToggle = () => {
    setShowMap(!showMap);
  };

  const makeLike = useCallback((obj) => {
    dispatch(makeLikeThunk(obj));
    setFlag((prev) => !prev);
  }, []);

  const handlePhoneClick = (e) => {
    if (!showPhone) {
      setShowPhone(true);
    } else {
      window.location.href = `tel:+${pet.phone}`;
    }
  };

  return (
    <div className="container">
      <div className="content pet-page" style={{ flexGrow: 0 }}>
        <Paper className="post-owner-header" elevation={3}>
          <Stack className="author" direction="row" spacing={1}>
            <Avatar
              sx={{ width: 48, height: 48 }}
              src={`${BASE_URL}${pet.user_photo}`}
              alt="Аватар"
            />
            <Typography variant="overline" className="author-name" gutterBottom>
              {pet.user_name}
            </Typography>
          </Stack>

          <Stack className="author-icons" direction="row" spacing={1}>
            <Button onClick={handlePhoneClick} variant="outlined">
              {showPhone ? (
                <>
                  <Call />
                  <span className="phone-number">{`+${pet.phone}`}</span>
                </>
              ) : (
                <Call />
              )}
            </Button>

            <ModalEmail />
            {/* {user ? (
              <BasicModal />
            ) : (
              <Button
                onClick={handleNav}
                variant="contained"
                disableElevation
                startIcon={<ChatIcon />}
              >
                Чат
              </Button>
            )} */}
          </Stack>
        </Paper>

        <div className="gallery-wrapper">

          <Paper sx={{ paddingBottom: '4rem' }}>
            <div className="page-header">
              <div className="gallery-timesince">
                <Stack direction="row" spacing={1}>
                  <Restore />
                  <Typography variant="caption">{pet.timeSinceMissing}</Typography>
                </Stack>
              </div>

              { !!user
              && (
              <IconButton
                className="favorites-button"
                aria-label="like"
                size="large"
                onClick={() => makeLike(pet)}
              >
                <span sx={{ fontSize: '0px' }} className={`material-symbols-outlined like-icon${likes.find((el) => el.post_id === pet.id) ? ' filled' : ''}`}>
                  favorite
                </span>
              </IconButton>
              )}

            </div>

            <Gallery className="gallery" pet={pet} />

            <div className="map-and-address">
              <Stack className="gallery-address" direction="row" spacing={1}>
                <PinDrop />
                <Typography variant="caption">{pet.address_string}</Typography>
              </Stack>

              {showMap ? (
                <Button onClick={mapToggle} variant="outlined">
                  ▲ Скрыть карту
                </Button>
              ) : (
                <Button onClick={mapToggle} variant="outlined">
                  ▼ Показать на карте
                </Button>
              )}
            </div>

            {showMap ? (
              <MapSmall pet={pet} />
            ) : null }

            <table className="table" style={{ marginLeft: '1rem', marginRight: '1rem' }}>
              <tr>
                <td className="description">
                  <Typography variant="subtitle1">Питомец</Typography>
                </td>
                <td className="value">
                  <Typography variant="subtitle1">{pet.pet}</Typography>
                </td>
              </tr>
              <tr>
                <td className="description">
                  <Typography variant="subtitle1">Цвет</Typography>
                </td>
                <td className="value">
                  <Typography variant="subtitle1">{pet.color_name}</Typography>
                </td>
              </tr>
              <tr>
                <td className="description">
                  <Typography variant="subtitle1">Размер</Typography>
                </td>
                <td className="value">
                  <Typography variant="subtitle1">{pet.size}</Typography>
                </td>
              </tr>
              <tr>
                <td className="description">
                  <Typography variant="subtitle1">Описание</Typography>
                </td>
                <td className="value">
                  <Typography variant="subtitle1">{pet.text}</Typography>
                </td>
              </tr>
            </table>

          </Paper>

        </div>
      </div>
    </div>
  );
}
