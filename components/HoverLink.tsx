// "use client";
// import Link from "next/link";
// import { useEffect, useState } from "react";

// const HoverLink = ({ href, children }) => {
//   const [hovered, setHovered] = useState(false);

//   useEffect(() => {
//     if (hovered) {
//       // Prefetch the page when hovered
//       router.prefetch(href);
//     }
//   }, [hovered, href]);

//   return (
//     <Link href={href}>
//       <a
//         onMouseEnter={() => setHovered(true)}
//         onMouseLeave={() => setHovered(false)}
//       >
//         {children}
//       </a>
//     </Link>
//   );
// };
