import db from "@/lib/db";
import { formatToTimeAgo } from "@/lib/utils";
import {
  ChatBubbleBottomCenterIcon,
  HandThumbUpIcon,
} from "@heroicons/react/24/outline";
import Link from "next/link";
async function getTweets() {
  const tweets = await db.tweet.findMany({
    select: {
      id: true,
      title: true,
      description: true,
      views: true,
      created_at: true,
      _count: {
        select: {
          comments: true,
          likes: true,
        },
      },
    },
  });
  return tweets;
}

export const metadata = {
  title: "동네생활",
};


export default async function Life() {
  const tweets = await getTweets();
  return (
  <div className="p-5 flex flex-col">
  {tweets.map((tweet) => (
    <Link
      key={tweet.id}
      href={`/tweets/${tweet.id}`}
      className="pb-5 mb-5 border-b border-neutral-500 text-neutral-400 flex  flex-col gap-2 last:pb-0 last:border-b-0"
    >
      <h2 className="text-white text-lg font-semibold">{tweet.title}</h2>
      <p>{tweet.description}</p>
      <div className="flex items-center justify-between text-sm">
        <div className="flex gap-4 items-center">
          <span>{formatToTimeAgo(tweet.created_at.toString())}</span>
          <span>·</span>
          <span>조회 {tweet.views}</span>
        </div>
        <div className="flex gap-4 items-center *:flex *:gap-1 *:items-center">
          <span>
            <HandThumbUpIcon className="size-4" />
            {tweet._count.likes}
          </span>
          <span>
            <ChatBubbleBottomCenterIcon className="size-4" />
            {tweet._count.comments}
          </span>
        </div>
      </div>
    </Link>
  ))}
  </div>
  );
}