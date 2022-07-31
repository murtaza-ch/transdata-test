import mongoose from "mongoose";
const { Schema } = mongoose;

const PuppySchema = new Schema(
  {
    name: {
      type: String,
    },
    service: {
      type: String,
    },
    status: {
      type: String,
    },
    waitingList: {
      type: Schema.Types.ObjectId,
      ref: "WiatingList",
    },
  },
  { timestamps: true }
);

PuppySchema.index({ name: "text" });

export const Puppy = mongoose.model("Puppy", PuppySchema);
