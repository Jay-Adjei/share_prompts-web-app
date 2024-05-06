import mongoose, { Schema, model, models } from "mongoose";

const PromptSchema = new Schema ({
    creator:{
        type: mongoose.Schema.Types.ObjectID,
        ref: 'User',
    },
    prompt: {
        type: String,
        required: [true, 'Prompt is required']
    },
    tag: {
        type: String,
        required: [true, 'Tag is required']
    }
});

//either get the prompt that already exits on the models abject or create a new prompt 
const Prompt = models.Prompt || model('Prompt', PromptSchema);

export default Prompt;