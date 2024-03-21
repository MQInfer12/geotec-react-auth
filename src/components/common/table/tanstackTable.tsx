import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getSortedRowModel,
  useReactTable,
  getPaginationRowModel,
  Row,
} from "@tanstack/react-table";
import TablePDF from "./pdf/tablePDF";
import { DateFilter, TableView } from "./tableContainer";
import { CSSProperties, forwardRef } from "react";
import { tailwindColors } from "../../../utils/tailwindConfig";
import { Control } from "../controls/controls";
import { TableConfig } from "./hooks/useTableConfig";
import TablePagination from "./tablePagination";
import TBody from "./tableBody";
import { SaveSearchType } from "../../../interfaces/SaveSearch";
import IconArrowAsc from "../../../assets/icons/iconArrowAsc";
import IconArrowDesc from "../../../assets/icons/iconArrowDesc";

interface Props {
  filter: string;
  setFilter: React.Dispatch<React.SetStateAction<string>>;
  sorting: any[];
  setSorting: React.Dispatch<React.SetStateAction<any[]>>;
  data: any[];
  columns: ColumnDef<any, any>[];
  onClickRow?: (row: any) => void;
  view: TableView;
  controls: Control<any>[];
  rowStyle?: (row: any) => CSSProperties;
  config: TableConfig | null;
  fixKey: string | number | symbol | undefined;
  selectFilter: string | undefined;
  saveSearch: SaveSearchType[];
  dateFilter: DateFilter;
}

