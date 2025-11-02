import { saveMoreData } from "@/data/save-more";
import SectionHeader from "../new-arrivals/SectionHeader";

const SaveMore = () => {
  return (
    <>
      <SectionHeader title="Save More Risk Nothing" />
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 space-y-6 lg:space-y-0 py-10">
        {saveMoreData.map((data, index) => {
          const Icon = data.icon;
          return (
            <div
              key={index}
              className="flex flex-col items-center text-center px-3 md:border-r 
              last:border-r-0 last:px-0 first:px-0 first:pr-3 last:pl-3 border-r-0
               border-neutral"
            >
              <Icon
                className={`w-12 h-12 mb-4 ${data.iconColor || "text-primary"}`}
                strokeWidth={1.8}
              />
              <h3 className="font-semibold text-sm lg:text-xl mb-3 text-secondary">
                {data.title}
              </h3>
              <p className="text-secondary/60 text-[10px] lg:text-base">
                {data.description}
              </p>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default SaveMore;
