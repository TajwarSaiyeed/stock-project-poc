import {Inngest} from "inngest";

export const inngest = new Inngest(
    {
        id: "stock-project-poc",
        ai: {
            gemini: {
                apiKey: process.env.GEMINI_API_KEY!,
            }
        }
    })