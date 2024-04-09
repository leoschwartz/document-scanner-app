import React, { useState, useEffect } from 'react';
import { DarkThemeToggle } from "flowbite-react";
import AppSidebar from "./components/AppSidebar";
import RecognizedTextCard from "./components/RecognizedTextCard";
import axios from 'axios';

function App() {
  const [selectedImage, setSelectedImage] = useState(null);
  const [processedImage, setProcessedImage] = useState<string | null>(null);
  const [recognizedText, setRecognizedText] = useState<string | null>(null);

  const fetchAPI = async () => {
     const response = await axios.get("http://localhost:8080/api/users");
     console.log(response.data.users);
  }

  useEffect(() => {
    fetchAPI()
  }, [])

  const handleSaveImage = () => {
    if (processedImage) {
      const link = document.createElement('a');
      link.href = `data:image/jpeg;base64,${processedImage}`;
      link.download = 'processed_image.png';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  const handleBoundaryDetection = async () => {
    try {
      const formData = new FormData();
      formData.append('image', selectedImage);
      const response = await axios.post("http://localhost:8080/api/boundary_detection", formData, {
        responseType: 'arraybuffer',
        headers: {
          'Content-Type': 'multipart/form-data',
        }
      });
      console.log(response)
        // Convert data to base64 string
      const processedImageBase64 = btoa(
        new Uint8Array(response.data).reduce(
          (data, byte) => data + String.fromCharCode(byte),
          ''
        )
      );

      setProcessedImage(processedImageBase64);
    } catch (error) {
      console.error("Error occurred while processing image:", error);
    }
  };
  
  const handleColorCorrection = async () => {
    try {
      const formData = new FormData();
      formData.append('image', selectedImage);
      const response = await axios.post("http://localhost:8080/api/color_correction", formData, {
        responseType: 'arraybuffer',
        headers: {
          'Content-Type': 'multipart/form-data',
        }
      });
  
      console.log(response)
      const processedImageBase64 = btoa(
        new Uint8Array(response.data).reduce(
          (data, byte) => data + String.fromCharCode(byte),
          ''
        )
      );
  
      setProcessedImage(processedImageBase64);
    } catch (error) {
      console.error("Error occurred while processing image:", error);
    }
  };
  
  const handleRemoveNoise = async () => {
    try {
      const formData = new FormData();
      formData.append('image', selectedImage);
      const response = await axios.post("http://localhost:8080/api/remove_noise", formData, {
        responseType: 'arraybuffer',
        headers: {
          'Content-Type': 'multipart/form-data',
        }
      });

      console.log(response);
      const processedImageBase64 = btoa(
        new Uint8Array(response.data).reduce(
          (data, byte) => data + String.fromCharCode(byte),
          ''
        )
      );

      setProcessedImage(processedImageBase64);
    } catch (error) {
      console.error("Error occurred while removing noise:", error);
    }
  };

  const handleCharacterRecognition = async () => {
    try {
      const formData = new FormData();
      formData.append('image', selectedImage);
      const response = await axios.post("http://localhost:8080/api/character_recognition", formData, {
        responseType: 'json', // Expect JSON response
        headers: {
          'Content-Type': 'multipart/form-data',
        }
      });
  
      // Extract processed image and recognized text from the response
      const { image, recognized_text: recognizedText } = response.data;
      console.log("Recognized Text:", recognizedText);
  
      // Set processed image and recognized text in the state
      setProcessedImage(image);
      setRecognizedText(recognizedText);
    } catch (error) {
      console.error("Error occurred while recognizing characters:", error);
    }
  };  
  
  const handleClearImages = async () => {
    setSelectedImage(null);
    setProcessedImage(null);
    setRecognizedText(null);
  };

  return (
    <main className="flex min-h-screen dark:bg-gray-800">
      <div className="flex justify-center items-center p-4">
        <div className="flex flex-col items-start">
          <AppSidebar 
          onImageSelect={setSelectedImage} 
          onSaveImage={handleSaveImage} 
          onBoundaryDetection={handleBoundaryDetection} 
          onColorCorrection={handleColorCorrection} 
          onBackgroundNoise={handleRemoveNoise}
          onCharacterRecognition={handleCharacterRecognition}
          onClear={handleClearImages}
          />
          <DarkThemeToggle />
        </div>
      </div>

      <div className="flex flex-col justify-center items-center  p-4 ml-32">
        <div className="bg-gray-300 max-w-[600px] max-h-[400px] w-full h-120 flex justify-center items-center overflow-hidden">
          {/* Display the selected image or processed image */}
          {processedImage ? 
            <img src={`data:image/jpeg;base64,${processedImage}`} alt="Processed" className="w-full h-full object-cover" /> :
            selectedImage && <img src={selectedImage} alt="Selected" className="w-full h-full object-cover" />
          }
          {/* Placeholder Image if no image is selected */}
          {!selectedImage && !processedImage && <img src="https://via.placeholder.com/600x400" alt="Placeholder" className="w-full h-full object-cover" />}
        </div>
        {/* Display recognized text card */}
        {recognizedText && <RecognizedTextCard recognizedText={recognizedText} />}
      </div>
    </main>
  );
}

export default App;
