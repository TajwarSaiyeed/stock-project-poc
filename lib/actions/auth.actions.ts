"use server";

import {auth} from "@/lib/better-auth/auth";
import {inngest} from "@/lib/inngest/client";
import {headers} from "next/headers";

export const signUpWithEmail = async ({
                                          email,
                                          password,
                                          fullName,
                                          country,
                                          investmentGoals,
                                          preferredIndustry,
                                          riskTolerance
                                      }: SignUpFormData) => {
    try {
        const response = await auth.api.signUpEmail({
            body: {
                email,
                password,
                name: fullName
            }
        })

        if (response) {
            await inngest.send({
                name: "app/user.created",
                data: {email, name: fullName, country, investmentGoals, preferredIndustry, riskTolerance}
            })
        }

        return {
            success: true,
            message: "Sign up successful. Please check your email for verification.",
            data: response
        }
    } catch (error) {
        console.log("Sign up error:", error)
        return {
            success: false,
            message: "Sign up failed. Please try again."
        }
    }
}
export const signInWithEmail = async ({email, password}: SignInFormData) => {
    try {
        const response = await auth.api.signInEmail({
            body: {
                email,
                password,
            }
        })
        
        return {
            success: true,
            message: "Sign In successful.",
            data: response
        }
    } catch (error) {
        console.log("Sign In error:", error)
        return {
            success: false,
            message: "Sign In failed. Please try again."
        }
    }
}

export const signOut = async () => {
    try {
        await auth.api.signOut({
            headers: await headers()
        })
        return {
            success: true,
            message: "Sign out successful."
        }
    } catch (error) {
        console.log("Sign out error:", error)
        return {
            success: false,
            message: "Sign out failed. Please try again."
        }
    }
}