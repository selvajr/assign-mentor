const express = require("express");

const studentController = require("../controllers/studentController");

const studentRouter = express.Router();

studentRouter.post("/", studentController.register);
studentRouter.get("/unAssigned", studentController.getUnassignedStudents);
studentRouter.put("/change/:id", studentController.changeMentor);
studentRouter.get("/previousMentors/:id", studentController.getPreviousMentors);

module.exports = studentRouter;
