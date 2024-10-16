import React, { useState } from "react";

import { ListItem } from "./ListItem";

export const VirtualScroll = ({
  rowHeight,
  totalItems,
  items,
  visibleItemsLength,
  containerHeight,
  field,
  onSelect,
  isSelected,
  useCheckbox
}) => {
  const totalHeight = rowHeight * totalItems;
  const [scrollTop, setScrollTop] = useState(0);
  const startNodeElement = Math.floor(scrollTop / rowHeight);
  const visibleItems = items?.slice(
    startNodeElement,
    startNodeElement + visibleItemsLength
  );
  const offsetY = startNodeElement * rowHeight;

  const handleScroll = (e: { currentTarget: { scrollTop: React.SetStateAction<number>; }; }) => {
    setScrollTop(e?.currentTarget?.scrollTop);
  };
  return (
    <div
      style={{
        height: containerHeight,
        overflow: "auto",
        padding:"10px"
      }}
      onScroll={handleScroll}
    >
      <div style={{ height: totalHeight }}>
        <div style={{ transform: `translateY(${offsetY}px)` }}>
            {visibleItems?.map((item, index) => (
          <ListItem item={item} field={field} onSelect={onSelect} isSelected={isSelected} useCheckbox={useCheckbox}></ListItem>
          ))}</div>
      </div>
    </div>
  );
};
