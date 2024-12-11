const {validationError} = require("../utils/validationError");
const { saveTicket, editTicket, removeTicket } = require("../services/ticketService");

const addTicket = async (req, res, next) => {

    try {
        const ticket = saveTicket(req);
        res.status(201).json({success:true,message: "Ticket added successfully.", ticket });
    }
    catch (error) {
        if (validationError(error, res)) return;
        next(error);
    }
}

const updateTicket = async (req, res, next) => {

    const { id } = req.params;

    try {
        const ticket = await editTicket(id,req);
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
        await removeTicket(id,req);
        res.status(200).json({success:true, message: "Ticket deleted successfully." });
    } 
    catch (error) {
        next(error);
    }
};

module.exports = { addTicket, updateTicket, deleteTicket }