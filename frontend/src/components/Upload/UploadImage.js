import React, { useState } from 'react';
import axios from 'axios';

const UploadImage = () => {
  const [description, setDescription] = useState('');
  const [service, setService] = useState('unsplash');
  const [imageUrl, setImageUrl] = useState('');

  const handleUpload = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post('http://localhost:5000/generate', {
        description,
        service
      });
      setImageUrl(res.data.imageUrl);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div>
      <h2>Upload your image</h2>
      <form onSubmit={handleUpload}>
        <input
          type="text"
          placeholder="Image description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />
        <select value={service} onChange={(e) => setService(e.target.value)}>
          <option value="unsplash">Unsplash</option>
          <option value="pexels">Pexels</option>
        </select>
        <button type="submit">Generate Image</button>
      </form>
      {imageUrl && (
        <div>
          <h3>Generated Image:</h3>
          <img src={imageUrl} alt="Generated" style={{ width: '100%', height: 'auto' }} />
        </div>
      )}
    </div>
  );
};

export default UploadImage;
