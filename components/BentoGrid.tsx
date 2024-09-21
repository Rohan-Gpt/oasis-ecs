import Image from "next/image";

export default function BentoGrid() {
  return (
    <div className="flex justify-center items-center h-screen w-full mt-32 lg:mt-0">
      <div className="grid grid-cols-1 grid-rows-5 lg:grid-cols-8 lg:grid-rows-12 h-full w-full gap-4 m-6 mt-60 lg:p-20 lg:m-32">
        <div className="cursor-default font-bold font-heading flex justify-center col-span-1 row-span-1 lg:col-span-4 lg:row-span-3 bg-white rounded-2xl text-center items-center text-4xl ">
          Department Of ECS
        </div>
        <div className="z-10 cursor-default font-bold font-heading flex justify-center col-span-1 row-span-1 lg:col-span-2 lg:row-span-5 bg-laptop bg-cover rounded-2xl text-center items-center text-4xl "></div>
        <div className="cursor-default font-bold font-heading flex justify-center col-span-1 row-span-1 lg:col-span-2 lg:row-span-5 bg-[url(/skill2.jpeg)] bg-cover rounded-2xl text-center items-end text-md "></div>
        <div className="cursor-default font-bold font-heading flex justify-center col-span-1 row-span-1 lg:col-span-4 lg:row-span-9 bg-yellow-400 rounded-2xl text-center items-center text-4xl "></div>
        <div className="cursor-default font-bold font-heading flex justify-center col-span-1 row-span-1 lg:col-span-4 lg:row-span-3 bg-transparent rounded-2xl text-center items-center text-4xl ">
          <Image
            src={"/techstack.png"}
            width={1920}
            height={500}
            alt=""
          ></Image>
        </div>
        <div className="cursor-default font-bold flex justify-start items-start col-span-1 row-span-1 lg:col-span-4 lg:row-span-4 bg-blue-950 rounded-2xl text-xl p-6 px-8 text-white ">
          Ready to be the best
        </div>
      </div>
    </div>
  );
}
