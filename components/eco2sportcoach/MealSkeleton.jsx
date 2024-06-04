
const MealSkeleton = () => {
  return (
    <div className="p-2 w-full">
      <div className="animate-pulse flex space-x-4">
        <div className="flex-1 space-y-5 py-1">
       
          <div className="space-y-3">
            <div className="grid grid-rows-4 gap-4">
              <div className="h-[6px] dark:bg-lightColor bg-darkBgCard rounded row-span-1 w-5/5"></div>
              <div className="h-[6px] dark:bg-lightColor bg-darkBgCard rounded col-span-1 w-5/5"></div>
              <div className="h-[6px] dark:bg-lightColor bg-darkBgCard rounded col-span-1 w-5/5"></div>
              <div className="h-[6px] dark:bg-lightColor bg-darkBgCard rounded col-span-1 w-5/5"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MealSkeleton;
