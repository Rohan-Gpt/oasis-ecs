import { NextResponse } from "next/server";

export function GET() {
  return NextResponse.json({
    user: {
      name: "Yakova Hisda",
      avatar: "https://example.com/avatar.jpg",
      projectsDone: 120,
    },
    date: "4 Sep, 2023",
    totalTimeWorked: "800 hr 25 min",
    workedTime: "16 hr 30 min",
    workTimePercentage: 80,
    absenceTime: "12 hr 30 min",
    absenceTimePercentage: 45.7,
    contributions: [
      { color: "bg-green-100" },
      { color: "bg-green-200" },
      { color: "bg-green-300" },
      { color: "bg-green-400" },
      { color: "bg-green-500" },
      { color: "bg-green-600" },
      { color: "bg-green-700" },
    ],
    summary: [
      { title: "Sketch", percentage: 80 },
      { title: "Wireframe", percentage: 37 },
      { title: "Hi-fi", percentage: 62 },
    ],
    components: ["2.5 hr 12 min", "3 hr 23 min", "8.9 hr 39 min"],
  });
}
