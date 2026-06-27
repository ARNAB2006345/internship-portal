const express = require("express");
const cors = require("cors");
require("dotenv").config();

const studentRoutes = require("./routes/studentRoutes");
const companyRoutes = require("./routes/companyRoutes");
const internshipRoutes = require("./routes/internshipRoutes");
const applicationRoutes = require("./routes/applicationRoutes");
//const dashboardRoutes = require("./routes/dashboardRoutes");

const app = express();

app.use(cors());
app.use(express.json());

app.use(studentRoutes);
app.use(companyRoutes);
app.use(internshipRoutes);
app.use(applicationRoutes);
//app.use(dashboardRoutes);

app.listen(process.env.PORT, () => {
    console.log(`🚀 Server running on port ${process.env.PORT}`);
});