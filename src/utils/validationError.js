
const validationError = (error, res)=>{

    if(error.name === "ValidationError"){
        const errors = Object.values(error.errors).map(err=>err.message);
        res.status(400).json({
            success:false,
            message:"Validation Error.",
            errors,
        });
        return true;
    }
    return false;
}

module.exports = {validationError}