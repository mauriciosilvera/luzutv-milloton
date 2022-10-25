import React, { useState } from 'react';
import { Button } from '@mui/material';
import { uploadImage } from '../../util/Requests';
import './ImageManagement.css';

function ImageManagement(props) {
  const { setImageHasChanged, imageHasChanged } = props;
  const formData = new FormData();
  const [successMessage, setSuccessMessage] = useState();
  const [errorMessage, setErrorMessage] = useState();

  const handleUploadImage = (event) => {
    formData.append('luzuLogo', event.target.files[0]);
  };

  const handleUploadSponsor1 = (event) => {
    formData.append('sponsorOne', event.target.files[0]);
  };

  const handleUploadSponsor2 = (event) => {
    formData.append('sponsorTwo', event.target.files[0]);
  };

  const handleUploadSponsor3 = (event) => {
    formData.append('sponsorThree', event.target.files[0]);
  };

  const handleUploadSponsor4 = (event) => {
    formData.append('sponsorFour', event.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage();
    setSuccessMessage();

    const res = await uploadImage(formData);

    if (res?.data.length) {
      setSuccessMessage('Imagenes subidas con éxito!');
      setImageHasChanged(!imageHasChanged);
      return;
    }
    setErrorMessage('Hubo un error al cargar las imágenes.');
  };

  return (
    <div className="imageManagementWrapper">
      <h2 className="title">Imágenes</h2>
      <form onSubmit={(e) => handleSubmit(e)} className="imagesForm">
        <div className="uploadFileBox">
          <h4>Logo</h4>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => handleUploadImage(e)}
          />
        </div>
        <div className="uploadFileBox">
          <h4>1° Sponsor</h4>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => handleUploadSponsor1(e)}
          />
        </div>
        <div className="uploadFileBox">
          <h4>2° Sponsor</h4>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => handleUploadSponsor2(e)}
          />
        </div>
        <div className="uploadFileBox">
          <h4>3° Sponsor</h4>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => handleUploadSponsor3(e)}
          />
        </div>
        <div className="uploadFileBox">
          <h4>4° Sponsor</h4>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => handleUploadSponsor4(e)}
          />
        </div>
        <Button
          variant="outlined"
          color="success"
          sx={{ marginTop: '10px', width: '60%' }}
          onClick={handleSubmit}
        >
          Cargar
        </Button>
      </form>
      {errorMessage && <div className="imagesMessage fail">{errorMessage}</div>}
      {successMessage && (
        <div className="imagesMessage success">{successMessage}</div>
      )}
    </div>
  );
}

export default ImageManagement;
