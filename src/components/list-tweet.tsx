import { formatToTimeAgo, formatToWon } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import { HandThumbUpIcon, ChatBubbleBottomCenterIcon } from "@heroicons/react/24/outline";
interface ListTweetProps {
  title: string;
  description: string | null;
  views: number;
  user : {
    username: string;
  }
  likes: {
    userId: number;
    tweetId: number;
  }[];
  created_at: Date;
  id: number;

  comments: {
    id: number;
    payload: string;
    created_at: Date;
  }[];
}
export default function ListTweet({
  title,
  description,
  views,
  user,
  likes,
  comments,
  created_at,
  id,
}: ListTweetProps) {
  // console.log(tweet);
  // console.log(likes);
  return (
    <Link key={id} className="pb-5 mb-5 border-b border-neutral-500 text-neutral-400 flex  flex-col gap-2 last:pb-0 last:border-b-0" href={`/tweets/${id}`}>
      <h2 className="text-white text-lg font-semibold">{title}</h2>
      <p>{description}</p>
      <div className="flex items-center justify-between text-sm">
        <div className="flex gap-4 items-center">
          <span>{formatToTimeAgo(created_at.toString())}</span>
          <span>·</span>
          <span>조회 {views}</span>
        </div>
        <div className="flex gap-4 items-center *:flex *:gap-1 *:items-center">
          <span>
            <HandThumbUpIcon className="size-4" />
            {likes.length}
          </span>
          <span>
            <ChatBubbleBottomCenterIcon className="size-4" />
            {comments.length}
          </span>
        </div>
      </div>
    </Link>
  );
}