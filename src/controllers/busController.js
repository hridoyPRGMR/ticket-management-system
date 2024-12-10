const Bus = require("../models/Bus");

const addBus = async(req,res)=>{

    const { busNumber, route, capacity } = req.body;

    try{
        if(req.user.role !== "admin" ){
            return res.status(403).json({message:"Not authorized for this action."})
        }

        const busExist = await Bus.findOne({busNumber});

        if(busExist){
            return res.status(400).json({message:"Bus with this number already exist."});
        }

        const newBus = new Bus({busNumber,route,capacity});

        await newBus.save();

        res.status(201).json({message:"Bus added successfully.",bus:newBus});
    }
    catch(error){

        if(error.name==="ValidationError"){
            const errors = Object.values(error.errors).map((err)=>err.message);
            return res.status(400).json({message:"Validation error.",errors});
        }

        res.status(500).json({error:"Server Erro. Please try again later"});
    }

}

const updateBus = async(req,res)=>{

    const {id} = req.params;
    const {busNumber,route,capacity} = req.body;

    try{

        if(req.user.role !== "admin"){
            return res.status(403).json({message:"Not authorized for this action."});
        }

        const bus = await Bus.findById(id);

        if(!bus){
            return res.status(404).json({ message: "Bus not found." });
        }

        bus.busNumber = busNumber || bus.busNumber;
        bus.route = route || bus.route;
        bus.capacity = capacity || bus.capacity;

        await bus.save();

        res.status(200).json({message: "Bus updated successfuly.",bus})
    }
    catch(error){
        res.status(500).json({message:"Server Error. Please try agin later."});
    }

}

const deleteBus = async (req,res) =>{

    const {id} = req.params;

    try{
        const bus = await Bus.findById(id);

        if(!bus){
            return res.status(404).json({ message: "Bus not found." });
        }

        await bus.deleteOne();

        res.status(200).json({message: "Bus deleted successfully."})
    }   
    catch(error){
        res.status(500).json({message:"Server Error. Please try again later"});
    }

}

module.exports = {addBus,updateBus,deleteBus}