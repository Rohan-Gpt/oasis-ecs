"use client";
import { NotionRenderer } from "react-notion-x";
import Link from "next/link";
import dynamic from "next/dynamic";
import { ExtendedRecordMap } from "notion-types";
import "./styles/styles.css";
import CodeBlock from "./CodeBlock";
// import "prismjs/themes/prism-tomorrow.css";
// import "katex/dist/katex.min.css";

const Collection = dynamic(() =>
  import("react-notion-x/build/third-party/collection").then(
    (m) => m.Collection
  )
);
const Equation = dynamic(() =>
  import("react-notion-x/build/third-party/equation").then((m) => m.Equation)
);

const Modal = dynamic(
  () => import("react-notion-x/build/third-party/modal").then((m) => m.Modal),
  {
    ssr: false,
  }
);

interface NotionPageProps {
  recordMap: ExtendedRecordMap;
  rootPageId: string;
}
export const NotionPage = ({ recordMap, rootPageId }: NotionPageProps) => {
  if (!recordMap) {
    return null;
  }

  return (
    <div className="notion__container">
      <div>
        <NotionRenderer
          recordMap={recordMap}
          fullPage={true}
          darkMode={true}
          rootPageId={rootPageId}
          previewImages
          components={{
            nextLink: Link,
            Code: CodeBlock,
            Collection,
            Equation,
            Modal,
          }}
        />
      </div>
    </div>
  );
};

// "use client";
// import { NotionRenderer as NotionRendererLib } from "react-notion-x";
// // import { Code } from "react-notion-x/build/third-party/code";
// import CodeBlock from "./CodeBlock";
// import { ExtendedRecordMap } from "notion-types";

// interface NotionPageProps {
//   recordMap: ExtendedRecordMap;
//   rootPageId: string;
// }
// // Week-4-1-647987d9b1894c54ba5c822978377910
// export const NotionRenderer = ({ recordMap, rootPageId }: NotionPageProps) => {
//   // const { resolvedTheme } = useTheme();

//   return (
//     <div className="w-full">
//       <style>
//         {`
//           :root {
//             --notion-font-family: "Poppins", sans-serif;
//             --bg-color: #FAFAFA;
//             --fg-color: #0a0a0a;
//           }
//           .dark-mode {
//             --bg-color: #0a0a0a;
//             --fg-color: #FAFAFA;
//           }
//           .notion-header {
//             display: none !important;
//           }
//           .notion-code {
//           border-radius: 12px;
//           }

//           .medium-zoom-image {
//             border-radius: 0.5rem;
//             border: 1px solid #0a0a0a36;
//             background-size: cover;
//             cursor: pointer;
//           }
//           .notion-page: {
//             padding: 0px !important;
//             background-color: transparent !important;

//           }
//         `}
//       </style>
//       <div>
//         <NotionRendererLib
//           components={{
//             Code: CodeBlock,
//           }}
//           rootPageId={rootPageId}
//           recordMap={recordMap}
//           fullPage={true}
//           darkMode={true}
//         />
//       </div>
//     </div>
//   );
// };
