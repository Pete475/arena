import { useState } from 'react';
import ImageCard from './ImageCard';

function UploadImage() {
  const [file, setFile] = useState('');
  // const [image, setImage] = useState('');
  // const [imageList, setImageList] = useState([]);

  const handleChange = (e) => {
    console.log(e.target.files);
    setFile(URL.createObjectURL(e.target.files[0]));
    // setImage(file);
    // setImageList([...imageList, file]);

    fetch('/', {
      // get the correct path this needs to be sent to
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ imageFile: file }), //sending file to be used for the src attribute for the img tag
    })
      .then((response) => response.json)
      .then((data) => console.log(data))
      .catch((error) => console.error('Error:', error));
  };

  return (
    <div>
      <h3>Upload Image:</h3>
      <input type='file' onChange={handleChange} />
      {/* {file && <img src={file} alt='Uploaded preview' />} */}
      {file && <ImageCard file={file} />}
    </div>
  );
}

export default UploadImage;
