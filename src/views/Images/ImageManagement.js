import React, { useState } from 'react';
import { Button } from '@mui/material';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { uploadImage } from '../../util/Requests';
import './ImageManagement.css';

function ImageManagement(props) {
  const { setImageHasChanged, imageHasChanged } = props;
  const formData = new FormData();
  const [successMessage, setSuccessMessage] = useState();
  const [errorMessage, setErrorMessage] = useState();
  const [logo, setLogo] = useState();
  const [sponsorOne, setSponsorOne] = useState();
  const [sponsorTwo, setSponsorTwo] = useState();
  const [sponsorThree, setSponsorThree] = useState();
  const [sponsorFour, setSponsorFour] = useState();

  const handleUploadImage = (event) => {
    setLogo(event.target.files[0].name);
    formData.append('luzuLogo', event.target.files[0]);
  };

  const handleUploadSponsor1 = (event) => {
    setSponsorOne(event.target.files[0].name);
    formData.append('sponsorOne', event.target.files[0]);
  };

  const handleUploadSponsor2 = (event) => {
    setSponsorTwo(event.target.files[0].name);
    formData.append('sponsorTwo', event.target.files[0]);
  };

  const handleUploadSponsor3 = (event) => {
    setSponsorThree(event.target.files[0].name);
    formData.append('sponsorThree', event.target.files[0]);
  };

  const handleUploadSponsor4 = (event) => {
    setSponsorFour(event.target.files[0].name);
    formData.append('sponsorFour', event.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage();
    setSuccessMessage();

    const res = await uploadImage(formData);

    if (res?.data.length) {
      setSuccessMessage('Imágenes cargadas exitosamente');
      setImageHasChanged(!imageHasChanged);
      return;
    }
    setErrorMessage('Hubo un error al cargar las imágenes.');
  };

  return (
    <div className="imageManagementWrapper">
      <h1 className="title">Imágenes</h1>
      <form onSubmit={(e) => handleSubmit(e)} className="imagesForm">
        <div className="uploadFileBox">
          <h4>Logo</h4>
          <label
            htmlFor="uploadLogo"
            className={`uploadButton ${logo ? `imageUploaded` : ''}`}
          >
            <CloudUploadIcon />
            <span> {logo || `Seleccionar imagen`}</span>
          </label>
          <input
            type="file"
            className="hidden"
            id="uploadLogo"
            name="uploadLogo"
            accept="image/*"
            onChange={(e) => handleUploadImage(e)}
          />
        </div>
        <div className="uploadFileBox">
          <h4>1° Sponsor</h4>
          <label
            htmlFor="uploadSponsorOne"
            className={`uploadButton ${sponsorOne ? `imageUploaded` : ''}`}
          >
            <CloudUploadIcon />
            <span> {sponsorOne || `Seleccionar imagen`}</span>
          </label>
          <input
            type="file"
            className="hidden"
            id="uploadSponsorOne"
            name="uploadSponsorOne"
            accept="image/*"
            onChange={(e) => handleUploadSponsor1(e)}
          />
        </div>
        <div className="uploadFileBox">
          <h4>2° Sponsor</h4>
          <label
            htmlFor="uploadSponsorTwo"
            className={`uploadButton ${sponsorTwo ? `imageUploaded` : ''}`}
          >
            <CloudUploadIcon />
            <span> {sponsorTwo || `Seleccionar imagen`}</span>
          </label>
          <input
            type="file"
            className="hidden"
            id="uploadSponsorTwo"
            name="uploadSponsorTwo"
            accept="image/*"
            onChange={(e) => handleUploadSponsor2(e)}
          />
        </div>
        <div className="uploadFileBox">
          <h4>3° Sponsor</h4>
          <label
            htmlFor="uploadSponsorThree"
            className={`uploadButton ${sponsorThree ? `imageUploaded` : ''}`}
          >
            <CloudUploadIcon />
            <span> {sponsorThree || `Seleccionar imagen`}</span>
          </label>
          <input
            type="file"
            className="hidden"
            id="uploadSponsorThree"
            name="uploadSponsorThree"
            accept="image/*"
            onChange={(e) => handleUploadSponsor3(e)}
          />
        </div>
        <div className="uploadFileBox">
          <h4>4° Sponsor</h4>
          <label
            htmlFor="uploadSponsorFour"
            className={`uploadButton ${sponsorFour ? `imageUploaded` : ''}`}
          >
            <CloudUploadIcon />
            <span> {sponsorFour || `Seleccionar imagen`}</span>
          </label>
          <input
            type="file"
            className="hidden"
            id="uploadSponsorFour"
            name="uploadSponsorFour"
            accept="image/*"
            onChange={(e) => handleUploadSponsor4(e)}
          />
        </div>
        <Button
          variant="outlined"
          color="success"
          sx={{ marginTop: '15px', width: '50%' }}
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
