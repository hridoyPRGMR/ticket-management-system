const express = require("express");
const { protect, adminOnly } = require("../middleware/auth");
const router = express.Router();
const { addBus, updateBus, deleteBus } =  require("../controllers/busController");
const { addTicket, updateTicket, deleteTicket } = require("../controllers/ticketController");

//for bus
router.post("/bus",protect,adminOnly,addBus);
router.put("/bus/:id",protect,adminOnly,updateBus);
router.delete("/bus/:id",protect,adminOnly,deleteBus)

//for ticket
router.post("/ticket",protect,adminOnly,addTicket);
router.put("/ticket/:id",protect,adminOnly,updateTicket);
router.delete("/ticket/:id",protect,adminOnly,deleteTicket);

module.exports = router;
