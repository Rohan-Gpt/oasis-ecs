const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();
const guides = [
  {
    title: "Web Development Fundamentals",
    description: "Master HTML, CSS, and JavaScript",
    icon: "Globe",
    difficulty: "Beginner",
    modules: "12",
    duration: "6 weeks",
    guideLink: "ac4bc674c80c46c5b54a0bf3ca56a630",
  },
  {
    title: "React Deep Dive",
    description: "Advanced concepts and best practices",
    icon: "Code",
    difficulty: "Intermediate",
    modules: "8",
    duration: "4 weeks",
  },
  {
    title: "Backend with Node.js",
    description: "Build scalable server-side applications",
    icon: "Server",
    difficulty: "Intermediate",
    modules: "10",
    duration: "5 weeks",
  },
  {
    title: "Database Design",
    description: "SQL and NoSQL database architectures",
    icon: "Database",
    difficulty: "Intermediate",
    modules: "6",
    duration: "3 weeks",
  },
  {
    title: "Mobile App Development",
    description: "Create cross-platform apps with React Native",
    icon: "Smartphone",
    difficulty: "Advanced",
    modules: "14",
    duration: "7 weeks",
  },
  {
    title: "DevOps and CI/CD",
    description: "Streamline your development workflow",
    icon: "Zap",
    difficulty: "Advanced",
    modules: "8",
    duration: "4 weeks",
  },
  {
    title: "Cybersecurity Essentials",
    description: "Protect your applications from threats",
    icon: "Lock",
    difficulty: "Intermediate",
    modules: "10",
    duration: "5 weeks",
  },
  {
    title: "Machine Learning Basics",
    description: "Introduction to AI and data science",
    icon: "Book",
    difficulty: "Intermediate",
    modules: "12",
    duration: "6 weeks",
  },
];
async function main() {
  for (const guide of guides) {
    await prisma.guides.create({
      data: guide,
    });
  }
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
