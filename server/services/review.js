const mongoose = require('mongoose');
const Review = mongoose.model('review');
let AWS = require('aws-sdk');
const {singleFileUpload} = require('../services/s3')

const newReview = async (rating, body, user, restaurantId, photo) => {
    const newObj = {};

    newObj.user = user;
    newObj.restaurant = restaurantId;
    newObj.date = date;
    newObj.body = body;
    newObj.rating = rating;
    if (photo) {
        newObj.photo = await singleFileUpload(photo);
    }

    return new Review(newObj).save();
}

const updateReview = async (id, rating, date, body, photo) => {
    debugger;
    console.log("photo inside reviewservice", photo);
    const updateObj = {};

    if(date) updateObj.date = date;
    if(body) updateObj.body = body;
    if(rating) updateObj.rating = rating;
    if (photo) {
        updateObj.photo = await singleFileUpload(photo);
    }

    return Review.findByIdAndUpdate(
        id,
        updateObj,
        { new: true }
    ).then(review => review)
}

module.exports = { newReview, updateReview };