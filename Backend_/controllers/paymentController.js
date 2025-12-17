import { v4 as uuidv4 } from "uuid";
import stripe from "stripe";
import PaymentModel from "../models/paymentModel.js";
import UserModel from "../models/userModel.js";
import dotenv from "dotenv";
import { fail } from "assert";

dotenv.config();

// Read Stripe secret key from environment for security.
// Accept both `STRIPE_SECRET_KEY` and legacy `stripe_Secret_Key` (fallback).
const stripeSecretKey = process.env.STRIPE_SECRET_KEY || process.env.stripe_Secret_Key || process.env.stripe_secret_key;
if (!stripeSecretKey) {
  console.warn('⚠️ Stripe secret key is not set (checked STRIPE_SECRET_KEY and stripe_Secret_Key). Payments will fail until you provide a valid key in .env');
} else {
  console.log('Using Stripe key from env, length:', String(stripeSecretKey).length);
}
const stripeInstance = stripe(stripeSecretKey || '');

class PaymentController {
  // Method to create a payment
  // static async createPayment(req, res, next) {
  //   const { token, amount, userId } = req.body;

  //   try {
  //     // 1. Create a customer with Stripe using token data (email, card info)
  //     const customer = await stripeInstance.customers.create({
  //       email: token.email,
  //       source: token.id,
  //     });

  //     // 2. Charge the customer for the specified amount
  //     const charge = await stripeInstance.charges.create({
  //       amount,
  //       currency: "pounds",  // change this to GBP or the desired currency if needed
  //       customer: customer.id,
  //       receipt_email: token.email,
  //       description: "Payment Description",
  //     });

  //     // 3. Save the payment details to the database (MongoDB via PaymentModel)
  //     const paymentId = uuidv4(); // Generate a unique payment ID
  //     const newPayment = new PaymentModel({
  //       paymentId,
  //       userId,           // Associate the payment with a user
  //       amount,
  //       currency: "usd",  // Change if needed
  //       paymentStatus: charge.status, // Save the payment status (e.g., succeeded)
  //       receiptUrl: charge.receipt_url, // Save the receipt URL
  //       description: "Payment for services", // Can customize as needed
  //     });

  //     await newPayment.save(); // Save payment to DB

  //     // 4. Optionally, update user's payment history in UserModel
  //     await UserModel.findByIdAndUpdate(userId, {
  //       $push: { paymentHistory: paymentId },
  //     });

  //     // 5. Send success response with the charge and payment data
  //     res.status(200).json({ success: true, charge, payment: newPayment });
  //   } catch (error) {
  //     console.error("Payment error:", error);
  //     res.status(500).json({ error: "Payment failed. Please try again." });
  //   }
  // }

  static async checkout(req, res) {
    const { token, amount } = req.body;

    console.log("Data here");

    console.log(req.body.lawyerId);

    if (!token || !amount || amount <= 0) {
      return res.status(400).json({ error: "Invalid request data" });
    }

    if (!stripeSecretKey) {
      console.error('Payment attempted but STRIPE_SECRET_KEY is not configured');
      return res.status(500).json({ error: 'Payment configuration error. Contact admin.' });
    }

    try {
      const customer = await stripeInstance.customers.create({
        email: token.email,
        source: token.id,
      });

      const charge = await stripeInstance.charges.create({
        amount,
        currency: "usd",
        customer: customer.id,
        receipt_email: token.email,
        description: "Payment Description",
      });

      const payment = new PaymentModel({
        userId: req.body.userId,
        lawyerId: req.body.lawyerId,
        amount: amount / 100,
        status: "Completed",
      });
      await payment.save();

      res.status(200).json(charge);
    } catch (error) {
      console.error("Payment Error:", error);
      res.status(400).json({ error: "Payment Failed" });
    }
  }

  // get transictions api

  static getTransaction = async (req, res, next) => {
    try {
      const transictions = req;
      if (!transictions) {
        res.status(2001).json({ success: fail, message: "No payment found" });
      } else {
        console.error("Error fetching Lawyer data:", error);
        res.status(500).json({ success: false, message: "Internal server error" });
      }
    } catch (err) {
      next(err);
     
    }
  };

  // Check if user has paid for a specific lawyer
  static checkPaymentStatus = async (req, res, next) => {
    try {
      const { userId, lawyerId } = req.params;
      
      console.log("🔵 Checking payment status for:", { userId, lawyerId });
      
      const payment = await PaymentModel.findOne({
        userId: userId,
        lawyerId: lawyerId,
        status: 'Completed'
      });

      console.log("🔵 Payment found:", payment);

      const isPaid = !!payment;
      
      console.log("🔵 Is paid:", isPaid);
      
      res.status(200).json({
        isPaid: isPaid,
        payment: payment ? {
          amount: payment.amount,
          date: payment.createdAt,
          transactionId: payment.transactionId
        } : null
      });
    } catch (error) {
      console.error("❌ Error checking payment status:", error);
      res.status(500).json({ 
        isPaid: false, 
        error: "Failed to check payment status" 
      });
    }
  };

  // Debug: Get all payments
  static getAllPayments = async (req, res, next) => {
    try {
      const payments = await PaymentModel.find()
        .populate('userId', 'firstName lastName email')
        .populate('lawyerId', 'firstName lastName email');
      
      console.log("🔵 All payments:", payments);
      
      res.status(200).json({
        count: payments.length,
        payments: payments
      });
    } catch (error) {
      console.error("❌ Error getting all payments:", error);
      res.status(500).json({ 
        error: "Failed to get payments" 
      });
    }
  };
}

export default PaymentController;
