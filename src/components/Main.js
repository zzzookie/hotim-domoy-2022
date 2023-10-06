import { Button, ButtonGroup, Typography } from '@mui/material';
import { useContext, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { getLastPostsThunk, getLikesThunk } from '../redux/actions/adverts';
import Carousel from './elements/Carousel';
import { UserContext } from '../context/user';

function Main() {
  const { user, loading } = useContext(UserContext);
  const dispatch = useDispatch();
  const { lastPosts, likes } = useSelector((state) => state);
  useEffect(() => {
    dispatch(getLastPostsThunk());
    dispatch(getLikesThunk());
  }, []);
  const navigate = useNavigate();

  return (
    <div className="container">
      <div className="content innermargin">

        {
        (!loading && !user?.id)
        && <Typography variant="subtitle1" sx={{ fontFamily: 'monospace' }}>«Хотим Домой» — сервис для поиска потерявшихся питомцев и хозяев</Typography>
        }

        <ButtonGroup
          className="main-buttons-group"
          size="large"
          variant="contained"
          aria-label="outlined primary button group"
        >
          <Button onClick={() => navigate('/newpost?type=found')}>Я нашёл</Button>
          <Button onClick={() => navigate('/newpost?type=lost')}>Я потерял</Button>
        </ButtonGroup>

        <div className="main-last-posts main-last-posts-lost">
          <div className="main-last-posts-wrapper">
            <div className="main-last-posts-title-wrapper">
              <Typography className="main-last-posts-title" variant="h4" gutterBottom component="div">
                Потерялись недавно
              </Typography>
              <Button onClick={() => navigate('/catalog')} variant="text">Показать всех</Button>
            </div>

            <Carousel id={1} posts={lastPosts?.lost} likes={likes} />
          </div>
        </div>

        <div className="main-last-posts main-last-posts-found">
          <div className="main-last-posts-wrapper">
            <div className="main-last-posts-title-wrapper">
              <Typography className="main-last-posts-title" variant="h4" gutterBottom component="div">
                Ищут хозяев
              </Typography>
              <Button onClick={() => navigate('/catalog')} variant="text">Показать всех</Button>
            </div>
            <Carousel id={2} posts={lastPosts?.found} />
          </div>
        </div>
      </div>

      <script src="https://unpkg.com/flickity@2/dist/flickity.pkgd.min.js" />
    </div>
  );
}

export default Main;
