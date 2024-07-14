import { Context } from "hono";
import axios from "axios";
import Groq from "groq-sdk";
import { env } from "hono/adapter";
import { groqClient } from "../utils/groqSingleton";



type requestInputs={
    id:string
}

const getGroqChatCompletion=async (groqInstance:any,inputFields:{
    time:string,
    duration?:string,
    transcriptions:string
})=>{
    const data = await groqInstance.chat.completions.create({
        messages:[
            {
                role:"system",
                content:`You are a bot that finds out the total minutes of the transcript of a video that contains the content related to sponsorships
                the data that is given to you has 2 fields, transcriptions and time, transcriptions contain the subtitles of the video
                and the time contains the start time of the subtitles, each transcription and
                time is separated by # for your better comprehension, give me back the answer in this format total Minutes for the video:{minuteValue}, Sponsor Minute:{sponsoredMinutes}`
            },
            {
                role:"user",
                content:`Video Transcript: ${inputFields.transcriptions} \n\nVideo Start Times for Transcriptions: ${inputFields.time}`

            }

        ],
        model: "llama3-8b-8192",
    })
    return data
}

export const sponsoredDetails=async (c:Context)=>{
    try{
    const body=await c.req.json()
    const {id}=body as requestInputs
    const response= await axios.post("http://127.0.0.1:3002/api/yt",{
        id
    })
    const {time,transcriptions}=response.data
    const groqInstance=groqClient.getInstance(c.env.GROQ_API_KEY).getGroqInstance()
    const sponsoredPercentage=await getGroqChatCompletion(groqInstance,{time,transcriptions})
    return c.json({"mssg":sponsoredPercentage})
    }
    catch(e){
        console.log(e)
        return c.json({"mssg":"error occurerd"})
    }

}

