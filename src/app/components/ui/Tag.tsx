import React from "react";

interface TagProps {
  name: string;
  color: string;
}

const Tag: React.FC<TagProps> = ({ name, color }) => {
  return (
    <span
      className={`bg-${color}-100 text-${color}-800 text-xs font-medium me-2 px-3.5 py-1.5 rounded dark:bg-gray-700 dark:text-${color}-300 border border-${color}-300`}
    >
      {name}
    </span>
  );
};

export default Tag;
