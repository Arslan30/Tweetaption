import ClipLoader from "react-spinners/ClipLoader";

export const Spinner: React.FC<{
  size: number;
  className?: string;
}> = ({ size, className }) => {

  return (
    <ClipLoader
    color="white"
    size={size}
    aria-label="Loading Spinner"
    className={className}
  />
  );
};
