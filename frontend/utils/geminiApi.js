import spotifyData from '../../backend/spotify.json';
import youtubeData from '../../backend/youtube.json';
import appleData from '../../backend/apple.json';

// const { GoogleGenerativeAI } = require("@google/generative-ai");
import { GoogleGenerativeAI } from '@google/generative-ai';
// from google import genai

const geminiApiUrl = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=AIzaSyBxJvJDTPIJh49ZA9glv0Plodi_JYRCOvQ';

const requestData = {
  spotify: spotifyData,
  youtube: youtubeData,
  apple: appleData,
  prompt: 'create centralised data json response combining the 3 responses.' // Leave space for prompt
};



const makeGeminiApiRequest = async () => {

  const genAI = new GoogleGenerativeAI("AIzaSyBxJvJDTPIJh49ZA9glv0Plodi_JYRCOvQ");
  const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
  
  const prompt = requestData.prompt;
  const result = await model.generateContent(prompt);

  console.log(result.response.text());

  return result.response.text();


  // client = genai.Client(
  //     api_key="AIzaSyBxJvJDTPIJh49ZA9glv0Plodi_JYRCOvQ"
  // )
  // response = client.models.generate_content(
  //     model='gemini-2.0-flash-exp', contents='Create centralised data json response combining the 3 responses.'
  // )



  // try {
  //   const response = await fetch(geminiApiUrl, {
  //     method: 'POST',
  //     headers: {
  //       'Content-Type': 'application/json'
  //     },
  //     body: JSON.stringify(requestData)
  //   });
  //   console.log(spotifyData);

  //   const data = await response.json();
  //   return data; // Return the data instead of logging it
  // } catch (error) {
  //   console.error('Error making Gemini API request:', error);
  //   return null; // Return null in case of error
  // }
};

export { makeGeminiApiRequest };

// makeGeminiApiRequest();