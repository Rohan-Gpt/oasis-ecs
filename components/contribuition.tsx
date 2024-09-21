import React, { useMemo } from "react";

interface ContributionDay {
  date: Date;
  count: number;
}

interface ContributionGraphProps {
  contributions: ContributionDay[];
  year: number;
}

const ContributionGraph: React.FC<ContributionGraphProps> = ({
  contributions,
  year,
}) => {
  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  const days = ["Mon", "Wed", "Fri"];

  const getColorClass = (count: number) => {
    if (count === 0) return "bg-gray-200";
    if (count < 5) return "bg-green-200";
    if (count < 10) return "bg-green-300";
    if (count < 15) return "bg-green-400";
    return "bg-green-500";
  };

  const totalContributions = useMemo(
    () => contributions.reduce((sum, day) => sum + day.count, 0),
    [contributions]
  );

  const weeks = useMemo(() => {
    const startDate = new Date(year, 0, 1);
    const endDate = new Date(year, 11, 31);
    const weeksArray = [];
    let currentDate = new Date(startDate);

    while (currentDate <= endDate) {
      const week = Array.from({ length: 7 }).map(() => {
        const contribution = contributions.find(
          (c) => c.date.toDateString() === currentDate.toDateString()
        );
        const day = {
          date: new Date(currentDate),
          count: contribution ? contribution.count : 0,
        };
        currentDate.setDate(currentDate.getDate() + 1);
        return day;
      });
      weeksArray.push(week);
    }
    return weeksArray;
  }, [contributions, year]);

  return (
    <div className="bg-white rounded-lg shadow-lg p-6 max-w-3xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">
        {totalContributions.toLocaleString()} contributions in this year
      </h2>
      <MonthsHeader months={months} />
      <div className="flex">
        <DaysColumn days={days} />
        <WeeksGrid weeks={weeks} getColorClass={getColorClass} />
      </div>
      <Legend getColorClass={getColorClass} />
    </div>
  );
};

const MonthsHeader: React.FC<{ months: string[] }> = ({ months }) => (
  <div className="flex mb-2">
    <div className="w-8"></div>
    {months.map((month) => (
      <div key={month} className="flex-1 text-center text-xs text-gray-500">
        {month}
      </div>
    ))}
  </div>
);

const DaysColumn: React.FC<{ days: string[] }> = ({ days }) => (
  <div className="w-8 mr-2">
    {days.map((day) => (
      <div key={day} className="h-4 text-xs text-gray-500">
        {day}
      </div>
    ))}
  </div>
);

const WeeksGrid: React.FC<{
  weeks: any[];
  getColorClass: (count: number) => string;
}> = ({ weeks, getColorClass }) => (
  <div className="flex">
    {weeks.map((week, weekIndex) => (
      <div key={weekIndex} className="flex">
        {week.map((day: any, dayIndex: any) => (
          <div
            key={dayIndex}
            className={`w-4 h-4 m-0.5 rounded-sm ${getColorClass(day.count)}`}
            title={`${day.date.toDateString()}: ${day.count} contributions`}
          ></div>
        ))}
      </div>
    ))}
  </div>
);

const Legend: React.FC<{ getColorClass: (count: number) => string }> = ({
  getColorClass,
}) => (
  <div className="flex items-center mt-2">
    <span className="text-xs text-gray-500 mr-2">Less</span>
    {[0, 5, 10, 15, 20].map((level) => (
      <div
        key={level}
        className={`w-4 h-4 ${getColorClass(level)} mr-0.5`}
      ></div>
    ))}
    <span className="text-xs text-gray-500 ml-2">More</span>
  </div>
);

export default function ContributionGraphDemo() {
  const year = 2023;
  const sampleContributions: ContributionDay[] = [
    { date: new Date(2023, 4, 1), count: 20 },
    { date: new Date(2023, 4, 2), count: 10 },
    { date: new Date(2023, 4, 3), count: 15 },
    // Add more sample data here...
  ];

  return <ContributionGraph contributions={sampleContributions} year={year} />;
}
