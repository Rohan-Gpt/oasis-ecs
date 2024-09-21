"use client";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";

const rootPageId = "4dbacb2648554dcdbbfd9a86a1f26b4b";

export default function WeeklyPlan() {
  const [selectedWeek, setSelectedWeek] = useState(1);

  const handleWeekClick = (week: number) => {
    setSelectedWeek(week);
  };

  return (
    <div className="bg-black min-w-screen min-h-screen py-10 px-6 lg:p-20 lg:mt-0">
      <div className="grid w-auto p-4 h-full rounded-3xl border-4 border-gray-400">
        <div className="flex text-white text-3xl lg:text-5xl font-semibold mt-2 justify-center mb-6">
          Weekly plan
        </div>
        <div className="flex justify-around -mt-4 mb-5 text-white font-semibold text-lg md:text-2xl md:border-2 border-white rounded-full items-center w-auto lg:mx-24">
          <div onClick={() => handleWeekClick(1)} className="cursor-pointer">
            week 1
          </div>
          <div onClick={() => handleWeekClick(2)} className="cursor-pointer">
            week 2
          </div>
          <div onClick={() => handleWeekClick(3)} className="cursor-pointer">
            week 3
          </div>
          <div onClick={() => handleWeekClick(4)} className="cursor-pointer">
            week 4
          </div>
        </div>

        {/* Conditionally render cards based on selected week */}
        {selectedWeek === 1 && (
          <div className=" items-center relative flex flex-col md:flex-row w-auto mb-20 bg-gray-900 shadow-sm border border-gray-600 rounded-lg lg:mx-24">
            <div className="relative p-4 pl-5 md:w-2/6 shrink-0 overflow-hidden">
              <Image
                className="rounded-3xl"
                src={"/cardimg1.jpeg"}
                width={250}
                height={250}
                alt="HTML"
              />
            </div>
            <div className="">
              <div className="cursor-pointer mb-4 rounded-full bg-teal-600 hover:bg-teal-400 py-0.5 px-2.5 border border-transparent text-xs text-white transition-all shadow-sm w-16 text-center">
                Basics
              </div>
              <div className="mb-2 text-white text-xl font-semibold">
                Javascript 101
              </div>
              <p className="mb-8 text-gray-500 leading-normal font-light">
                Level-1, from nothing to something
              </p>
              <div>
                <Link
                  href={`/guides/${rootPageId}`}
                  className="py-2 px-4 text-white bg-black rounded-lg w-36 font-semibold text-sm hover:-translate-y-1 hover:shadow-lg transition-all group flex items-center"
                >
                  View Guide
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="ml-2 h-4 w-4 group-hover:translate-x-2 transition-all"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M14 5l7 7m0 0l-7 7m7-7H3"
                    />
                  </svg>
                </Link>
              </div>
            </div>
          </div>
        )}

        {selectedWeek === 2 && (
          <div className=" items-center relative flex flex-col md:flex-row w-auto mb-20 bg-gray-900 shadow-sm border border-gray-600 rounded-lg lg:mx-24">
            <div className="relative p-4 pl-5 md:w-2/6 shrink-0 overflow-hidden">
              <Image
                className="rounded-3xl"
                src={"/cardimg2.jpeg"}
                width={250}
                height={250}
                alt="HTML"
              />
            </div>
            <div className="">
              <div className="cursor-pointer mb-4 rounded-full bg-teal-600 hover:bg-teal-400 py-0.5 px-2.5 border border-transparent text-xs text-white transition-all shadow-sm w-16 text-center">
                Basics
              </div>
              <div className="mb-2 text-white text-xl font-semibold">
                Inroduction to C/C++
              </div>
              <p className="mb-8 text-gray-500 leading-normal font-light">
                In this we will understand the basics of c++
              </p>
              <div>
                <Link
                  href="#"
                  className="py-2 px-4 text-white bg-black rounded-lg w-36 font-semibold text-sm hover:-translate-y-1 hover:shadow-lg transition-all group flex items-center"
                >
                  View Guide
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="ml-2 h-4 w-4 group-hover:translate-x-2 transition-all"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M14 5l7 7m0 0l-7 7m7-7H3"
                    />
                  </svg>
                </Link>
              </div>
            </div>
          </div>
        )}

        {selectedWeek === 3 && (
          <div className=" items-center relative flex flex-col md:flex-row w-auto mb-20 bg-gray-900 shadow-sm border border-gray-600 rounded-lg lg:mx-24">
            <div className="relative p-4 pl-5 md:w-2/6 shrink-0 overflow-hidden">
              <Image
                className="rounded-3xl"
                src={"/cardimg1.jpeg"}
                width={250}
                height={250}
                alt="HTML"
              />
            </div>
            <div className="">
              <div className="cursor-pointer mb-4 rounded-full bg-teal-600 hover:bg-teal-400 py-0.5 px-4 border border-transparent text-xs text-white transition-all shadow-sm w-16 text-center">
                Basics
              </div>
              <div className="mb-2 text-white text-xl font-semibold">
                Javascript Level-2
              </div>
              <p className="mb-8 text-gray-500 leading-normal font-light pr-8">
                In this track we will try to understand asynchronous and
                sychronous Javascript, callbacks and more
              </p>
              <div>
                <Link
                  href="#"
                  className="py-2 px-4 text-white bg-black rounded-lg w-36 font-semibold text-sm hover:-translate-y-1 hover:shadow-lg transition-all group flex items-center"
                >
                  View Guide
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="ml-2 h-4 w-4 group-hover:translate-x-2 transition-all"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M14 5l7 7m0 0l-7 7m7-7H3"
                    />
                  </svg>
                </Link>
              </div>
            </div>
          </div>
        )}

        {selectedWeek === 4 && (
          <div className=" items-center relative flex flex-col md:flex-row w-auto mb-20 bg-gray-900 shadow-sm border border-gray-600 rounded-lg lg:mx-24">
            <div className="relative p-4 pl-5 md:w-2/6 shrink-0 overflow-hidden">
              <Image
                className="rounded-3xl"
                src={"/cardimg1.jpeg"}
                width={250}
                height={250}
                alt="HTML"
              />
            </div>
            <div className="">
              <div className="cursor-pointer mb-4 rounded-full bg-teal-600 hover:bg-teal-400 py-0.5 px-2.5 border border-transparent text-xs text-white transition-all shadow-sm w-16 text-center">
                Basics
              </div>
              <div className="mb-2 text-white text-xl font-semibold">
                Javascript Level-3
              </div>
              <p className="mb-8 text-gray-500 leading-normal font-light">
                In this track we will understand promises in Javascript
              </p>
              <div>
                <Link
                  href="#"
                  className="py-2 px-4 text-white bg-black rounded-lg w-36 font-semibold text-sm hover:-translate-y-1 hover:shadow-lg transition-all group flex items-center"
                >
                  View Guide
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="ml-2 h-4 w-4 group-hover:translate-x-2 transition-all"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M14 5l7 7m0 0l-7 7m7-7H3"
                    />
                  </svg>
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
