import { PinDrop } from '@mui/icons-material';
import { Card, CardActionArea, CardContent, CardMedia, Typography } from '@mui/material';

const BASE_URL = process.env.REACT_APP_BASE_URL;

function Post({ post }) {
  return (
    <Card sx={{ width: 216, minWidth: 216 }} className="small-card">
      <CardActionArea>
        <CardMedia
          component="img"
          height="180"
          image={`${BASE_URL}${post.photo_url}`}
          alt="фотография потеряшки"
        />

        <CardContent className="card-content small-card-content">
          <Typography
            className="card-address small-card-address"
            variant="h6"
            color="text.secondary"
          >
            <PinDrop
              sx={{
                width: '16px',
                height: '16px',
                position: 'relative',
                top: '1px',
                marginRight: '3px',
              }}
            />
            {post.adress}
          </Typography>
          <Typography
            className="card-description small-card-description"
            variant="body2"
            color="text.secondary"
          >
            {post.text}
          </Typography>
          <Typography
            className="card-description small-card-description"
            variant="body2"
            color="text.secondary"
          >
            {post.timeSinceMissing}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}

export default Post;
