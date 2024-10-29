const Mentor = require("../models/mentor");
const Student = require("../models/student");

const studentController = {
  register: async (request, response) => {
    try {
      const { name, email, password } = request.body;

      const student = await Student.findOne({ email });
      if (student) {
        return response
          .status(400)
          .json({ message: "Student already registered this email", name });
      }

      const newStudent = new Student({ name, email, password });
      await newStudent.save();

      response.status(201).json({ message: "Student registered successfully" });
    } catch (error) {
      response.status(500).json({ message: "Internal server error" });
    }
  },

  getUnassignedStudents: async (request, response) => {
    try {
      const students = await Student.find({ currentMentor: null },{password:0});
      response.status(200).json(students);
    } catch (error) {
      response.status(500).json({ message: "Internal server error" });
    }
  },

  changeMentor: async (request, response) => {
    try {
      const id = request.params.id;

      const newMentorId = request.body.mentorId;

      const student = await Student.findById(id);

      if (!student) {
        return response.status(404).json({ message: "Student was not found" });
      }

      const previousMentor = student.currentMentor;

      const mentor = await Mentor.findById(newMentorId);

      if (!mentor) {
        return response.status(404).json({ message: "Mentor was not found" });
      }

      const updatedPreviousMentor = await Mentor.findById(previousMentor);

      if (updatedPreviousMentor&&(mentor.email == updatedPreviousMentor.email)) {
        return response
          .status(404)
          .json({ message: "Same mentor is already assign this student" });
      }
      if (updatedPreviousMentor) {
        await updatedPreviousMentor.updateOne({
          $pull: { students: id },
        });
      }

      const updatedStudent = await Student.findByIdAndUpdate(id, {
        currentMentor: newMentorId,
        previousMentors: [...student.previousMentors, previousMentor],
      });

      if (updatedStudent) {
        const mentor = await Mentor.findById(newMentorId);
        if (mentor) {
          await mentor.updateOne({ $addToSet: { students: id } });
        }

        response.status(200).json({
          message: "Mentor Changed successfully",
        });
      }
    } catch (error) {
      response.status(500).json({ message: "Internal server error" });
    }
  },

  getPreviousMentors: async (request, response) => {
    try {
      const { id } = request.params;

      const student = await Student.findById(id);
      if (!student) {
        return response.status(404).json({ message: "Student not found" });
      }

      const previousMentors = await Student.find(
        { _id: id },
        { previousMentors: 1, name: 1, _id: 0 }
      ).populate("previousMentors", "name email");

      response.status(200).json(previousMentors);
    } catch (error) {
      response.status(500).json({ message: "Internal server error" });
    }
  },
};

module.exports = studentController;
