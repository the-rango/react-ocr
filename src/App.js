import React, { useState } from 'react';
import { createWorker } from 'tesseract.js';
import './App.css';


function App() {
  const [ocr, setOcr] = useState('Recognizing...');
  const [prog, setProgress] = useState(0);


  const worker = createWorker({
    logger: m => setProgress(Math.floor(m['progress']*100)),
  });

  const doOCR = async (inpFile) => {
    await worker.load();
    await worker.loadLanguage('eng');
    await worker.initialize('eng');
    const { data: { text } } = await worker.recognize(inpFile);
    setOcr(text);
  };


  const processFile = (event) => {
    setProgress(0);
    doOCR(event.target.files[0]);
  };


  return (
    <div className="App">
      <form>
      <input type="file" onChange={processFile} />
      </form>
      <p>{prog}</p>
      <p>{ocr}</p>
    </div>
  );
}

export default App;
