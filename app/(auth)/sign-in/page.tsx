'use client'
import React from 'react'
import {useForm} from "react-hook-form";
import {Button} from "@/components/ui/button";
import InputField from "@/components/forms/input-field";
import FooterLink from "@/components/forms/footer-link";
import {signInWithEmail} from "@/lib/actions/auth.actions";
import {useRouter} from "next/navigation";
import {toast} from "sonner";

const SignInPage = () => {
    const router = useRouter()
    const {register, handleSubmit, formState: {errors, isSubmitting}} = useForm<SignInFormData>({
        defaultValues: {
            email: "",
            password: "",
        }, mode: "onBlur"
    },)

    const onSubmit = async (data: SignInFormData) => {
        try {
            const result = await signInWithEmail({
                email: data.email,
                password: data.password,
            })
            if (result.success) router.push('/')

        } catch (e) {
            console.error(e)
            toast.error("Sign in failed", {
                description: e instanceof Error ? e.message : "Failed to sign in",
            })
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
                    type={'email'}
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
