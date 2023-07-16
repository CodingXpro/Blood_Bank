import userModel from "../models/userModel.js";
import inventoryModel from "../models/inventoryModel.js";

//CREATE INVENTORY

export const createInventoryController = async (req, res) => {
  try {
    const { email, inventoryType } = req.body;
    //Validation
    const user = await userModel.findOne({ email });
    if (!user) {
      throw new Error("User Not Found");
    }
    if (inventoryType === "in" && user.role !== "donar") {
      throw new Error("Not a donar acount");
    }
    if (inventoryType === "out" && user.role !== "hopital") {
      throw new Error("Not a Hospital");
    }
    //save record
    const inventory = new inventoryModel(req.body);
    await inventory.save();
    return res.status(201).send({
      success: true,
      message: "New Blood Record Added",
    });
  } catch (err) {
    console.log(err);
    return res.status(500).send({
      suceess: false,
      message: "Error in create Inventory API",
      err,
    });
  }
};

//GET Inventory Controller

export const getInventoryController = async (req, res) => {
  try {
    const inventory = await inventoryModel
      .find({
        organisation: req.body.userId,
      })
      .populate("donar")
      .populate("hospital")
      .sort({ createdAt: -1 });
    res.status(200).send({
      success: true,
      message: "Get All Records Successfully",
      inventory,
    });
  } catch (err) {
    console.log(err);
    res.status(500).send({
      success: false,
      message: "Error in Getting All Inventory",
      err,
    });
  }
};
