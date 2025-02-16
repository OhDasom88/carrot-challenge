import db from "@/lib/db";
import { getSession } from "@/lib/session";
import { formatToTimeAgo } from "@/lib/utils";
import { EyeIcon, HandThumbUpIcon, UserIcon, } from "@heroicons/react/24/solid";
import { HandThumbUpIcon as OutlineHandThumbUpIcon } from "@heroicons/react/24/outline";
import { unstable_cache as nextCache, revalidateTag } from "next/cache";
import Image from "next/image";
import { notFound } from "next/navigation";
import LikeButton from "@/components/like-button";


async function getTweet(id: number) {
  try {
    const tweet = await db.tweet.update({
      where: {
        id,
      },
      data: {
        views: {
          increment: 1,
        },
      },
      include: {
        user: {
          select: {
            username: true,
            avatar: true,
          },
        },
        _count: {
          select: {
            comments: true,
            // likes: true,
          },
        },
      },
    });
    return tweet;
  } catch (e) {
    return null;
  }
}

const getCachedTweet = nextCache(getTweet, ["tweet-detail"], {
  tags: ["tweet-detail"],
  revalidate: 60,
});


async function getLikeStatus(
  tweetId: number,
  userId: number
) {
  const liked = await db.like.findUnique({
    where: {
      id: {
        tweetId,
        userId,
      },
    },
  });
  const likeCount = await db.like.count({
    where: {
      tweetId,
    },
  });
  return {
    likeCount,
    isLiked: Boolean(liked),
  };
}

function getCachedLikeStatus(tweetId: number, userId: number) {
  const cachedOperation = nextCache(getLikeStatus, ["tweet-like-status"], {
    tags: [`like-status-${tweetId}`],
  });
  return cachedOperation(tweetId, userId);
}

export default async function TweetDetail({
  params,
}: {
  params: { id: string };
}) {
  const { id } = await params
  const tweetId = Number(id);
  if (isNaN(tweetId)) {
    return notFound();
  }
  const tweet = await getCachedTweet(tweetId);
  if (!tweet) {
    return notFound();
  }

  // const isLiked = await getIsLiked(id);
  const session = await getSession(); 
  const { likeCount, isLiked } = await getCachedLikeStatus(tweetId, session.id!);

  return (
    <div className="p-5 text-neutral-800">
      <div className="flex items-center gap-2 mb-2">
        {
          tweet.user.avatar !== null ? (
            <Image
            src={tweet.user.avatar}
            width={28}
            height={28}
            className="size-7 rounded-full"
            alt={tweet.user.username}
            />
          ) : (
              <UserIcon className="size-7 rounded-full" />
          )
        }
        <div>
          <span className="text-sm font-semibold">{tweet.user.username}</span>
          <div className="text-xs">
            <span>{formatToTimeAgo(tweet.created_at.toString())}</span>
          </div>
        </div>
      </div>
      <h2 className="text-lg font-semibold">{tweet.title}</h2>
      <p className="mb-5">{tweet.description}</p>
      <div className="flex flex-col gap-5 items-start">
        <div className="flex items-center gap-2 text-neutral-400 text-sm">
          <EyeIcon className="size-5" />
          <span>조회 {tweet.views}</span>
        </div>
        <LikeButton
          isLiked={isLiked}
          likeCount={likeCount}
          tweetId={tweetId}
        />

      </div>
    </div>
  );
}