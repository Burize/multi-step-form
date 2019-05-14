export default function getEnvParams() {
  const apiUrl = process.env.API_URL;

  const envParams = {
    apiUrl,
  };

  return envParams;
}
