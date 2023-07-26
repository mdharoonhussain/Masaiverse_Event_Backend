const express = require("express");
const { EmployeeModel } = require("../models/employee.model");

const employeeRouter = express.Router();


employeeRouter.get("/", async (req, res) => {
    try {
        const { sort, department, search, page } = req.query;
        const filter = department ? { department } : {};
        const sortOption = sort === "asc" ? { salary: 1 } : sort === "desc" ? { salary: -1 } : {};
        const currentPage = parseInt(page) || 1;
        const perPage = 5;
        const skip = (currentPage - 1) * perPage;
        const searchQuery = search ? { firstName: { $regex: search, $options: "i" } } : {};

        const totalCount = await EmployeeModel.countDocuments({
            ...filter,
            ...searchQuery,
        });

        const employees = await EmployeeModel.find({
            ...filter,
            ...searchQuery,
        })
            .sort(sortOption)
            .skip(skip)
            .limit(perPage);

        res.status(200).send({
            employees,
            totalCount,
            currentPage,
            totalPages: Math.ceil(totalCount / perPage),
        });
    } catch (error) {
        console.log({ "/employeeget": error.message })
        res.status(500).send({ msg: error.message })
    }
})

employeeRouter.post('/', async (req, res) => {
    try {
        const { email } = req.body;
        const isEmployeeExists = await EmployeeModel.findOne({ email });
        if (isEmployeeExists) return res.status(400).send({ msg: "Employee Already Exists" });

        const newEmployee = new EmployeeModel({ ...req.body });
        await newEmployee.save();
        res.status(201).send({ msg: "New Employee Created" })
    } catch (error) {
        console.log({ "/employeepost": error.message })
        res.status(500).send({ msg: error.message })
    }
})


employeeRouter.patch('/:id', async (req, res) => {
    const { id } = req.params;
    const payload = req.body;
    try {
        await EmployeeModel.findByIdAndUpdate({ _id: id }, payload);
        res.status(200).send({ msg: "Eployee data updated successfully!" })
    } catch (error) {
        console.log({ "/employeeupdate": error.message })
        res.status(500).send({ msg: error.message })
    }
})


employeeRouter.delete('/:id', async (req, res) => {
    const { id } = req.params;
    try {
        await EmployeeModel.findByIdAndDelete({ _id: id });
        res.status(200).send({ msg: "Eployee data deleted successfully!" })
    } catch (error) {
        console.log({ "/employeedelete": error.message })
        res.status(500).send({ msg: error.message })
    }
})


module.exports = {
    employeeRouter

}