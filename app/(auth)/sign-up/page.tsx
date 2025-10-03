'use client'
import React from 'react'
import {useForm} from "react-hook-form";
import {Button} from "@/components/ui/button";
import InputField from "@/components/forms/input-field";
import SelectField from "@/components/forms/select-field";
import {INVESTMENT_GOALS, PREFERRED_INDUSTRIES, RISK_TOLERANCE_OPTIONS} from "@/lib/constants";
import {CountrySelectField} from "@/components/forms/country-select";

const SignUpPage = () => {

    const {control, register, handleSubmit, formState: {errors, isSubmitting}} = useForm<SignUpFormData>({
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
                <InputField
                    label={'Full Name'}
                    name={'fullName'}
                    placeholder={"John Doe"}
                    register={register}
                    error={errors.fullName}
                    validation={{
                        required: "Full name is required",
                        minLength: 2
                    }}
                />
                <InputField
                    label={'Email'}
                    name={'email'}
                    placeholder={"e.g. support@stockprojectpoc.com"}
                    register={register}
                    error={errors.email}
                    validation={{
                        required: "Email is required",
                        minLength: 2,
                        pattern: /^\w+@\w+\.\w+$/,
                        message: "Invalid email address"
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


                <CountrySelectField
                    name="country"
                    label="Country"
                    control={control}
                    error={errors.country}
                    required
                />
                <SelectField
                    name={"investmentGoals"}
                    label={"Investment Goals"}
                    placeholder={"Select your investment goals"}
                    options={INVESTMENT_GOALS}
                    control={control}
                    error={errors.investmentGoals}
                    required
                />

                <SelectField
                    name={"riskTolerance"}
                    label={"Risk Tolerance"}
                    placeholder={"Select your risk level"}
                    options={RISK_TOLERANCE_OPTIONS}
                    control={control}
                    error={errors.riskTolerance}
                    required
                />

                <SelectField
                    name={"preferredIndustry"}
                    label={"Preferred Industry"}
                    placeholder={"Select your preferred industry"}
                    options={PREFERRED_INDUSTRIES}
                    control={control}
                    error={errors.preferredIndustry}
                    required
                />

                <Button type={'submit'} disabled={isSubmitting} className={'yellow-btn w-full mt-5'}>
                    {isSubmitting ? 'Creating account' : 'Start Your Investing Journey'}
                </Button>
            </form>
        </>
    )
}
export default SignUpPage
