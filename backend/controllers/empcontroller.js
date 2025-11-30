const Employee = require('../models/employees');
const mongoose = require ('mongoose');

const formatEmployeeResponse = (e) => ({
    employee_id: e._id,
    first_name: e.first_name,
    last_name: e.last_name,
    email: e.email,
    position: e.position,
    salary: e.salary,
    date_of_joining: e.date_of_joining,
    department: e.department,
    created_at: e.createdAt,
    updated_at: e.updatedAt
});

const listEmployees = async(req, res, next) => {
    try{
        const emp = await Employee.find();
        const out = Employee.map(e => formatEmployeeResponse(e));
        res.status(200).json(out);
    } catch(error){
        next(error);
    }
};

const createEmployee = async(req, res, next) =>{
    try{
        const newEmployee = new Employee(req.body);
        await newEmployee.save();
       
        res.status(201).json({
            message: "Employee Created Successfully.",
            employee_id: newEmployee._id

        });

    } catch(error){
        res.status(400).json({status:false, message:"Invalid Employee Id"})
        next(error);
    }
};

const getEmployee = async(req, res, next) => {
    try{
        const{eid} = req.params;
        //check for valid ObjectID format
        if(!mongoose.Types.ObjectId.isValid(eid)) return res.status(400).json({status:false, message:"Invalid Employee Id"})

        const e = await Employee.findById(eid);
        if(!e)return res.status(404).json({status:false, message:"Employee not found"})    
        
        res.status(200).json(formatEmployeeResponse(e));
    } catch(error){
        next(error);
    }

};

const updateEmployee = async(req, res, next) =>{
    try{
        const {eid} = req.params;
        if (!mongoose.Types.ObjectId.isValid(eid)) return res.status(400).json({status: false, message:"Invalid Employee Id"});

        const updates = req.body;
        const updatedEmployee = await Employee.findByIdAndUpdate(eid, updates,{new: true, runValidators:true});
        if(!updatedEmployee){
            return res.status(404).json({status: false, message:"Employee not found"});
        }
        res.status(200).json({status:true, message:"Employee details updated Successfully!"});
    } catch(error){
        res.status(400).json({status:false, message:"Error updating employee"});
        next(error);
    }
};

const deleteEmployee = async(req, res, next) => {
    try{
        const{eid} = req.query;
        
        if (!eid) return res.status(400).json({status:false, message:"eid query param is requires"});
        if(!mongoose.Types.ObjectId.isValid(eid)) return res.status(400).json({status:false, message: "Invalid Employee ID"})
        
        const deletedEmployee = await Employee.findByIdAndDelete(eid);

       if(!deletedEmployee){
        return res.status(404).json({status: false, message:"Employee not found"});
       }
       res.status(204).send();
    }catch(error){
        next(error);
    }
};

module.exports = {listEmployees,createEmployee, getEmployee, updateEmployee, deleteEmployee}