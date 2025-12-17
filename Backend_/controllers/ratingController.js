import Rating from "../models/ratingModel.js";
import createError from "../utils/error.js";
import Payment from "../models/paymentModel.js";

class RatingController {
  static createRating = async (req, res, next) => {
    try {
      const { userId, lawyerId, rating, comments } = req.body;

      const hireRecord = await Payment.findOne({ userId, lawyerId, status: 'Completed' });
      if (!hireRecord) {
        return next(createError(403, "You can only rate lawyers you've hired"));
      }

       const newRating = new Rating({
        userId,
        lawyerId,
        rating,
        comments,
      });

      const ratingResult = await newRating.save();   
      console.log(ratingResult);

      res.status(201).json({
        success: true,
        message: "The rating has been saved",
        data: ratingResult,
      });
    } catch (err) {
      next(err);  
    }
  };
}

export default RatingController;
