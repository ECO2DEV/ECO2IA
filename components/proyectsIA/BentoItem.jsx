export const BentoItem = ({
  children,
  appliedPrompt,
  title,
  classProp = "",
}) => {
  return (
    <article
      className={` ${classProp} col-span-5
        relative rounded-xl
        backdrop-blur-md
        border border-black/10
        shadow-inner shadow-white/10
        overflow-hidden
        group`}
    >
      <div
        className="absolute bottom-0 top-0 z-10 h-full w-full
          bg-gradient-to-b from-transparent from-40% via-[#151836]/50 to-[#151836]/80"
      ></div>
      {children}
      <div className="relative z-20 flex h-full select-none flex-col justify-end gap-1 p-4 text-lg md:p-6">
        <h2 className="mb-4 text-balance text-3xl font-semibold uppercase text-white">
          {title}
        </h2>
        <p className="max-w-xl text-base md:text-lg text-gray-200">
          {appliedPrompt}
        </p>
      </div>
    </article>
  );
};
