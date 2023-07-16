import mongoose from "mongoose";

const inventorySchema = new mongoose.Schema(
  {
    inventoryType: {
      type: String,
      required: [true, "inventory type required"],
      enum: ["in", "out"],
    },
    bloodGroup: {
      type: String,
      required: [true, "blood group required"],
      enum: ["O+", "O-", "AB+", "AB-", "A+", "A-", "B+", "B-"],
    },
    quantity: {
      type: Number,
      required: [true, "blood quantity  required"],
    },
    //yha par hum organisation bna rhe kha se blood aa rha aur kha ja rha h
    organisation: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
      require: [true, "reference is required"],
    },
    hospital: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
      required: function () {
        return this.inventoryType === "out";
      },
    },
    donar: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
      required: function () {
        return this.inventoryType === "in";
      },
    },
  },
  {
    timestamps: true,
  }
);
export default mongoose.model("inventory", inventorySchema);
