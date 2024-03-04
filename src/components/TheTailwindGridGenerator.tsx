import { useEffect, useRef, useState } from "react";
import BaseInput from "./BaseInput";
import GridItem from "./GridItem";
import OverlayGridItem from "./OverlayGridItem";

interface GridItem {
  index: number;
}

interface OverlayGridItem {
  initialIndex: number;
  colSpan: number;
  rowSpan: number;
}

export default function TheTailwindGridGenerator(props: {
  apiAddress: string;
}) {
  const [rows, setRows] = useState(3);
  const [cols, setCols] = useState(3);
  const [gap, setGap] = useState(4);
  const [gridItems, setGridItems] = useState<GridItem[]>([]);
  const [overlayGridItems, setOverlayGridItems] = useState<OverlayGridItem[]>(
    []
  );
  const [itemSize, setItemSize] = useState({ width: 0, height: 0 });
  const [use, setUse] = useState(false);
  const [codeBlockLanguage, setCodeBlockLanguage] = useState<"html" | "jsx">(
    "html"
  );

  const rootGrid = useRef<HTMLDivElement>(null);
  const overlay = useRef(null);

  const colVariations: {
    [key: number]: string;
  } = {
    1: " grid-cols-1",
    2: " grid-cols-2",
    3: " grid-cols-3",
    4: " grid-cols-4",
    5: " grid-cols-5",
    6: " grid-cols-6",
    7: " grid-cols-7",
    8: " grid-cols-8",
    9: " grid-cols-9",
    10: " grid-cols-10",
    11: " grid-cols-11",
    12: " grid-cols-12",
  };

  const gapVariations: { [key: number]: string } = {
    0: " gap-0",
    1: " gap-1",
    2: " gap-2",
    3: " gap-3",
    4: " gap-4",
    5: " gap-5",
    6: " gap-6",
    7: " gap-7",
    8: " gap-8",
    9: " gap-9",
    10: " gap-10",
    11: " gap-11",
    12: " gap-12",
  };

  function apiIncrement() {
    if (!use) {
      setUse(true);
      fetch(`${props.apiAddress}/tools/inc`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          tool: "tailwind-grid-generator",
        }),
      });
    }
  }

  function setRowsSafe(e: number) {
    if (e < 1) e = 1;
    if (e > 12) e = 12;
    setRows(e);
    apiIncrement();
  }

  function setColsSafe(e: number) {
    if (e < 1) e = 1;
    if (e > 12) e = 12;
    setCols(e);
    apiIncrement();
  }

  function setGapSafe(e: number) {
    if (e < 0) e = 0;
    if (e > 12) e = 12;
    setGap(e);
    apiIncrement();
  }

  useEffect(() => {
    let arr = [];
    for (let i = 1; i < rows * cols + 1; i++) {
      arr.push({
        index: i,
      });
    }
    setGridItems(arr);
  }, [rows, cols]);

  function renderGrid() {
    return gridItems.map((item: GridItem) => {
      return (
        <GridItem
          key={item.index}
          index={item.index}
          add={addOverlayGridItem}
        />
      );
    });
  }

  function addOverlayGridItem(
    index: number,
    size: { width: number; height: number }
  ) {
    setItemSize(size);
    let arr = overlayGridItems;
    arr.push({
      initialIndex: index,
      colSpan: 1,
      rowSpan: 1,
    });
    setOverlayGridItems(arr);
    apiIncrement();
  }

  function calculateItemPosition(item: OverlayGridItem, index: number) {
    if (!rootGrid.current) return;
    let xOffset = 0;
    let yOffset = 0;

    // Calculate x offset
    if (item.initialIndex <= cols) {
      if (item.initialIndex === 1) {
        xOffset = 0;
      } else {
        xOffset =
          item.initialIndex * itemSize.width -
          itemSize.width +
          (gap * 4 * item.initialIndex - gap * 4);
      }
    } else {
      if (item.initialIndex % cols === 0) {
        xOffset =
          cols * itemSize.width - itemSize.width + gap * 4 * cols - gap * 4;
      } else {
        if (item.initialIndex % cols === 1) {
          xOffset =
            (item.initialIndex % cols) * itemSize.width - itemSize.width;
        } else {
          xOffset =
            (item.initialIndex % cols) * itemSize.width -
            itemSize.width +
            (gap * 4 * (item.initialIndex % cols) - gap * 4);
        }
      }
    }

    // Calculate y offset
    if (item.initialIndex > cols) {
      if (item.initialIndex % rows)
        yOffset =
          Math.floor((item.initialIndex - 1) / cols) * itemSize.height +
          gap * 4 * Math.floor((item.initialIndex - 1) / cols);
      else
        yOffset =
          Math.floor((item.initialIndex - 1) / cols) * itemSize.height +
          gap * 4 * Math.floor((item.initialIndex - 1) / cols);
    }

    let width =
      itemSize.width * item.colSpan + gap * 4 * item.colSpan - gap * 4;
    let height =
      itemSize.height * item.rowSpan + gap * 4 * item.rowSpan - gap * 4;

    if (width + xOffset > rootGrid.current.clientWidth) {
      width = rootGrid.current.clientWidth - xOffset;

      // reduce the item.colSpan so it can't go beyond the grid
      let newColSpan = Math.floor(width / itemSize.width);
      if (newColSpan === 0) newColSpan = 1;
      let newArr = overlayGridItems.map((item, i) => {
        if (i === index) {
          return { ...item, colSpan: newColSpan };
        }
        return item;
      });
      setOverlayGridItems(newArr);
    }

    if (height + yOffset > rootGrid.current.clientHeight) {
      height = rootGrid.current.clientHeight - yOffset;

      // reduce the item.rowSpan, so it can't go beyond the grid
      let newRowSpan = Math.floor(height / itemSize.height);
      if (newRowSpan === 0) newRowSpan = 1;
      let newArr = overlayGridItems.map((item, i) => {
        if (i === index) {
          return { ...item, rowSpan: newRowSpan };
        }
        return item;
      });
      setOverlayGridItems(newArr);
    }

    return { xOffset, yOffset, width, height };
  }

  function renderOverlayGrid() {
    return overlayGridItems.map((item: OverlayGridItem, index: number) => {
      const { xOffset, yOffset, width, height } = calculateItemPosition(
        item,
        index
      ) as {
        xOffset: number;
        yOffset: number;
        width: number;
        height: number;
      };

      return (
        <OverlayGridItem
          key={index}
          index={index}
          position={{ x: xOffset, y: yOffset }}
          size={{
            width,
            height,
          }}
          handleRightClick={handleOverlayRightClick}
          handleLeftClick={handleOverlayLeftClick}
          handleTopClick={handleOverlayTopClick}
          handleBottomClick={handleOverlayBottomClick}
        />
      );
    });
  }

  useEffect(() => {
    renderOverlayGrid();
  }, [overlayGridItems]);

  function handleOverlayRightClick(index: number) {
    const newArr = overlayGridItems.map((item, i) => {
      if (i === index) {
        if (item.colSpan === cols) return item;
        return { ...item, colSpan: item.colSpan + 1 };
      }
      return item;
    });

    setOverlayGridItems(newArr);
  }

  function handleOverlayLeftClick(index: number) {
    const newArr = overlayGridItems.map((item, i) => {
      if (i === index) {
        if (item.colSpan === 1) return item;
        return { ...item, colSpan: item.colSpan - 1 };
      }
      return item;
    });

    setOverlayGridItems(newArr);
  }

  function handleOverlayTopClick(index: number) {
    const newArr = overlayGridItems.map((item, i) => {
      if (i === index) {
        if (item.rowSpan === 1) return item;
        return { ...item, rowSpan: item.rowSpan - 1 };
      }
      return item;
    });

    setOverlayGridItems(newArr);
  }

  function handleOverlayBottomClick(index: number) {
    const newArr = overlayGridItems.map((item, i) => {
      if (i === index) {
        return { ...item, rowSpan: item.rowSpan + 1 };
      }
      return item;
    });

    setOverlayGridItems(newArr);
  }

  useEffect(() => {
    setOverlayGridItems([]);
  }, [rows, cols, gap]);

  function renderCodeBlock(type: "html" | "jsx") {
    let classText: "class" | "className";
    if (type === "html") {
      classText = "class";
    } else {
      classText = "className";
    }

    return (
      <div>
        <pre>
          <code>
            {`<div ${classText}="grid${colVariations[cols]}${gapVariations[gap]}">`}
          </code>
        </pre>
        {overlayGridItems.map((item: OverlayGridItem, index: number) => {
          return (
            <pre key={index}>
              <code>
                {`  <div id="${index + 1}" ${classText}="col-span-${
                  item.colSpan
                } row-span-${item.rowSpan}"></div>`}
              </code>
            </pre>
          );
        })}
        <pre>
          <code>{`</div>`}</code>
        </pre>
      </div>
    );
  }

  return (
    <div>
      <div className="flex items-center gap-4 mb-10">
        <div className="w-full">
          <label htmlFor="rows">Rows</label>
          <BaseInput
            id="rows"
            type="number"
            value={rows.toString()}
            updateFunction={setRowsSafe}
            disableClear
            fullWidth
          />
        </div>
        <div className="w-full">
          <label htmlFor="cols">Cols</label>
          <BaseInput
            id="cols"
            type="number"
            value={cols.toString()}
            updateFunction={setColsSafe}
            disableClear
            fullWidth
          />
        </div>
        <div className="w-full">
          <label htmlFor="gap">Gap</label>
          <BaseInput
            id="gap"
            type="number"
            value={gap.toString()}
            updateFunction={setGapSafe}
            disableClear
            fullWidth
          />
        </div>
      </div>

      <div ref={rootGrid} className="relative bg-stripes-sky rounded-lg mb-10">
        <div ref={overlay} className="absolute top-0 left-0 w-full h-full">
          {renderOverlayGrid()}
        </div>
        <div className={"grid" + colVariations[cols] + gapVariations[gap]}>
          {renderGrid()}
        </div>
      </div>
      <div className="flex gap-4">
        <button
          onClick={() => setCodeBlockLanguage("html")}
          className={`p-4 w-fit rounded-lg rounded-b-none border-2 border-b-0 border-transparent transition-colors ${
            codeBlockLanguage === "html" ? "bg-[#444444]" : "!border-[#444444]"
          }`}
        >
          HTML
        </button>
        <button
          onClick={() => setCodeBlockLanguage("jsx")}
          className={`p-4 w-fit rounded-lg rounded-b-none border-2 border-b-0 border-transparent transition-colors ${
            codeBlockLanguage === "jsx" ? "bg-[#444444]" : "!border-[#444444]"
          }`}
        >
          JSX
        </button>
      </div>

      <div className="overflow-x-auto bg-[#444444] p-4 rounded-lg rounded-tl-none">
        {renderCodeBlock(codeBlockLanguage)}
      </div>

      <style>
        {`.bg-stripes-sky {
        background-color: #38bdf81a;
        background-image: linear-gradient(135deg,#0ea5e980 10%,#0000 0,#0000 50%,#0ea5e980 0,#0ea5e980 60%,#0000 0,#0000);
        background-size: 7.07px 7.07px;
      }`}
      </style>
    </div>
  );
}
