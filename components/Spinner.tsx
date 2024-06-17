import ClipLoader from "react-spinners/ClipLoader";

export const Spinner: React.FC<{
  size: number;
  color?: string;
  className?: string;
}> = ({ size, className, color }) => {

  return (
    <ClipLoader
    size={size}
    color={color}
    aria-label="Loading Spinner"
    className={className}
  />
  );
};
