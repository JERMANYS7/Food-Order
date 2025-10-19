export default function SkeletonCard() {
  return (
    <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-lg overflow-hidden animate-pulse">
      <div className="relative bg-gray-200 dark:bg-slate-700 w-full h-48">
        <div className="absolute bottom-0 left-0 p-4">
            <div className="bg-gray-300 dark:bg-slate-600 h-5 w-20 rounded-full"></div>
        </div>
         <div className="absolute top-0 right-0 p-2.5">
            <div className="bg-gray-300/50 dark:bg-slate-600/50 h-9 w-20 rounded-full"></div>
        </div>
      </div>
      <div className="p-5">
        <div className="bg-gray-300 dark:bg-slate-600 h-6 w-3/4 mb-2 rounded"></div>
        <div className="space-y-2 mb-4">
            <div className="bg-gray-200 dark:bg-slate-700 h-4 w-full rounded"></div>
            <div className="bg-gray-200 dark:bg-slate-700 h-4 w-5/6 rounded"></div>
        </div>
        <div className="space-y-3 mt-4">
            <div className="flex justify-between items-center bg-gray-50 dark:bg-slate-700/50 p-3 rounded-lg h-[68px]">
              <div className="w-1/2 space-y-2">
                 <div className="bg-gray-200 dark:bg-slate-600 h-4 w-full rounded"></div>
                 <div className="bg-gray-200 dark:bg-slate-600 h-3 w-1/3 rounded"></div>
              </div>
              <div className="bg-gray-200 dark:bg-slate-600 h-10 w-24 rounded-lg"></div>
            </div>
            <div className="flex justify-between items-center bg-gray-50 dark:bg-slate-700/50 p-3 rounded-lg h-[68px]">
              <div className="w-1/2 space-y-2">
                 <div className="bg-gray-200 dark:bg-slate-600 h-4 w-full rounded"></div>
                 <div className="bg-gray-200 dark:bg-slate-600 h-3 w-1/3 rounded"></div>
              </div>
              <div className="bg-gray-200 dark:bg-slate-600 h-10 w-24 rounded-lg"></div>
            </div>
        </div>
      </div>
    </div>
  );
}