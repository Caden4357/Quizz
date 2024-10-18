import {Schema, model} from "mongoose";

const QuizSchema = new Schema({
    category: {
        type: String,
        // required: [true, 'Category is required'],
    },
    score: {
        type: Number,
        // required: [true, 'Score is required'],
    },
    numberOfQuestions: {
        type: Number,
        // required: [true, 'Number of questions is required'],
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
})
export default model('Quiz', QuizSchema)