const Bus = require("../models/Bus");
const Ticket = require("../models/Ticket");
const AppError = require("../utils/AppError");

const saveTicket = async (req) => {

    const { busId, date, time, price, availableSeats } = req.body;

    try {
        if (req.user.role !== "admin") {
            throw new AppError("Not authorized for this action.", 401);
        }

        const busExist = await Bus.findById(busId);
        if (!busExist) {
           throw new AppError("Bus not found.", 404);
        }

        const newTicket = new Ticket({ busId, date, time, price, availableSeats });
        await newTicket.save();

        return newTicket;
    }
    catch (error) {
        throw error;
    }
}

const editTicket = async (id, req) => {

    try {
        if (req.user.role !== "admin") {
            throw new AppError("Not authorized for this action.", 401);
        }

        const ticket = await Ticket.findById(id);
        if (!ticket) {
            throw new AppError("Ticket not found.", 404);
        }

        ticket.date = date || ticket.date;
        ticket.time = time || ticket.time;
        ticket.price = price || ticket.price;
        ticket.availableSeats = availableSeats || ticket.availableSeats;

        await ticket.save();

        return ticket;
    }
    catch (error) {
        throw error;
    }
}

const removeTicket = async(id, req) => {
    
    try{
        if(req.user.role !== "admin" ){
           throw new AppError("Not authorized for this action.",401);
        }

        const ticket = await Ticket.findById(id);
        if (!ticket) {
            throw new AppError("Ticket not found.",404);
        }

        await ticket.deleteOne();
    }
    catch(error){
        throw error;
    }
}

module.exports = { saveTicket, editTicket, removeTicket }