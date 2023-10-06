import { useContext } from 'react';
import { Card, CardMedia, CardContent, CardActionArea, Typography, Chip, IconButton } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { PinDrop, Restore } from '@mui/icons-material';
import { makeLikeThunk } from '../../redux/actions/adverts';
import { UserContext } from '../../context/user';

const BASE_URL = process.env.REACT_APP_BASE_URL;

export default function CardSmall({ post }) {
  const { user } = useContext(UserContext);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { likes } = useSelector((state) => state);
  const petLink = () => {
    navigate(`/pet/${post.id}`);
  };
  const makeLike = (e, obj) => {
    dispatch(makeLikeThunk(obj));
    likes.indexOf((el) => el.post_id === post.id);
  };

  return (
    <Card sx={{ minWidth: 216, maxWidth: 216 }} className="card small-card">
      <CardActionArea onClick={petLink}>
        <CardMedia
          component="img"
          height="180"
          image={`${BASE_URL}${post.photo_url}`}
          alt="фотография потеряшки"
        />

        <CardContent className="card-content small-card-content">
          <Typography
            className="card-description small-card-description"
            variant="subtitle2"
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
        </CardContent>
      </CardActionArea>

      <div className="card-overlay">
        <div className="favorites-button">
          {user?.id
            ? (
              <IconButton
                aria-label="like"
                size="large"
                onClick={(e) => makeLike(e, post)}
              >
                <span className={`material-symbols-outlined like-icon${likes.find((el) => el.post_id === post.id) ? ' filled' : ''}`}>
                  favorite
                </span>
              </IconButton>
            )
            : null}

        </div>

        <Chip
          label={post?.status}
          size="small"
          className="card-status"
          variant="outlined"
          color="primary"
        />
      </div>
    </Card>
  );
}
