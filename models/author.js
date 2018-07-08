var mongoose = require('mongoose');
var moment = require('moment');
var Schema = mongoose.Schema;

var AuthorSchema = new Schema({
    first_name: {type: String, required: true, max: 100},
    family_name: {type: String, required: true, max: 100},
    date_of_birth: {type: Date},
    date_of_death: {type: Date},
});
// virtual for author's full name
AuthorSchema.virtual('name').get(function(){
    return this.family_name + ', ' + this.first_name;
});

// virtual for author's URL

AuthorSchema.virtual('url').get(function(){

    return '/catalog/author/' + this._id;
});

// virtual for author's date of birth

AuthorSchema.virtual('date_of_birth_forUpdate').get(function(){
    return this.date_of_birth ? moment(this.date_of_birth).format('YYYY-MM-DD') : '';

});

// virtual for author's date of death

AuthorSchema.virtual('date_of_death_forUpdate').get(function(){
    return this.date_of_death ? moment(this.date_of_death).format('YYYY-MM-DD') : '';
});

// virtual for author's life span
AuthorSchema.virtual('lifespan').get(function(){
    var date_of_death_formatted=  this.date_of_death ? moment(this.date_of_death).format('DD-MM-YYYY') : '';
    var date_of_birth_formatted= this.date_of_birth ? moment(this.date_of_birth).format('DD-MM-YYYY') : '';
    return date_of_birth_formatted+ ' - '+ date_of_death_formatted;
});

//export module

module.exports = mongoose.model('Author', AuthorSchema);
