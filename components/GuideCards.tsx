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
import dynamic from "next/dynamic";
import { GetAllGuides } from "@/actions/guides";

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

const GuideCards = () => {
  // console.log("these are the guides");
  // console.log(guides);
  const sectionRef = useRef(null);
  const [guides, setGuides] = useState<Guide[]>([]);
  const [loadedIcons, setLoadedIcons] = useState<{ [key: string]: any }>({});

  useEffect(() => {
    const fetchGuides = async () => {
      try {
        // const response = await fetch("/api/guides", { cache: "force-cache" });
        const data = await GetAllGuides();
        if (Array.isArray(data)) {
          setGuides(data as Guide[]);
        } else {
          console.error("API did not return an array", data);
        }
      } catch (error) {
        console.error("Error fetching guides:", error);
      }
    };

    fetchGuides();
  }, []);
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
    const fetchIcons = async () => {
      const iconPromises = guides.map(async (guide) => {
        if (!guide.icon) return null;
        const iconName = guide.icon; // Use guide.icon as iconName
        if (loadedIcons[iconName]) return loadedIcons[iconName]; // Return cached icon if already loaded

        try {
          const ImportedIcon = await dynamic<React.ComponentType<any>>(() =>
            import("lucide-react").then(
              (mod) =>
                mod[iconName as keyof typeof mod] as React.ComponentType<any>
            )
          );
          setLoadedIcons((prev) => ({ ...prev, [iconName]: ImportedIcon }));
          return ImportedIcon;
        } catch (error) {
          // console.error(`Icon "${iconName}" not found`);
          return null;
        }
      });

      await Promise.all(iconPromises);
    };

    if (guides.length > 0) {
      fetchIcons();
    }
  }, [guides, loadedIcons]);

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
              className="guide-card bg-gradient-to-br from-gray-800 to-gray-900 border-gray-700 text-white"
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
                <CardTitle className="mt-4">{guide.title}</CardTitle>
                <CardDescription className="text-gray-400">
                  {guide.description}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex justify-between text-sm text-gray-400">
                  <span>{guide.modules} modules</span>
                  <span>{guide.duration}</span>
                </div>
              </CardContent>
              <CardFooter>
                {guides[index].guideLink ? (
                  <Button
                    className="w-full bg-blue-600 hover:bg-blue-700"
                    asChild
                  >
                    <Link href={`/guides/${guides[index].guideLink}`}>
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
