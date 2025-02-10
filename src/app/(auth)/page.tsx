import { getSession } from "@/lib/session";
import Link from "next/link";

import TweetList from "@/components/tweet-list";
import db from "@/lib/db";
import { Prisma } from "@prisma/client";
import { PlusIcon } from "@heroicons/react/24/solid";

async function getInitialTweets() {
  const tweets = await db.tweet.findMany({
    select: {
      tweet: true,
      user: {
        select: {
          username: true,
        },
      },
      likes: {
        select: {
          id: true,
        },
      },
      created_at: true,
      id: true,
    },
    take: 1,
    orderBy: {
      created_at: "desc",
    },
  });
  return tweets;
}

export type InitialTweets = Prisma.PromiseReturnType<
  typeof getInitialTweets
>;

export default async function Home() {
  const session = await getSession();
  // console.log(session);
  // console.log(session.id);
  const initialTweets = await getInitialTweets();
  return (
    <div className="flex flex-col items-center justify-between min-h-screen p-6">
      {
        session.id ? (
          <div className="p-5 flex flex-col gap-5">
           <Link
              href="/tweets/add"
              className="bg-orange-500 flex items-center justify-center rounded-full size-16 fixed top-8 right-8 text-white transition-colors hover:bg-orange-400"
            >
              <PlusIcon className="size-10" />
            </Link>
           <TweetList initialTweets={initialTweets} />
          </div>
        ) : (
          <div className="my-auto flex flex-col items-center gap-2 *:font-medium">
            <span className="text-9xl">🥕</span>
            <h1 className="text-4xl ">당근</h1>
            <h2 className="text-2xl">당근 마겟에 어서오세요!</h2>
            <div className="flex flex-col items-center gap-3 w-full">
              <Link href="/create-account" className="primary-btn text-lg py-2.5">
                시작하기
              </Link>
              <div className="flex gap-2">
                <span>이미 계정이 있나요?</span>
                <Link href="/login" className="hover:underline">
                  로그인
                </Link>
              </div>
            </div>
        </div>
        )
      }
    </div>
  );
}