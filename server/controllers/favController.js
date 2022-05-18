const Fav = require('../models/favModel');
const { check, validationResult } = require("express-validator/check");

const addFav = async (req, res) => {
    try {
        const {user_id, rest_id} = req.body;
        
            const favList = await Fav.findOne({user_id: user_id}).exec()
            if(favList){
                await Fav.updateOne({user_id: user_id}, {$push: {rest_id : rest_id}});
                res.status(201).json("favorites added");
            } else {
                const favList = await Fav.create({user_id: user_id})
                await Fav.updateOne({user_id: user_id}, {$push: {rest_id : rest_id}});
                res.status(201).json("favorites added");
            }
        
    } catch (error) {
        console.error(error);
    }
};

module.exports = {
    addFav
};