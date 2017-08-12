/**
 * Created by Tuo on 2017/8/1.
 */
var mongoose = require('mongoose');
var user = require('./models/user');

mongoose.connect('mongodb://tuo:123@ds056789.mlab.com:56789/mapchat');


user.update({username:1}, { $set:{
    isOnline : true
}}, function (err,doc) {
    console.log(doc)
});

user.find({},function (err,doc) {
    console.log(doc);
});