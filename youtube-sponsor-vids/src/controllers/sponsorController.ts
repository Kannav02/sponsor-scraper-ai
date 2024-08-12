import { Context } from "hono";
import axios from "axios";
import Groq from "groq-sdk";
import { env } from "hono/adapter";
import { groqClient } from "../utils/groqSingleton";

type requestInputs = {
  id: string;
};

const getGroqChatCompletion = async (
  groqInstance: any,
  inputFields: {
    time: string;
    duration?: string;
    transcriptions: string;
  }
) => {
  const data = await groqInstance.chat.completions.create({
    messages: [
      {
        role: "system",
        content: `You are a bot that finds out the total minutes and sponsored minutes of the transcript of a video that contains content related to sponsorships. The data provided to you has two fields: transcriptions and time. Transcriptions contain the subtitles of the video, and time contains the start time of the subtitles. Each transcription and time is separated by # for your comprehension. Return the answer in the following format: Total Minutes for the video: {minuteValue},Sponsor Minutes: {sponsoredMinutes}.Ensure that the values are formatted with integer minutes and rounded.Do not return any other details apart from what is specified.`,
      },
      {
        role: "user",
        content: `Video Transcript: ${inputFields.transcriptions} \n\nVideo Start Times for Transcriptions: ${inputFields.time}`,
      },
    ],
    model: "llama3-70b-8192",
    temperature: 0.1,
  });
  return data;
};

export const sponsoredDetails = async (c: Context) => {
  try {
    const body = await c.req.json();
    const { id } = body as requestInputs;
    const response = await axios.post("http://127.0.0.1:3002/api/yt", {
      id,
    });
    const { time, transcriptions } = response.data;
    const groqInstance = groqClient
      .getInstance(c.env.GROQ_API_KEY)
      .getGroqInstance();
    const sponsoredPercentage = await getGroqChatCompletion(groqInstance, {
      time,
      transcriptions,
    });
    return c.json({ mssg: sponsoredPercentage });
  } catch (e) {
    console.log(e);
    return c.json({ mssg: "error occurerd" });
  }
};
