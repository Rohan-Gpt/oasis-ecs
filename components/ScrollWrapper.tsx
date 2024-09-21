"use client"; // This makes the component a client component in Next.js 13+

import { createContext, useEffect, useRef } from "react";
import LocomotiveScroll from "locomotive-scroll";
import "locomotive-scroll/dist/locomotive-scroll.css";

type ScrollWrapperProps = {
  children: React.ReactNode;
};

interface LocomotiveScrollContextType {
  scroll: LocomotiveScroll | null;
}

export const LocomotiveScrollContext =
  createContext<LocomotiveScrollContextType>({
    scroll: null,
  });

const ScrollWrapper: React.FC<ScrollWrapperProps> = ({ children }) => {
  const scrollRef = useRef(null);
  const scrollInstance = useRef<LocomotiveScroll | null>(null);

  useEffect(() => {
    if (scrollRef.current) {
      const scroll = new LocomotiveScroll({
        el: scrollRef.current,
        smooth: true,
        multiplier: 0.8,
      });

      scrollInstance?.current?.update();

      return () => {
        scroll.destroy();
      };
    }
  }, []);

  return (
    <LocomotiveScrollContext.Provider
      value={{ scroll: scrollInstance.current }}
    >
      <div data-scroll-container ref={scrollRef}>
        {children}
      </div>
    </LocomotiveScrollContext.Provider>
  );
};

export default ScrollWrapper;
