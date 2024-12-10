const Ticket = require("../models/Ticket")

const addTicket = async (req, res) => {

    const { busId, date, time, price, availableSeats } = req.body;

    try {

        if (req.user.role !== "admin") {
            return res.status(403).json({ message: "Not authorized for this action." })
        }

        const ticketExist = await Ticket.findOne({ busId });
        if (ticketExist) {
            return res.status(400).json({ message: "Ticket for this bus already exist." });
        }

        const newTicket = new Ticket({ busId, date, time, price, availableSeats });
        await newTicket.save();

        res.status(201).json({ message: "Ticket added successfully." })
    }
    catch (error) {

        if (error.name === "ValidationError") {
            const errors = Object.values(error.errors).map((err) => err.message);
            return res.status(400).json({ message: "Validation error.", errors });
        }

        res.status(500).json({ message: "Server Error. Please try again later." })
    }
}

const updateTicket = async (req, res) => {

    const { id } = req.params;
    const { date, time, price, availableSeats } = req.body;

    try {

        if (req.user.role !== "admin") {
            return res.status(403).json({ message: "Not authorized for this action." })
        }

        const ticket = await Ticket.findById(id);
        if (!ticket) {
            return res.status(404).json({ message: "Ticket not found." });
        }

        ticket.date = date || ticket.date;
        ticket.time = time || ticket.time;
        ticket.price = price || ticket.price;
        ticket.availableSeats = availableSeats || ticket.availableSeats;

        await ticket.save();
        res.status(200).json({ message: "Ticket updated successfully.", ticket });
    }
    catch (error) {
        res.status(500).json({ message: "Server Error. Please try again later" });
    }
};

const deleteTicket = async (req, res) => {
    const { id } = req.params;

    try {

        if (req.user.role !== "admin") {
            return res.status(403).json({ message: "Not authorized for this action." })
        }

        const ticket = await Ticket.findById(id);
        if (!ticket) {
            return res.status(404).json({ message: "Ticket not found." });
        }

        await ticket.deleteOne();
        res.status(200).json({ message: "Ticket deleted successfully." });
    } 
    catch (error) {
        res.status(500).json({ message: "Server Error. Please try again later." });
    }
};

module.exports = { addTicket, updateTicket, deleteTicket }