"use client";

import ResourceCard from "@/app/components/resourcesCard";
import { useAuthStore } from "@/app/store/AuthRepository.store";
import TitleHeaderUI from "@/app/components/ui/TitleHeaderUI";
import { useEffect, useState } from "react";
import { getModuleByEmailStore } from "@/app/store/getResourcesByEmail.store";
import { PaginationSection } from "@/app/resources/components/paginationSection";
import withAuth from "@/app/HOC";

const Resources = () => {
  const { user } = useAuthStore();
  const { moduleByEmail, fetchModuleByEmail } = getModuleByEmailStore();

  const [currentPage, setCurrentPage] = useState<number>(1);
  const [itemPerPage, setItemPerPage] = useState<number>(6);

  useEffect(() => {
    fetchModuleByEmail(String(user?.user.email));
  }, []);

  const lastItemIndex = currentPage * itemPerPage;
  const firstItemIndex = lastItemIndex - itemPerPage;
  const moduleNumber = moduleByEmail?.length;

  return (
    <div>
      <TitleHeaderUI label="Mes Ressources" />
      <div className="px-10 grid grid-cols-3 mx-auto gap-10 flex-wrap">
        {user &&
          moduleByEmail?.slice(firstItemIndex, lastItemIndex).map((module) => {
            return <ResourceCard key={module.name} module={module} />;
          })}
      </div>
      <PaginationSection
        totalItems={Number(moduleNumber)}
        itemsPerPage={itemPerPage}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
      />
    </div>
  );
};
export default withAuth(Resources);
