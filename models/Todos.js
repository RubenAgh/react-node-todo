const { Schema, model } = require('mongoose');

const schema = new Schema({
    title: String,
    completed: {
        type: Boolean,
        required: true
    }
});

module.exports = model('Todos', schema);