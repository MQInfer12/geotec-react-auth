import IconError from "../../../assets/icons/iconError";

interface Props {
  error?: string;
}

const ErrorComp = ({ error }: { error: string }) => {
  return (
    <div className="absolute right-0 top-0 p-2 h-full aspect-square z-10 animate-[appear_.5s]">
      <div className="relative text-danger">
        <IconError />
        <small className="hidden peer-hover:block absolute max-w-xs w-max bg-gray-100 right-2/4 shadow-lg border border-gray-300 text-xs px-2 py-2 rounded-lg rounded-tr-none text-danger animate-[appear_.5s]">
          {error}
        </small>
      </div>
    </div>
  );
};

const InputError = ({ error }: Props) => {
  if (error) return <ErrorComp error={error} />;
};

export default InputError;