const TanstackTable = forwardRef(
  (
    {
      data,
      columns,
      filter,
      setFilter,
      setSorting,
      onClickRow,
      view,
      controls,
      rowStyle,
      config,
      fixKey,
      selectFilter,
      saveSearch,
      dateFilter,
    }: Props,
    tableRef: React.ForwardedRef<HTMLTableElement>
  ) => {

    const table = useReactTable({
      data,
      columns,
      getPaginationRowModel: getPaginationRowModel(),
      getCoreRowModel: getCoreRowModel(),
      getSortedRowModel: getSortedRowModel(),
      getFilteredRowModel: getFilteredRowModel(),
      /*       state: { sorting, globalFilter: filter }, */
      initialState: {
        pagination: {
          pageSize: 40,
        },
      },
      columnResizeMode: "onChange",
      // @ts-ignore
      onSortingChange: setSorting,
      onGlobalFilterChange: setFilter,
      defaultColumn: {
        size: 200,
        minSize: 50,
        maxSize: 500,
      },
      meta: {
        getRowStyles: rowStyle ? rowStyle : () => {},
      },
    });


    const thStyle =
      "px-2 py-2 bg-gray-100 border border-solid border-gray-300 text-sm font-medium text-gray-700 text-start select-none active:cursor-w-resize";

    //@ts-ignore
    const getRowStyles = table.options.meta?.getRowStyles;
    if (!getRowStyles) return null;
    const getFixedData = (): {
      data: Row<any>[];
      pinsInPage: number;
    } => {
      const allData = table.getCoreRowModel().rows;
      const paginatedData = table.getRowModel().rows;

      if (!fixKey)
        return {
          data: paginatedData,
          pinsInPage: 0,
        };
      if (!config)
        return {
          data: paginatedData,
          pinsInPage: 0,
        };

      const pins = config.pins
        .map((pin) => allData.find((value) => value.original[fixKey] === pin))
        .filter((v) => !!v);
      const filteredData = paginatedData.filter(
        (value) => !config.pins.includes(value.original[fixKey])
      );
      const pinsInPage =
        filteredData.length + pins.length - paginatedData.length;

      const data: any[] = [...pins, ...filteredData];
      return {
        data,
        pinsInPage,
      };
    };

    const rows = getFixedData();

    //? Filter rows
    const handleFilter = (
      row: any,
      selectFilter: string | undefined,
      filterStringified: string,
      dateFilter: DateFilter
    ) => {
      const filter = filterStringified.substring(
        1,
        filterStringified.length - 1
      );
      const colum = columns.find((column) => column.header === selectFilter);
      const filterType = colum?.meta?.filterType;
      const filterBackend = colum?.meta?.filterBackend;

      //@ts-ignore
      const accessorKey = colum?.accessorKey;
      if (accessorKey) {
        if (!row.original[accessorKey]) return false;
        if (filterBackend) return true;
        if (filterType === "date") {
          const date = row.original[accessorKey];
          const from = dateFilter.from;
          const to = dateFilter.to;
          if (!from && !to) return true;
          if (!from && to) return new Date(date) <= new Date(to);
          if (from && !to) return new Date(date) >= new Date(from);
          return (
            new Date(date) >= new Date(from) && new Date(date) <= new Date(to)
          );
        } else {
          return row.original[accessorKey]
            .toString()
            .toLowerCase()
            .includes(filter.toLowerCase());
        }
      }

      //@ts-ignore
      const accessorFn = colum?.accessorFn;
      if (accessorFn) {
        if (filterType === "date") {
          const date = accessorFn(row.original);
          const from = dateFilter.from;
          const to = dateFilter.to;
          if (!from && !to) return true;
          if (!from && to) return new Date(date) <= new Date(to);
          if (from && !to) return new Date(date) >= new Date(from);
          return (
            new Date(date) >= new Date(from) && new Date(date) <= new Date(to)
          );
        } else {
          return accessorFn(row.original)
            .toString()
            .toLowerCase()
            .includes(filter.toLowerCase());
        }
      }
      return true;
    };

    const filteredRows = rows.data.filter((row) =>
      handleFilter(row, selectFilter, filter, dateFilter)
    );

    const dataFiltered = filteredRows.filter((row) =>
      saveSearch.every((condition) =>
        handleFilter(
          row,
          condition.selectFilter,
          JSON.stringify(condition.val),
          condition.val as DateFilter
        )
      )
    );

    if (view === "PDF") {
      return (
        <TablePDF table={table} filter={filter} dataFiltered={dataFiltered} />
      );
    }

    return (
      <div className="overflow-auto w-full h-full flex flex-col border border-gray-300 justify-between">
        <table
          ref={tableRef}
          className="w-full border-separate border-spacing-0"
        >
          <thead className="sticky top-0">
            {table.getHeaderGroups().map((group) => (
              <tr key={group.id}>
                {group.headers.map((header) => (
                  <th
                    className={thStyle}
                    style={{
                      backgroundColor: tailwindColors.gray["200"],
                      width: header.getSize(),
                    }}
                    key={header.id}
                    onClick={header.column.getToggleSortingHandler()}
                    title={header.column.columnDef.header?.toString()}
                    onMouseDown={header.getResizeHandler()}
                    onTouchStart={header.getResizeHandler()}
                  >
                    <div className="flex">
                      <p className="line-clamp-1">
                        {flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                      </p>
                      <div className="h-5 w-5">
                        {
                          {
                            none: <></>,
                            asc: <IconArrowAsc />,
                            desc: <IconArrowDesc />,
                          }[header.column.getIsSorted() || "none"]
                        }
                      </div>
                    </div>
                  </th>
                ))}
                {!!controls.length && (
                  <th
                    className={thStyle}
                    style={{
                      backgroundColor: tailwindColors.gray["200"],
                      width: "120px",
                    }}
                  >
                    Controles
                  </th>
                )}
              </tr>
            ))}
          </thead>
          <TBody
            config={config}
            fixKey={fixKey}
            table={table}
            onClickRow={onClickRow}
            controls={controls}
            dataFiltered={dataFiltered}
          />
        </table>
        {/* PAGINATION */}
        <TablePagination
          table={table}
          pageLength={table.getRowModel().rows.length}
          pinsInPage={rows.pinsInPage}
        />
      </div>
    );
  }
);

export default TanstackTable;
