const express = require("express");

const mentorController = require("../controllers/mentorController");

const mentorRouter = express.Router();

mentorRouter.post("/", mentorController.register);
mentorRouter.put("/add/:id", mentorController.addStudent);
mentorRouter.get("/students/:id", mentorController.getStudents);

module.exports = mentorRouter;
