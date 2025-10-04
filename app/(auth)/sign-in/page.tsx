'use client'
import React from 'react'
import {useForm} from "react-hook-form";
import {Button} from "@/components/ui/button";
import InputField from "@/components/forms/input-field";
import FooterLink from "@/components/forms/footer-link";

const SignInPage = () => {

    const {register, handleSubmit, formState: {errors, isSubmitting}} = useForm<SignInFormData>({
        defaultValues: {
            email: "",
            password: "",
        }, mode: "onBlur"
    },)

    const onSubmit = async (data: SignInFormData) => {
        try {
            console.log(data)
        } catch (e) {
            console.error(e)
        }
    }


    return (
        <>
            <h1 className={'form-title'}>
                Sign In
            </h1>
            <form onSubmit={handleSubmit(onSubmit)} className={'space-y-5'}>

                <InputField
                    label={'Email'}
                    name={'email'}
                    placeholder={"e.g. support@stockprojectpoc.com"}
                    register={register}
                    error={errors.email}
                    validation={{
                        required: "Email is required",
                        minLength: 2,
                        pattern: {
                            value: /^\S+@\S+\.\S+$/,
                            message: "Invalid email address"
                        }
                    }}
                />
                <InputField
                    label={'Password'}
                    name={'password'}
                    placeholder={"Enter a strong password"}
                    type={'password'}
                    register={register}
                    error={errors.password}
                    validation={{
                        required: "Password is required",
                        minLength: 8
                    }}
                />

                <Button type={'submit'} disabled={isSubmitting} className={'yellow-btn w-full mt-5'}>
                    {isSubmitting ? 'Signing in…' : 'Sign In'}
                </Button>

                <FooterLink
                    text={"Don't have an account?"}
                    linkText={"Create an account"}
                    href={'/sign-up'}
                />
            </form>
        </>
    )
}
export default SignInPage
