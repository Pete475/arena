import { useState } from 'react';

function UploadImage() {
  const [file, setFile] = useState('');
  const [image, setImage] = useState('');
  const [imageList, setImageList] = useState([]);

  const handleChange = (e) => {
    console.log(e.target.files);
    setFile(URL.createObjectURL(e.target.files[0]));
    setImage(file);
    setImageList([...imageList, image]);
    //still need to save the image to the database through a post request
  };

  return (
    <div>
      <h3>Upload Image:</h3>
      <input type='file' onChange={handleChange} />
      {file && <img src={file} alt='Uploaded preview' />}
    </div>
  );
}

export default UploadImage;
