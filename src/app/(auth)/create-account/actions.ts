"use server"
import db from "@/lib/db";
import { z } from "zod";
import bcrypt from "bcrypt";
import { redirect } from "next/navigation";
import { getSession } from "@/lib/session";

const createAccountSchema = z.object({
    email: z.string().trim()
    .regex(/.+@zod.com/, "Email must contain @zod.com" ),
    username: z.string().trim()
    .min(5, "Username must be at least 5 characters"),
    password: z.string().trim()
    .min(10, "Password must be at least 10 characters")                                     
    .regex(/\d+/, "Password must contain at least one number"),
}).superRefine(async (data, ctx) => {
    const user = await db.user.findUnique({
        where: {
            email: data.email,
        },
    });
    if (user) {
        ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: "Email already in use",
            path: ["email"],
            fatal: true,
        });
        return z.NEVER; // don't continue parsing
    }
});

export async function handleSubmit(_prevState: any, formData: FormData) {

    // Access the inner type to get the shape
    const schemaKeys = Object.keys((createAccountSchema._def.schema as z.ZodObject<any>).shape);

    const data = Object.fromEntries(
        Array.from(formData.entries()).filter(([key, _value]) => schemaKeys.includes(key))
    );
    const result = await createAccountSchema.safeParseAsync(data);
    if (!result.success) {
        return {errors: result.error.flatten().fieldErrors, formData: formData}
    } else {
        // Hash the password before saving
        const hashedPassword = await bcrypt.hash(data.password as string, 12);

        const user = await db.user.create({
            data: {
                email: data.email as string,
                username: data.username as string,
                password: hashedPassword, // Store the hashed password
            },
            select: {
                id: true,
            },
        });

        const session = await getSession();
        session.id = user.id;
        await session.save();
        redirect("/profile");
        // return {formData: formData}
    }
}