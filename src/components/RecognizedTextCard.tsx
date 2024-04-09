import React from 'react';
import { Card, Button } from "flowbite-react";

function downloadTxtFile(text) {
  const element = document.createElement("a");
  const file = new Blob([text], {type: 'text/plain'});
  element.href = URL.createObjectURL(file);
  element.download = "recognized_text.txt";
  document.body.appendChild(element); // Required for this to work in FireFox
  element.click();
}

function RecognizedTextCard({ recognizedText }) {
  return (
    <div className="flex justify-end mt-8 mr-8">
      <Card className="max-w-sm">
        <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
          Recognized text:
        </h5>
        <p className="font-normal text-gray-700 dark:text-gray-400">
          {recognizedText || "No text recognized"}
        </p>
        {recognizedText && (
          <Button onClick={() => downloadTxtFile(recognizedText)} className="mt-4">
            Download as TXT
          </Button>
        )}
      </Card>
    </div>
  );
}

export default RecognizedTextCard;
