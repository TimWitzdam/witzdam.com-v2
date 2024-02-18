import { useRef } from "react";

interface Props {
  index: number;
  add(index: number, size: { width: number; height: number }): void;
}

export default function GridItem(props: Props) {
  const el = useRef(null);

  function onClick(e: React.MouseEvent) {
    if (el.current === null) return;
    // Type assertion: Forcefully tell TypeScript that el.current is not null
    const element = el.current as HTMLElement;
    props.add(props.index, {
      width: element.clientWidth,
      height: element.clientHeight,
    });
  }

  return (
    <div
      onClick={onClick}
      id={props.index.toString()}
      ref={el}
      className={"relative p-4 rounded-lg shadow-lg bg-sky-500 group"}
    >
      <div className={"text-white font-bold text-center"}>+</div>
      <div className="opacity-0 bottom-0 absolute right-0 p-2 rotate-45 cursor-se-resize  group-hover:opacity-100 hover:scale-125 transition-all">
        <svg
          fill="currentColor"
          height="12px"
          width="12px"
          version="1.1"
          id="Layer_1"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 330 330"
        >
          <path
            id="XMLID_222_"
            d="M250.606,154.389l-150-149.996c-5.857-5.858-15.355-5.858-21.213,0.001
	c-5.857,5.858-5.857,15.355,0.001,21.213l139.393,139.39L79.393,304.394c-5.857,5.858-5.857,15.355,0.001,21.213
	C82.322,328.536,86.161,330,90,330s7.678-1.464,10.607-4.394l149.999-150.004c2.814-2.813,4.394-6.628,4.394-10.606
	C255,161.018,253.42,157.202,250.606,154.389z"
          />
        </svg>
      </div>
    </div>
  );
}
