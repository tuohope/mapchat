/**
 * Created by Tuo on 2017/7/30.
 */
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var passportLocalMongoose = require('passport-local-mongoose');


var userSchema = new Schema ({
    id : Number,
    avatar_url : String,
    nickname : String,
    lat : Number,
    lon : Number,
    isOnline : Boolean
});

userSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model('Users', userSchema, 'users');