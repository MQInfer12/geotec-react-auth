import { Table } from "@tanstack/react-table";
import Button from "../button/button";
import IconChevronLeft2 from "../../../assets/icons/iconChevronLeft2";
import IconChevronLeft from "../../../assets/icons/iconChevronLeft";
import IconChevronRight from "../../../assets/icons/iconChevronRight";
import IconChevronRight2 from "../../../assets/icons/iconChevronRight2";

interface Props {
  table: Table<any>;
  pageLength: number;
  pinsInPage: number;
}

const TablePagination = ({ table, pageLength, pinsInPage }: Props) => {
  const rowsPerPage = table.getState().pagination.pageSize;
  const currentPageIndex = table.getState().pagination.pageIndex;
  const currentPage = currentPageIndex + 1;
  const initialIndex = rowsPerPage * currentPageIndex;
  const dataLength = table.getFilteredRowModel().rows.length;

  return (
    <div className="sticky bg-gray-200 left-0 bottom-0 flex items-center justify-between px-2 w-full min-h-10 border border-gray-300">
      <div>
        <small className="text-text/70 text-[12px]">
          {initialIndex + 1} - {initialIndex + pageLength} de {dataLength}
        </small>
      </div>
      <div className="flex gap-4 items-center">
        <small className="text-text/70 text-[12px]">
          Filas: {rowsPerPage} {pinsInPage ? `(+${pinsInPage} fijado${pinsInPage > 1 ? "s" : ""})` : ""}
        </small>
        <div className="flex gap-1">
          {/* Button to navigate to the first page */}
          <Button
            onClick={() => table.setPageIndex(0)}
            disabled={currentPage <= 1}
            size="small"
            title="Primera página"
            icon={<IconChevronLeft2 />}
          />
          {/* Button to navigate to the previous page */}
          <Button
            onClick={() => table.previousPage()}
            disabled={currentPage <= 1}
            size="small"
            title="Página anterior"
            icon={<IconChevronLeft />}
          />
        </div>
        <div className="flex gap-[2px]">
          {/* Generate an array of 5 page numbers centered around the current page */}
          {Array.from({ length: 5 }, (_, i) => currentPage - 3 + i).map(
            (pageNumber) => {
              // Only display the page number if it's valid
              const isValid =
                pageNumber >= 0 && pageNumber < table.getPageCount();
              return (
                <Button
                  key={pageNumber}
                  onClick={() => table.setPageIndex(pageNumber)}
                  size="small"
                  toggle={currentPage === pageNumber + 1}
                  disabled={!isValid}
                  icon={<p>{isValid ? pageNumber + 1 : "..."}</p>}
                  noAnimate
                />
              );
            }
          )}
        </div>
        <div className="flex gap-1">
          {/* Button to navigate to the next page */}
          <Button
            onClick={() => table.nextPage()}
            disabled={currentPage >= table.getPageCount()}
            size="small"
            title="Página siguiente"
            icon={<IconChevronRight />}
          />
          {/* Button to navigate to the last page */}
          <Button
            onClick={() => table.setPageIndex(table.getPageCount() - 1)}
            disabled={currentPage >= table.getPageCount()}
            size="small"
            title="Última página"
            icon={<IconChevronRight2 />}
          />
        </div>
      </div>
    </div>
  );
};

export default TablePagination;
