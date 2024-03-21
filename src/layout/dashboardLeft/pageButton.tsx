import { MenuHijo, MenuPadre } from "../../interfaces/menu";

interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  page: MenuPadre;
  active: boolean;
  open: boolean;
  activePage: boolean;
  activeLink: MenuHijo | undefined;
  asideIcons: Record<string, JSX.Element>;
}

const PageButton = ({
  page,
  active,
  open,
  activePage,
  activeLink,
  asideIcons,
  ...props
}: Props) => {
  const classNames = [
    "w-full min-h-20 aspect-square flex transition-all duration-300 flex-col justify-center gap-1",
  ];
  if ((open && active) || (!open && activePage)) {
    classNames.push("bg-primary-500 text-white");
  } else {
    classNames.push("text-gray-400");
  }

  return (
    <button {...props} className={classNames.join(" ")}>
      <div className="w-5 h-5 self-center">{asideIcons[page.icon]}</div>
      <div className="flex flex-col w-full">
        <p className="font-semibold text-xs px-1 overflow-hidden text-ellipsis">
          {page.nombre}
        </p>
        {activePage && (
          <small className="font-semibold text-center text-[10px] px-1 whitespace-nowrap overflow-hidden text-ellipsis">
            {activeLink?.nombre}
          </small>
        )}
      </div>
    </button>
  );
};

export default PageButton;
