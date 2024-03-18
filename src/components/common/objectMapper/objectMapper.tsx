import Title from "../title/title";

interface Props {
  obj: Record<string, any>;
  exclude?: string[];
}

function capitalizeFirstLetter(str: string) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

const ObjectMapper = ({ obj, exclude = [] }: Props) => {
  return (
    <div className="flex flex-col gap-2">
      {Object.keys(obj).map((key) =>
        !exclude.includes(key) ? (
          <div key={key} className="flex flex-col gap-1">
            <Title textSize="sm">{capitalizeFirstLetter(key)}</Title>
            <p className="text-sm text-black/80 whitespace-nowrap overflow-hidden text-ellipsis">
              {obj[key] || "N/A"}
            </p>
          </div>
        ) : (
          <></>
        )
      )}
    </div>
  );
};

export default ObjectMapper;
