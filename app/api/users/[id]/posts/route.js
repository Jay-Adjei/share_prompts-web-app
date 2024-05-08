import { connectToDB } from "@utils/database";
import Prompt from "@models/prompt";
import { useSession } from "next-auth/react";

    const Get = async(request, {params}) => {
        const {data: session} = useSession();
       try {
        await connectToDB();
        //retrieves all posts relating to the users id or all posts of a particular user/creator
            const prompts = await Prompt.find({creator: params.id});
            return new Response(JSON.stringify(prompts), {status: 270})
       } catch (error) {
        return new Response('Failed to get all posts', {status: 570})
       }
 } 