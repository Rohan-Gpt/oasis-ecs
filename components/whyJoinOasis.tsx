'use client'

import { useState, useRef } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { CircleArrowRight, Code, Rocket, Trophy, Users, Zap, BriefcaseBusiness } from 'lucide-react'
import Link from 'next/link'

export default function WhyComponent() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)
  const sectionRef = useRef(null)

  const features = [
    {
      icon: <Code className="w-8 h-8" />,
      title: 'Project-Based Learning',
      description: 'Dive into real-world projects and learn by doing. Build a portfolio that showcases your skills to potential employers.',
    },
    {
      icon: <Rocket className="w-8 h-8" />,
      title: 'Product Development',
      description: 'Transform your ideas into viable products. Learn the entire process from ideation to launch and beyond.',
    },
    {
      icon: <Trophy className="w-8 h-8" />,
      title: 'Hackathon Mastery',
      description: 'Prepare for and participate in hackathons. Develop rapid prototyping skills and learn to work effectively under pressure.',
    },
    {
      icon: <Users className="w-8 h-8" />,
      title: 'Collaborative Community',
      description: 'Join forces with like-minded developers. Tackle complex projects as a team and expand your professional network.',
    },
    {
      icon: <Zap className="w-8 h-8" />,
      title: 'Skill Acceleration',
      description: 'Rapidly improve your coding skills through hands-on experience. Stay updated with the latest technologies and best practices.',
    },
    {
      icon: <BriefcaseBusiness className="w-8 h-8" />,
      title: 'Portfolio Building',
      description: 'Build a portfolio that StandsOut by working on real-world projects. Showcase your skills and stay relevant with industry trends.',
    },
  ]

  return (
    <section ref={sectionRef} className=" bg-black">
      <div className="container mx-auto px-4 py-16 lg:pb-20">
        <h2 className="text-4xl md:text-5xl font-bold text-center mb-6 md:mb-10 bg-clip-text text-transparent bg-gradient-to-r from-red-400 to-yellow-400">Why join OASIS?</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {features.map((feature, index) => (
            <Card 
              key={index}
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
              className={`border-2 border-primary/10 bg-white transition-all duration-300 ${
                hoveredIndex === index
                  ? 'scale-110 z-10 shadow-lg shadow-white/30' // The hovered card enlarges
                  : hoveredIndex !== null
                  ? 'scale-90 opacity-50' // The others shrink and fade
                  : 'scale-100 opacity-100' // Normal state when none are hovered
              }`}
            >
              <CardHeader>
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary mb-4">
                  {feature.icon}
                </div>
                <CardTitle>{feature.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">{feature.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
        <div className="text-center">
          <Link href={"/auth/register"}>
          <Button variant={"default"} size="lg" className="group bg-gradient-to-r from-red-400 to-yellow-400 hover:-translate-y-2 transition-all">
            Join OASIS and Start Building
            <CircleArrowRight className="ml-2 group-hover:translate-x-2 transition-transform duration-300" />
          </Button>
          </Link>
        </div>
      </div>
    </section>
  )
}
