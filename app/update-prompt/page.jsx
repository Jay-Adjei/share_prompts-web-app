'use client'

import { useEffect, useState, Suspense } from "react"
import { useRouter, useSearchParams} from "next/navigation"

import Form from "@components/Form"
 

const EditPrompt = () => {

    const [post, setPost] = useState({prompt: '', tag: ''});
    const [submitting, setSubmitting] = useState(false);

    const router = useRouter();

    //access and manipulate the URL's search parameters within your React component.
    const searchParams = useSearchParams();
    //Get the id from the url
    const promptId = searchParams.get('id');

    useEffect(() => {
        const getPromptDetails = async () => {
            const response = await fetch(`/api/prompt/${promptId}`);
            const data = await response.json();

            setPost({
                prompt: data.prompt,
                tag: data.tag,
            });
        }
        if(promptId) getPromptDetails();
    },[promptId])

    const updatePrompt = async (e) => {
        e.preventDefault();
        setSubmitting(true);

        if(!promptId) return('Prompt ID not found')

        try {
            const response = await fetch(`api/prompt/${promptId}`, {
                method: 'PATCH',
                body: JSON.stringify({
                    prompt: post.prompt,
                    tag: post.tag
                })
            })
            if(response.ok){
                router.push('/');
            } else {
                console.error('Failed to update prompt:', await response.text());
                // Handle error in the Form component (e.g., display error message)
              }
        } catch (error) {
            console.log(error);
        } finally {
            setSubmitting(false);
        }
    }

  return (
            <Form
                type='Edit'
                post={post}
                submitting={submitting}
                setPost={setPost}
                handleSubmit={updatePrompt}
            />
  );
}

const Page = () => {
    return (
        <Suspense>
            <EditPrompt />
        </Suspense>
    )
}

export default Page
