import Vote from './Vote';
// import { useState } from 'react';

const imageCardStyles = {
  container: {
    width: '300px',
    height: '300px',
    border: '1px dashed black',
    padding: '50px',
    margin: '20px',
  },
};

function ImageCard() {
  //   const [imageCardsList, setImageCardsList] = useState([]);

  //   setImageCardsList([...imageCardsList, props.file]);

  return (
    <div>
      <div style={imageCardStyles.container}>ImageCard</div>
      <Vote />
    </div>
  );
}

export default ImageCard;
