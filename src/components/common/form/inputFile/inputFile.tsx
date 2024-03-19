import Placeholder from "../../../../assets/images/placeholder.jpg";
import { useEffect, useId, useState } from "react";
import Button from "../../button/button";
import { useFormikContext } from "formik";
import { useRequiredField } from "../formContext";

interface Props {
  title: string;
  defaultSrc?: string;
  name: string;
}

const InputFile = ({ title, defaultSrc, name }: Props) => {
  const [preview, setPreview] = useState<null | string>(null);
  const { values, setFieldValue } = useFormikContext();
  const required = useRequiredField(name);

  //@ts-ignore
  const value = values[name];

  const id = useId();

  const changeFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.length) {
      setFieldValue(name, e.target.files[0]);
    }
  };

  useEffect(() => {
    if (value) {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(value);
      fileReader.addEventListener("load", () => {
        setPreview(fileReader.result as string);
      });
    }
  }, [value]);

  const classNames = ["text-sm ml-2 font-semibold text-gray-700"];
  if (required) {
    classNames.push("after:content-['_*'] after:text-primary-700");
  }
  
  return (
    <div className="flex flex-col">
      <label className={classNames.join(" ")} htmlFor={id}>
        {title}
      </label>
      <div className="flex gap-8">
        <img
          className="h-56 aspect-square object-cover rounded-lg border border-gray-300 bg-cover bg-center"
          style={{
            backgroundImage: `url(${Placeholder})`,
          }}
          src={preview || defaultSrc}
        />
        <label
          className="hover:opacity-80 transition-all duration-300 h-fit cursor-pointer self-end"
          htmlFor={id}
        >
          <Button className="pointer-events-none" type="button">
            Cambiar
          </Button>
        </label>
        <input className="hidden" id={id} type="file" onChange={changeFile} />
      </div>
    </div>
  );
};

export default InputFile;
