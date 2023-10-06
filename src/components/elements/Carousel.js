import { useEffect, useRef, useState } from 'react';
import { ArrowForwardIos } from '@mui/icons-material';
import CardSmall from './CardSmall';

function Carousel({ posts, id }) {
  const [slidesCount, setSlidesCount] = useState(0);
  const [minHeight, setMaxHeight] = useState(200);
  const [isLoading, setIsLoading] = useState(true);
  const self = useRef(null);
  const firstSlidesOnPage = Array(slidesCount).fill(null).map((el, i) => i * 4);

  function checkHeights() {
    if (!isLoading) {
      const slides = Array.from(self.current?.querySelectorAll('.carousel-flex'));
      const heights = slides?.map((slide) => Math.ceil(slide.getBoundingClientRect()?.height));
      setMaxHeight(Math.max(...heights));
    }
  }

  useEffect(() => {
    setIsLoading(false);
  }, []);

  useEffect(() => {
    checkHeights();

    const length = posts?.length;
    if (length) {
      setSlidesCount(Math.ceil(length / 4));
    }
  }, [isLoading, posts]);

  return (
    <div ref={self} id={`carousel-${id}`} data-interval={false} className="carousel slide" data-ride="carousel">
      {slidesCount >= 2
        ? (
          <div className="carousel-indicators">
            {
              firstSlidesOnPage.map((page, i) => (
                <button
                  key={i}
                  type="button"
                  data-bs-target={`#carousel-${id}`}
                  data-bs-slide-to={`${i}`}
                  className={`carousel-indicator${i === 0 ? ' active' : ''}`}
                  aria-current={i === 0}
                  aria-label={`Slide ${i + 1}`}
                />
              ))
            }
          </div>
        )
        : null}

      <div className="carousel-inner">
        {
          firstSlidesOnPage.map((elNumber, i) => (posts[elNumber]?.id
            ? (
              <div key={`slide_${i}`} className={`carousel-item${i === 0 ? ' active' : ''}`}>
                <div className="carousel-flex" style={{ minHeight: `${minHeight}px` }}>
                  {posts.map((post, index) => {
                    if (index >= elNumber && index < elNumber + 4) {
                      return <CardSmall key={index} post={post} />;
                    }
                    return null;
                  })}
                </div>
              </div>
            )
            : null))
        }
      </div>

      {slidesCount > 1
        ? (
          <>
            <button onClick={() => checkHeights()} className="carousel-control carousel-control-prev" type="button" data-bs-target={`#carousel-${id}`} data-bs-slide="prev">
              <ArrowForwardIos sx={{ color: "#2776d2", width: "48px", height: "48px", transform: "rotate(180deg)" }} aria-hidden="true" />
              <span className="visually-hidden">Previous</span>
            </button>

            <button onClick={() => checkHeights()} className="carousel-control carousel-control-next" type="button" data-bs-target={`#carousel-${id}`} data-bs-slide="next">
              <ArrowForwardIos sx={{ color: "#2776d2", width: "48px", height: "48px" }} aria-hidden="true" />
              <span className="visually-hidden">Next</span>
            </button>
          </>
        )
        : null}

    </div>
  );
}

export default Carousel;
