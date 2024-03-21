import { useUser } from "../..";
import IconX from "../../assets/icons/iconX";
import Button from "../../components/common/button/button";
import { MenuHijo } from "../../interfaces/menu";
import styles from "../dashboard.module.css";
import Link from "./link";

interface Props {
  page: number;
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  openNav: boolean;
  filterRoutes: (page: MenuHijo) => boolean;
  subtitleOnPage: Record<string, string>;
}

const Right = ({
  page,
  open,
  openNav,
  setOpen,
  filterRoutes,
  subtitleOnPage,
}: Props) => {
  const { menus: asideData } = useUser();
  const pageSelected = asideData?.find((value) => value.id === page);
  const handleCloseNav = () => {
    if (!openNav) {
      setOpen(false);
    }
  };

  const classNames = [
    styles.right,
    "z-50 transition-all duration-300 overflow-hidden bg-gray-700 fixed h-full left-20",
  ];
  if (open) {
    classNames.push("w-64");
  } else {
    classNames.push("w-0 pointer-events-none");
  }

  const getPagesToRender = () => {
    if (!pageSelected) return [];
    const pages = pageSelected.hijos.filter(filterRoutes);
    return pages;
  };

  const pages = getPagesToRender();
  const selectedPageWithSubtitle =
    pageSelected && subtitleOnPage[pageSelected.nombre];
  return (
    <div className={classNames.join(" ")}>
      <header className="h-20 flex items-center justify-center relative">
        <div className="absolute top-2 right-2">
          <Button
            onClick={handleCloseNav}
            btnType="tertiary"
            icon={<IconX />}
          />
        </div>
        <h2 className="text-gray-400 whitespace-nowrap">
          <div className="flex flex-col items-center">
            <p>{pageSelected?.nombre}</p>
            {selectedPageWithSubtitle && (
              <small className="text-blue-500">
                {selectedPageWithSubtitle}
              </small>
            )}
          </div>
        </h2>
      </header>
      <div className="px-4 flex flex-col gap-1" key={pageSelected?.nombre}>
        <p className="w-[calc(256px_-_32px)] text-center leading-6   text-gray-400 text-sm">
          {pages.length === 0 && "Por el momento no puedes hacer nada aquí"}
        </p>
        {pages.map((link, i) => (
          <Link
            key={i}
            onClick={handleCloseNav}
            disabled={link.hijos.length == 0 && !link.accion}
            to={link.accion || ""}
            childrens={link.hijos}
            tab={0}
          >
            {link.nombre}
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Right;
