export default async function Admin() {
  return (
    <div className="flex justify-center items-center bg-blue-950 h-screen w-screen">
      <div className="bg-white p-6 rounded-lg shadow-md max-w-lg">
        <div className="flex justify-center">Login as Admin</div>
        <div className="py-7">
          <div className="w-full max-w-sm min-w-[400px]">
            <input
              className="w-full bg-transparent placeholder:text-slate-400 text-slate-700 text-sm border border-slate-200 rounded-md px-3 py-2 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm focus:shadow"
              placeholder="Type here..."
            />
          </div>
          <div className="w-full max-w-sm min-w-[400px] mt-4">
            <input
              className="w-full bg-transparent placeholder:text-slate-400 text-slate-700 text-sm border border-slate-200 rounded-md px-3 py-2 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm focus:shadow"
              placeholder="Type here..."
            />
          </div>
        </div>
      </div>
    </div>
  );
}
