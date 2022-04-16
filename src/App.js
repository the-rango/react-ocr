import React, { useState } from 'react';
import { createWorker } from 'tesseract.js';
import './App.css';

function App() {
  const worker = createWorker({
    logger: m => console.log(m),
  });
  const doOCR = async (inpFile) => {
    await worker.load();
    await worker.loadLanguage('eng');
    await worker.initialize('eng');
    const { data: { text } } = await worker.recognize(inpFile);
    setOcr(text);
  };
  const [ocr, setOcr] = useState('Recognizing...');

  const processFile = (event) => {
    doOCR(event.target.files[0]);
  };

  const [inpFile, setInpFile] = useState(undefined);
  return (
    <div className="App">
      <form>
      <input type="file" value={inpFile} onChange={processFile} />
      </form>
      <p>{ocr}</p>
    </div>
  );
}

export default App;
