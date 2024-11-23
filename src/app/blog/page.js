"use client";

import useAuthStore from "@/stores/useAuthStore";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Blog() {
  const router = useRouter();
  const { isAuthenticated, blogData, isLoading, fetchBlogData } =
    useAuthStore();
  useEffect(() => {
    if (typeof isAuthenticated != "undefined" && !isAuthenticated) {
      router.push("/");
    }
  }, [isAuthenticated, router]);

  useEffect(() => {
    fetchBlogData();
  }, [fetchBlogData]);

  if (!isAuthenticated) return null;

  const images = [
    { src: "/img/1.jpg" },
    { src: "/img/2.jpg" },
    { src: "/img/3.jpg" },
    { src: "/img/4.jpg" },
    { src: "/img/5.jpg" },
    { src: "/img/6.jpg" },
  ];
  console.log(blogData);

  return (
    <div className="w-5/6 mx-auto my-20 flex flex-col gap-12">
      <h1 className="text-3xl text-center">Blog Page</h1>
      {isLoading && <p>Loading ...</p>}
      <div className="grid grid-cols-3 gap-4 items-center">
        {blogData
          ? blogData.map((item, index) => (
              <Link
                className="flex flex-col gap-4"
                key={item.id}
                href={`/blogItem/${item.id}`}
              >
                <Image
                  src={item.featured_media_object?.source_url || "/img/1.jpg"}
                  alt={`blog-${item.id}-img`}
                  width={500}
                  height={334}
                  style={{
                    objectFit: "cover",
                    width: "100%",
                    height: "15rem",
                  }}
                />
                <h2 className="text-right">
                  {item.title?.rendered || "Untitled"}
                </h2>
                <p className="text-right line-clamp-3 text-ellipsis">
                  <span
                    dangerouslySetInnerHTML={{
                      __html: item.content?.rendered || "",
                    }}
                  />
                  ...
                </p>
              </Link>
            ))
          : null}
      </div>
    </div>
  );
}
