const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();
// const guides = [
//   {
//     title: "Web Development Fundamentals",
//     description: "Master HTML, CSS, and JavaScript",
//     icon: "Globe",
//     difficulty: "Beginner",
//     modules: "12",
//     duration: "6 weeks",
//     guideLink: "ac4bc674c80c46c5b54a0bf3ca56a630",
//   },
//   {
//     title: "React Deep Dive",
//     description: "Advanced concepts and best practices",
//     icon: "Code",
//     difficulty: "Intermediate",
//     modules: "8",
//     duration: "4 weeks",
//   },
//   {
//     title: "Backend with Node.js",
//     description: "Build scalable server-side applications",
//     icon: "Server",
//     difficulty: "Intermediate",
//     modules: "10",
//     duration: "5 weeks",
//   },
//   {
//     title: "Database Design",
//     description: "SQL and NoSQL database architectures",
//     icon: "Database",
//     difficulty: "Intermediate",
//     modules: "6",
//     duration: "3 weeks",
//   },
//   {
//     title: "Mobile App Development",
//     description: "Create cross-platform apps with React Native",
//     icon: "Smartphone",
//     difficulty: "Advanced",
//     modules: "14",
//     duration: "7 weeks",
//   },
//   {
//     title: "DevOps and CI/CD",
//     description: "Streamline your development workflow",
//     icon: "Zap",
//     difficulty: "Advanced",
//     modules: "8",
//     duration: "4 weeks",
//   },
//   {
//     title: "Cybersecurity Essentials",
//     description: "Protect your applications from threats",
//     icon: "Lock",
//     difficulty: "Intermediate",
//     modules: "10",
//     duration: "5 weeks",
//   },
//   {
//     title: "Machine Learning Basics",
//     description: "Introduction to AI and data science",
//     icon: "Book",
//     difficulty: "Intermediate",
//     modules: "12",
//     duration: "6 weeks",
//   },
// ];

// const syllabus = [
//   {
//     week: "1",
//     title: "Introduction to Web Development",
//     description: "Fundamentals of HTML, CSS, and JavaScript",
//     icon: "Globe",
//     topics: [
//       "HTML5 structure and semantics",
//       "CSS3 styling and layouts",
//       "JavaScript basics",
//       "Setting up a development environment",
//     ],
//     guideLink: "ac4bc674c80c46c5b54a0bf3ca56a630",
//     difficulty: "beginner",
//   },
//   {
//     week: "2",
//     title: "Advanced JavaScript and ES6+",
//     description: "Modern JavaScript features and best practices",
//     icon: "Code",
//     topics: [
//       "ES6+ features (let/const, arrow functions, destructuring)",
//       "Promises and async/await",
//       "Modules and import/export",
//       "Functional programming concepts",
//     ],
//     difficulty: "beginner",
//   },
//   {
//     week: "3",
//     title: "React Fundamentals",
//     description: "Building user interfaces with React",
//     icon: "Layout",
//     topics: [
//       "React components and JSX",
//       "State and props",
//       "Hooks (useState, useEffect)",
//       "Handling events and forms in React",
//     ],
//     difficulty: "beginner",
//   },
//   {
//     week: "4",
//     title: "State Management and Routing",
//     description: "Advanced React patterns and navigation",
//     icon: "Zap",
//     topics: [
//       "Context API and useReducer",
//       "Introduction to Redux",
//       "React Router for single-page applications",
//       "Code splitting and lazy loading",
//     ],
//     difficulty: "beginner",
//   },
//   {
//     week: "5",
//     title: "Backend Development with Node.js",
//     description: "Server-side JavaScript and API development",
//     icon: "Server",
//     topics: [
//       "Node.js basics and npm",
//       "Express.js framework",
//       "RESTful API design",
//       "Middleware and error handling",
//     ],
//     difficulty: "beginner",
//   },
//   {
//     week: "6",
//     title: "Database Integration",
//     description: "Working with databases in web applications",
//     icon: "Database",
//     topics: [
//       "Introduction to SQL and NoSQL databases",
//       "MongoDB and Mongoose ODM",
//       "CRUD operations",
//       "Data modeling and relationships",
//     ],
//     difficulty: "beginner",
//   },
//   {
//     week: "7",
//     title: "Authentication and Security",
//     description: "Implementing user authentication and security best practices",
//     icon: "CheckCircle",
//     topics: [
//       "JWT-based authentication",
//       "Password hashing and salting",
//       "OAuth 2.0 and social login",
//       "CORS and CSRF protection",
//     ],
//     difficulty: "beginner",
//   },
//   {
//     week: "8",
//     title: "Deployment and DevOps",
//     description: "Launching and maintaining web applications",
//     icon: "Globe",
//     topics: [
//       "Cloud platforms (Heroku, AWS, or Vercel)",
//       "Continuous Integration and Deployment (CI/CD)",
//       "Docker basics",
//       "Monitoring and logging",
//     ],
//     difficulty: "beginner",
//   },
//   {
//     week: "9",
//     title: "Mobile App Development",
//     description: "Building cross-platform mobile apps with React Native",
//     icon: "Smartphone",
//     topics: [
//       "React Native basics",
//       "Native components and APIs",
//       "Navigation in React Native",
//       "Publishing to app stores",
//     ],
//     difficulty: "beginner",
//   },
//   {
//     week: "10",
//     title: "Advanced Topics and Project Work",
//     description:
//       "Exploring cutting-edge technologies and building a capstone project",
//     icon: "BookOpen",
//     topics: [
//       "GraphQL and Apollo Client",
//       "Server-Side Rendering with Next.js",
//       "Web3 and blockchain basics",
//       "Capstone project development and presentation",
//     ],
//     difficulty: "beginner",
//   },
// ];

const projects = [
  {
    title: "AI Chatbot",
    description: "Build a conversational AI using natural language processing.",
    chosen: false,
    technologies: ["Python", "NLP", "Machine Learning"],
    icon: "Bot",
  },
  {
    title: "Blockchain Voting",
    description: "Develop a secure voting system using blockchain technology.",
    chosen: false,
    technologies: ["Solidity", "Ethereum", "Web3.js"],
    icon: "Vote",
  },
  {
    title: "AR Education App",
    description: "Create an AR app for interactive learning experiences.",
    chosen: false,
    technologies: ["Unity", "ARKit", "C#"],
    icon: "Glasses",
  },
  {
    title: "IoT Smart Home",
    description: "Design an IoT platform for managing smart home devices.",
    chosen: false,
    technologies: ["Node.js", "MQTT", "React"],
    icon: "Home",
  },
  {
    title: "Social Dashboard",
    description: "Build a dashboard to manage multiple social media accounts.",
    chosen: false,
    technologies: ["React", "GraphQL", "Node.js"],
    icon: "BarChart2",
  },
  {
    title: "AI Recommender",
    description: "Develop an AI-powered product recommendation system.",
    chosen: false,
    technologies: ["Python", "TensorFlow", "SQL"],
    icon: "ShoppingCart",
  },
];

async function main() {
  for (const guide of projects) {
    await prisma.project.create({
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
