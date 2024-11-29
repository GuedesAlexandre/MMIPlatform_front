import { cn } from "@/lib/utils";
import { ArrowTopRightIcon } from "@radix-ui/react-icons";
import Link from "next/link";

export const BentoGrid = ({
  className,
  children,
}: {
  className?: string;
  children?: React.ReactNode;
}) => {
  return (
    <div
      className={cn(
        "grid md:auto-rows-[18rem] grid-cols-1 md:grid-cols-3 gap-4 max-w-7xl mx-auto ",
        className
      )}
    >
      {children}
    </div>
  );
};

export const BentoGridItem = ({
  className,
  title,
  description,
  header,
  icon,
  link,
}: {
  className?: string;
  title?: string | React.ReactNode;
  description?: string | React.ReactNode;
  header?: React.ReactNode;
  icon?: React.ReactNode;
  link?: string;
}) => {
  return (
    <Link
      href={link ?? ""}
      className={cn(
        "row-span-1 cursor-pointer rounded-xl group/bento hover:shadow-xl transition duration-200 shadow-input dark:shadow-none p-4 dark:bg-black dark:border-white/[0.2] bg-white border border-solid justify-between flex flex-col space-y-5",
        className
      )}
    >
      <div className="flex justify-between items-center">
        {" "}
        {icon}{" "}
        <div className="rounded-full p-2 border border-primary-blue">
          <ArrowTopRightIcon className="size-[15px]" />
        </div>
      </div>
      {header}
      <div className="group-hover/bento:translate-x-2 transition duration-200">
        <div className="font-bold text-sm text-neutral-600 dark:text-neutral-200 lg:text-base">
          {title}
        </div>
        <div className="font-normal text-neutral-600 text-2xs dark:text-neutral-300 w-[85%] lg:text-sm">
          {description}
        </div>
      </div>
    </Link>
  );
};
