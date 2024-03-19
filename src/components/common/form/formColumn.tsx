interface Props {
  children?: React.ReactNode;
}

const FormColumn = ({ children }: Props) => {
  return <div className="min-w-80 flex-1 flex flex-col gap-2">{children}</div>;
};

export default FormColumn;
