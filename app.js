const express = require("express");
const studentRouter = require("./routes/studentRoutes");
const mentorRouter = require("./routes/mentorRoutes");

const app = express();

app.use(express.json());

app.use("/students", studentRouter);
app.use("/mentors", mentorRouter);

app.get("/",(request,response)=>{
    response.status(200).send(`<body>
    <h1 style="text-align: center; background-color: black; color: aqua">
      Assign mentor site
    </h1>
  
    <div>
      <h3>
        <span style="background-color: black; color: yellow">POST </span>&nbsp;
        create Mentor endpoint:
        <a
          href="/mentors"
          style="
            all: unset;
            cursor: pointer;
            background-color: black;
            color: aqua;
          "
          >/mentors</a
        >
      </h3>
      <h3>
        <span style="background-color: black; color: yellow">POST </span>&nbsp;
        create Student endpoint:
        <a
          href="/students"
          style="
            all: unset;
            cursor: pointer;
            background-color: black;
            color: aqua;
          "
          >/students</a
        >
      </h3>
      <h3>
        <span style="background-color: black; color: blue">PUT </span>&nbsp;
        Select one mentor and Add multiple Student endpoint:
        <a
          href="/mentors/add/:id"
          style="
            all: unset;
            cursor: pointer;
            background-color: black;
            color: aqua;
          "
          >/mentors/add/:id</a
        >
      </h3>
      <h3>
        <span style="background-color: black; color: green">GET </span>&nbsp; A
        student who has a mentor should not be shown in List endpoint:
        <a
          href="/students/unAssigned"
          style="
            all: unset;
            cursor: pointer;
            background-color: black;
            color: aqua;
          "
          >/students/unAssigned</a
        >
      </h3>
      <h3>
        <span style="background-color: black; color: blue">PUT </span>&nbsp;
        Select One Student and Assign one Mentorndpoint:
        <a
          href="/students/change/:id"
          style="
            all: unset;
            cursor: pointer;
            background-color: black;
            color: aqua;
          "
          >/students/change/:id</a
        >
      </h3>
      <h3>
        <span style="background-color: black; color: green">GET</span>&nbsp; Show
        all students for a particular mentor endpoint:
        <a
          href="/mentors/students/:id"
          style="
            all: unset;
            cursor: pointer;
            background-color: black;
            color: aqua;
          "
          >/mentors/students/:id</a
        >
      </h3>
      <h3>
        <span style="background-color: black; color: green">GET</span>&nbsp; Show
        the previously assigned mentor for a particular student. endpoint:
        <a
          href="/students/previousMentors/:id"
          style="
            all: unset;
            cursor: pointer;
            background-color: black;
            color: aqua;
          "
          >/students/previousMentors/:id</a
        >
      </h3>
    </div>
  </body>
  `)
})

module.exports = app;
