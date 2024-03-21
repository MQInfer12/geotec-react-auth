import Button from "../button/button";
import TableSearch from "./tableSearch";
import { DateFilter, TableButton, TableView } from "./tableContainer";
import { ColumnDef } from "@tanstack/react-table";
import { TableConfig, VisibleColumn } from "./hooks/useTableConfig";
import Dropdown from "../dropdown/dropdown";
import { DownloadTableExcel } from "react-export-table-to-excel";
import TableFilters from "./tableFilters";
import { MarkersType, SaveSearchType } from "../../../interfaces/SaveSearch";
import IconReload from "../../../assets/icons/iconReload";
import IconDownload from "../../../assets/icons/iconExport";
import IconPDF from "../../../assets/icons/iconPDF";
import IconXLSX from "../../../assets/icons/iconXLSX";
import IconColumn from "../../../assets/icons/iconColumn";
import IconAdd from "../../../assets/icons/iconAdd";
import IconBack from "../../../assets/icons/iconBack";

interface Props {
  filter: [string, React.Dispatch<React.SetStateAction<string>>];
  dateFilterState: [
    DateFilter,
    React.Dispatch<React.SetStateAction<DateFilter>>
  ];
  reload?: () => void;
  add?: () => void;
  view: [TableView, React.Dispatch<React.SetStateAction<TableView>>];
  loading: boolean;
  tableCurrentRef: HTMLTableElement | null;
  reports: boolean;
  columns: ColumnDef<any, any>[];
  buttons: TableButton[];
  config: TableConfig | null;
  toggleColumn: (columnName: string) => void;
  handleSelectFilter: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  handleSaveSearch: (
    selectFilter: string | undefined,
    val: string | DateFilter
  ) => void;
  selectFilter: string | undefined;
  saveSearch: SaveSearchType[];
  hanldeDeleteSavaedSearch: (index: number) => void;
  handleSaveMarker: (value: SaveSearchType[]) => void;
  handleLoadMarker: (marker: MarkersType) => void;
  handleDeleteMarker: (idMarker: number) => void;
  selectedMarker: number | undefined;
  reloadCount: number;
  children: JSX.Element;
  handleReorder: (dragged: VisibleColumn, dropped: VisibleColumn) => void;
  search: boolean;
}

const TableControls = ({
  children,
  buttons,
  columns,
  config,
  filter,
  handleSaveSearch,
  handleSelectFilter,
  hanldeDeleteSavaedSearch,
  loading,
  reports,
  saveSearch,
  selectFilter,
  tableCurrentRef,
  toggleColumn,
  view,
  add,
  reload,
  handleDeleteMarker,
  handleLoadMarker,
  handleSaveMarker,
  selectedMarker,
  reloadCount,
  search,
  handleReorder,
  dateFilterState,
}: Props) => {
  const [viewValue, setView] = view;

  return (
    <div className="h-full w-full flex flex-col gap-2">
      {viewValue === "table" ? (
        <>
          <div className="flex justify-between">
            <div className="h-full">
              {buttons.length > 0 && (
                <div className="h-full flex gap-2 border px-1 rounded-md items-center relative">
                  {buttons.map((button, i) => (
                    <Button
                      type="button"
                      key={i}
                      size="small"
                      btnType={button.active ? "primary" : "secondary"}
                      icon={button.icon}
                      disabled={loading || button.disabled}
                      title={button.title}
                      onClick={button.fn}
                    >
                      {button.title}
                    </Button>
                  ))}
                </div>
              )}
            </div>
            <div className="flex gap-2">
              {reload && (
                <Button
                  type="button"
                  key={reloadCount}
                  onClick={reload}
                  btnType="secondary"
                  icon={
                    <div className="animate-[spin_.3s]">
                      <IconReload />
                    </div>
                  }
                />
              )}
              {reports && (
                <Dropdown
                  toggleElement={(open) => (
                    <Button toggle={open} icon={<IconDownload />} type="button">
                      Exportar
                    </Button>
                  )}
                >
                  <div className="flex gap-2 flex-col">
                    <Button
                      onClick={() => setView("PDF")}
                      btnType="secondary"
                      width="full"
                      icon={<IconPDF />}
                      type="button"
                    >
                      Ver en PDF
                    </Button>
                    <DownloadTableExcel
                      filename="tabla"
                      sheet="tabla"
                      currentTableRef={tableCurrentRef}
                    >
                      <Button
                        type="button"
                        btnType="secondary"
                        width="full"
                        icon={<IconXLSX />}
                      >
                        Exportar a Excel
                      </Button>
                    </DownloadTableExcel>
                  </div>
                </Dropdown>
              )}
              <Dropdown
                toggleElement={(open) => (
                  <Button toggle={open} icon={<IconColumn />} type="button">
                    Columnas
                  </Button>
                )}
              >
                <TableFilters
                  config={config}
                  toggleColumn={toggleColumn}
                  handleReorder={handleReorder}
                />
              </Dropdown>
              {add && (
                <Button type="button" onClick={add} icon={<IconAdd />}>
                  Añadir
                </Button>
              )}
            </div>
          </div>
          {search && (
            <TableSearch
              filter={filter}
              columns={columns}
              handleSelectFilter={handleSelectFilter}
              handleSaveSearch={handleSaveSearch}
              selectFilter={selectFilter}
              saveSearch={saveSearch}
              hanldeDeleteSavaedSearch={hanldeDeleteSavaedSearch}
              handleDeleteMarker={handleDeleteMarker}
              handleLoadMarker={handleLoadMarker}
              handleSaveMarker={handleSaveMarker}
              selectedMarker={selectedMarker}
              config={config}
              dateFilterState={dateFilterState}
            />
          )}
        </>
      ) : (
        <div>
          <Button onClick={() => setView("table")} icon={<IconBack />}>
            Volver
          </Button>
        </div>
      )}
      <div className="flex-1 overflow-auto h-96">{children}</div>
    </div>
  );
};

export default TableControls;
