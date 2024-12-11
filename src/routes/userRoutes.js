const express = require("express");
const { protect } = require("../middleware/auth");
const { getPaginatedBuses, getTickets, purchaseTickets } = require("../controllers/userController");
const router = express.Router();

router.get("/buses",protect,getPaginatedBuses);
router.get("/tickets",protect,getTickets);
router.post("/tickets/purchase",protect,purchaseTickets);

module.exports = router;