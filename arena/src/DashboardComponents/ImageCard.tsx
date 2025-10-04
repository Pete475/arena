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

const imageStyle = {
  container: {
    width: '100%',
    height: 'auto',
    // width: '100%',
    // height: '100%',
    // object-fit: cover,
    // background-size: cover,
  },
};

function ImageCard(props: { file: string | undefined }) {
  return (
    <div>
      <div style={imageCardStyles.container}>
        <img
          src={props.file}
          alt='Uploaded image'
          style={imageStyle.container}
        />
      </div>
      <Vote />
    </div>
  );
}

export default ImageCard;
