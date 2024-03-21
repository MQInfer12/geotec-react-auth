import styles from "../dashboard.module.css";
import PageButton from "./pageButton";
import ModeButton from "./modeButton";
import LogoButton from "./logoButton";
import { useNavigate } from "react-router-dom";
import { useUser } from "../..";
import { useActiveNavPage } from "../../hooks/useActiveNavPage";

interface Props {
  page: number;
  setPage: React.Dispatch<React.SetStateAction<number>>;
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  openNav: boolean;
  initialRoute: string;
  asideIcons: Record<string, JSX.Element>;
  logo: string;
}

const Left = ({
  page,
  setPage,
  setOpen,
  open,
  openNav,
  initialRoute,
  asideIcons,
  logo
}: Props) => {
  const { menus: asideData } = useUser();
  const navigate = useNavigate();
  const { activePage, activeLink } = useActiveNavPage();
  const handleChangePage = (id: number) => {
    setPage(id);
    if (!openNav) {
      setOpen((old) => (page === id ? !old : true));
    }
  };

  return (
    <aside
      className={
        styles.aside +
        " z-50 h-full bg-gray-600 w-20 border-r border-gray-800 flex flex-col justify-between"
      }
    >
      <div className="flex flex-col h-[calc(100%_-_80px)]">
        <LogoButton
          onClick={() => {
            setOpen(false);
            navigate(initialRoute);
          }}
          initialRoute={initialRoute}
          open={open}
          logo={logo}
        />
        <div className="h-full flex flex-col overflow-y-auto no-scrollbar">
          {asideData?.map((value) => (
            <PageButton
              key={value.id}
              onClick={() => handleChangePage(value.id)}
              active={page === value.id}
              activePage={activePage?.id === value.id}
              page={value}
              open={open}
              activeLink={activeLink}
              asideIcons={asideIcons}
            />
          ))}
        </div>
      </div>

      <ModeButton />
    </aside>
  );
};

export default Left;
