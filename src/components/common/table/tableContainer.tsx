import { CSSProperties, useRef, useState } from "react";
import TableControls from "./tableControls";
import TanstackTable from "./tanstackTable";
import { ColumnDef } from "@tanstack/react-table";
import TableSkeleton from "./tableSkeleton";
import { Control } from "../controls/controls";
import { useTableConfig } from "./hooks/useTableConfig";
import { MarkersType, SaveSearchType } from "../../../interfaces/SaveSearch";

export interface TableButton {
  title: string;
  icon: JSX.Element;
  fn: () => void;
  active?: boolean;
  disabled?: boolean;
}

export interface DateFilter {
  from: string;
  to: string;
}

interface Props<T> {
  data: T[] | undefined;
  columns: ColumnDef<any, any>[];
  name: string;
  reports?: boolean;
  reload?: () => Promise<void>;
  add?: () => void;
  onClickRow?: (row: T) => void;
  controls?: Control<T>[];
  buttons?: TableButton[];
  fixKey?: keyof T;
  rowStyle?: (row: T) => CSSProperties;
  search?: boolean;
  toast: (msg: string) => void;
}

export type TableView = "table" | "PDF";

export const TableContainer = <T,>({
  data,
  columns,
  name,
  reports = true,
  reload: reloadFn,
  add,
  onClickRow,
  controls = [],
  buttons = [],
  fixKey,
  rowStyle,
  search = true,
  toast,
}: Props<T>) => {
  const [sorting, setSorting] = useState<any[]>([]); //data got of the filter
  const [reloadCount, setReloadCount] = useState(0);

  const [view, setView] = useState<TableView>("table");
  const tableRef = useRef<HTMLTableElement>(null);
  const {
    config,
    toggleColumn,
    toggleFix,
    toggleSaveMarkers,
    toggleDeleteMarker,
    handleReorder,
  } = useTableConfig(columns, name);

  const onlyColumns = columns
    .sort((a, b) => {
      const visibleColumnA = config?.visibleColumns.find(
        (visibleColumn) => visibleColumn.name === a.header?.toString()
      );
      const visibleColumnB = config?.visibleColumns.find(
        (visibleColumn) => visibleColumn.name === b.header?.toString()
      );
      if (!visibleColumnA || !visibleColumnB) return 0;
      return visibleColumnA.order - visibleColumnB.order;
    })
    .filter((column) => {
      const visibleColumn = config?.visibleColumns.find(
        (visibleColumn) => visibleColumn.name === column.header?.toString()
      );
      if (!visibleColumn) return true;
      return visibleColumn.active;
    });

  const allControls: Control<T>[] = [...controls];
  if (config && fixKey) {
    allControls.unshift(
      {
        label: "Fijar",
        fn: (row) => toggleFix(row[fixKey]),
        on: (row) => !config.pins.find((pin) => pin === row[fixKey]),
      },
      {
        label: "Desfijar",
        fn: (row) => toggleFix(row[fixKey]),
        on: (row) => !!config.pins.find((pin) => pin === row[fixKey]),
      }
    );
  }

  //? start: get the option to filter the row
  const [selectFilter, setSelectFilter] = useState<string | undefined>(
    columns[0].header?.toString()
  );
  const [filter, setFilter] = useState(""); //save the value of the input
  const [dateFilter, setDateFilter] = useState<DateFilter>({
    from: "",
    to: "",
  }); //save the value of the input
  const [selectedMarker, setSelectedMarker] = useState<number>(); //save the id of the selected marker

  const [saveSearch, setSaveSearch] = useState<SaveSearchType[]>([]);

  const handleSaveSearch = (
    selectFilter: string | undefined,
    val: string | DateFilter
  ) => {
    if (!selectFilter) return;
    setSaveSearch([...saveSearch, { selectFilter, val }]);

    //clean the input
    setFilter("");
    setDateFilter({
      from: "",
      to: "",
    });

    const existMarker = config?.marker?.find((item) => {
      const sortedItemFilters = item.filters
        .map((filter) => JSON.stringify(filter))
        .sort();
      const sortedNewSaveSearch = [...saveSearch, { selectFilter, val }]
        .map((filter) => JSON.stringify(filter))
        .sort();
      return (
        JSON.stringify(sortedItemFilters) ===
        JSON.stringify(sortedNewSaveSearch)
      );
    })?.id;

    if (existMarker) {
      setSelectedMarker(existMarker);
    } else {
      setSelectedMarker(undefined);
    }
  };

  const handleSelectFilter = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectFilter(e.target.value);
  };

  const hanldeDeleteSavaedSearch = (index: number) => {
    const newSaveSearch = [...saveSearch];
    newSaveSearch.splice(index, 1);
    setSaveSearch(newSaveSearch);
    const existMarker = config?.marker.find((item) => {
      const sortedItemFilters = item.filters
        .map((filter) => JSON.stringify(filter))
        .sort();
      const sortedNewSaveSearch = newSaveSearch
        .map((filter) => JSON.stringify(filter))
        .sort();
      return (
        JSON.stringify(sortedItemFilters) ===
        JSON.stringify(sortedNewSaveSearch)
      );
    })?.id;
    if (existMarker) {
      setSelectedMarker(existMarker);
    } else {
      setSelectedMarker(undefined);
    }
  };

  const handleSaveMarker = (value: SaveSearchType[]) => {
    if (!config?.marker) return;
    if (selectedMarker == undefined) {
      toggleSaveMarkers(value);
      setSelectedMarker(config?.marker.length + 1);
    }
  };

  const handleLoadMarker = (marker: MarkersType) => {
    if (marker.id == selectedMarker) {
      setSelectedMarker(undefined);
      setSaveSearch([]);
    } else {
      setSelectedMarker(marker.id);
      setSaveSearch(marker.filters);
    }
  };

  const handleDeleteMarker = (idMarker: number) => {
    toggleDeleteMarker(idMarker);
    if (idMarker != selectedMarker) return;
    setSelectedMarker(undefined);
    setSaveSearch([]);
  };

  const reload = reloadFn
    ? async () => {
        setReloadCount((old) => old + 1);
        await reloadFn();
        toast("Recarga exitosa");
      }
    : undefined;

  //? end: get the option to filter the row
  return (
    <div className="flex flex-col h-full flex-1">
      <TableControls
        tableCurrentRef={tableRef.current}
        loading={!data}
        filter={[filter, setFilter]}
        dateFilterState={[dateFilter, setDateFilter]}
        reload={reload}
        add={add}
        view={[view, setView]}
        reports={reports}
        columns={columns}
        buttons={buttons}
        config={config}
        toggleColumn={toggleColumn}
        handleSelectFilter={handleSelectFilter}
        handleSaveSearch={handleSaveSearch}
        selectFilter={selectFilter}
        saveSearch={saveSearch}
        hanldeDeleteSavaedSearch={hanldeDeleteSavaedSearch}
        handleDeleteMarker={handleDeleteMarker}
        handleLoadMarker={handleLoadMarker}
        handleSaveMarker={handleSaveMarker}
        selectedMarker={selectedMarker}
        reloadCount={reloadCount}
        search={search}
        handleReorder={handleReorder}
      >
        {data ? (
          <TanstackTable
            ref={tableRef}
            columns={onlyColumns}
            data={data}
            filter={filter}
            dateFilter={dateFilter}
            setFilter={setFilter}
            sorting={sorting}
            setSorting={setSorting}
            onClickRow={onClickRow}
            view={view}
            controls={allControls}
            rowStyle={rowStyle}
            config={config}
            fixKey={fixKey}
            selectFilter={selectFilter}
            saveSearch={saveSearch}
          />
        ) : (
          <TableSkeleton columns={onlyColumns} />
        )}
      </TableControls>
    </div>
  );
};
