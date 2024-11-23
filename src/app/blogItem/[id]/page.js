"use client";

import useAuthStore from "@/stores/useAuthStore";
import Image from "next/image";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import React, { useEffect } from "react";

export default function BlogItem() {
  const router = useRouter();
  const { isAuthenticated, blogData, isLoading } = useAuthStore();
  const { id } = useParams();
  const blogPost = blogData?.find((post) => post.id === parseInt(id));
  const currentIndex = blogData?.findIndex((post) => post.id === parseInt(id));
  const nextPost =
    currentIndex < blogData.length - 1 ? blogData[currentIndex + 1] : null;
  const previousPost = currentIndex > 0 ? blogData[currentIndex - 1] : null;

  useEffect(() => {
    if (typeof isAuthenticated !== "undefined" && !isAuthenticated) {
      router.push("/");
    }
  }, [isAuthenticated, router]);

  if (!isAuthenticated) return null;

  return (
    <div className="w-5/6 mx-auto my-20 flex flex-col gap-12 border-slate-400 rounded-md border-2">
      <Image
        src={blogPost.featured_media_object?.source_url}
        alt={blogPost.title?.rendered || "Blog image"}
        width={800}
        height={500}
        className="object-cover w-full h-[300px]"
      />
      <h1 className="text-3xl text-center">{blogPost.title?.rendered}</h1>
      <div
        className="text-lg mt-6"
        dangerouslySetInnerHTML={{
          __html: blogPost.content?.rendered || "No content available.",
        }}
      />
      <div className="flex justify-between items-center">
        <Link
          href={`blogItem/${previousPost.id}`}
          className="text-lg text-blue-500"
        >
          مشاهده پست قبلی
        </Link>
        <Link
          href={`blogItem/${nextPost.id}`}
          className="text-lg text-blue-500"
        >
          مشاهده پست بعدی
        </Link>
      </div>
    </div>
  );
}
