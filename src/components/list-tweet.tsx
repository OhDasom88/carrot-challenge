import { formatToTimeAgo, formatToWon } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";

interface ListTweetProps {
  tweet: string;
  user : {
    username: string;
  }
  likes: {
    id: number;
  }[];
  created_at: Date;
  id: number;
}
export default function ListTweet({
  tweet,
  user,
  likes,
  created_at,
  id,
}: ListTweetProps) {
  return (
    <Link href={`/tweet/${id}`} className="flex gap-5">
      <div className="flex flex-col gap-1 *:text-neutral-900">
        <span className="text-lg">{tweet}</span>
        <span className="text-sm text-neutral-500">
          {formatToTimeAgo(created_at.toString())}
        </span>
        <span className="text-lg font-semibold">{user.username}</span>
        <span className="text-lg font-semibold">{likes.length}</span>
      </div>
    </Link>
  );
}