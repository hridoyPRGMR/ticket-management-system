const Bus = require("../models/Bus");
const AppError = require("../utils/AppError");

const saveBus = async (req) => {

    const { busNumber, route, status, capacity } = req.body;

    try{
        if(req.user.role !== "admin" ){
            throw new AppError("Not authorized for this action.",404);
        }

        const busExist = await Bus.findOne({busNumber});

        if(busExist){
            throw new AppError("Bus with this number already exist.",400);
        }

        const newBus = new Bus({busNumber,route,capacity});
        await newBus.save();

        return newBus;
    }
    catch(error){
        throw error;
    }
}

const editBus = async (id,req)=>{
    const {busNumber,route,status,capacity} = req.body;

    try{
        if(req.user.role !== "admin"){
           throw new AppError("Not authorized for this action.",404);
        }

        const bus = await Bus.findById(id);

        if(!bus){
            throw new AppError("Bus not found.",404);
        }

        const existBus = await Bus.findOne({ busNumber });
        if (existBus && !existBus._id.equals(bus._id)) {
            throw new AppError("Bus with this number already exists.", 400);
        }

        bus.busNumber = busNumber || bus.busNumber;
        bus.route = route || bus.route;
        bus.status = typeof status === "boolean" ? status : bus.status;
        bus.capacity = capacity || bus.capacity;
       
        await bus.save();

        return bus;
    }
    catch(error){
        throw error;
    }
}

const removeBus = async (id,req) =>{
    try{
        if(req.user.role !== "admin"){
            throw new AppError("Not authorized for this action.",404);
        }

        const bus = await Bus.findById(id);

        if(!bus){
           throw new AppError("Bus not found.",404);
        }

        await bus.deleteOne();
    }
    catch(error){
        throw error;
    }
}

module.exports = {saveBus, editBus, removeBus}