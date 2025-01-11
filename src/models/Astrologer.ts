import mongoose from "mongoose";

const schema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    experience: {
      type: Number,
      required: true,
    },
    rating: {
      type: Number,
      required: true,
    },
    connection: {
      type: Number,
      required: true,
      default:0
    },
    assignedUser: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
  },
  { timestamps: true }
);

const Astrologer = mongoose.models.Astrologer || mongoose.model("Astrologer", schema);
export default Astrologer;
