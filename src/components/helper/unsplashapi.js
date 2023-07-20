export default async function apiCall() {
  let clientID = "irO2Oo6-_XtKnNvoj-91lan-sCNlLzTavynUZwVrO_8";
  let endpoint = `https://api.unsplash.com/photos/random/?client_id=${clientID}`;

  try {
    const response = await fetch(endpoint);
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    const jsonData = await response.json();
    return jsonData.urls.regular;
  } catch (error) {
    console.error("Error fetching image URL:", error);
    throw error; // Rethrow the error to be caught in the calling component if needed
  }
}
