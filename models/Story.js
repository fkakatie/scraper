var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var StorySchema = new Schema({
    // Headline - the title of the article
    headline: {
        type: String,
        trim: true,
        unique: true,
        required: true
    },
    // Summary - a short summary of the article
    summary: {
        type: String,
        trim: true,
        required: true
    },
    // URL - the url to the original article
    link: {
        type: String,
        trim: true,
        required: true
    },
    source: {
        type: String,
        required: true,
    },
    // Feel free to add more content to your database (photos, bylines, and so on).
    image: {
        type: String,
        trim: true
    },
    author: {
        type: String,
        trim: true
    },
    date: {
        type: Date,
        trim: true
    },
    comment: {
        type: Schema.Types.ObjectId,
        ref: "Comment"
    }
});

var Story = mongoose.model("Story", StorySchema);

module.exports = Story;