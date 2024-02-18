import { useEffect, useRef, useState } from "react";
import BaseInput from "./BaseInput";
import GridItem from "./GridItem";

interface GridItem {
  value: string;
  rowSpan: number;
  colSpan: number;
}

export default function TheTailwindGridGenerator() {
  const [rows, setRows] = useState(3);
  const [cols, setCols] = useState(3);
  const [gap, setGap] = useState(4);
  const [gridItems, setGridItems] = useState([]);

  const rootGrid = useRef(null);

  const colVariations = {
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

  const gapVariations = {
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

  function setRowsSafe(e: number) {
    if (e < 1) e = 1;
    if (e > 12) e = 12;
    setRows(e);
  }

  function setColsSafe(e: number) {
    if (e < 1) e = 1;
    if (e > 12) e = 12;
    setCols(e);
  }

  function setGapSafe(e: number) {
    if (e < 0) e = 0;
    if (e > 12) e = 12;
    setGap(e);
  }

  useEffect(() => {
    let arr = [];
    for (let i = 1; i < rows * cols + 1; i++) {
      arr.push({
        value: i.toString(),
        colSpan: 1,
        rowSpan: 1,
      });
    }
    setGridItems(arr);
  }, [rows, cols]);

  function renderGrid() {
    return gridItems.map((item: GridItem) => {
      return (
        <GridItem
          key={item.value}
          value={item.value}
          numCols={cols}
          numRows={rows}
          rootGrid={rootGrid}
          increaseIndicator={false}
          setColSpan={setColSpan}
          setRowSpan={setRowSpan}
          colSpan={item.colSpan}
          rowSpan={item.rowSpan}
        />
      );
    });
  }

  function setColSpan(span: number, value: string) {
    let oldSpan;
    let oldRowSpan;
    let arr = gridItems.map((item: GridItem) => {
      if (item.value === value) {
        oldSpan = item.colSpan;
        oldRowSpan = item.rowSpan;
        item.colSpan = span;
      }
      return item;
    });

    if (oldSpan > span) {
      for (let i = 0; i < oldSpan - span + oldRowSpan - 1; i++) {
        arr.push({
          value: (arr.length + 1).toString(),
          colSpan: 1,
          rowSpan: 1,
        });
      }
    } else {
      if (arr.length - (span - oldSpan) - oldRowSpan + 1 > 0)
        arr = arr.slice(0, arr.length - (span - oldSpan) - oldRowSpan + 1);

      console.log(arr.length);
    }

    setGridItems(arr);
  }

  function setRowSpan(span: number, value: string) {
    let oldRowSpan;
    let oldColSpan;
    let arr = gridItems.map((item: GridItem) => {
      if (item.value === value) {
        oldRowSpan = item.rowSpan;
        oldColSpan = item.colSpan;
        item.rowSpan = span;
      }
      return item;
    });

    if (oldRowSpan > span) {
      console.log("adding");
      for (let i = 0; i < oldRowSpan - span + oldColSpan - 1; i++) {
        arr.push({
          value: (arr.length + 1).toString(),
          colSpan: 1,
          rowSpan: 1,
        });
      }
    } else {
      console.log("deleting");

      if (oldColSpan === cols) {
        console.log("deleting from the end");
        if (arr.length - cols > rows) arr = arr.slice(0, arr.length - cols);
      } else {
        const howManyItemsNeeded = rows * cols - span * oldColSpan;
        // delete as many as needed
        arr = arr.slice(0, howManyItemsNeeded + 1);
      }

      for (const item of arr) {
        if (item.value === value) {
          item.rowSpan = span;
        }
      }

      setGridItems(arr);
    }
  }

  return (
    <div>
      <div className="flex items-center gap-4">
        <div>
          <label htmlFor="rows">Rows</label>
          <BaseInput
            id="rows"
            type="number"
            value={rows.toString()}
            updateFunction={setRowsSafe}
            disableClear
          />
        </div>
        <div>
          <label htmlFor="cols">Cols</label>
          <BaseInput
            id="cols"
            type="number"
            value={cols.toString()}
            updateFunction={setColsSafe}
            disableClear
          />
        </div>
        <div>
          <label htmlFor="gap">Gap</label>
          <BaseInput
            id="gap"
            type="number"
            value={gap.toString()}
            updateFunction={setGapSafe}
            disableClear
          />
        </div>
      </div>

      <div ref={rootGrid} className="bg-stripes-sky rounded-lg">
        <div className={"grid" + colVariations[cols] + gapVariations[gap]}>
          {renderGrid()}
        </div>
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
