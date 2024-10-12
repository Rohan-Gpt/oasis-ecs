// import { useEffect, useState } from "react";
// import GuideCards from "../GuideCards";
// import EnhancedWeekWiseSyllabus from "../WeekCards";

// export default async function GuideAndSyllabus() {
//     const [guides, setGuides] = useState([]);
//   const [loading, setLoading] = useState<boolean>(true);

//   useEffect(() => {
//     const fetchGuides = async () => {
//       try {
//         // const response = await fetch("/api/guides", { cache: "force-cache" });
//         const data = await GetAllGuides();
//         if (Array.isArray(data)) {
//           setGuides(data);
//         } else {
//           console.error("API did not return an array", data);
//         }
//       } catch (error) {
//         console.error("Error fetching guides:", error);
//       }
//     };

//     fetchGuides();
//   }, []);
//   return (
//     <>
//       <div className="bg-gray-900">
//         <EnhancedWeekWiseSyllabus />
//       </div>
//       <GuideCards />
//     </>
//   );
// }
