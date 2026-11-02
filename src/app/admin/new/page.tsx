import { redirect } from "next/navigation";
import { isAuthenticated } from "@/lib/auth";
import PostCreateForm from "./PostCreateForm";

export default async function NewPostPage() {
  const authed = await isAuthenticated();
  if (!authed) {
    redirect("/login");
  }

  return (
    <div className="min-h-screen bg-slate-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        <PostCreateForm />
      </div>
    </div>
  );
}

