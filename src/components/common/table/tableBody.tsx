import { Row, Table, flexRender } from "@tanstack/react-table";
import Controls, { Control } from "../controls/controls";
import { TableConfig } from "./hooks/useTableConfig";
import TableRelational from "./tableRelational";
import { CSSProperties } from "react";
import { tailwindColors } from "../../../utils/tailwindConfig";

interface TBodyProps {
  table: Table<any>;
  onClickRow?: (row: any) => void;
  config: TableConfig | null;
  controls: Control<any>[];
  fixKey: string | number | symbol | undefined;
  dataFiltered: Row<any>[];
}

const TBody = ({
  config,
  fixKey,
  table,
  onClickRow,
  controls,
  dataFiltered,
}: TBodyProps) => {
  const handleClickRow = (row: any) => {
    if (onClickRow) {
      onClickRow(row);
    }
  };

  const tdStyle = [
    "px-2 py-2 border border-solid border-gray-300 text-sm text-gray-700",
  ];
  if (onClickRow) {
    tdStyle.push("cursor-pointer");
  }

  //@ts-ignore
  const getRowStyles = table.options.meta?.getRowStyles;
  if (!getRowStyles) return null;

  /*   //? Filter rows
  const handleFilter = (row: any, selectFilter: string, filter: string) => {
    const colum = columns.find((column) => column.header === selectFilter);
    //@ts-ignore
    const accessorKey = colum?.accessorKey;
    if (accessorKey) {
      return (
        row.original[accessorKey] &&
        row.original[accessorKey]
          .toString()
          .toLowerCase()
          .includes(filter.toLowerCase())
      );
    }
    //@ts-ignore
    const accessorFn = colum?.accessorFn;
    if (accessorFn) {
      return accessorFn(row.original)
        .toString()
        .toLowerCase()
        .includes(filter.toLowerCase());
    }
    return true;
  };
  const filteredRows = rows.filter((row) =>
    handleFilter(row, selectFilter, filter)
  );

  const dataFiltered = filteredRows.filter((row) =>
    saveSearch.every((condition) =>
      handleFilter(row, condition.selectFilter, condition.val)
    )
  ); */

  return (
    <tbody className="">
      {dataFiltered.map((row) => {
        let isFixed = false;
        if (config && fixKey) {
          isFixed = config.pins.some((pin) => pin === row.original[fixKey]);
        }
        const dynamicStyles: CSSProperties | undefined = getRowStyles(
          row.original
        );
        let rowStyle = {};
        if (isFixed) {
          rowStyle = {
            ...rowStyle,
            backgroundColor: tailwindColors.primary["100"],
          };
        }
        if (dynamicStyles) {
          rowStyle = {
            ...rowStyle,
            ...dynamicStyles,
          };
        }
        return (
          <tr
            style={rowStyle}
            className={`transition-all duration-100 odd:bg-white even:bg-gray-100 hover:invert-[8%]`}
            key={row.id}
          >
            {row.getVisibleCells().map((cell) => {
              const header = cell.column.columnDef.header;
              if (header === "Acciones")
                return (
                  <td className={tdStyle + " cursor-default"} key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                );
              const isRelational = cell.column.columnDef.meta?.isRelational;
              return (
                <td
                  className={tdStyle.join(" ")}
                  key={cell.id}
                  onClick={() => handleClickRow(row.original)}
                  title={cell.renderValue() as string}
                >
                  <div className="flex gap-2">
                    <p className="line-clamp-1">
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </p>
                    {isRelational && (
                      <TableRelational
                        relationalTitle={cell.column.columnDef.header?.toString()}
                        relationalObj={row.original[isRelational]}
                      />
                    )}
                  </div>
                </td>
              );
            })}
            {!!controls.length && (
              <td className={tdStyle.join(" ") + " text-center"}>
                <Controls controls={controls} item={row.original} />
              </td>
            )}
          </tr>
        );
      })}
    </tbody>
  );
};

export default TBody;
