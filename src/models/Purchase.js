const mongoose = require("mongoose");

const purchaseSchema = new mongoose.Schema(
    {
        busId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Bus",
            required: [true, "Bus ID is required"],
        },
        ticketId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Ticket",
            required: [true, "Ticket ID is required"],
        },
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: [true, "User ID is required"],
        },
        ticketPrice: {
            type: Number,
            required: [true, "Ticket price is required"],
            min: [0, "Ticket price cannot be negative"],
        },
        quantity: {
            type: Number,
            required: [true, "Ticket quantity is required"],
            min: [1, "At least one ticket must be purchased"],
        },
        totalPrice: {
            type: Number,
            required: [true, "Total price is required"],
            min: [0, "Total price cannot be negative"],
            validate: {
                validator: function (value) {
                    return value === this.ticketPrice * this.quantity;
                },
                message: "Total price must be equal to ticket price multiplied by quantity",
            },
        },
    },
    { timestamps: true }
);

module.exports = mongoose.model("Purchase", purchaseSchema);
