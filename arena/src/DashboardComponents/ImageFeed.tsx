import ImageCard from './ImageCard';
import UploadImage from './UploadImage';

const imageFeedStyles = {
  container: {
    width: '500px',
    height: '800px',
    border: '5px solid black',
    padding: '50px',
    margin: '20px',
  },
};

// send a get request to get the images from the database

function ImageFeed() {
  return (
    <div style={imageFeedStyles.container}>
      <ImageCard />
      <UploadImage />
    </div>
  );
}

export default ImageFeed;
