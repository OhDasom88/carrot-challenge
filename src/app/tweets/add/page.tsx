"use client";

import Button from "@/components/button";
import Input from "@/components/input";
import { useState } from "react";
import { uploadTweet } from "./actions";
import { useFormState } from "react-dom";


export default function AddTweet() {
  const [state, action] = useFormState(uploadTweet, null);

  return (
    <div>
       <form action={action} className="p-5 flex flex-col gap-5">
        <Input
          name="tweet"
          required
          placeholder="트윗"
          type="text"
          errors={state?.fieldErrors.tweet}
        />
        <Button text="작성 완료" />
      </form>
    </div>
  );
}