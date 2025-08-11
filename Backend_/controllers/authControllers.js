import userModel from "../models/userModel.js";
import lawyerModel from "../models/lawyerModel.js";
import createError from "../utils/error.js";
import bcrypt from "bcrypt";

const login = async (req, res, next) => {
  const { email, password } = req.body;

  try {
    console.log("Login attempt for email:", email);
    
    // Check for Lawyer
    const foundLawyer = await lawyerModel.findOne({ email });
    if (foundLawyer) {
      console.log("🔍 Found lawyer:", foundLawyer.email);
      console.log("🔍 Lawyer isLawyer field:", foundLawyer.isLawyer);
      
      const passwordMatch = await bcrypt.compare(password, foundLawyer.password);
      console.log("Password match result:", passwordMatch);

      if (passwordMatch && foundLawyer.isLawyer) {
        console.log("✅ Lawyer login successful");
        const { password, ...otherDetails } = foundLawyer;
        return res.status(200).json({
          success: true,
          message: "Authentication successful",
          userType: "lawyer",
          userDocument: otherDetails,
        });
      } else {
        console.log("❌ Password mismatch or lawyer status invalid");
        console.log("❌ Password match:", passwordMatch);
        console.log("❌ isLawyer:", foundLawyer.isLawyer);
        return res.status(401).json({ success: false, message: "Authentication failed for lawyer" });
      }
    }

    // Check for User
    const foundUser = await userModel.findOne({ email });
    if (foundUser) {
      const passwordMatch = await bcrypt.compare(password, foundUser.password);
 
      if (passwordMatch) {
        const { password, ...otherDetails } = foundUser;
        return res.status(200).json({
          success: true,
          message: "Authentication successful",
          userType: "user",
          userDocument: otherDetails,
        });
      } else {
        console.log("Password mismatch for user");
        return res.status(401).json({ success: false, message: "Authentication failed for user" });
      }
    }

    console.log("No user or lawyer found with the given email");
    return next(createError(404, "User not found"));

  } catch (err) {
    console.error("Error during authentication process:", err);
    next(err);
  }
};

export default login;
