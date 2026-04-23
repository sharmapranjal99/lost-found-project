const express = require("express");
const router = express.Router();
const Item = require("../models/Item");
const auth = require("../middleware/authMiddleware");

// Add Item
router.post("/", auth, async (req,res)=>{
  const item = new Item({...req.body, userId:req.user.id});
  await item.save();
  res.json(item);
});

// Get All
router.get("/", async (req,res)=>{
  const items = await Item.find();
  res.json(items);
});

// Search
router.get("/search", async (req,res)=>{
  const {name} = req.query;
  const items = await Item.find({
    itemName: new RegExp(name, "i")
  });
  res.json(items);
});

// Update
router.put("/:id", auth, async (req,res)=>{
  const item = await Item.findByIdAndUpdate(req.params.id, req.body, {new:true});
  res.json(item);
});

// Delete
router.delete("/:id", auth, async (req,res)=>{
  await Item.findByIdAndDelete(req.params.id);
  res.json({msg:"Deleted"});
});

module.exports = router;