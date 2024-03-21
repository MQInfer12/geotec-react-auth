import IconSearch from "@assets/icons/iconSearch";
import Input from "../inputs/input";
import Button from "../button/button";
import IconX from "@assets/icons/iconX";
import IconFilterAdd from "@assets/icons/iconFilterAdd";
import IconBookmark from "@assets/icons/iconBookmark";
import IconSave from "@assets/icons/iconSave";
import { MarkersType, SaveSearchType } from "@/interfaces/SaveSearch";
import { ColumnDef } from "@tanstack/react-table";
import Dropdown from "../dropdown/dropdown";
import { TableConfig } from "./hooks/useTableConfig";
import IconTrash from "@assets/icons/iconTrash";
import { DateFilter } from "./tableContainer";
import { useEffect } from "react";

interface Props {
  dateFilterState: [
    DateFilter,
    React.Dispatch<React.SetStateAction<DateFilter>>
  ];
  filter: [string, React.Dispatch<React.SetStateAction<string>>];
  columns: ColumnDef<any, any>[];
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
  config: TableConfig | null;
}

const TableSearch = ({
  columns,
  filter,
  handleSaveSearch,
  handleSelectFilter,
  hanldeDeleteSavaedSearch,
  saveSearch,
  selectFilter,
  handleDeleteMarker,
  handleLoadMarker,
  handleSaveMarker,
  selectedMarker,
  config,
  dateFilterState,
}: Props) => {
  const [filterValue, setFilter] = filter;
  const [dateFilter, setDateFilter] = dateFilterState;

  const selectedColumn = columns.find(
    (col) => col.header?.toString() === selectFilter
  );
  const inputType = selectedColumn?.meta?.filterType;

  const thereIsFilterBack = selectedColumn?.meta?.filterBackend;

  useEffect(() => {
    setFilter("");
    setDateFilter({
      from: "",
      to: "",
    });
  }, [inputType]);

  //? exceute the function to call to filter back
  const handleSaveDataInput = () => {
    selectedColumn?.meta?.filterBackend?.(dateFilter);
  };

  const displaySaveSearchName = (saveSearch: SaveSearchType) => {
    const selectedColumn = columns.find(
      (col) => col.header?.toString() === saveSearch.selectFilter
    );
    const inputType = selectedColumn?.meta?.filterType;

    let valueName = saveSearch.val;
    if (inputType === "date") {
      //@ts-ignore
      const [from, to] = [saveSearch.val.from, saveSearch.val.to];
      if (!from) {
        valueName = "Hasta " + to;
      }
      if (!to) {
        valueName = "Desde " + from;
      }
      if (from && to) {
        valueName = from + " a " + to;
      }
    }

    return `${saveSearch.selectFilter}: ${valueName}`;
  };

  return (
    <div className="flex justify-between gap-4">
      <div className="flex">
        <div className="w-32">
          <select
            value={selectFilter}
            onChange={handleSelectFilter}
            className="w-full px-2 py-1 pr-10 text-sm border outline-none border-gray-300 text-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-300 transition-all duration-300 bg-white disabled:bg-gray-100"
          >
            {columns.map((v: ColumnDef<any, any>) => (
              <option key={v.header?.toString()} value={v.header?.toString()}>
                {v.header?.toString()}
              </option>
            ))}
          </select>
        </div>
        <div key={selectFilter} className="flex w-80">
          {inputType === "date" ? (
            <>
              <div className="max-w-40">
                <Input
                  size="small"
                  icon={<IconSearch />}
                  placeholder="Buscar..."
                  value={dateFilter.from}
                  onChange={(e) =>
                    setDateFilter((old) => ({
                      ...old,
                      from: e.target.value,
                    }))
                  }
                  minWidth="160px"
                  type="date"
                />
              </div>
              <div className="max-w-40">
                <Input
                  size="small"
                  icon={<IconSearch />}
                  placeholder="Buscar..."
                  value={dateFilter.to}
                  onChange={(e) =>
                    setDateFilter((old) => ({
                      ...old,
                      to: e.target.value,
                    }))
                  }
                  minWidth="160px"
                  type="date"
                />
              </div>
            </>
          ) : (
            <>
              <Input
                size="small"
                icon={<IconSearch />}
                placeholder="Buscar..."
                value={filterValue}
                onChange={(e) => setFilter(e.target.value)}
              />
            </>
          )}
        </div>
        {(filterValue || dateFilter.from || dateFilter.to) && (
          <>
            <Button
              type="button"
              borderRadius="0"
              size="inputSmall"
              btnType="quaternary"
              icon={<IconX />}
              onClick={() => {
                setFilter("");
                setDateFilter({
                  from: "",
                  to: "",
                });
              }}
            />
            <Button
              type="button"
              borderRadius="0"
              size="inputSmall"
              btnType="quaternary"
              icon={<IconFilterAdd />}
              onClick={() =>
                handleSaveSearch(
                  selectFilter,
                  inputType === "date" ? dateFilter : filterValue
                )
              }
            />
          </>
        )}

        {/* // ? show the button to filter in the back */}
        {thereIsFilterBack && (
          <div className="max-w-40">
            <button className="h-3" onClick={handleSaveDataInput}>
              <IconSearch />
              <span>Buscar</span>
            </button>
          </div>
        )}
      </div>
      <div className="flex gap-2 flex-1 overflow-auto justify-end">
        {saveSearch.map((v, i) => (
          <Button
            type="button"
            key={i}
            btnType="quaternary"
            size="inputSmall"
            width="160px"
            title={displaySaveSearchName(v)}
            icon={<IconX />}
            onClick={() => hanldeDeleteSavaedSearch(i)}
          >
            {displaySaveSearchName(v)}
          </Button>
        ))}
        <div className="flex gap-2">
          <Dropdown
            toggleElement={(open) => (
              <Button
                type="button"
                size="inputSmall"
                toggle={selectedMarker != undefined || open}
                icon={<IconBookmark />}
              >
                Guardados
              </Button>
            )}
          >
            <div className="flex gap-2 flex-col">
              {config?.marker?.length === 0 && (
                <small className="text-black/60 text-center">
                  No tienes búsquedas guardadas aún
                </small>
              )}
              {config?.marker?.map((data) => (
                <Button
                  type="button"
                  key={data.id}
                  onClick={() => handleLoadMarker(data)}
                  toggle={data.id === selectedMarker}
                  width="full"
                  icon={<IconTrash />}
                  onClickIcon={() => handleDeleteMarker(data.id)}
                >
                  {`Marcadores ${data.id}`}
                </Button>
              ))}
            </div>
          </Dropdown>
          <Button
            type="button"
            title="Guardar búsqueda"
            size="inputSmall"
            btnType="secondary"
            icon={<IconSave />}
            onClick={() => handleSaveMarker(saveSearch)}
          />
        </div>
      </div>
    </div>
  );
};

export default TableSearch;
