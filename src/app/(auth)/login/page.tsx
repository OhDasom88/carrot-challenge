"use client"
import Link from "next/link";
import Button from "@/components/button";
import Input from "@/components/input";
import { useFormState } from "react-dom";
import { handleSubmit } from "./actions";

export default function LogIn() {

    
    const[state, trigger] = useFormState(
        handleSubmit, null as any , 
    )

    return (
        <div className="flex flex-col items-center justify-center gap-5 py-20">
        <div className="flex flex-col gap-2 *:font-medium">
            <div className="flex items-center justify-center">
            <svg xmlns="http://www.w3.org/2000/svg" fill="red" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-12">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.362 5.214A8.252 8.252 0 0 1 12 21 8.25 8.25 0 0 1 6.038 7.047 8.287 8.287 0 0 0 9 9.601a8.983 8.983 0 0 1 3.361-6.867 8.21 8.21 0 0 0 3 2.48Z" fill="red" color="red"/>
                <path stroke-linecap="round" stroke-linejoin="round" d="M12 18a3.75 3.75 0 0 0 .495-7.468 5.99 5.99 0 0 0-1.925 3.547 5.975 5.975 0 0 1-2.133-1.001A3.75 3.75 0 0 0 12 18Z" fill="white" color="white"/>
            </svg>

            </div>
        </div>
        
        <form action={trigger} className="flex flex-col gap-3 w-3/4 max-w-md">
            <Input 
            name="email" type="email" placeholder="Email" defaultValue={state?.formData?.get("email") ?? ""} required 
            errors={[state?.errors?.email ?? []]} 
            icon={
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75" />
            </svg> 
            }/>
            <Input
            name="password"
            type="password"
            placeholder="Password"
            defaultValue={state?.formData?.get("password") ?? ""}
            required
            errors={state?.errors?.password ?? []}
            icon={
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="size-6">
                <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 5.25a3 3 0 0 1 3 3m3 0a6 6 0 0 1-7.029 5.912c-.563-.097-1.159.026-1.563.43L10.5 17.25H8.25v2.25H6v2.25H2.25v-2.818c0-.597.237-1.17.659-1.591l6.499-6.499c.404-.404.527-1 .43-1.563A6 6 0 1 1 21.75 8.25Z" />
            </svg>
            }
            />
            {/* <Button loading={false} text="Log in" /> */}
            <Button text="Log in" />
            <Link href="/create-account">Don't have an account? Create one</Link>
        </form>
        {
            state?.errors?.size === 0 && (
            <div className="flex items-center gap-2 mt-4 p-3 bg-green-400 rounded-lg w-3/4 max-w-md">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="size-6">
            <path stroke-linecap="round" stroke-linejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
            </svg>
            Welcome back!
            </div>
            )
        }
        </div>
    );
}