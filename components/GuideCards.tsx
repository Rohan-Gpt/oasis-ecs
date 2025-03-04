"use client";
import React, { useEffect, useRef, useState, useCallback } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { GetAllGuides } from "@/actions/guides";
import * as LucideIcons from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

type Guide = {
  title: string;
  description: string;
  icon: string; // Store icon name as string
  difficulty: string;
  modules: string;
  duration: string;
  guideLink?: string;
  week?: string;
};

const GuideCards = ({ data }: { data: Guide[] }) => {
  // console.log("these are the guides");
  // console.log(guides);
  const sectionRef = useRef(null);
  const [guides, setGuides] = useState<Guide[]>([]);
  const [loadedIcons, setLoadedIcons] = useState<{ [key: string]: any }>({});

  useEffect(() => {
    const fetchGuides = async () => {
      try {
        const sortedGuides = data.sort(
          (a, b) => (b.guideLink ? 1 : 0) - (a.guideLink ? 1 : 0)
        );
        setGuides(sortedGuides as Guide[]);
      } catch (error) {
        console.error("Error fetching guides:", error);
      }
    };

    fetchGuides();
  }, [data]);
  // useEffect(() => {
  //   const fetchGuides = async () => {
  //     try {
  //       const response = await fetch("/api/guides");
  //       const data = await response.json();
  //       if (Array.isArray(data)) {
  //         setGuides(data);
  //       } else {
  //         console.error("API did not return an array", data);
  //       }
  //     } catch (error) {
  //       console.error("Error fetching guides:", error);
  //     }
  //   };

  //   fetchGuides();
  // }, []);
  // Fetch icons dynamically for all guides once when component mounts
  useEffect(() => {
    if (guides.length === 0) return;

    const newIcons: { [key: string]: any } = {};
    guides.forEach((guide) => {
      const IconComponent = LucideIcons[guide.icon as keyof typeof LucideIcons];
      if (IconComponent) {
        newIcons[guide.icon] = IconComponent;
      }
    });

    setLoadedIcons((prev) => ({ ...prev, ...newIcons }));
    console.log(guides);
  }, [guides]);

  useEffect(() => {
    const cards = gsap.utils.toArray<HTMLElement>(".guide-card");

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

    cards.forEach((card) => {
      gsap.to(card, {
        scale: 1.03,
        duration: 0.3,
        paused: true,
        ease: "power2.out",
      });
    });
  }, [guides]);

  const handleCardHover = useCallback((index: number, isEnter: boolean) => {
    gsap.to(`.guide-card:nth-child(${index + 1})`, {
      scale: isEnter ? 1.03 : 1,
      duration: 0.3,
      ease: "power2.out",
    });
  }, []);

  return (
    <div
      ref={sectionRef}
      className="container mx-auto px-4 py-16 bg-transparent"
    >
      <h2 className=" text-5xl font-bold text-center py-2 mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-600">
        All Learning Guides
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {guides.map((guide, index) => {
          const IconComponent = loadedIcons[guide.icon] || null;

          return (
            <Card
              key={index}
              className="guide-card bg-gradient-to-br from-gray-800 to-gray-900 border-gray-700 text-white flex flex-col"
              onMouseEnter={() => handleCardHover(index, true)}
              onMouseLeave={() => handleCardHover(index, false)}
            >
              <CardHeader>
                <div className="flex items-center justify-between">
                  {IconComponent ? (
                    <IconComponent className="h-8 w-8 text-blue-400" />
                  ) : (
                    <span className="h-8 w-8 text-red-500">?</span> // Fallback if icon not found
                  )}
                  <Badge variant="outline" className="bg-blue-500 text-white">
                    {guide.difficulty}
                  </Badge>
                </div>
                <CardTitle className="mt-4 text-xl">{guide.title}</CardTitle>
                <CardDescription className="text-gray-400">
                  {guide.description.length > 40
                    ? `${guide.description.slice(0, 40)}...`
                    : guide.description}
                </CardDescription>
              </CardHeader>

              <CardContent className="flex-grow">
                <div className="flex justify-between text-sm text-gray-400">
                  <span>{guide.modules} modules</span>
                  <span>{guide.duration}</span>
                </div>
              </CardContent>

              <CardFooter className="mt-auto pb-6">
                {guide.guideLink ? (
                  <Button
                    className="w-full bg-blue-600 hover:bg-blue-700"
                    asChild
                  >
                    <Link href={`/guides/${guide.guideLink}`}>
                      Start Learning
                    </Link>
                  </Button>
                ) : (
                  <Button
                    disabled
                    className="cursor-not-allowed w-full bg-blue-600 hover:bg-blue-700"
                  >
                    Coming soon
                  </Button>
                )}
              </CardFooter>
            </Card>
          );
        })}
      </div>
    </div>
  );
};

export default GuideCards;
