const mongoose = require("mongoose");
const Review = mongoose.model("review");

const newReview = (rating, body, user, restaurantId) => {
    return new Review({ rating, body, user: user._id, restaurant: restaurantId }).save();
}

const updateReview = (id, rating, date, body) => {
    const updtObj = {};

    if(date) updtObj.date = date;
    if(body) updtObj.body = body;
    if(rating) updtObj.rating = rating;

    return Review.findByIdAndUpdate(
        id,
        updtObj,
        { new: true }
    ).then(review => review)
}

module.exports = { newReview, updateReview };