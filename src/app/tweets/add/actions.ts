"use server";
import { z } from "zod";
import db from "@/lib/db";
import { getSession } from "@/lib/session";
import { redirect } from "next/navigation";
const tweetSchema = z.object({
  title: z.string({
    required_error: "Title is required",
  }),
  description: z.string({
    required_error: "Description is required",
  }),
});
export async function uploadTweet(_: any, formData: FormData) {
  const data = {
    title: formData.get("title"),
    description: formData.get("description"),
  };
  const result = tweetSchema.safeParse(data);
  if (!result.success) {
    return result.error.flatten();
  } else {
    const session = await getSession();
    if (session.id) {
      const tweet = await db.tweet.create({
        data: {
          title: result.data.title,
          description: result.data.description,
          user: {
            connect: {
              id: session.id,
            },
          },
        },
        select: {
          id: true,
        },
      });
      // const like = await db.like.create({
      //   data: {
      //     userId: session.id,
      //     tweetId: tweet.id,
      //   },
      // });
      // redirect(`/tweets/${tweet.id}`);
      redirect("/");
      //redirect("/products")
    }
  }
}