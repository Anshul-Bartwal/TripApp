// controllers/placeController.js

import localPlaces from "../data/localPlaces.js";

export const getPlaces = (req, res) => {
  const destination = req.params.destination;

  if (localPlaces[destination]) {
    return res.json(localPlaces[destination]);
  }

  return res.status(404).json({
    message: `No tourist data found for ${destination}`
  });
};
