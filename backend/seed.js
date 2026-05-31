import mongoose from "mongoose";
import bcrypt from "bcrypt";
import dotenv from "dotenv";
import { v2 as cloudinary } from "cloudinary";
import path from "path";
import { fileURLToPath } from "url";
import doctorModel from "./models/doctorModel.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config();

// Cloudinary Configuration
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_SECRET_KEY,
});

const doctorsData = [
  {
    name: 'Dr. Priya Sharma',
    image: 'doc1.png',
    speciality: 'General physician',
    degree: 'MBBS, MD',
    experience: '6 Years',
    about: 'Experienced physician specializing in preventive healthcare, diagnosis, and treatment of common medical conditions.',
    fees: 700,
    address: {
      line1: 'Sector 18',
      line2: 'Noida, Uttar Pradesh'
    }
  },
  {
    name: 'Dr. Arjun Verma',
    image: 'doc2.png',
    speciality: 'Gynecologist',
    degree: 'MBBS, MS',
    experience: '8 Years',
    about: 'Specialist in women’s health, pregnancy care, and reproductive wellness.',
    fees: 900,
    address: {
      line1: 'Rajouri Garden',
      line2: 'New Delhi, Delhi'
    }
  },
  {
    name: 'Dr. Ananya Patel',
    image: 'doc3.png',
    speciality: 'Dermatologist',
    degree: 'MBBS, MD',
    experience: '5 Years',
    about: 'Expert in skin, hair, and nail disorders with modern dermatological treatments.',
    fees: 800,
    address: {
      line1: 'Satellite Road',
      line2: 'Ahmedabad, Gujarat'
    }
  },
  {
    name: 'Dr. Rahul Singh',
    image: 'doc4.png',
    speciality: 'Pediatricians',
    degree: 'MBBS, DCH',
    experience: '7 Years',
    about: 'Dedicated pediatrician focused on child health, growth, and vaccinations.',
    fees: 750,
    address: {
      line1: 'Indirapuram',
      line2: 'Ghaziabad, Uttar Pradesh'
    }
  },
  {
    name: 'Dr. Sneha Reddy',
    image: 'doc5.png',
    speciality: 'Neurologist',
    degree: 'MBBS, DM',
    experience: '9 Years',
    about: 'Specializes in treating neurological disorders including migraines and epilepsy.',
    fees: 1200,
    address: {
      line1: 'Banjara Hills',
      line2: 'Hyderabad, Telangana'
    }
  },
  {
    name: 'Dr. Vikram Mehta',
    image: 'doc6.png',
    speciality: 'Gastroenterologist',
    degree: 'MBBS, DM',
    experience: '10 Years',
    about: 'Expert in digestive system disorders, liver diseases, and gastrointestinal care.',
    fees: 1300,
    address: {
      line1: 'Civil Lines',
      line2: 'Jaipur, Rajasthan'
    }
  },
  {
    name: 'Dr. Kavya Iyer',
    image: 'doc7.png',
    speciality: 'General physician',
    degree: 'MBBS',
    experience: '4 Years',
    about: 'Provides primary healthcare services with emphasis on early diagnosis and prevention.',
    fees: 600,
    address: {
      line1: 'Anna Nagar',
      line2: 'Chennai, Tamil Nadu'
    }
  },
  {
    name: 'Dr. Rohan Kapoor',
    image: 'doc8.png',
    speciality: 'Gynecologist',
    degree: 'MBBS, MS',
    experience: '6 Years',
    about: 'Experienced in women’s healthcare and prenatal care management.',
    fees: 850,
    address: {
      line1: 'Model Town',
      line2: 'Ludhiana, Punjab'
    }
  },
  {
    name: 'Dr. Neha Joshi',
    image: 'doc9.png',
    speciality: 'Dermatologist',
    degree: 'MBBS, MD',
    experience: '7 Years',
    about: 'Offers advanced treatment for acne, pigmentation, and cosmetic skin concerns.',
    fees: 900,
    address: {
      line1: 'Kothrud',
      line2: 'Pune, Maharashtra'
    }
  },
  {
    name: 'Dr. Aditya Nair',
    image: 'doc10.png',
    speciality: 'Pediatricians',
    degree: 'MBBS, DNB',
    experience: '5 Years',
    about: 'Passionate about pediatric healthcare and developmental monitoring of children.',
    fees: 700,
    address: {
      line1: 'MG Road',
      line2: 'Kochi, Kerala'
    }
  },
];

const seedDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URL);
    console.log("Connected to MongoDB for seeding...");

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash("password123", salt);

    for (const doc of doctorsData) {
      const email = doc.name.toLowerCase().split(' ').join('') + "@healmate.com";
      
      const imagePath = path.join(__dirname, "../frontend/src/assets", doc.image);
      console.log(`Uploading image for ${doc.name} from ${imagePath}...`);
      
      let imageUrl = "";
      try {
        const uploadResult = await cloudinary.uploader.upload(imagePath, {
          resource_type: "image",
        });
        imageUrl = uploadResult.secure_url;
      } catch (uploadError) {
        console.error(`Failed to upload image for ${doc.name}:`, uploadError.message);
        imageUrl = "https://via.placeholder.com/300"; // Fallback
      }

      // Check if already exists
      const existing = await doctorModel.findOne({ email });
      if (existing) {
        console.log(`Doctor ${doc.name} already exists. Updating image and details.`);
        await doctorModel.findByIdAndUpdate(existing._id, {
          ...doc,
          image: imageUrl,
          email, // Keep email same
          // password: hashedPassword, // Don't reset password if exists
        });
        continue;
      }

      const newDoc = new doctorModel({
        ...doc,
        email,
        password: hashedPassword,
        image: imageUrl,
        date: Date.now(),
        slots_booked: {}
      });

      await newDoc.save();
      console.log(`Added: ${doc.name}`);
    }

    console.log("Seeding completed with images.");
    process.exit();
  } catch (err) {
    console.error("Error seeding database:", err);
    process.exit(1);
  }
};

seedDB();
