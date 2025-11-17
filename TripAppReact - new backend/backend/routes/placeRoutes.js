// routes/placeRoutes.js

import express from "express";
import { getPlaces } from "../controllers/placeController.js";

const router = express.Router();

// GET /api/places/:destination
router.get("/:destination", getPlaces);

export default router;
