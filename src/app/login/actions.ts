"use server"

import { z } from "zod";

const loginSchema = z.object({
    email: z.string().trim()
    .regex(/.+@zod.com/, "Email must contain @zod.com" ),
    username: z.string().trim()
    .min(5, "Username must be at least 5 characters"),
    password: z.string().trim()
    .min(10, "Password must be at least 10 characters")
    .regex(/\d+/, "Password must contain at least one number"),
});

export async function handleSubmit(prevState: any, formData: FormData) {

    // Get the keys from the schema
    const schemaKeys = Object.keys(loginSchema.shape);

    const data = Object.fromEntries(
        Array.from(formData.entries()).filter(([key, value]) => schemaKeys.includes(key))
    );
    const result = loginSchema.safeParse(data);
    if (!result.success) {
        return {errors: result.error.flatten().fieldErrors, formData: formData}
    } else {
        return {formData: formData}
    }
}