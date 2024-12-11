const Bus = require("../models/Bus");
const { saveBus, editBus, removeBus } = require("../services/busService");
const AppError = require("../utils/AppError");
const {validationError} = require("../utils/validationError");

const addBus = async(req,res,next)=>{

    try{
        const bus = await saveBus(req);
        res.status(201).json({success:true,message:"Bus added successfully.", bus});
    }
    catch(error){
        if (validationError(error, res)) return;
        next(error);
    }

}

const updateBus = async(req,res,next)=>{

    const {id} = req.params;

    try{
        const bus = await editBus(id,req);
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
        await removeBus(id,req);
        res.status(200).json({success:true,message: "Bus deleted successfully."})
    }   
    catch(error){
        next(error);
    }

}

module.exports = {addBus,updateBus,deleteBus}