import Image from "next/image";

export default function AboutOasis() {
  return (
    <div className="bg-black flex flex-col items-center justify-center px-10 py-28 z-10">
      <h2 className="text-3xl md:text-4xl flex items-center text-white font-bold text-center mb-10">
        Why Join{" "}
        <span>
          <Image
            src={"/OASIS-logo(small).png"}
            width={"125"}
            height={"31"}
            alt="OASIS"
          ></Image>
        </span>
        ?
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-10 max-w-6xl">
        {/* Feature 1 */}
        <div className="bg-white p-6 rounded-lg shadow-lg text-center">
          <h3 className="text-2xl font-semibold mb-4">Exclusive Workshops</h3>
          <p>
            Learn from industry-leading developers and get access to exclusive
            resources tailored for your growth.
          </p>
        </div>

        {/* Feature 2 */}
        <div className="bg-white p-6 rounded-lg shadow-lg text-center">
          <h3 className="text-2xl font-semibold mb-4">
            Networking Oppurtunities
          </h3>
          <p>
            Connect with developers around the world, exchange ideas, and build
            lasting relationships.
          </p>
        </div>

        {/* Feature 3 */}
        <div className="bg-white p-6 rounded-lg shadow-lg text-center">
          <h3 className="text-2xl font-semibold mb-4">Real-world Projects</h3>
          <p>
            Work on real-world projects and build a portfolio that showcases
            your skills to potential employers.
          </p>
        </div>
      </div>
    </div>
  );
}
