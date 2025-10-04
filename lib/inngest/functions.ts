import {inngest} from "@/lib/inngest/client";
import {PERSONALIZED_WELCOME_EMAIL_PROMPT} from "@/lib/inngest/prompts";
import {sendWelcomeEmail} from "@/lib/nodemailer";

export const sendSignUpEmail = inngest.createFunction(
    {id: "sign-up-email"},
    {event: "app/user.created"},
    async ({event, step}) => {
        // --- TEMPORARY DEBUGGING ---
        // Log the first 5 and last 5 characters to verify which key is being used.
        const key = process.env.GEMINI_API_KEY || "GEMINI_API_KEY_NOT_FOUND";
        console.log(`Using Gemini Key: ${key}`);
        // --- END DEBUGGING ---
        const userProfile = `
            - Country: ${event.data.country},
            - Investment goals: ${event.data.investmentGoals},
            - Risk tolerance: ${event.data.riskTolerance},
            - Preferred industry: ${event.data.preferredIndustry},
        `

        const prompt = PERSONALIZED_WELCOME_EMAIL_PROMPT.replace('{{userProfile}}', userProfile)
        const response = await step.ai.infer('generate-welcome-info', {
            model: step.ai.models.gemini({
                model: "gemini-2.0-flash"
            }),
            body: {
                contents: [
                    {
                        role: "user",
                        parts: [
                            {
                                text: prompt
                            }
                        ]
                    }
                ]
            }
        })

        console.log(response)

        await step.run('sent-welcome-email', async () => {
            const part = response.candidates?.[0]?.content?.parts?.[0];
            const introText = (part && 'text' in part ? part.text : null) || "Thanks for join stock-project-poc. You now have the tools to track markets and make smarter moves."
            const {data: {email, name}} = event;
            return await sendWelcomeEmail({email, name, intro: introText})
        })

        return {
            success: true,
            message: 'Welcome email sent successfully'
        }
    }
)