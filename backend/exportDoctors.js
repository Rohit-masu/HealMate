import mongoose from "mongoose";
import dotenv from "dotenv";
import fs from "fs";
import doctorModel from "./models/doctorModel.js";

dotenv.config();

const exportCredentials = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URL);
    console.log("Connected to MongoDB for exporting credentials...");

    const doctors = await doctorModel.find({});
    
    const credentials = doctors.map(doc => ({
      name: doc.name,
      speciality: doc.speciality,
      email: doc.email,
      password: "password123" // The default password used in seeding
    }));

    fs.writeFileSync("doctor_credentials.json", JSON.stringify(credentials, null, 2));
    
    console.log("✅ Credentials exported to doctor_credentials.json");
    process.exit();
  } catch (err) {
    console.error("Error exporting credentials:", err);
    process.exit(1);
  }
};

exportCredentials();
