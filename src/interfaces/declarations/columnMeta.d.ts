import "@tanstack/react-table";
import { DateFilter } from "../../components/common/table/tableContainer";

declare module "@tanstack/react-table" {
  interface ColumnMeta<TData extends RowData, TValue> {
    isRelational?: keyof TData;
    filterType?: "string" | "date" = "string";
    filterBackend?: (filter: DateFilter) => void;
  }
}
