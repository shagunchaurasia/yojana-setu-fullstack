var mongoose = require('mongoose');
var Schema = mongoose.Schema;   

var MailTemplateSchema = new Schema({
    templateName : {
        type: String,
         index:true,
         unique: true,
         trim: true,
         maxlength: [200, "Template Name cannot be more than 200 characters"],
        },
    mailTo  : {
        type: String
    },
    mailCC  : {
        type: String
    },
    mailBCC : {
        type: String
    },
    attachment: {
        type: String
    },
    addedDate: {
        type: Date
    },
    subject: {
        type: String
    },
    mailBody: {
        type: String
    },
    status : {
        type: Number
    },
    signature: {
        type: String
    }
},{collection:'mailTemplate'});

var MailTemplateModel = mongoose.model('mailTemplate',MailTemplateSchema);
module.exports = MailTemplateModel;