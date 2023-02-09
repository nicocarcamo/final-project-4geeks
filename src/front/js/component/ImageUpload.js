import React, { useState } from "react";
import { useDropzone } from "react-dropzone";
import axios from "axios";


const ImagenUploaded = () => {
  const [eventImage, setEventImage] = useState(null);
  const onDrop = async (files) => {
    const file = files[0];
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "cdh92emp");
    const response = await axios.post(
      "https://api.cloudinary.com/v1_1/ddx94eu6o/image/upload",
      formData
    );
    setEventImage(response.data.secure_url);
  };
  const { getRootProps, getInputProps } = useDropzone({ onDrop });

  return (
    <div {...getRootProps()}>
      <input {...getInputProps()}/>
      {eventImage ? (
        <img src={eventImage} alt="Uploaded Image" width="50px" height="50px" />
      ) : (
        <p className="pImg">
          Arrastra y suelta una imagen aquí o haz clic para seleccionar una
          imagen
        </p>
      )}
    </div>
  );
};

export default ImagenUploaded;
