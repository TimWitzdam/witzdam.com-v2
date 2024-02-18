import { useState } from "react";

interface Props {
  value: string;
  numCols: number;
  numRows: number;
  rootGrid: any;
  increaseIndicator: boolean;
  setRowSpan(e: number, value: string): void;
  setColSpan(e: number, value: string): void;
  rowSpan: number;
  colSpan: number;
}

export default function GridItem(props: Props) {
  const [isDragging, setIsDragging] = useState(false);
  const [initialX, setInitialX] = useState(0);
  const [initialY, setInitialY] = useState(0);
  const [moveX, setMoveX] = useState(0);
  const [moveY, setMoveY] = useState(0);

  const handleMouseDown = (event: React.MouseEvent) => {
    event.preventDefault();
    setIsDragging(true);
    setInitialX(event.clientX);
    setInitialY(event.clientY);
    setMoveX(event.clientX);
    setMoveY(event.clientY);
  };

  const handleMouseUp = () => {
    setIsDragging(false);
    const overlay = document.getElementById(`overlay-${props.value}`);
    if (!overlay) return;

    overlay.style.width = "100%";
    overlay.style.height = "100%";
  };

  const handleMouseMove = (event: React.MouseEvent) => {
    if (isDragging) {
      const overlay = document.getElementById(`overlay-${props.value}`);
      if (!overlay) return;

      const deltaX = event.clientX - moveX;
      const deltaY = event.clientY - moveY;

      overlay.style.width = `${overlay.clientWidth + deltaX}px`;
      overlay.style.height = `${overlay.clientHeight + deltaY}px`;

      setMoveX(event.clientX);
      setMoveY(event.clientY);

      const defaultWidth = props.rootGrid.current.clientWidth / props.numCols;
      const newColSpan = Math.ceil(overlay.clientWidth / defaultWidth! - 0.5);
      const defaultHeight = props.rootGrid.current.clientHeight / props.numRows;
      const newRowSpan = Math.ceil(overlay.clientHeight / defaultHeight! - 0.5);

      if (newColSpan !== props.colSpan) {
        props.setColSpan(newColSpan, props.value);
      }
      if (newRowSpan !== props.rowSpan) {
        props.setRowSpan(newRowSpan, props.value);
      }
    }
  };

  const rowSpanVariations = {
    1: "row-span-1",
    2: "row-span-2",
    3: "row-span-3",
    4: "row-span-4",
    5: "row-span-5",
    6: "row-span-6",
    7: "row-span-7",
    8: "row-span-8",
    9: "row-span-9",
    10: "row-span-10",
    11: "row-span-11",
    12: "row-span-12",
  };

  const colSpanVariations = {
    1: "col-span-1",
    2: "col-span-2",
    3: "col-span-3",
    4: "col-span-4",
    5: "col-span-5",
    6: "col-span-6",
    7: "col-span-7",
    8: "col-span-8",
    9: "col-span-9",
    10: "col-span-10",
    11: "col-span-11",
    12: "col-span-12",
  };

  // console.log(props.rowSpan, props.colSpan);

  return (
    <div
      id={props.value}
      className={
        "relative p-4 rounded-lg shadow-lg bg-sky-500 group " +
        " " +
        rowSpanVariations[props.rowSpan] +
        " " +
        colSpanVariations[props.colSpan]
      }
    >
      <div className={"text-white font-bold text-center"}>{props.value}</div>
      <div
        onMouseUp={handleMouseUp}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseUp}
        id={`overlay-${props.value}`}
        className={`absolute top-0 left-0 bg-[#444444] w-full h-full rounded-lg ${
          isDragging ? "opacity-70 z-10" : "opacity-0"
        }`}
      ></div>
      <div
        onMouseDown={handleMouseDown}
        className="opacity-0 bottom-0 absolute right-0 p-2 rotate-45 cursor-se-resize  group-hover:opacity-100 hover:scale-125 transition-all"
      >
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
