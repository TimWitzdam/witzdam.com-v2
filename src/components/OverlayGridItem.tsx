interface Props {
  index: number;
  position: { x: number; y: number };
  size: { width: number; height: number };
  handleRightClick: (index: number) => void;
  handleLeftClick: (index: number) => void;
  handleTopClick: (index: number) => void;
  handleBottomClick: (index: number) => void;
}

export default function GridItem(props: Props) {
  console.log(props.size);
  function handleRightClick() {
    props.handleRightClick(props.index);
  }

  function handleLeftClick() {
    props.handleLeftClick(props.index);
  }

  function handleTopClick() {
    props.handleTopClick(props.index);
  }

  function handleBottomClick() {
    props.handleBottomClick(props.index);
  }

  return (
    <div
      id={props.index.toString()}
      className={
        "text-black absolute p-4 rounded-lg shadow-lg bg-white group z-10 grid place-content-center"
      }
      style={{
        width: props.size.width,
        height: props.size.height,
        transform: `translate(${props.position.x}px, ${props.position.y}px)`,
      }}
    >
      <div className={"text-black font-bold text-center"}>
        {props.index + 1}
      </div>
      <div
        onClick={handleRightClick}
        className="text-black opacity-0 top-1/2 absolute right-0 -translate-y-1/2 p-2 cursor-pointer hover:!opacity-100 hover:scale-125 transition-all group-hover:opacity-25"
      >
        ▶
      </div>
      <div
        onClick={handleLeftClick}
        className="text-black opacity-0 top-1/2 absolute left-0 -translate-y-1/2 p-2 cursor-pointer hover:!opacity-100 hover:scale-125 transition-all group-hover:opacity-25"
      >
        ◀
      </div>
      <div
        onClick={handleTopClick}
        className="text-black opacity-0 -top-2 absolute left-1/2 -translate-x-1/2 p-2 cursor-pointer hover:!opacity-100 hover:scale-125 transition-all group-hover:opacity-25"
      >
        ▲
      </div>
      <div
        onClick={handleBottomClick}
        className="text-black opacity-0 -bottom-2 absolute left-1/2 -translate-x-1/2 p-2 cursor-pointer hover:!opacity-100 hover:scale-125 transition-all group-hover:opacity-25"
      >
        ▼
      </div>
    </div>
  );
}
