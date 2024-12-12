"use client";

import ResourceCard from "@/app/components/resourcesCard";
import { useAuthStore } from "@/app/store/AuthRepository.store";
import TitleHeaderUI from "@/app/components/ui/TitleHeaderUI";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { useEffect, useState } from "react";
import { getModuleByEmailStore } from "@/app/store/getResourcesByEmail.store";

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
  const currentItems = moduleByEmail;
  return (
    <div>
      <TitleHeaderUI label="Mes Ressources" />
      <div className="px-10 grid grid-cols-3 mx-auto gap-10 flex-wrap">
        {user &&
          currentItems?.slice(firstItemIndex, lastItemIndex).map((module) => {
            return <ResourceCard key={module.id} module={module} />;
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
export default Resources;

export const PaginationSection = ({
  totalItems,
  itemsPerPage,
  currentPage,
  setCurrentPage,
}: {
  totalItems: number;
  itemsPerPage: number;
  currentPage: number;
  setCurrentPage: (page: number) => void;
}) => {
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <Pagination className="py-12">
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious
            className="cursor-pointer"
            onClick={handlePrevPage}
          >
            Précédent
          </PaginationPrevious>
        </PaginationItem>

        {Array.from({ length: totalPages }, (_, index) => (
          <PaginationItem key={index}>
            <PaginationLink
              onClick={() => setCurrentPage(index + 1)}
              isActive={currentPage === index + 1}
              className="cursor-pointer"
            >
              {index + 1}
            </PaginationLink>
          </PaginationItem>
        ))}

        <PaginationItem>
          <PaginationNext className="cursor-pointer" onClick={handleNextPage}>
            Suivant
          </PaginationNext>
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
};
