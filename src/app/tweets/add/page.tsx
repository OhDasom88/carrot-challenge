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
          name="title"
          required
          placeholder="제목"
          type="text"
          errors={state?.fieldErrors.title}
        />
        <Input
          name="description"
          required
          placeholder="내용"
          type="text"
          errors={state?.fieldErrors.description}
        />
        <Button text="작성 완료" />
      </form>
    </div>
  );
}