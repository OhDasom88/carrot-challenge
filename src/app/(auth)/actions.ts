"use server";
import db from "@/lib/db";
export async function getMoreTweets(page: number) {
  const tweets = await db.tweet.findMany({
    select: {
      id: true,
      title: true,
      description: true,
      views: true,
      created_at: true,
      user: {
        select: {
          username: true,
        },
      },
      likes: {
        select: {
          userId: true,
          tweetId: true,
        },
      },
      comments: {
        select: {
          payload: true,
          created_at: true,
          id: true,
        },
      },
    },
    skip: page * 1,
    take: 1,
    orderBy: {
      created_at: "desc",
    },
  });
  return tweets;
}