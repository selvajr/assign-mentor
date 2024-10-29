const Mentor = require("../models/mentor");
const Student = require("../models/student");

const mentorController = {
  register: async (request, response) => {
    try {
      const { name, email, password } = request.body;

      const mentor = await Mentor.findOne({ email });

      if (mentor) {
        return response.status(400).json({ message: "Mentor already exists" });
      }

      const newMentor = new Mentor({ name, email, password });
      await newMentor.save();

      response.status(201).json({ message: "Mentor registered successfully" });
    } catch (error) {
      response.status(500).json({ message: "Internal server error" });
    }
  },

  getStudents: async (request, response) => {
    try {
      const { id } = request.params;

      const mentor = await Mentor.findById(id);
      if (!mentor) {
        return response.status(404).json({ message: "Mentor not found" });
      }

      const students = await Mentor.find(
        { _id: id },
        { students: 1, _id: 0, name: 1 }
      ).populate("students", "name email");

      response.status(200).json(students);
    } catch (error) {
      response.status(500).json({ message: "Internal server error" });
    }
  },
  addStudent: async (request, response) => {
    try {
      const { id } = request.params;

      const { studentIds } = request.body;

      const mentor = await Mentor.findById(id);
      if (!mentor) {
        return response.status(404).json({ message: "Mentor not found" });
      }
      for (let index = 0; index < studentIds.length; index++) {
        const student = await Student.findById(studentIds[index]);
        if (!student) {
          return response
            .status(404)
            .json({ message: `The given Student index ${index} not found` });
        }

        if (!student.currentMentor) {
          const updatedMentor = await Mentor.findByIdAndUpdate(id, {
            $addToSet: { students: studentIds[index] },
          });

          if (updatedMentor) {
            await student.updateOne({ currentMentor: id });
          }
        } else {
          return response
            .status(400)
            .json({
              message: `Student index ${index} already assigned to a mentor `,
            });
        }
      }

      const updatedStudent = await Mentor.findByIdAndUpdate(id, {
        students: [...mentor.students, ...studentIds],
      });
      response.status(200).json({
        message: `Students are assigned to mentor ${mentor.name} successfully`,
      });
    } catch (e) {
      response.status(500).json({ message: "Internal server error" });
    }
  },
};

module.exports = mentorController;
