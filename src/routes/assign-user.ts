import express from "express";
import {
  assignUser,
  getAllUser,
  getAllAstrologer,
  getHigherRatingAstrologer,
  getHigherConnectionAstrologer,
} from "../controller/assigncontroller";

const router = express.Router();

// distribute user to astrologer
router.post("/distribute", assignUser);

// get all users
router.get("/users", getAllUser);

// get all astrologers
router.get("/astrologers", getAllAstrologer);

// get astrologer with higher rating
router.get("/higher-rating-astrologer", getHigherRatingAstrologer);

// get astrologer with higher connection
router.get("/higher-connection-astrologer", getHigherConnectionAstrologer);

export default router;
