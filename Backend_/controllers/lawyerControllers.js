import lawyerModel from "../models/lawyerModel.js";
import user from "../models/userModel.js";
import createError from "../utils/error.js";
import nodemailer from "nodemailer";
import bcrypt from "bcrypt";
class LawyerController {
  // Send email===============================================
  static sendVerifyEmail = async (firstName, email, user_id) => {
    try {
      const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
          user: "umamaabd@gmail.com",
          pass: "eatcxpufvlgskjhw",
        },
      });

      const mailOptions = {
        from: "umamaabd@gmail.com",
        to: email,
        subject: "Verify Email",
        text: `Hello ${firstName}, please verify your email.`,
        html: `<p>Hello ${firstName}, please click <a href="http://192.168.1.8/verify?id=${user_id}">here</a> to verify your email.</p>`,
      };

      transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
          console.log(error);
        } else {
          console.log("Email has been sent:", info.response);
        }
      });

      console.log("Email sent successfully!");
    } catch (error) {
      console.log(error.message);
    }
  };

  //Registeration=============================================================
  static registerLawyer = async (req, res, next) => {
    try {
      const {
        firstName,
        lastName,
        email,
        password,
        confirmPassword,
        cell,
        address,
        education,
        practiceArea,
        expertise,
      } = req.body;

      if (password !== confirmPassword) {
        return res
          .status(400)
          .json({ success: false, message: "Passwords do not match" });
      }

      const existingLawyer = await lawyerModel.findOne({ email });
      if (existingLawyer) {
        return res
          .status(400)
          .json({ success: false, message: "The lawyer is already exist" });
      }

      const saltRounds = 10;
      const hashPassword = await bcrypt.hash(password, saltRounds);

      const newLawyer = new lawyerModel({
        firstName: firstName,
        lastName: lastName,
        email: email,
        password: hashPassword,
        cell: cell,
        address: address,
        education: education,
        practiceArea: practiceArea,
        expertise: expertise,
        isLawyer: true,
      });

      await newLawyer.save();
      res
        .status(200)
        .json({ success: true, message: "Lawyer has been created" });
    } catch (err) {
      next(err);
    }
  };

  //mail verification===============================================
  static verifyMail = async (req, res) => {
    try {
      const updateInfo = await user.updateOne(
        { _id: req.query.id },
        { $set: { isVerified: 1 } }
      );
      console.log(updateInfo);
      res.render("email-verified");
    } catch (error) {
      console.log(error);
    }
  };

  // get===========================================================
  static getAllLawyers = async (req, res, next) => {
    try {
      // const query = address ? { address: { $regex: new RegExp(address, 'i') } } : {};
      // const result = await lawyerModel.find(query, { password: 0, isLawyer: 0 });
      const result = await lawyerModel.find();

      if (!result || result.length === 0) {
        // Return an empty array instead of 404 so frontend can handle empty lists
        return res.status(200).json([]);
      }

      res.status(200).json(result);
    } catch (err) {
      console.error("Error in getAllLawyers:", err); // Log errors
      next(createError(500, "Internal Server Error"));
    }
  };

  // search =======================================================
  static searchLawyersByAddress = async (req, res, next) => {
    try {
      const address = req.body?.params?.address || req.body?.address || req.query?.address;

      if (!address) {
        return res
          .status(400)
          .json({ success: false, message: "Address parameter is missing" });
      }

      const result = await lawyerModel.find(
        { address: new RegExp(address, "i") },
        { password: 0, isLawyer: 0 }
      );

      if (result.length === 0) {
        return res
          .status(404)
          .json({
            success: false,
            message: "No lawyers found with the provided address",
          });
      }

      res.status(200).json(result);
    } catch (err) {
      next(createError(500, "Internal Server Error"));
    }
  };

  //edit lawyer==========================================================================
  static updateLawyerHiredStatus = async (req, res) => {
    try {
      const { lawyerId } = req.body;

      const lawyer = await lawyerModel.findByIdAndUpdate(
        lawyerId,
        { isHired: true },
        { new: true }
      );

      res.status(200).json({ success: true, lawyer });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };

  //update hired status==================
  static updateHiredStatus = async (req, res) => {
    const { lawyerId } = req.params;
    const { isHired } = req.body;

    try {
      const updatedLawyer = await lawyerModel.findByIdAndUpdate(
        lawyerId,
        { isHired },
        { new: true }
      );
      console.log(updatedLawyer);
      if (!updatedLawyer) {
        return res.status(404).json({ message: "Lawyer not found" });
      }
      console.log("it's here ");
      res.json({
        success: true,
        message: "Lawyer's hire status updated",
        lawyer: updatedLawyer,
      });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };

  // Update all existing lawyers to have isLawyer: true
  static updateAllLawyersStatus = async (req, res) => {
    try {
      // First, let's see what lawyers exist
      const allLawyers = await lawyerModel.find({});
      console.log("🔍 All lawyers in database:", allLawyers.map(l => ({ email: l.email, isLawyer: l.isLawyer })));
      
      const result = await lawyerModel.updateMany(
        { isLawyer: { $ne: true } }, // Find lawyers where isLawyer is not true
        { $set: { isLawyer: true } }
      );
      
      console.log(`✅ Updated ${result.modifiedCount} lawyers`);
      
      // Check the updated lawyers
      const updatedLawyers = await lawyerModel.find({});
      console.log("🔍 Updated lawyers:", updatedLawyers.map(l => ({ email: l.email, isLawyer: l.isLawyer })));
      
      res.json({
        success: true,
        message: `Updated ${result.modifiedCount} lawyers to have isLawyer: true`,
        totalLawyers: updatedLawyers.length,
        lawyers: updatedLawyers.map(l => ({ email: l.email, isLawyer: l.isLawyer }))
      });
    } catch (error) {
      console.error('❌ Error updating lawyers:', error);
      res.status(500).json({ error: error.message });
    }
  };

  //check if hired ==================================
  static checkIfHired = async (req, res) => {
    const { lawyerId } = req.params;
    const { userId } = req.query;

    try {
      const lawyer = await lawyerModel.findById(lawyerId);

      if (!lawyer) {
        return res.status(404).json({ message: "Lawyer not found" });
      }

      const isHired = lawyer.isHired;

      res.json({ isHired });
    } catch (error) {
      res.status(500).json({ error: "Failed to check hire status" });
    }
  };

  //update ============================================================================

  static updateLawyerWithImage = async (req, res, next) => {
    try {
      const id = req.params.id.trim();
      const updateData = req.body;

      // Check if an image file was uploaded
      if (req.file) {
        updateData.image = req.file.path;
      }

      // Find and update the lawyer
      const result = await lawyerModel.findByIdAndUpdate(id, updateData, {
        new: true,
      });

      if (!result) {
        return next(createError(404, "Lawyer not found"));
      }

      res.status(200).json({
        message: "Lawyer updated successfully",
        data: result,
      });
    } catch (error) {
      next(error);
    }
  };

  static updatePassword = async (req, res, next) => {
    try {
      const id = req.params.id.trim();
      const updateData = req.body;

      const foundLawyer = await lawyerModel.findById({ _id: id });

      if (!foundLawyer) {
        return next(createError(404, "Password not found"));
      }

      if (
        updateData.currentPassword &&
        updateData.newPassword &&
        updateData.confirmPassword
      ) {
        if (updateData.newPassword === updateData.confirmPassword) {
          const passwordMatch = await bcrypt.compare(
            updateData.currentPassword,
            foundLawyer.password
          );

          if (passwordMatch) {
            const saltRounds = 10;
            const hashedPassword = await bcrypt.hash(
              updateData.newPassword,
              saltRounds
            );
            foundLawyer.password = hashedPassword;
            await foundLawyer.save();
            return res.status(200).json({
              message: "Password Updated Successfully",
              data: foundLawyer,
            });
          } else {
            return res
              .status(400)
              .json({ message: "Current password is wrong" });
          }
        } else {
          return res
            .status(400)
            .json({
              message: "New Password and Confirm Password do not match",
            });
        }
      } else {
        return res.status(400).json({ message: "All fields are required" });
      }
    } catch (error) {
      next(error);
    }
  };

  //Delete Accound============================================================
  static deleteDocById = async (req, res, next) => {
    try {
      const result = await lawyerModel.findByIdAndDelete(req.params.id);

      if (!result) {
        return res.status(404).json({ message: "Lawyer not found" });
      }

      res.status(200).json({ message: "Lawyer deleted successfully" });
    } catch (err) {
      console.error(err);
      next(err);
    }
  };

  //getLawyer====================================================
  static getLawyer = async (req, res) => {
    try {
      const { lawyer } = req;

      if (!lawyer) {
        return res
          .status(404)
          .json({ success: false, message: "Lawyer not found" });
      }

      res.status(200).json({
        success: true,
        data: {
          firstName: lawyer.firstName,
          lastName: lawyer.lastName,
          email: lawyer.email,
        },
      });
    } catch (error) {
      console.error("Error fetching Lawyer data:", error);
      res
        .status(500)
        .json({ success: false, message: "Internal server error" });
    }
  };

  // Get lawyer status for debugging
  static getLawyerStatus = async (req, res) => {
    try {
      const { email } = req.params;
      const lawyer = await lawyerModel.findOne({ email });
      
      if (!lawyer) {
        return res.status(404).json({ message: "Lawyer not found" });
      }
      
      res.json({
        email: lawyer.email,
        isLawyer: lawyer.isLawyer,
        firstName: lawyer.firstName,
        lastName: lawyer.lastName
      });
    } catch (error) {
      console.error('Error getting lawyer status:', error);
      res.status(500).json({ error: error.message });
    }
  };
}

export default LawyerController;
