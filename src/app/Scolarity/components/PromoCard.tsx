"use client";

import { PersonIcon, Pencil1Icon } from "@radix-ui/react-icons";
import React from "react";

interface PromoCardProps {
  title?: string;
  color?: string;
  number?: number;
}

const PromoCard: React.FC<PromoCardProps> = ({
  title,
  color,
  number,
}: PromoCardProps) => {
  return (
    <>
      <div className="mt-5 w-full mx-auto border border-placeholder-color rounded-md">
        <div
          className={
            title === "MMI01"
              ? "bg-[#00936E] text-background-color flex flex-row justify-between pt-44 px-5"
              : title === "MMI02"
                ? "bg-[#E83583] text-background-color flex flex-row justify-between pt-44 px-5"
                : "bg-[#8B4A97] text-background-color flex flex-row justify-between pt-44 px-5"
          }
        >
          <p className="pb-3">{title}</p>
          <div className="flex flex-row items-center pb-3">
            <PersonIcon />
            <p>{number}</p>
          </div>
        </div>
        <div className="px-4 flex flex-row justify-between items-center py-5">
          <div className="flex justify-end">
            <a
              href=""
              className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              Voir la promotion
              <svg
                className="rtl:rotate-180 w-3.5 h-3.5 ms-2"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 14 10"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M1 5h12m0 0L9 1m4 4L9 9"
                />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </>
  );
};

export default PromoCard;
