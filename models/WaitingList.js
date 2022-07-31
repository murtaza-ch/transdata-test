import mongoose from "mongoose";
const { Schema } = mongoose;

const WiatingListSchema = new Schema(
  {
    puppiesList: [
      {
        type: Schema.Types.ObjectId,
        ref: "Puppy",
      },
    ],
  },
  { timestamps: true }
);

export const WiatingList = mongoose.model("WiatingList", WiatingListSchema);
