import { DateFilter } from "@/components/common/table/tableContainer";

export type SaveSearchType = {
  selectFilter: string;
  val: string | DateFilter;
};

export type MarkersType = {
  id: number;
  filters: SaveSearchType[];
};
