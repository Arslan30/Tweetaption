import clsx from "clsx";
import { useMemo } from "react";

const Checkbox = ({
  label,
  disabled = false,
  secondaryStyle = false
}: {
  label: string,
  disabled?: boolean
  secondaryStyle?: boolean
}) => {
  const randomId = useMemo(() => {
    return Math.random().toString(36).substring(7);
  }, [])

  const COMPONENTS = {
    input: <input disabled={disabled} type="checkbox" id={randomId} className="h-4 w-4 rounded-sm border-gray-300 text-rose-600 shadow-sm focus:border-rose-300 focus:ring focus:ring-rose-200 focus:ring-opacity-50 focus:ring-offset-0 disabled:cursor-not-allowed disabled:text-gray-400" />,
    label: <label htmlFor={randomId} className={clsx("text-md text-gray-700 leading-none", secondaryStyle && "flex-1")}>{label}</label>
  }

  return (
    <div className="flex items-center space-x-3 font-geist">
      {!secondaryStyle ? (
        <>
          {COMPONENTS.input}
          {COMPONENTS.label}

        </>
      ) : (
        <>
          {COMPONENTS.label}
          {COMPONENTS.input}
        </>
      )}
    </div>
  )
}

export default Checkbox;