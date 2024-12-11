const Bus = require("../models/Bus");
const AppError = require("../utils/AppError");
const {validationError} = require("../utils/validationError");

const addBus = async(req,res,next)=>{

    const { busNumber, route, capacity } = req.body;

    try{
        if(req.user.role !== "admin" ){
            return next(new AppError("Not authorized for this action.",404));
        }

        const busExist = await Bus.findOne({busNumber});

        if(busExist){
            return next(new AppError("Bus with this number already exist.",400));
        }

        const newBus = new Bus({busNumber,route,capacity});

        await newBus.save();

        res.status(201).json({success:true,message:"Bus added successfully.",bus:newBus});
    }
    catch(error){
        if (validationError(error, res)) return;
        next(error);
    }

}

const updateBus = async(req,res,next)=>{

    const {id} = req.params;
    const {busNumber,route,capacity} = req.body;

    try{

        if(req.user.role !== "admin"){
            return next(new AppError("Not authorized for this action.",404));
        }

        const bus = await Bus.findById(id);

        if(!bus){
            return next(new AppError("Bus not found.",404));
        }

        bus.busNumber = busNumber || bus.busNumber;
        bus.route = route || bus.route;
        bus.capacity = capacity || bus.capacity;

        await bus.save();

        res.status(200).json({success:true,message: "Bus updated successfuly.",bus})
    }
    catch(error){
        if (validationError(error, res)) return;
        next(error);
    }

}

const deleteBus = async (req,res,next) =>{

    const {id} = req.params;

    try{

        if(req.user.role !== "admin"){
            return next(new AppError("Not authorized for this action.",404));
        }

        const bus = await Bus.findById(id);

        if(!bus){
            return next(new AppError("Bus not found.",404));
        }

        await bus.deleteOne();

        res.status(200).json({success:true,message: "Bus deleted successfully."})
    }   
    catch(error){
        next(error);
    }

}

module.exports = {addBus,updateBus,deleteBus}