const express = require("express");
const router = express.Router();
const FaceSwap = require('../../models/generated-face-swap');
const { protect } = require('../../middleware/checkUserToken');

router.get("/list", protect, async (req, res, next) => {
  try {
    const createdBy = req.user?._id
    const result = await FaceSwap.find({ createdBy: createdBy })
   
    res.json({
      success: true,
      data: result,
    });
  } catch (error) {
    next(error);
  }
});

router.get("/list/:id", protect, async (req, res, next) => {
  try {
    const id = req.params.id
    const item = await FaceSwap.findById(id)

    if (!item) {
      return res.status(404).send();
    }
   
    res.json({
      success: true,
      data: item,
    });
  } catch (error) {
    next(error);
  }
});

router.delete('/list/:id', async (req, res) => {
  try {
    const item = await FaceSwap.findByIdAndDelete(req.params.id);

    if (!item) {
      return res.status(404).send();
    }

    res.json({
      success: true,
    })
  } catch (error) {
    next(error);
  }
});


module.exports = router;