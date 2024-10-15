"use client";

import { useState, useEffect, useCallback, useTransition } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { motion, AnimatePresence } from "framer-motion";
import CreateTeamDialog from "@/components/projects/createTeam";
import dynamic from "next/dynamic";
import { AlertCircle, CheckCircle2, Code2, Search } from "lucide-react";
import { GetAllProjects } from "@/actions/project";

interface Team {
  name: string;
}

interface Project {
  id: number;
  title: string;
  description: string;
  chosen: boolean;
  team?: Team;
  technologies: string[];
  icon: string;
}

export default function ProjectsComponent() {
  const [projects, setProjects] = useState<Project[]>([]);
  // const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  // const [teamName, setTeamName] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [filter, setFilter] = useState<"all" | "available" | "chosen">("all");
  const [showConfetti, setShowConfetti] = useState(false);
  const [loadedIcons, setLoadedIcons] = useState<{ [key: string]: any }>({});
  // const [isPending, startTransition] = useTransition();

  // const fetchProjects = useCallback(async () => {
  //   const response = await fetch("/api/projects");
  //   const data = await response.json();
  //   setProjects(data);
  //   console.log(data);
  // }, []);

  // useEffect(() => {
  //   fetchProjects();
  // }, [fetchProjects]);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const data = await GetAllProjects();
        if (Array.isArray(data)) {
          setProjects(data as Project[]);
        } else {
          console.error("API did not return an array", data);
        }
      } catch (error) {
        console.error("error fetching projects", error);
      }
    };
    fetchProjects();
  }, []);

  useEffect(() => {
    if (showConfetti) {
      const timer = setTimeout(() => setShowConfetti(false), 3000);
      return () => clearTimeout(timer);
    }
  }, [showConfetti]);

  const filteredProjects = projects.filter((project) => {
    const matchesSearch =
      project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      project.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      project.technologies.some((tech) =>
        tech.toLowerCase().includes(searchTerm.toLowerCase())
      );
    const matchesFilter =
      filter === "all" ||
      (filter === "available" && !project.chosen) ||
      (filter === "chosen" && project.chosen);
    return matchesSearch && matchesFilter;
  });

  useEffect(() => {
    const fetchIcons = async () => {
      const iconPromises = projects.map(async (project) => {
        if (!project.icon) return null;
        const iconName = project.icon;
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

    if (projects.length > 0) {
      fetchIcons();
    }
  }, [projects, loadedIcons]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-black text-gray-100">
      <div className="container mx-auto p-4">
        <header className="text-center mb-12 pt-8">
          <h1 className="text-6xl font-bold mb-4 py-2 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 animate-gradient-x">
            The Project Archive
          </h1>
          <p className="text-xl text-gray-400">
            Embark on your next coding odyssey
          </p>
        </header>

        <div className="mb-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="relative w-full md:w-64">
              <Input
                type="text"
                placeholder="Search projects..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 bg-gray-800/50 text-gray-100 border-gray-700 focus:border-purple-500 focus:ring-purple-500 rounded-full"
              />
              <Search
                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                size={18}
              />
            </div>
            <Tabs
              defaultValue="all"
              className="w-full md:w-auto"
              onValueChange={(value) =>
                setFilter(value as "all" | "available" | "chosen")
              }
            >
              <TabsList className="grid w-full grid-cols-3 bg-gray-800/50 rounded-full p-1">
                <TabsTrigger
                  value="all"
                  className="rounded-full data-[state=active]:bg-purple-600"
                >
                  All
                </TabsTrigger>
                <TabsTrigger
                  value="available"
                  className="rounded-full data-[state=active]:bg-purple-600"
                >
                  Available
                </TabsTrigger>
                <TabsTrigger
                  value="chosen"
                  className="rounded-full data-[state=active]:bg-purple-600"
                >
                  Chosen
                </TabsTrigger>
              </TabsList>
            </Tabs>
          </div>
        </div>

        <AnimatePresence>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProjects.map((project) => {
              const IconComponent = loadedIcons[project.icon] || null;
              return (
                <motion.div
                  key={project.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                >
                  <Card
                    className={`h-full flex flex-col overflow-hidden bg-gray-800/50 backdrop-blur-sm border-gray-700 hover:border-purple-500 transition-all duration-300 ${
                      project.chosen ? "border-purple-500" : ""
                    }`}
                  >
                    <CardHeader className="relative p-6 pb-4">
                      <div className="flex items-center justify-between mb-4">
                        {IconComponent ? (
                          <IconComponent className="h-8 w-8 text-blue-400" />
                        ) : (
                          <span className="h-8 w-8 text-red-500">?</span> // Fallback if icon not found
                        )}
                        {project.chosen ? (
                          <CheckCircle2 className="text-green-400 w-6 h-6" />
                        ) : (
                          <AlertCircle className="text-amber-400 w-6 h-6" />
                        )}
                      </div>
                      <CardTitle className="text-2xl font-bold text-gray-100 mb-2">
                        {project.title}
                      </CardTitle>
                      <CardDescription className="text-gray-400 line-clamp-2">
                        {project.description}
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="flex-grow pt-2">
                      {/* <div className="flex flex-wrap gap-2 mb-4">
                      <Badge
                        variant="secondary"
                        className={`${getDifficultyColor(
                          project.difficulty
                        )} font-semibold`}
                      >
                        <Zap className="w-3 h-3 mr-1" />
                        {project.difficulty}
                      </Badge> */}
                      {/* <Badge
                        variant="secondary"
                        className="bg-blue-600 text-blue-50 font-semibold"
                      >
                        <Users className="w-3 h-3 mr-1" />
                        {project.teamSize} members
                      </Badge> */}
                      {/* <Badge
                        variant="secondary"
                        className="bg-purple-600 text-purple-50 font-semibold"
                      >
                        <Clock className="w-3 h-3 mr-1" />
                        {project.duration} weeks
                      </Badge> */}
                      {/* </div> */}
                      <div className="flex flex-wrap gap-2 mb-4">
                        {project.technologies.map((tech, index) => (
                          <TooltipProvider key={index}>
                            <Tooltip>
                              <TooltipTrigger asChild>
                                <Badge
                                  variant="outline"
                                  className="text-gray-300 border-gray-600"
                                >
                                  <Code2 className="w-3 h-3 mr-1" />
                                  {tech}
                                </Badge>
                              </TooltipTrigger>
                              <TooltipContent>
                                <p>Technology: {tech}</p>
                              </TooltipContent>
                            </Tooltip>
                          </TooltipProvider>
                        ))}
                      </div>
                      {project.chosen && (
                        <div>
                          <div className="flex justify-between items-center mb-2">
                            <span className="text-sm text-purple-300">
                              Team: {project.team?.name}
                            </span>
                          </div>
                        </div>
                      )}
                    </CardContent>
                    <CardFooter>
                      <CreateTeamDialog
                        label={
                          project.chosen ? "Project Claimed" : "Choose Project"
                        }
                        projectId={project.id}
                        projectTitle={project.title}
                        onTeamCreated={(teamName, members) => {
                          setProjects(
                            projects.map((p) =>
                              p.id === project.id
                                ? {
                                    ...p,
                                    chosen: true,
                                    team: { name: teamName },
                                  }
                                : p
                            )
                          );
                          setShowConfetti(true);
                          console.log("Team created:", {
                            projectId: project.id,
                            teamName,
                            members,
                          });
                        }}
                      />
                    </CardFooter>
                  </Card>
                </motion.div>
              );
            })}
          </div>
        </AnimatePresence>
      </div>
      {showConfetti && (
        <div className="fixed inset-0 pointer-events-none">
          <div className="absolute inset-0 overflow-hidden">
            <div className="animate-confetti-1 absolute -top-10 left-1/4 w-4 h-4 bg-yellow-500 rounded-full"></div>
            <div className="animate-confetti-2 absolute -top-10 left-1/2 w-4 h-4 bg-blue-500 rounded-full"></div>
            <div className="animate-confetti-3 absolute -top-10 left-3/4 w-4 h-4 bg-pink-500 rounded-full"></div>
            <div className="animate-confetti-4 absolute -top-10 right-1/4 w-4 h-4 bg-green-500 rounded-full"></div>
          </div>
        </div>
      )}
    </div>
  );
}
