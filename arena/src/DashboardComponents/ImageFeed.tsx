import { useEffect, useState } from 'react';
import UploadImage from './UploadImage';
// import ImageCard from './ImageCard';

const imageFeedStyles = {
  container: {
    width: '500px',
    height: '800px',
    border: '5px solid black',
    padding: '50px',
    margin: '20px',
  },
};

function ImageFeed() {
  const [imageData, setImageData] = useState('');

  useEffect(() => {
    fetch('http://localhost:3334/api/images') //find correct url
      .then((res) => res.json())
      .then((data) => setImageData(data))
      .catch((err) => console.error('Failed to load images', err));
  }, []);

  return (
    <div style={imageFeedStyles.container}>
      <UploadImage />
      <ul>
        {imageData.map((image) => (
          <li key={image.imageid}>
            <img src={image.imageFile} alt='Uploaded image' />
            {/* <ImageCard image={image.imageFile}/> */}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ImageFeed;
