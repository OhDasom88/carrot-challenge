"use server"

import { z } from "zod";
import db from "../../../lib/db";
import { redirect } from "next/navigation";
import bcrypt from "bcrypt";
import { getSession } from "../../../lib/session";



const checkUniqueEmail = async (email: string) => {
    const user = await db.user.findUnique({
      where: {
        email,
      },
      select: {
        id: true,
      },
    });
    return Boolean(user);
  };


const loginSchema = z.object({
    email: z.string().trim()
    .regex(/.+@zod.com/, "Email must contain @zod.com" )
    .refine(checkUniqueEmail, {
        message: "Email not found",
    }),
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
    const result = await loginSchema.safeParseAsync(data);

    if (!result.success) {
        return {errors: result.error.flatten().fieldErrors, formData: formData}
    } else {
        const user = await db.user.findUnique({
            where: {
                email: data.email as string,
            },
            select: {
                id: true,
                password: true,
            },
        });
        const passwordsMatch = await bcrypt.compare(
            data.password as string, user!.password ?? "~!@#");
        if (!passwordsMatch) {
            return {errors: {
                password: ["Invalid password"], 
                email: []
            }, formData: formData}
        }else{
            const session = await getSession();
            session.id = user!.id;
            await session.save();
            redirect("/profile");
        }
    }
}