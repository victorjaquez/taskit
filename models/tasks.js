const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
    user_id: String,
    description: { type: String, required: true},
    budget: { type: String, required: true},
    location: { type: String, required: true},
    duedate: { type: String, required: true},
    phonenumber: { type: String, required: true}
});

const Task = mongoose.model('Task', taskSchema);

module.exports = Task;
