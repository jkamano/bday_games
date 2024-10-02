import React, { useState } from 'react';

function AquariumMode({ socket }) {
  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleUpload = () => {
    if (selectedFile) {
      const reader = new FileReader();
      reader.onload = (e) => {
        socket.emit('upload_image', e.target.result);
      };
      reader.readAsDataURL(selectedFile);
    }
  };

  return (
    <div className="aquarium-mode">
      <h2>Aquarium Mode</h2>
      <input type="file" onChange={handleFileChange} accept="image/*" />
      <button onClick={handleUpload}>Upload Image</button>
    </div>
  );
}

export default AquariumMode;