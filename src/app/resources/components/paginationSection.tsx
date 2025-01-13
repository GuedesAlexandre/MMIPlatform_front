import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

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
  