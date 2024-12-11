const mongoose = require("mongoose");
const Bus = require("../models/Bus");
const Purchase = require("../models/Purchase");
const Ticket = require("../models/Ticket");
const AppError = require("../utils/AppError");
const User = require("../models/User");

const saveUser = async (req) => {

    const { name, email, password } = req.body;

    try {
        const userExists = await User.findOne({ email });

        if (userExists) {
            throw new AppError("User already exists", 400);
        }

        const user = new User({ name, email, password });
        await user.save();

        return user;
    }
    catch (error) {
        throw error;
    }
}

const getBuses = async (page = 1, limit = 10) => {

    try {
        const skip = (page - 1) * limit;

        const buses = await Bus.find({ status: true })
            .select("busNumber route capacity")
            .skip(skip)
            .limit(limit);

        const totalBuses = await Bus.countDocuments();

        return {
            success: true,
            buses,
            pagination: {
                total: totalBuses,
                page,
                limit,
                totalPages: Math.ceil(totalBuses / limit),
            }
        };
    }
    catch (error) {
        throw error;
    }
}


const getTicket = async (busId, date) => {
    try {

        if (!busId) {
            throw new AppError("Bus ID is required", 400);
        }

        let query = { busId };

        if (date) {
            const [day, month, year] = date.split('/');
            if (!day || !month || !year) {
                throw new AppError("Invalid date format. Use dd/mm/yyyy.", 400);
            }

            const startDate = new Date(`${year}-${month}-${day}T00:00:00.000Z`);
            const endDate = new Date(startDate);
            endDate.setUTCDate(endDate.getUTCDate() + 1); // Add one day to get the range

            query.date = { $gte: startDate, $lt: endDate }; // Match tickets within the date range
        }

        const tickets = await Ticket.find(query)
            .select("_id busId date time price availableSeats")
            .sort({ date: -1 });

        if (!tickets.length) {
            throw new AppError("No tickets found for the specified bus", 404);
        }

        return {
            success: true,
            tickets,
        };
    }
    catch (error) {
        throw error;
    }
};

const purchaseTicket = async ({ busId, ticketId, userId, quantity }) => {

    const session = await mongoose.startSession();
    session.startTransaction();

    try {
        const ticket = await Ticket.findOne({ _id: ticketId, busId }).session(session);
        if (!ticket) {
            throw new AppError("Ticket not found or does not belong to the specified bus.", 404);
        }

        if (ticket.availableSeats < quantity) {
            throw new AppError("Not enough tickets available for the selected quantity.", 400);
        }

        const totalPrice = ticket.price * quantity;

        ticket.availableSeats -= quantity;
        await ticket.save({ session });

        const purchase = new Purchase({
            busId,
            ticketId,
            userId,
            ticketPrice: ticket.price,
            quantity,
            totalPrice,
        });

        await purchase.save({ session });

        await session.commitTransaction();
        session.endSession();

        return purchase;
    }
    catch (error) {
        await session.abortTransaction();
        session.endSession();
        throw error;
    }
};


module.exports = { saveUser, getBuses, getTicket, purchaseTicket }