import { getSession } from "@/lib/session";
import Link from "next/link";

export default async function Home() {
  const session = await getSession();
  console.log(session);
  console.log(session.id);
  return (
    <div className="flex flex-col items-center justify-between min-h-screen p-6">
      {
        session.id ? (
          <div>
            <h1>로그인 성공</h1>
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