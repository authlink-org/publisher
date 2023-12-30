"use client";

export default function LoadingInpsect() {
  return (
    <>
      <div>
        <div className="container mx-auto flex justify-between mt-8 mb-8">
          <h1 className="flex scroll-m-20 text-2xl font-extrabold tracking-tight mt-2">
            <a href="/" className="hover:underline underline-offset-8">
              Projects
            </a>
            <span className="mr-4 ml-4">/</span>
            <div className="max-w-sm animate-pulse h-6 mt-1.5 bg-gray-200 rounded-full dark:bg-gray-700 w-48" />
          </h1>
          <div className="max-w-sm animate-pulse h-10 bg-gray-200 rounded-md dark:bg-gray-700 w-36" />
        </div>
        <div className="container mx-auto flex w-full flex-col items-center justify-center gap-2 overflow-y-auto p-6 md:grid md:grid-cols-2 md:gap-0 lg:grid-cols-3"></div>
      </div>
    </>
  );
}
