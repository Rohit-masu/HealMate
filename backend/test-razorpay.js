import Razorpay from "razorpay";
import dotenv from "dotenv";
dotenv.config();

const testRazorpay = async () => {
  console.log("Testing Razorpay keys...");
  console.log("ID:", process.env.RAZORPAY_KEY_ID);
  
  const instance = new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID?.trim(),
    key_secret: process.env.RAZORPAY_KEY_SECRET?.trim(),
  });

  try {
    const response = await instance.orders.all({ count: 1 });
    console.log("✅ Connection Successful! Found orders:", response.items.length);
  } catch (error) {
    console.log("❌ Connection Failed!");
    console.log("Status Code:", error.statusCode);
    console.log("Description:", error.error.description);
    console.log("Code:", error.error.code);
  }
};

testRazorpay();
