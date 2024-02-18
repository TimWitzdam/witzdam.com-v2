import { useRef } from "react";

interface Props {
  id: string;
  type: astroHTML.JSX.HTMLInputTypeAttribute;
  placeholder?: string;
  value?: string;
  fullWidth?: boolean;
  inputMode?:
    | "none"
    | "text"
    | "tel"
    | "url"
    | "email"
    | "numeric"
    | "decimal"
    | "search"
    | undefined
    | null;
  pattern?: string;
  disabled?: boolean;
  autocomplete?: string;
  updateFunction?: (e: number) => void;
  disableClear?: boolean;
}

export default function BaseInput(props: Props) {
  const {
    id,
    type,
    placeholder,
    value,
    fullWidth,
    inputMode,
    pattern,
    disabled,
    autocomplete,
    updateFunction,
    disableClear,
  } = props;
  const input = useRef(null);

  function clearInput() {
    if (disabled || disableClear) return;
    input.current.value = "";
    input.current.focus();
    input.current.dispatchEvent(new Event("input", { bubbles: true }));
  }

  return (
    <div
      className={
        "relative border-2 border-white w-fit rounded-xl focus-within:bg-white focus-within:bg-opacity-10 transition-all flex items-center pr-4" +
        (fullWidth ? " w-full" : "") +
        (disabled ? " bg-white bg-opacity-10" : "")
      }
    >
      <input
        ref={input}
        className="outline-none bg-transparent p-3 px-6 w-full"
        id={id}
        type={type}
        placeholder={placeholder}
        value={value}
        inputMode={inputMode}
        pattern={pattern}
        disabled={disabled}
        autoComplete={autocomplete}
        onInput={(e) =>
          updateFunction
            ? updateFunction(parseInt(e.currentTarget.value))
            : null
        }
      />
      {!disabled && !disableClear ? (
        <div
          onClick={clearInput}
          className="input-clear rounded-full w-6 h-6 grid place-content-center bg-white text-black font-bold text-sm transition-transform ease-in-out ml-auto cursor-pointer"
        >
          X
        </div>
      ) : null}
      <style>
        {`input:placeholder-shown + div {
    transform: scale(0);
    pointer-events: none;
  }`}
      </style>
    </div>
  );
}
