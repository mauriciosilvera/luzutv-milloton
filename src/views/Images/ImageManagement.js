import React, { useState } from 'react';
import { Button } from '@mui/material';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { uploadImage } from '../../util/Requests';
import './ImageManagement.css';

function ImageManagement(props) {
  const { setImageHasChanged, imageHasChanged } = props;
  const [successMessage, setSuccessMessage] = useState();
  const [errorMessage, setErrorMessage] = useState();
  const [sponsors, setSponsors] = useState({
    luzuLogo: {
      fileName: '',
      file: ''
    },
    sponsorOne: {
      fileName: '',
      file: ''
    },
    sponsorTwo: {
      fileName: '',
      file: ''
    },
    sponsorThree: {
      fileName: '',
      file: ''
    },
    sponsorFour: {
      fileName: '',
      file: ''
    }
  });

  const handleUploadImages = (event, type) => {
    setSponsors((prev) => ({
      ...prev,
      [type]: {
        fileName: event?.target?.files[0]?.name,
        file: event?.target?.files[0]
      }
    }));
  };

  const mapImgNames = (type) => {
    if (type === 'luzuLogo') {
      return 'Logo';
    }

    if (type === 'sponsorOne') {
      return '1° Sponsor';
    }

    if (type === 'sponsorTwo') {
      return '2° Sponsor';
    }

    if (type === 'sponsorThree') {
      return '3° Sponsor';
    }

    if (type === 'sponsorFour') {
      return '4° Sponsor';
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage();
    setSuccessMessage();

    const formData = new FormData();

    Object.entries(sponsors).map((image) =>
      formData.append(image?.[0], image?.[1]?.file)
    );

    const res = await uploadImage(formData);

    console.log(res);

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
      <div className="imagesForm">
        {Object.entries(sponsors).map((image) => (
          <div key={image[0]} className="uploadFileBox">
            <h4>{mapImgNames(image[0])}</h4>
            <label
              htmlFor={image[0]}
              className={`uploadButton ${
                image?.[1]?.fileName ? `imageUploaded` : ''
              }`}
            >
              <CloudUploadIcon />
              <span> {image?.[1]?.fileName || `Seleccionar imagen`}</span>
            </label>
            <input
              type="file"
              className="hidden"
              id={image[0]}
              name={image[0]}
              accept="image/*"
              onChange={(e) => handleUploadImages(e, image[0])}
            />
          </div>
        ))}
        <Button
          variant="outlined"
          color="success"
          onClick={(e) => handleSubmit(e)}
          sx={{ marginTop: '15px', width: '50%' }}
        >
          Cargar
        </Button>
        {errorMessage && (
          <div className="imagesMessage fail">{errorMessage}</div>
        )}
        {successMessage && (
          <div className="imagesMessage success">{successMessage}</div>
        )}
      </div>
    </div>
  );
}

export default ImageManagement;
