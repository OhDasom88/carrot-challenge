import db from "../../../../lib/db";
import { getSession } from "../../../../lib/session";
import { notFound, redirect } from "next/navigation";
async function getUser() {
  const session = await getSession();
  if (session.id) {
    const user = await db.user.findUnique({
      where: {
        id: session.id,
      },
    });
    if (user) {
      return user;
    }
  }
  notFound();
}

export default async function Profile() {
    const user = await getUser();
    const logOut = async () => {
      "use server";
      const session = await getSession();
      await session.destroy();
      redirect("/");
    };
    return (
      <div>
        <h1>Welcome! {user?.username}!</h1>
        <p>Email: {user?.email}</p>
        <p>Bio: {user?.bio}</p>
        <p>Created at: {user?.created_at.toLocaleString()}</p>
        <p>Updated at: {user?.updated_at.toLocaleString()}</p>
        <form action={logOut}>
          <button>Log out</button>
        </form>
      </div>
    );
}