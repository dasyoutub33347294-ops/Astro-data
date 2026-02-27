import React, { useRef, useState } from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { fileToBase64, resizeImage } from '../../utils/imageUtils';
import './ImageUploader.css';

const ImageUploader = ({ onImageReady }) => {
  const fileInputRef = useRef(null);
  const [preview, setPreview] = useState(null);
  const [isDragging, setIsDragging] = useState(false);
  const { t } = useLanguage();

  const processFile = async (file) => {
    if (!file || !file.type.startsWith('image/')) {
      return;
    }

    try {
      const base64 = await fileToBase64(file);
      const resized = await resizeImage(base64, 800, 800);
      setPreview(resized);
      if (onImageReady) {
        onImageReady(resized);
      }
    } catch (err) {
      console.error('Image processing error:', err);
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) processFile(file);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files[0];
    if (file) processFile(file);
  };

  const triggerInput = () => {
    fileInputRef.current.click();
  };

  const clearPreview = () => {
    setPreview(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <div className="image-uploader-container animate-fade-in">
      {!preview ? (
        <div
          className={`upload-zone ${isDragging ? 'dragging' : ''}`}
          onClick={triggerInput}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
        >
          <div className="upload-icon-wrapper">
            <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#00f0ff" strokeWidth="1.5" strokeLinecap="round">
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
              <polyline points="17 8 12 3 7 8"/>
              <line x1="12" y1="3" x2="12" y2="15"/>
            </svg>
          </div>
          <p className="upload-text">Tap to upload your palm photo</p>
          <p className="upload-subtext">JPG, PNG — Max 5MB</p>

          <input
            type="file"
            ref={fileInputRef}
            accept="image/*"
            capture="environment"
            onChange={handleFileChange}
            className="hidden-input"
          />
        </div>
      ) : (
        <div className="preview-container">
          <div className="preview-image-wrapper">
            <img src={preview} alt="Palm preview" className="preview-image" />
            <div className="preview-overlay">
              <div className="scan-line-animated"></div>
            </div>
          </div>
          <div className="preview-actions">
            <button className="btn-retake" onClick={clearPreview}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                <polyline points="1 4 1 10 7 10"/>
                <path d="M3.51 15a9 9 0 1 0 2.13-9.36L1 10"/>
              </svg>
              Retake
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ImageUploader;
