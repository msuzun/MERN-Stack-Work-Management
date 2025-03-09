const router = require("express").Router();
const Project = require('../models/projectModel');
const authMiddleware = require('../middlewares/authMiddleware');

//create a project
router.post('/create-project', authMiddleware, async (req, res) => {
    try {
        const newProject = new Project(req.body);
        await newProject.save();
        res.send({
            success: true,
            data: newProject
        })
    } catch (error) {
        res.send({
            error: error.message,
            success: false
        })
    }
})

// get all projects
router.get("/get-all-projects", authMiddleware, async (req, res) => {
    try {
        const filters = req.body.filters;
        if (filters) {
            
        }
        const projects = await Project.find(filters || {});
        res.send({
            success: true,
            data: projects
        })
    } catch (error) {
        res.send({
            error: error.message,
            success: false
        })
    }
})

module.exports = router;