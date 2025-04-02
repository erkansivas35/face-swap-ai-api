const express = require("express");
const router = express.Router();
const FaceSwap = require('../../models/generated-face-swap');
const { protect } = require('../../middleware/checkUserToken');

const fileUpload = require("../../utils/fileUpload");
const { swapFaces, deleteSwapFaces } = require("../../controllers/faceSwapController");
const { checkToken } = require('../../middleware/getUserIdFromToken');

router.post("/", checkToken,
  fileUpload.fields([
    { name: "sourceImage", maxCount: 1 },
    { name: "targetImage", maxCount: 1 },
  ]),
  swapFaces
);

router.get("/", protect, async (req, res, next) => {
  try {
    const createdBy = req.user?.id
    
    const result = await FaceSwap.find({ createdBy: createdBy }).sort({ _id: -1 })
   
    res.json({
      success: true,
      data: result,
    });
  } catch (error) {
    next(error);
  }
});

router.get("/:id", protect, async (req, res, next) => {
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

router.delete('/:id', protect, deleteSwapFaces);


module.exports = router;