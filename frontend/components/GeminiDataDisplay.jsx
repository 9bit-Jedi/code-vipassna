import React, { useEffect, useState } from 'react';
import { makeGeminiApiRequest as makeGeminiApiResponse } from '../utils/geminiApi';

const GeminiDataDisplay = () => {
  const [geminiData, setGeminiData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const data = await makeGeminiApiResponse();
      setGeminiData(data);
    };

    fetchData();
  }, []);

  return (
    <div>
      {geminiData ? (
        <div>
          <h1>Gemini API Data</h1>
          <pre>{JSON.stringify(geminiData, null, 2)}</pre>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default GeminiDataDisplay;