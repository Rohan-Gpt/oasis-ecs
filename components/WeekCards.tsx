"use client";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CheckCircle, Code, Zap, Users, LucideIcon } from "lucide-react";
import Link from "next/link";
import { GetAllGuides } from "@/actions/guides";
import { Skeleton } from "./ui/skeleton";
import * as LucideIcons from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

type syllabus = {
  week: string;
  title: string;
  description: string;
  icon: string;
  topics: string[];
  guideLink?: string;
};

export default function EnhancedWeekWiseSyllabus() {
  const [syllabus, setSyllabus] = useState<syllabus[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [activeWeek, setActiveWeek] = useState(1);
  const [progress, setProgress] = useState(10);
  const sectionRef = useRef(null);
  const timelineRef = useRef(null);
  const contentRef = useRef(null);
  const [loadedIcons, setLoadedIcons] = useState<{ [key: string]: any }>({});

  const fetchSyllabus = useCallback(async () => {
    try {
      const data = await GetAllGuides();
      if (Array.isArray(data)) {
        const newGuides = data.filter((guide) => guide.week !== null);
        setSyllabus(newGuides as syllabus[]); // Type casting for assurance
      } else {
        // console.error("API did not return an array", data);
      }
    } catch (error) {
      // console.error("Error fetching guides:", error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchSyllabus();
  }, [fetchSyllabus]);
  // const fetchSyllabus = useCallback(async () => {
  //   try {
  //     const response = await fetch("/api/guides");
  //     const data = await response.json();
  //     if (Array.isArray(data)) {
  //       const newGuides = data.filter((guide) => guide.week !== null);
  //       setSyllabus(newGuides);
  //     } else {
  //       // console.error("API did not return an array", data);
  //     }
  //   } catch (error) {
  //     // console.error("Error fetching guides:", error);
  //   } finally {
  //     setLoading(false);
  //   }
  // }, []);

  // useEffect(() => {
  //   fetchSyllabus();
  // }, [fetchSyllabus]);

  useEffect(() => {
    if (syllabus.length === 0) return;

    const newIcons: { [key: string]: any } = {};
    syllabus.forEach((guide) => {
      const IconComponent = LucideIcons[guide.icon as keyof typeof LucideIcons];
      if (IconComponent) {
        newIcons[guide.icon] = IconComponent;
      }
    });

    setLoadedIcons((prev) => ({ ...prev, ...newIcons }));
    console.log(syllabus);
  }, [syllabus]);

  useEffect(() => {
    const cards = gsap.utils.toArray(".week-card");
    const week = gsap.utils.toArray(".week");

    gsap.set(cards, { opacity: 0, y: 50 });

    gsap.to(cards, {
      opacity: 1,
      y: 0,
      duration: 0.5,
      stagger: 0.1,
      ease: "power3.out",
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top 80%",
      },
    });

    gsap.to(timelineRef.current, {
      height: "100%",
      duration: 2,
      ease: "power2.out",
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top 80%",
        end: "bottom 20%",
        scrub: true,
      },
    });

    gsap.set(contentRef.current, { opacity: 0, y: 20 });
    // Simulate progress increase
    // const progressInterval = setInterval(() => {
    //   setProgress((prev) => (prev < 100 ? prev + 1 : 10));
    // }, 1000);

    // return () => clearInterval(progressInterval);
  }, []);

  const handleWeekChange = (week: number) => {
    setActiveWeek(week);
    gsap.to(`.week-card`, { scale: 1, duration: 0.3 });
    gsap.to(`.week-card-${week}`, { scale: 1.05, duration: 0.3 });
  };

  return (
    <div
      ref={sectionRef}
      className="container mx-auto px-4 py-16 bg-gray-900 text-white"
    >
      <h2 className="text-4xl font-bold text-center mb-12 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-600">
        Full-Stack Web Development Journey
      </h2>

      <div className="flex flex-col lg:flex-row gap-8">
        <div className="lg:w-1/3">
          <Card className="bg-gray-800 border-gray-700 text-white">
            <CardHeader>
              <CardTitle className="text-2xl font-bold">
                Your Progress
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <Progress value={progress} className="w-full h-2" />
                <p className="text-center text-lg">{progress}% Complete</p>
                <div className="flex justify-between items-center">
                  <Badge variant="outline" className="bg-blue-500 text-white">
                    Current: Week {activeWeek}
                  </Badge>
                  <Badge variant="outline" className="bg-green-500 text-white">
                    ? Weeks Total
                  </Badge>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="mt-6 bg-gray-800 border-gray-700 text-white">
            <CardHeader>
              <CardTitle className="text-2xl font-bold">
                Course Highlights
              </CardTitle>
            </CardHeader>
            <CardContent className="lg:pb-8">
              <ul className="space-y-2">
                <li className="flex items-center gap-2">
                  <Users className="h-5 w-5 text-blue-400" />
                  <span>Expert-led instruction</span>
                </li>
                <li className="flex items-center gap-2">
                  <Code className="h-5 w-5 text-blue-400" />
                  <span>Hands-on coding projects</span>
                </li>
                <li className="flex items-center gap-2">
                  <Zap className="h-5 w-5 text-blue-400" />
                  <span>Real-world applications</span>
                </li>
              </ul>
            </CardContent>
          </Card>
        </div>

        <div className="lg:w-2/3">
          <Tabs
            defaultValue="1"
            className="w-full"
            onValueChange={(value) => handleWeekChange(parseInt(value))}
          >
            <TabsList
              ref={timelineRef}
              className="week grid grid-cols-5 gap-2 bg-gray-800 p-1 rounded-lg"
            >
              {syllabus.map((week) => (
                <TabsTrigger
                  key={week.week}
                  value={week.week.toString()}
                  className="data-[state=active]:bg-blue-600 transition-all"
                >
                  Week {week.week}
                </TabsTrigger>
              ))}
            </TabsList>
            {loading ? (
              <Card className="week-card bg-gradient-to-br from-gray-800 to-gray-900 border-gray-700 text-white">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-2xl font-bold flex items-center gap-2">
                    <Skeleton className="h-8 w-8 rounded-full bg-gray-700" />
                    <Skeleton className="h-8 w-32 rounded bg-gray-700" />
                  </CardTitle>
                  <Skeleton className="h-6 w-20 rounded-full bg-blue-600/50" />
                </CardHeader>
                <CardContent className="space-y-4">
                  <Skeleton className="h-4 w-3/4 bg-gray-700" />
                  <Skeleton className="h-4 w-1/2 bg-gray-700" />
                  <div>
                    <Skeleton className="h-6 w-40 bg-blue-300/30 mb-3" />
                    <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      {[...Array(4)].map((_, index) => (
                        <li
                          key={index}
                          className="flex items-center gap-2 bg-gray-700/50 rounded-lg p-3"
                        >
                          <Skeleton className="h-5 w-5 rounded-full bg-green-400/30 flex-shrink-0" />
                          <Skeleton className="h-4 w-full bg-gray-600" />
                        </li>
                      ))}
                    </ul>
                  </div>
                </CardContent>
                <CardContent>
                  <Skeleton className="h-10 w-40 rounded-lg bg-blue-600/50" />
                </CardContent>
              </Card>
            ) : (
              ""
            )}
            {syllabus
              .sort((a, b) => Number(a.week) - Number(b.week)) // Sort syllabus array by week in ascending order
              .map((week, index) => {
                const IconComponent = loadedIcons[week.icon] || null;
                return (
                  <TabsContent key={week.week} value={week.week.toString()}>
                    <Card
                      className={`week-card week-card-${week.week} bg-gradient-to-br from-gray-800 to-gray-900 border-gray-700 text-white`}
                    >
                      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-2xl font-bold flex items-center gap-2">
                          {IconComponent ? (
                            <IconComponent className="h-8 w-8 text-blue-400" />
                          ) : (
                            <span className="h-8 w-8 text-red-500">?</span> // Fallback if icon not found
                          )}
                          {week.title}
                        </CardTitle>
                        <Badge
                          variant="outline"
                          className="bg-blue-600 text-white"
                        >
                          Week {week.week}
                        </Badge>
                      </CardHeader>
                      <CardContent>
                        <p className="text-gray-300 mb-4 text-lg">
                          {week.description}
                        </p>
                        <h4 className="font-semibold text-xl mb-3 text-blue-300">
                          Topics Covered:
                        </h4>
                        <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
                          {week.topics.map((topic, topicIndex) => (
                            <li
                              key={topicIndex}
                              className="text-white flex items-center gap-2 bg-gray-700 rounded-lg p-3 transition-all hover:bg-gray-600"
                            >
                              <CheckCircle className="h-5 w-5 text-green-400 flex-shrink-0" />
                              <span>{topic}</span>
                            </li>
                          ))}
                        </ul>
                      </CardContent>
                      <CardContent>
                        {syllabus[index].guideLink ? (
                          <Link
                            href={`/guides/${syllabus[index].guideLink}`}
                            className="flex items-end w-40 bg-blue-600 hover:bg-blue-700 font-semibold text-white px-4 py-1 rounded-lg hover:drop-shadow-lg hover:shadow-white hover:-translate-y-1 transition-all group"
                          >
                            View Guide
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 24 24"
                              strokeWidth={1.5}
                              stroke="currentColor"
                              className="ml-2 w-6 h-6 group-hover:translate-x-2 transition-all"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="m12.75 15 3-3m0 0-3-3m3 3h-7.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                              />
                            </svg>
                          </Link>
                        ) : (
                          <button
                            disabled
                            className="cursor-not-allowed flex items-end w-36 bg-blue-600 hover:bg-blue-700 font-semibold text-white px-4 py-1 rounded-lg hover:drop-shadow-lg hover:shadow-white hover:-translate-y-1 transition-all group"
                          >
                            Coming soon
                          </button>
                        )}
                      </CardContent>
                    </Card>
                  </TabsContent>
                );
              })}
          </Tabs>
        </div>
      </div>
    </div>
  );
}
