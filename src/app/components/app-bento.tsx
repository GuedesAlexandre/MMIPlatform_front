import React from "react";
import { BentoGrid, BentoGridItem } from "@/components/ui/bento-grid";
import { defineDashboardActions } from "../auth/AuthenticationService";
import { useAuthStore } from "../store/AuthRepository";
import Tag from "./ui/Tag";

export default function AppBento() {
  const { user } = useAuthStore();
  const items = defineDashboardActions(user);
  items.map((item) => {
    item.header = <Skeleton url={item.url} />;
  });
  return (
    <BentoGrid className="max-w-full mx-auto md:auto-rows-[20rem]">
      {items.map((item, i) => (
        <BentoGridItem
          key={i}
          title={item.title}
          description={item.description}
          header={item.header}
          className={item.className}
          icon={<Tag name={item.category} color={item.color} />}
        />
      ))}
    </BentoGrid>
  );
}
const Skeleton = ({ url }: { url?: string }) => (
  <div
    className="flex flex-1 size-full min-h-32 rounded-xl bg-red-400 border border-transparent dark:border-white/[0.2]"
    style={{
      backgroundImage: `url(${url})`,
      backgroundSize: "cover",
      backgroundPosition: "center",
      resize: "both",
    }}
  ></div>
);
