"use server";
import { z } from "zod";
import db from "@/lib/db";
import { getSession } from "@/lib/session";
import { redirect } from "next/navigation";
const tweetSchema = z.object({
  tweet: z.string({
    required_error: "Tweet is required",
  }),
});
export async function uploadTweet(_: any, formData: FormData) {
  const data = {
    tweet: formData.get("tweet"),
  };
  const result = tweetSchema.safeParse(data);
  if (!result.success) {
    return result.error.flatten();
  } else {
    const session = await getSession();
    if (session.id) {
      const tweet = await db.tweet.create({
        data: {
          tweet: result.data.tweet,
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
      const like = await db.like.create({
        data: {
          userId: session.id,
          tweetId: tweet.id,
        },
      });
      // redirect(`/tweets/${tweet.id}`);
      redirect("/");
      //redirect("/products")
    }
  }
}