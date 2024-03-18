import Skeleton from "../loader/skeleton";
import { ColumnDef } from "@tanstack/react-table";
interface Props {
  columns: ColumnDef<any, any>[];
}
const TableSkeleton = ({ columns }: Props) => {
  return (
    <>
      {" "}
      <div className="w-full h-full flex flex-col justify-around border border-gray-300 rounded shadow animate-pulse md:p-6">
        <div className="w-[100%] h-[40px] flex flex-row">
          {columns.map((_, i) => (
            <Skeleton key={i} />
          ))}
        </div>
        {Array.from({ length: 5 }, (_, k) => (
          <div key={k} className="w-[100%] h-3  flex flex-row">
            {columns.map((_, q) => (
              <Skeleton key={q} />
            ))}
          </div>
        ))}
      </div>
    </>
  );
};

export default TableSkeleton;
