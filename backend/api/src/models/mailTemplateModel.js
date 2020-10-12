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
    mailId: {
        required: [true, "MailId of the city cannot be empty"],
        type: String,
        trim: true,
        maxlength: [200, "MailId of the city cannot be more than 200 characters"],
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
    },
    reviewer: {
        type: mongoose.Schema.ObjectId
    },
    reviewState: {
        type: String,
        enum : ['UnAssigned','Pending','Approved','Rejected'],
        default: 'user'
    },
    reviewNotes: {
        type: String
    },
},{collection:'mailTemplate'});

var MailTemplateModel = mongoose.model('mailTemplate',MailTemplateSchema);
module.exports = MailTemplateModel;