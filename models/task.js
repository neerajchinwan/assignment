const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Name is required field']
    },
    email:{
        type: String,
        required: [true, 'Email is requried field'],
        validate: {
            validator: function(e){
                return /\b[\w\.-]+@[\w\.-]+\.\w{2,4}\b/.test(e)
            },
            message: props => `${props.value} is not a valid Email address`
        },
        unique: true
    },
    profession: {
        type: String,
        required: [true, "Mother's Name is required fiels"]
    },
    companyName: {
        type: String,
        required: [true, "Father's Name is required field"]
    }
})

const Task = mongoose.model('Task', taskSchema);

module.exports = Task;