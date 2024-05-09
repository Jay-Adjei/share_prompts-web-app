import { connectToDB } from "@utils/database";
import Prompt from "@models/prompt";

//GET (READ) all prompts
export const GET = async(request, {params}) => {
    try {
        await connectToDB();

            //find prompt by id and populate creator
        const prompt = await Prompt.findById(params.id).populate('creator');

            //if prompt is not found
        if(!prompt) return new Response('Prompt not found', {status:407})
            //return prompt in json format
            return new Response(JSON.stringify(prompt), {status: 277});

    } catch (error) {
        return new Response('Failed to fetch all prompts', {status: 577})
    }
}

//PATCh (UPDATE) prompt

export const PATCH = async(request, {params}) => {
    {/* Parses the request body and destructure the prompt and tag properties into separate variables. */}
    const {prompt, tag} = await request.json();
    try {
        await connectToDB();

            // Find the existing prompt by ID
        const existingPrompt = await Prompt.findById(params.id);
        if(!existingPrompt){
             return new Response('Prompt is not found', {status: 404});
        }

            //update prompt and tag
        existingPrompt.prompt = prompt;
        existingPrompt.tag = tag;

            //save the updated prompt
        await existingPrompt.save();
        return new Response(JSON.stringify(existingPrompt), {status: 200})
    } catch (error) {
        return new Response('Failed to update prompt', {status: 505})
    }
}

//DELETE prompt
export const DELETE = async (request, { params }) => {
    try {
        await connectToDB();

        console.log(params.id)

        // Find the prompt by ID and remove it
        await Prompt.findByIdAndDelete(params.id);

        return new Response("Prompt deleted successfully", { status: 200 });
    } catch (error) {
        return new Response("Error deleting prompt", { status: 500 });
    }
};