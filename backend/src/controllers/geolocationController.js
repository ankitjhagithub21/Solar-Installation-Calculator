const apiKey = "AIzaSyC3drGbzgI4yovHMKTIu3M5rjwyRaT5e8c";
// Initialize the Geocoder
// const { Geocoder } = await google.maps.importLibrary("geocoding");
import { Client } from "@googlemaps/google-maps-services-js";


export const searchAddress = async (req, res) => {
  try {
    const { query } = req.query;

    if (!query) {
      return res.status(400).json({ message: 'Search query is required' });
    }

    if (!apiKey) {
      return res.status(500).json({ message: 'Google Maps API key not configured' });
    }

    const client = new Client({});

    client.geocode({
      params: {
        address: query,
        key: apiKey, // Replace with your actual API key
      },
      timeout: 1000, // milliseconds
    })
      .then((r) => {
        console.log("resonse", r.data)
        console.log(r.data.results[0].geometry.location);
      })
      .catch((e) => {
        console.log(e.response.data.error_message);
      });


    res.status(200).json({ message: "success" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

