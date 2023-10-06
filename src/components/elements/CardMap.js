import { useContext } from 'react';
import { Card, CardActionArea, CardContent, CardMedia, IconButton, Typography } from '@mui/material';
import { PinDrop, Restore } from '@mui/icons-material';
import { useDispatch, useSelector } from 'react-redux';
import { makeLikeThunk } from '../../redux/actions/adverts';
import { UserContext } from '../../context/user';

const BASE_URL = process.env.REACT_APP_BASE_URL;

function CardMap({ post, setTypeAndPan }) {
  const { user } = useContext(UserContext);
  const { likes } = useSelector((state) => state);
  const dispatch = useDispatch();

  const makeLike = (e, obj) => {
    e.stopPropagation();
    dispatch(makeLikeThunk(obj));
  };

  return (
    <Card className="card map-card" variant="outlined">
      <CardActionArea className="card-action-area" onClick={() => setTypeAndPan(post.address_lattitude, post.address_longitude)}>

        <CardMedia className="card-photo" component="img" sx={{ width: 130 }} image={`${BASE_URL}${post?.photo_url}`} alt="Фото питомца" />
        <CardContent className="card-content">
          <Typography
            className="card-description small-card-description"
            variant="body2"
            color="text.secondary"
          >
            {post?.text}
          </Typography>
          <div className="card-bottom">
            <Typography
              className="card-address small-card-address"
              variant="caption"
              color="text.secondary"
            >
              <PinDrop
                sx={{
                  width: '16px',
                  height: '16px',
                  position: 'relative',
                  top: '3px',
                  marginRight: '3px',
                }}
              />
              {post?.address_string}
            </Typography>
            <Typography
              className="card-timesincemissing"
              variant="caption"
              color="text.secondary"
            >
              <Restore
                sx={{
                  width: '16px',
                  height: '16px',
                  position: 'relative',
                  top: '3px',
                  marginRight: '3px',
                }}
              />
              {post?.timeSinceMissing}
            </Typography>
          </div>

          <div className="card-overlay">
            {user?.id
              ? (
                <IconButton
                  className="favorites-button"
                  aria-label="like"
                  size="large"
                  onClick={(e) => makeLike(e, post)}
                >
                  <span sx={{ fontSize: "0px" }} className={`material-symbols-outlined like-icon${likes.find((el) => el.post_id === post.id) ? ' filled' : ''}`}>
                    favorite
                  </span>
                </IconButton>
              )
              : null}
          </div>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}

export default CardMap;
