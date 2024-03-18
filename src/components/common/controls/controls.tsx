import { useId } from "react";

export interface Control<T> {
  label: string;
  fn: (row: T) => void;
  on?: (row: T) => boolean;
}

interface Props<T> {
  controls: Control<T>[];
  item: T;
}

const Controls = <T,>({ controls, item }: Props<T>) => {
  const id = useId();

  const handleActions = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const option = controls.find((control) => control.label === e.target.value);
    if (!option) return;
    option.fn(item);
  };

  return (
    <select
      onChange={handleActions}
      value=""
      className={"bg-transparent w-32"}
      id={id}
    >
      <option value="" disabled>
        Acciones
      </option>
      {controls.map((control) =>
        !control.on ? (
          <option key={control.label} value={control.label}>
            {control.label}
          </option>
        ) : (
          control.on(item) && (
            <option key={control.label} value={control.label}>
              {control.label}
            </option>
          )
        )
      )}
    </select>
  );
};

export default Controls;
