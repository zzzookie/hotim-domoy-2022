import { useEffect, useState } from 'react';
import './Gallery.scss';

const BASE_URL = process.env.REACT_APP_BASE_URL;

function Gallery({ pet }) {
  const [images, setImages] = useState([]);

  useEffect(() => {
    const imagesTemp = [];
    for (let i = 0; i < pet?.images?.length; i += 1) {
      imagesTemp.push(pet?.images[i]);
    }
    setImages(imagesTemp);
  }, [pet]);

  useEffect(() => {
    if (images?.length > 0) {
      document.getElementById('img-0').checked = true;
    }
  }, [images]);

  return (
    <section className="gallery">
      {images.map((image, i) => (
        <div key={i} className="gallery__item">
          <input type="radio" id={`img-${i}`} name="gallery" className="gallery__selector" />
          <img className="gallery__img" src={`${BASE_URL}${image}`} alt="" />
          <label htmlFor={`img-${i}`} className="gallery__thumb">
            <img src={`${BASE_URL}${image}`} alt="" />
          </label>
        </div>
      ))}
    </section>
  );
}

export default Gallery;
