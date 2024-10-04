import React from "react";

type CircularProgressProps = {
  percentage: number;
  color?: string;
};

const CircularProgress: React.FC<CircularProgressProps> = ({
  percentage,
  color,
}) => (
  <div className="w-12 h-12 relative">
    <svg className="w-full h-full" viewBox="0 0 32 32">
      <circle
        className="text-gray-200"
        strokeWidth="2"
        stroke="currentColor"
        fill="transparent"
        r="14"
        cx="16"
        cy="16"
      />
      <circle
        className="text-[color]"
        strokeWidth="2"
        strokeDasharray={`${percentage * 0.88}, 100`}
        strokeLinecap="round"
        stroke="currentColor"
        fill="transparent"
        r="14"
        cx="16"
        cy="16"
        style={{ transform: "rotate(-90deg)", transformOrigin: "50% 50%" }}
      />
    </svg>
  </div>
);

const ProgressBar: React.FC<CircularProgressProps> = ({ percentage }) => (
  <div className="w-full bg-gray-200 rounded-full h-1.5">
    <div
      className="bg-gray-700 h-1.5 rounded-full"
      style={{ width: `${percentage}%` }}
    ></div>
  </div>
);

export default function DesignTaskBreakdown() {
  const tasks = [
    {
      name: "Web Dev",
      percentage: 0,
      time: "0 hr",
      color: "blue-500",
    },
    {
      name: "Dev Ops",
      percentage: 0,
      time: "0 hr",
      color: "green-500",
    },
    {
      name: "Projects",
      percentage: 0,
      time: "0 hr",
      color: "orange-500",
    },
    {
      name: "Extra",
      percentage: 0,
      time: "0 hr",
      color: "blue-500",
    },
  ];

  return (
    <div className="bg-white rounded-lg shadow-lg px-4 md:px-6 py-2 pb-5  shadow-gray-600">
      <div className="mb-2 -ml-2">You have done</div>
      <div className="flex justify-between mb-6">
        {tasks.map((task) => (
          <div key={task.name} className="flex flex-col items-center">
            <CircularProgress percentage={task.percentage} color={task.color} />
            <span className="text-sm mt-2">{task.name}</span>
          </div>
        ))}
      </div>
      <div className="space-y-4">
        {tasks.map((task) => (
          <div key={task.name} className="flex items-center">
            <span className="w-10 md:w-20 text-sm font-medium">
              {task.percentage}%
            </span>
            <span className="w-16 md:w-24 text-sm font-medium">
              {task.name}
            </span>
            <div className="flex-grow mx-4">
              <ProgressBar percentage={task.percentage} />
            </div>
            <span className="w-24 text-sm text-right">{task.time}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
