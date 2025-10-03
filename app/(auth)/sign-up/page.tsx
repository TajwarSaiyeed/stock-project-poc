'use client'
import React from 'react'
import {useForm} from "react-hook-form";
import {Button} from "@/components/ui/button";

const SignUpPage = () => {

    const {handleSubmit, formState: {isSubmitting}} = useForm<SignUpFormData>({
        defaultValues: {
            fullName: "",
            email: "",
            country: "US",
            password: "",
            investmentGoals: "Growth",
            riskTolerance: "Medium",
            preferredIndustry: "Technology"
        }, mode: "onBlur"
    },)

    const onsubmit = async (data: SignUpFormData) => {
        try {
            console.log(data)
        } catch (e) {
            console.error(e)
        }
    }


    return (
        <>
            <h1 className={'form-title'}>
                Sign Up & Personalize
            </h1>
            <form onSubmit={handleSubmit(onsubmit)} className={'space-y-5'}>
                <Button type={'submit'} disabled={isSubmitting} className={'yellow-btn w-full mt-5'}>
                    {isSubmitting ? 'Creating account' : 'Start Your Investing Journey'}
                </Button>
            </form>
        </>
    )
}
export default SignUpPage
