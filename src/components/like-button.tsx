"use client";
import { HandThumbUpIcon } from "@heroicons/react/24/solid";
import { HandThumbUpIcon as OutlineHandThumbUpIcon } from "@heroicons/react/24/outline";
import { useOptimistic, useTransition } from "react";
import { dislikeTweet, likeTweet } from "@/app/tweets/[id]/actions";

interface LikeButtonProps {
  isLiked: boolean;
  likeCount: number;
  tweetId: number;
}

export default function LikeButton({
    isLiked,
    likeCount,
    tweetId,
  }: LikeButtonProps) {
    const [state, reducerFn] = useOptimistic(
      { isLiked, likeCount },
      (previousState, payload) => ({
        isLiked: !previousState.isLiked,
        likeCount: previousState.isLiked
          ? previousState.likeCount - 1
          : previousState.likeCount + 1,
      })
    );
    const [isPending, startTransition] = useTransition();
    const onClick = async () => {
        startTransition(
            () => {
                reducerFn(undefined);
            }
        )
      if (isLiked) {
        await dislikeTweet(tweetId);
      } else {
        await likeTweet(tweetId);
      }
    };
    return (
      <button
        onClick={onClick}
        className={`flex items-center gap-2 text-neutral-400 text-sm border border-neutral-400 rounded-full p-2  transition-colors ${
          state.isLiked
            ? "bg-neutral-800 text-white border-neutral-800"
            : "hover:bg-neutral-800"
        }`}
      >
        {state.isLiked ? (
          <HandThumbUpIcon className="size-5" />
        ) : (
          <OutlineHandThumbUpIcon className="size-5" />
        )}
        {state.isLiked ? (
          <span> {state.likeCount}</span>
        ) : (
          <span>공감하기 ({state.likeCount})</span>
        )}
      </button>
    );
  }