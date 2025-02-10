"use server";
import db from "@/lib/db";
import { getSession } from "@/lib/session";
import { formatToWon,  } from "@/lib/utils";
import { UserIcon } from "@heroicons/react/24/solid";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";


async function getIsOwner(userId: number) {
    const session = await getSession();
    if (session.id) {
      return session.id === userId;
    }
    return false;
  }

async function getTweet(id: number) {
  const tweet = await db.tweet.findUnique({
    where: {
      id,
    },
    include: {
      user: {
        select: {
          username: true,
          avatar: true,
        },
      },
    },
  });
  return tweet;
}
  export default async function TweetDetail({
    params,
  }: {
    params: { id: string };
  }) {
    const { id } = await params
    const id_number = Number(id);
    if (isNaN(id_number)) {
      return notFound();
    }
    const tweet = await getTweet(id_number);
    if (!tweet) {
      return notFound();
    }
    const isOwner = await getIsOwner(tweet.userId);

    return (
        <div>
            <div className="relative aspect-square">
              <p>{tweet.tweet}</p>
              <p>{tweet.created_at.toLocaleString()}</p>
              <p>{tweet.updated_at.toLocaleString()}</p>

            </div>
            <div className="p-5 flex items-center gap-3 border-b border-neutral-700">
                <div className="size-10 overflow-hidden rounded-full">
                {tweet.user.avatar !== null ? (
                    <Image
                    src={tweet.user.avatar}
                    width={40}
                    height={40}
                    alt={tweet.user.username}
                    />
                ) : (
                    <UserIcon />
                )}
                </div>
                <div>
                <h3>{tweet.user.username}</h3>
                </div>
            </div>
            <div className="fixed w-full bottom-0 left-0 p-5 pb-10 bg-neutral-800 flex justify-between items-center">
                {isOwner ? (
                <button className="bg-red-500 px-5 py-2.5 rounded-md text-white font-semibold">
                    Delete product
                </button>
                ) : null}
            </div>
        </div>
  );
}