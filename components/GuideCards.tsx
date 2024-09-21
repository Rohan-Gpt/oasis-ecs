"use client";
import React, {
  useEffect,
  useRef,
  useState,
  useCallback,
  useMemo,
} from "react";
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
import {
  Book,
  Code,
  Database,
  Globe,
  Lock,
  LucideIcon,
  Server,
  Smartphone,
  Zap,
} from "lucide-react";
import Link from "next/link";

gsap.registerPlugin(ScrollTrigger);

type Guide = {
  title: string;
  description: string;
  icon: LucideIcon | string;
  difficulty: string;
  modules: number;
  duration: string;
  guideLink?: string;
  week?: number;
};

const iconMap: { [key: string]: LucideIcon } = {
  Book,
  Code,
  Database,
  Globe,
  Lock,
  Server,
  Smartphone,
  Zap,
};

const GuideCards = () => {
  const sectionRef = useRef(null);
  const [guides, setGuides] = useState<Guide[]>([]);

  const fetchGuides = useCallback(async () => {
    try {
      const response = await fetch("/api/guides");
      const data = await response.json();
      console.log(data);
      if (Array.isArray(data)) {
        const guidesWithIcons = data.map((guide: Guide) => ({
          ...guide,
          icon: iconMap[guide.icon as keyof typeof iconMap],
        }));
        const newGuides = guidesWithIcons.filter((guide) => guide.week == null);
        setGuides(newGuides);
      } else {
        console.error("API did not return an array", data);
      }
    } catch (error) {
      console.error("Error fetching guides:", error);
    } finally {
    }
  }, []);

  useEffect(() => {
    fetchGuides();
  }, [fetchGuides]);

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
        {guides.map((guide, index) => (
          <Card
            key={index}
            className="guide-card bg-gradient-to-br from-gray-800 to-gray-900 border-gray-700 text-white"
            onMouseEnter={() => handleCardHover(index, true)}
            onMouseLeave={() => handleCardHover(index, false)}
          >
            <CardHeader>
              <div className="flex items-center justify-between">
                <guide.icon className="h-8 w-8 text-blue-400" />
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
        ))}
      </div>
    </div>
  );
};

export default GuideCards;
