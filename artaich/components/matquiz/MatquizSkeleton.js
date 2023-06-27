export const MatquizSkeleton = () => {
  return (
    <div className="p-2 w-full">
      <div className="animate-pulse flex space-x-4">
        <div className="flex-1 space-y-5 py-1">
          <div className="h-[10px] bg-indigo-700 rounded"></div>
          <div className="space-y-3">
            <div className="grid grid-rows-4 gap-4">
              <div className="h-[6px] bg-slate-700 rounded row-span-1 w-3/5"></div>
              <div className="h-[6px] bg-slate-700 rounded col-span-1 w-3/5"></div>
              <div className="h-[6px] bg-slate-700 rounded col-span-1 w-3/5"></div>
              <div className="h-[6px] bg-slate-700 rounded col-span-1 w-3/5"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
