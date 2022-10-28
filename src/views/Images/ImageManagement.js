import React, { useState } from 'react';
import { Button } from '@mui/material';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { uploadImage } from '../../util/Requests';
import './ImageManagement.css';

function ImageManagement(props) {
  const { setImageHasChanged, imageHasChanged } = props;
  const [successMessage, setSuccessMessage] = useState();
  const [errorMessage, setErrorMessage] = useState();
  const [logoName, setLogoName] = useState();
  const [sponsorOneName, setSponsorOneName] = useState();
  const [sponsorTwoName, setSponsorTwoName] = useState();
  const [sponsorThreeName, setSponsorThreeName] = useState();
  const [sponsorFourName, setSponsorFourName] = useState();
  const [logoImg, setLogoImg] = useState();
  const [sponsorOneImg, setSponsorOneImg] = useState();
  const [sponsorTwoImg, setSponsorTwoImg] = useState();
  const [sponsorThreeImg, setSponsorThreeImg] = useState();
  const [sponsorFourImg, setSponsorFourImg] = useState();

  const handleUploadLogo = (event) => {
    setLogoName(event.target.files[0].name);
    setLogoImg(event.target.files[0]);
  };

  const handleUploadSponsor1 = (event) => {
    setSponsorOneName(event.target.files[0].name);
    setSponsorOneImg(event.target.files[0]);
  };

  const handleUploadSponsor2 = (event) => {
    setSponsorTwoName(event.target.files[0].name);
    setSponsorTwoImg(event.target.files[0]);
  };

  const handleUploadSponsor3 = (event) => {
    setSponsorThreeName(event.target.files[0].name);
    setSponsorThreeImg(event.target.files[0]);
  };

  const handleUploadSponsor4 = (event) => {
    setSponsorFourName(event.target.files[0].name);
    setSponsorFourImg(event.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage();
    setSuccessMessage();

    const formData = new FormData();

    if (logoImg) {
      formData.append('luzuLogo', logoImg);
    }

    if (sponsorOneImg) {
      formData.append('sponsorOne', sponsorOneImg);
    }

    if (sponsorTwoImg) {
      formData.append('sponsorTwo', sponsorTwoImg);
    }

    if (sponsorThreeImg) {
      formData.append('sponsorThree', sponsorThreeImg);
    }

    if (sponsorFourImg) {
      formData.append('sponsorFour', sponsorFourImg);
    }

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
      <form className="imagesForm" onSubmit={(e) => handleSubmit(e)}>
        <div className="uploadFileBox">
          <h4>Logo</h4>
          <label
            htmlFor="uploadLogo"
            className={`uploadButton ${logoName ? `imageUploaded` : ''}`}
          >
            <CloudUploadIcon />
            <span> {logoName || `Seleccionar imagen`}</span>
          </label>
          <input
            type="file"
            className="hidden"
            id="uploadLogo"
            name="uploadLogo"
            accept="image/*"
            onChange={(e) => handleUploadLogo(e)}
          />
        </div>
        <div className="uploadFileBox">
          <h4>1° Sponsor</h4>
          <label
            htmlFor="uploadSponsorOne"
            className={`uploadButton ${sponsorOneName ? `imageUploaded` : ''}`}
          >
            <CloudUploadIcon />
            <span> {sponsorOneName || `Seleccionar imagen`}</span>
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
            className={`uploadButton ${sponsorTwoName ? `imageUploaded` : ''}`}
          >
            <CloudUploadIcon />
            <span> {sponsorTwoName || `Seleccionar imagen`}</span>
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
            className={`uploadButton ${
              sponsorThreeName ? `imageUploaded` : ''
            }`}
          >
            <CloudUploadIcon />
            <span> {sponsorThreeName || `Seleccionar imagen`}</span>
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
            className={`uploadButton ${sponsorFourName ? `imageUploaded` : ''}`}
          >
            <CloudUploadIcon />
            <span> {sponsorFourName || `Seleccionar imagen`}</span>
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
          type="submit"
          sx={{ marginTop: '15px', width: '50%' }}
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
