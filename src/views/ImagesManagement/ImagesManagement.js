import React, { useState, useEffect } from 'react';
import { Button, IconButton } from '@mui/material';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { Delete } from '@mui/icons-material';
import LoadingSpinner from '../../components/LoadingSpinner/LoadingSpinner';
import { updateImages, getImages } from '../../util/Requests';
import withoutImg from '../../public/cruzRoja.png';
import './ImagesManagement.css';

function ImagesManagement(props) {
  const { setImageHasChanged, imageHasChanged } = props;
  const [successMessage, setSuccessMessage] = useState();
  const [errorMessage, setErrorMessage] = useState();
  const [deletedImages, setDeletedImages] = useState('');
  const [isDataLoaded, setIsDataLoaded] = useState(false);
  const [sponsors, setSponsors] = useState({
    luzuLogo: {
      fileName: '',
      file: '',
      newFile: '',
      newFilePreview: ''
    },
    sponsorOne: {
      fileName: '',
      file: '',
      newFile: '',
      newFilePreview: ''
    },
    sponsorTwo: {
      fileName: '',
      file: '',
      newFile: '',
      newFilePreview: ''
    },
    sponsorThree: {
      fileName: '',
      file: '',
      newFile: '',
      newFilePreview: ''
    },
    sponsorFour: {
      fileName: '',
      file: '',
      newFile: '',
      newFilePreview: ''
    }
  });

  useEffect(() => {
    getImages('luzuLogo,sponsorOne,sponsorTwo,sponsorThree,sponsorFour').then(
      (images) => {
        const IMAGE_NAME_INDEX = 0;
        const FILE_INDEX = 1;
        Object.entries(images).map((row) =>
          setSponsors((prev) => ({
            ...prev,
            [row?.[IMAGE_NAME_INDEX]]: {
              file: row?.[FILE_INDEX],
              fileName: '',
              newFile: '',
              newFilePreview: ''
            }
          }))
        );
        setIsDataLoaded(true);
      }
    );
  }, []);

  const readUploadedFile = (file) =>
    new Promise((resolve, reject) => {
      const fr = new FileReader();
      fr.onload = () => {
        resolve(fr.result);
      };
      fr.onerror = reject;
      fr.readAsDataURL(file);
    });

  const handleUploadImages = async (event, type) => {
    const file = event?.target?.files[0];

    try {
      const fileContent = await readUploadedFile(file);

      setSponsors((prev) => ({
        ...prev,
        [type]: {
          fileName: event?.target?.files[0]?.name,
          newFile: event?.target?.files[0],
          newFilePreview: fileContent
        }
      }));
      setDeletedImages(deletedImages.replace(`${type},`, ''));
    } catch (e) {
      console.warn(e.message);
    }
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

  const handleDeleteImg = (type) => {
    if (!deletedImages.includes(type)) {
      setDeletedImages(`${deletedImages}${type},`);
    }

    setSponsors((prev) => ({
      ...prev,
      [type]: {
        file: null,
        newFile: null
      }
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage();
    setSuccessMessage();

    const formData = new FormData();

    Object.entries(sponsors).map((image) =>
      formData.append(image?.[0], image?.[1]?.newFile)
    );

    const res = await updateImages(formData, deletedImages);

    if (res?.status === 200) {
      setSuccessMessage('Guardado con éxito');
      setImageHasChanged(!imageHasChanged);
      return;
    }
    setErrorMessage('Hubo un error al guardar las imágenes.');
  };

  return (
    <div className="imageManagementWrapper">
      {!isDataLoaded ? (
        <LoadingSpinner />
      ) : (
        <>
          <h1 className="title">Imágenes</h1>
          {console.log(sponsors)}
          <div className="imagesForm">
            {Object.entries(sponsors).map((image) => (
              <div key={image[0]} className="uploadFileBox">
                <div className="responsiveBox">
                  <div className="imageTypesBox">
                    <h4 className="imageTypes">{mapImgNames(image[0])}</h4>
                  </div>
                  <img
                    className="imgPreview"
                    src={
                      image?.[1]?.newFilePreview ||
                      image?.[1]?.file ||
                      withoutImg
                    }
                    alt="preview"
                  />
                </div>
                <label
                  htmlFor={image[0]}
                  className={`uploadButton ${
                    image?.[1]?.fileName ? `imageUploaded` : ''
                  }`}
                >
                  <CloudUploadIcon />
                  <span className="uploadButtonText">
                    {image?.[1]?.fileName || `Seleccionar imagen`}
                  </span>
                </label>
                <input
                  type="file"
                  className="hidden"
                  id={image[0]}
                  name={image[0]}
                  accept="image/*"
                  onChange={(e) => {
                    handleUploadImages(e, image[0]);
                  }}
                />
                <IconButton onClick={() => handleDeleteImg(image[0])}>
                  <Delete sx={{ color: '#1b2430', fontSize: '30px' }} />
                </IconButton>
              </div>
            ))}
            <Button
              variant="outlined"
              color="success"
              onClick={(e) => handleSubmit(e)}
              sx={{ margin: '10px 0', width: '50%', maxWidth: '300px' }}
            >
              Guardar
            </Button>
            {errorMessage && (
              <div className="imagesMessage fail">{errorMessage}</div>
            )}
            {successMessage && (
              <div className="imagesMessage success">{successMessage}</div>
            )}
          </div>
        </>
      )}
    </div>
  );
}

export default ImagesManagement;
