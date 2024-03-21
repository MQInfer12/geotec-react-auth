import { useNavigate } from "react-router-dom";
import { ApiResponse } from "../../../interfaces/apiResponse";
import { useGet } from "../../../hooks/useGet";
import Button from "../button/button";
import IconBack from "../../../assets/icons/iconBack";
import Title from "../title/title";

type Title = {
  title: string;
  children: React.ReactNode;
  backRoute?: string | (() => void);
  padding?: boolean;
};

type BackendTitle<T> = {
  title: string;
  children: ({
    res,
    setRes,
  }: {
    res: ApiResponse<T> | null;
    setRes: React.Dispatch<React.SetStateAction<ApiResponse<T> | null>>;
  }) => React.ReactNode | React.ReactNode;
  backRoute?: string | (() => void);
  titleRequestRoute: string;
  titleRequestKey: keyof T;
  default?: string;
  padding?: boolean;
};

type Props<T> = Title | BackendTitle<T>;

export const PageContainer = <T,>({
  title,
  children,
  backRoute,
  padding = true,
  ...props
}: Props<T>) => {
  const navigate = useNavigate();
  const fromBackend = "titleRequestRoute" in props;
  const send = fromBackend && !props.default;
  const { res, setRes } = useGet<T>(
    fromBackend ? props.titleRequestRoute : "",
    {
      send,
    }
  );

  const bodyClassNames = ["flex-1 overflow-auto relative"];
  if (padding) {
    bodyClassNames.push("px-5");
  }

  const renderName = () => {
    if (!fromBackend) return title;
    if (props.default) return title + " - " + props.default;
    if (!res) return title;
    return title + " - " + res.data[props.titleRequestKey];
  };

  return (
    <div className="py-5 flex flex-col gap-3 h-full">
      <div className="px-5 flex gap-2 min-h-9">
        {backRoute && (
          <Button
            onClick={() =>
              typeof backRoute === "function"
                ? backRoute()
                : navigate(backRoute)
            }
            icon={<IconBack />}
            btnType="tertiary"
          />
        )}
        <Title textSize="2xl">{renderName()}</Title>
      </div>

      <div className={bodyClassNames.join(" ")}>
        {typeof children === "function" ? children({ res, setRes }) : children}
      </div>
    </div>
  );
};


