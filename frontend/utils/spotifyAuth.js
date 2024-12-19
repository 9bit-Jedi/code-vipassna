
const clientId = 'fcee30ceb61b4b77a0455d6c883fcabf';
const clientSecret = 'efc5b3d8a9e8498d9fdcdd869c85a3db';
const redirectUri = 'http://localhost:3000/';

export const getAuthUrl = () => {
  const scopes = 'playlist-read-private';
  return `https://accounts.spotify.com/authorize?response_type=code&client_id=${clientId}&scope=${encodeURIComponent(scopes)}&redirect_uri=${encodeURIComponent(redirectUri)}`;
};

export const getAccessToken = async (code) => {
  const tokenUrl = 'https://accounts.spotify.com/api/token';
  const body = new URLSearchParams({
    grant_type: 'client_credentials',
    code: code,
    redirect_uri: redirectUri,
    client_id: clientId,
    client_secret: clientSecret
  });

  const response = await fetch(tokenUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    body: body.toString()
  });

  const data = await response.json();
  return data.access_token;
};