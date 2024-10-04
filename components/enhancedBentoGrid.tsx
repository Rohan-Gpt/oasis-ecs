"use client";
import React, { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Calendar,
  Code2,
  Users,
  Zap,
  MessageSquare,
  Trophy,
  Sparkles,
  Flame,
  GitBranch,
  Star,
} from "lucide-react";

export default function GSAPBentoGrid() {
  const [activeProjects, setActiveProjects] = useState(25);
  const gridRef = useRef(null);

  useEffect(() => {
    const cards = gsap.utils.toArray<HTMLElement>(".bento-card");

    cards.forEach((card) => {
      gsap.to(card, {
        scale: 1.02,
        duration: 0.3,
        paused: true,
        ease: "power2.out",
      });
    });
  }, []);

  const handleCardHover = (index: number, isEnter: boolean) => {
    gsap.to(`.bento-card:nth-child(${index + 1})`, {
      scale: isEnter ? 1.02 : 1,
      duration: 0.3,
      ease: "power2.out",
    });
  };

  return (
    <div className="container mx-auto p-6 bg-transparent text-white min-h-screen mt-36 lg:mt-0">
      <div className="flex justify-center z-10 rounded-xl py-2 px-4 pb-3">
        <div className="mt-4 md:mt-0 text-2xl text-center text-white font-semibold md:text-4xl max-w-3xl font-heading">
          Guru Nanak Institute of Technology
        </div>
      </div>
      <span className="flex justify-center text-base text-white">
        powered by
      </span>
      <h1 className="text-4xl md:text-5xl font-bold text-center mb-6 md:mb-10 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-600">
        Department of ECS
      </h1>

      <div
        ref={gridRef}
        className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6"
      >
        {/* Live Collaboration Hub */}
        <Card
          className="bento-card md:col-span-2 lg:col-span-2 bg-gradient-to-br from-blue-600 to-purple-700"
          onMouseEnter={() => handleCardHover(0, true)}
          onMouseLeave={() => handleCardHover(0, false)}
        >
          <CardHeader>
            <CardTitle className="text-2xl flex items-center gap-2">
              <Flame className="h-6 w-6" />
              Live Collaboration Hub
            </CardTitle>
            <CardDescription className="text-blue-200">
              Join active coding sessions now!
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="popular" className="w-full">
              <TabsList className="grid w-full grid-cols-2 bg-blue-900/50">
                <TabsTrigger value="popular">Popular</TabsTrigger>
                <TabsTrigger value="recent">Recent</TabsTrigger>
              </TabsList>
              <TabsContent value="popular" className="mt-4">
                <ul className="space-y-2">
                  <li className="flex justify-between items-center">
                    <span>React Performance Optimization</span>
                    <Badge variant="secondary" className="bg-blue-500">
                      23 devs
                    </Badge>
                  </li>
                  <li className="flex justify-between items-center">
                    <span>GraphQL API Design</span>
                    <Badge variant="secondary" className="bg-blue-500">
                      17 devs
                    </Badge>
                  </li>
                  <li className="flex justify-between items-center">
                    <span>Kubernetes Deployment Strategies</span>
                    <Badge variant="secondary" className="bg-blue-500">
                      14 devs
                    </Badge>
                  </li>
                </ul>
              </TabsContent>
              <TabsContent value="recent" className="mt-4">
                <ul className="space-y-2">
                  <li className="flex justify-between items-center">
                    <span>Rust for Web Development</span>
                    <Badge variant="secondary" className="bg-purple-500">
                      New
                    </Badge>
                  </li>
                  <li className="flex justify-between items-center">
                    <span>AI in Code Review</span>
                    <Badge variant="secondary" className="bg-purple-500">
                      New
                    </Badge>
                  </li>
                  <li className="flex justify-between items-center">
                    <span>WebAssembly Deep Dive</span>
                    <Badge variant="secondary" className="bg-purple-500">
                      New
                    </Badge>
                  </li>
                </ul>
              </TabsContent>
            </Tabs>
            <Button className="w-full mt-4 bg-blue-500 hover:bg-blue-600">
              coming soon
            </Button>
          </CardContent>
        </Card>
        {/* Community Pulse */}
        <Card
          className="bento-card bg-gradient-to-br from-green-500 to-emerald-700"
          onMouseEnter={() => handleCardHover(1, true)}
          onMouseLeave={() => handleCardHover(1, false)}
        >
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Zap className="h-6 w-6" />
              Community Pulse
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between mb-1">
                  <span>Active Projects</span>
                  <span>{activeProjects}/100</span>
                </div>
                <Progress value={activeProjects} max={100} className="h-2" />
              </div>
              <div>
                <div className="flex justify-between mb-1">
                  <span>Code Reviews</span>
                  <span>24/7</span>
                </div>
                <Progress value={40} max={7} className="h-2" />
              </div>
              <div>
                <div className="flex justify-between mb-1">
                  <span>Community Help</span>
                  <span>98%</span>
                </div>
                <Progress value={98} max={100} className="h-2" />
              </div>
            </div>
          </CardContent>
        </Card>
        {/* Community Spotlight */}
        <Card
          className="bento-card md:col-span-2 lg:col-span-1 bg-gradient-to-br from-yellow-500 to-orange-600"
          onMouseEnter={() => handleCardHover(2, true)}
          onMouseLeave={() => handleCardHover(2, false)}
        >
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Sparkles className="h-6 w-6" />
              Community Spotlight
            </CardTitle>
          </CardHeader>
          <CardContent className=" gap-4">
            <Avatar className="flex justify-center mx-auto h-24 w-24 border-2 border-white">
              <AvatarImage
                src="/placeholder.svg?height=96&width=96"
                alt="@devguru"
              />
              <AvatarFallback>DG</AvatarFallback>
            </Avatar>
            <div>
              <h3 className="text-xl font-semibold mb-2">DevGuru</h3>
              <p className="mb-4">
                Full-stack wizard and open-source advocate with 50+ popular
                libraries
              </p>
              <div className="flex gap-2">
                <Badge variant="secondary" className="bg-yellow-500">
                  React Expert
                </Badge>
                <Badge variant="secondary" className="bg-yellow-500">
                  GraphQL Guru
                </Badge>
                <Badge variant="secondary" className="bg-yellow-500">
                  Cloud Native
                </Badge>
              </div>
            </div>
          </CardContent>
        </Card>
        {/* Trending Repositories */}
        <Card
          className="bento-card md:col-span-2 lg:col-span-2 bg-gradient-to-br from-pink-500 to-rose-700"
          onMouseEnter={() => handleCardHover(3, true)}
          onMouseLeave={() => handleCardHover(3, false)}
        >
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <GitBranch className="h-6 w-6" />
              Trending Repositories
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-4">
              {[
                {
                  name: "AI-powered-IDE",
                  stars: 2345,
                  description: "Next-gen IDE with AI assistance",
                },
                {
                  name: "quantum-js",
                  stars: 1876,
                  description: "Quantum computing simulator in JavaScript",
                },
                {
                  name: "eco-code",
                  stars: 1543,
                  description: "Sustainable coding practices and tools",
                },
              ].map((repo, index) => (
                <li key={index} className="flex items-center justify-between">
                  <div>
                    <h4 className="font-semibold">{repo.name}</h4>
                    <p className="text-sm text-rose-200">{repo.description}</p>
                  </div>
                  <div className="flex items-center gap-1">
                    <Star className="h-4 w-4 fill-current text-yellow-400" />
                    <span>{repo.stars}</span>
                  </div>
                </li>
              ))}
            </ul>
            <Button
              variant="outline"
              className="w-full mt-4 text-rose-100 bg-rose-600 hover:bg-rose-700"
            >
              coming soon
            </Button>
          </CardContent>
        </Card>
        {/* Tech Talk of the Day */}
        <Card
          className="bento-card bg-gradient-to-br from-violet-600 to-purple-700"
          onMouseEnter={() => handleCardHover(4, true)}
          onMouseLeave={() => handleCardHover(4, false)}
        >
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <MessageSquare className="h-6 w-6" />
              Tech Talk of the Day
            </CardTitle>
          </CardHeader>
          <CardContent>
            <h3 className="text-xl font-semibold mb-2">
              &quot;The Future of Web3 Development&quot;
            </h3>
            <p className="mb-4">
              Join us for an insightful discussion on the evolving landscape of
              decentralized applications.
            </p>
            <div className="flex justify-between items-center mb-4">
              <Badge variant="secondary" className="bg-violet-700">
                Live in 2 hours
              </Badge>
              <span>500+ RSVPs</span>
            </div>
            <Button className="w-full bg-violet-700 hover:bg-violet-800">
              coming soon
            </Button>
          </CardContent>
        </Card>
        {/* bento-card md:col-span-2 lg:col-span-1 bg-gradient-to-br from-yellow-500
        to-orange-600 */}
        {/* Code Challenge Arena */}
        <Card
          className="bento-card md:col-span-1 lg:col-span-1 bg-gradient-to-br from-teal-500 to-green-700"
          onMouseEnter={() => handleCardHover(5, true)}
          onMouseLeave={() => handleCardHover(5, false)}
        >
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Trophy className="h-6 w-6" />
              Code Challenge Arena
            </CardTitle>
          </CardHeader>
          <CardContent>
            <h3 className="text-xl font-semibold mb-2">
              Daily Challenge: Algorithmic Artistry
            </h3>
            <p className="mb-4">
              Create a function that generates a unique pattern based on input
              parameters.
            </p>
            <div className="flex justify-between items-center">
              <Badge variant="secondary" className="bg-green-500 lg:text-xs">
                Difficulty:Medium
              </Badge>
              <span className="ml-2">237 submissions</span>
            </div>
            <Button className="w-full mt-4 bg-green-500 hover:bg-green-600">
              coming soon
            </Button>
          </CardContent>
        </Card>
        {/* Quick Access */}
        {/* <Card
          className="bento-card md:col-span-2 lg:col-span-2 bg-gradient-to-br from-indigo-600 to-blue-700"
          onMouseEnter={() => handleCardHover(6, true)}
          onMouseLeave={() => handleCardHover(6, false)}
        >
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Zap className="h-6 w-6" />
              Quick Access
            </CardTitle>
          </CardHeader>
          <CardContent className="grid grid-cols-2 gap-4">
            <Button
              variant="secondary"
              className="bg-indigo-700 hover:bg-indigo-800 h-20 flex flex-col"
            >
              <Code2 className="h-6 w-6 mb-2" />
              Code Playground
            </Button>
            <Button
              variant="secondary"
              className="bg-indigo-700 hover:bg-indigo-800 h-20 flex flex-col"
            >
              <Users className="h-6 w-6 mb-2" />
              Find a Mentor
            </Button>
            <Button
              variant="secondary"
              className="bg-indigo-700 hover:bg-indigo-800 h-20 flex flex-col"
            >
              <Calendar className="h-6 w-6 mb-2" />
              Events Calendar
            </Button>
            <Button
              variant="secondary"
              className="bg-indigo-700 hover:bg-indigo-800 h-20 flex flex-col"
            >
              <MessageSquare className="h-6 w-6 mb-2" />
              Discussion Forums
            </Button>
          </CardContent>
        </Card> */}
      </div>
    </div>
  );
}
