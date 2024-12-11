const Ticket = require("../models/Ticket")
const AppError = require("../utils/AppError");
const {validationError} = require("../utils/validationError");

const addTicket = async (req, res, next) => {

    const { busId, date, time, price, availableSeats } = req.body;

    try {

        if(req.user.role !== "admin" ){
            return next(new AppError("Not authorized for this action.",404));
        }

        const ticketExist = await Ticket.findOne({ busId });
        if (ticketExist) {
            return next(new AppError("Ticket for this bus already exist.",400));
        }

        const newTicket = new Ticket({ busId, date, time, price, availableSeats });
        await newTicket.save();

        res.status(201).json({success:true,message: "Ticket added successfully.",ticket });
    }
    catch (error) {
        if (validationError(error, res)) return;
        next(error);
    }
}

const updateTicket = async (req, res, next) => {

    const { id } = req.params;
    const { date, time, price, availableSeats } = req.body;

    try {

        if(req.user.role !== "admin" ){
            return next(new AppError("Not authorized for this action.",404));
        }

        const ticket = await Ticket.findById(id);
        if (!ticket) {
            return next(new AppError("Ticket not found.",404));
        }

        ticket.date = date || ticket.date;
        ticket.time = time || ticket.time;
        ticket.price = price || ticket.price;
        ticket.availableSeats = availableSeats || ticket.availableSeats;

        await ticket.save();
        res.status(200).json({success:true, message: "Ticket updated successfully.", ticket });
    }
    catch (error) {
        if (validationError(error, res)) return;
        next(error);
    }
};

const deleteTicket = async (req, res, next) => {
    const { id } = req.params;

    try {

        if(req.user.role !== "admin" ){
            return next(new AppError("Not authorized for this action.",404));
        }

        const ticket = await Ticket.findById(id);
        if (!ticket) {
            return next(new AppError("Ticket not found.",404));
        }

        await ticket.deleteOne();
        res.status(200).json({success:true, message: "Ticket deleted successfully." });
    } 
    catch (error) {
        next(error);
    }
};

module.exports = { addTicket, updateTicket, deleteTicket }