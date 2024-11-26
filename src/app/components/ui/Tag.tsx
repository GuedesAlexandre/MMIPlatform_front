import React from "react";

interface TagProps {
  name: string;
}

const Tag: React.FC<TagProps> = ({ name }) => {
  return (
    <div className=" w-full px-2 text-sm rounded-[8px] text-black bg-[#1EAFD0]/20  border-[#1EAFD0] text-center">{name}</div>
  );
};

export default Tag;
