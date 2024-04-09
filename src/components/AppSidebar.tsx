import React, { useState } from 'react';
import { Sidebar } from "flowbite-react";
import { HiChartPie, HiInbox, HiUser, HiSave, HiViewBoards, HiTable, HiArrowSmRight } from "react-icons/hi";

function AppSidebar({ onImageSelect, onSaveImage, onBoundaryDetection, onColorCorrection, onBackgroundNoise, onCharacterRecognition, onClear }) {
  const [selectedImage, setSelectedImage] = useState(null);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();

    reader.onloadend = () => {
      setSelectedImage(reader.result);
      onImageSelect(reader.result);
    };

    if (file) {
      reader.readAsDataURL(file);
    }
  };

  const handleSaveImage = () => {
    onSaveImage();
  };

  const handleBoundaryDetection = () => {
    onBoundaryDetection();
  };

  const handleColorCorrection = () => {
    onColorCorrection();
  }

  const handleRemoveNoise = () => {
    onBackgroundNoise();
  }

  const handleClearImages = () => {
    onClear();
  };

  const handleCharacterRecognition = () => {
    onCharacterRecognition();
  }

  return (
    <Sidebar aria-label="Sidebar with content separator example">
      <Sidebar.Items>
        <Sidebar.ItemGroup>
          <Sidebar.Item icon={HiInbox}>
            <label htmlFor="imageInput">Load Image</label>
            <input
              id="imageInput"
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              style={{ display: 'none' }}
            />
          </Sidebar.Item>
          <Sidebar.Item onClick={handleSaveImage} icon={HiSave}>
            Save Image
          </Sidebar.Item>
          <Sidebar.Item onClick={handleClearImages} icon={HiArrowSmRight}>
            Clear Image
          </Sidebar.Item>
        </Sidebar.ItemGroup>
        <Sidebar.ItemGroup>
        <Sidebar.Item onClick={handleBoundaryDetection} icon={HiTable}>
            Boundary Detection
          </Sidebar.Item>
          <Sidebar.Item onClick={handleCharacterRecognition} icon={HiUser}>
            Character Recognition
          </Sidebar.Item>
          <Sidebar.Item onClick={handleRemoveNoise} icon={HiViewBoards}>
            Background Noise
          </Sidebar.Item>
          <Sidebar.Item onClick={handleColorCorrection} icon={HiChartPie}>
            Apply color correction
          </Sidebar.Item>
        </Sidebar.ItemGroup>
      </Sidebar.Items>
    </Sidebar>
  );
}

export default AppSidebar;
