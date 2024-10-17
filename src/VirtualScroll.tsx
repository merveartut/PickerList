import React, { useState } from "react";

import { ListItem } from "./ListItem";

interface Item {
  postId: number;
  id: number;
  name: string;
  email: string;
  body: string;
}

interface ListItemProps {
  rowHeight: number;
  totalItems: number;
  items: Item[];
  visibleItemsLength: number;
  containerHeight: number;
  field:string;
  onSelect: (item:Item) => void;
  isSelected: (item:Item) => boolean;
  useCheckbox: boolean;
}

export const VirtualScroll: React.FC<ListItemProps> = ({
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
  console.log(isSelected,"kkkk")
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
