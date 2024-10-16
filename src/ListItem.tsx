import React from "react";
import "./ListItem.css";

interface Item {
  _id: string;
  first_name: string;
  last_name: string;
  email: string;
  children: {
    first_name: string;
    last_name: string;
    email: string;
  };
}

interface ListItemProps {
  item: Object;
  field: string;
  onSelect: (item: Item) => void;
  isSelected: (item: Item) => boolean;
}
export const ListItem: React.FC<ListItemProps> = ({
  item,
  field,
  useCheckbox,
  onSelect,
  isSelected,
}) => {
  return (
    <div className={`${isSelected(item) ? "selected-item" : "list-item"}`} onClick={() =>onSelect(item)}>
      {useCheckbox && <input type="checkbox" checked={isSelected(item)} className="checkbox" onChange={() =>onSelect(item)}></input>}
      <div
       
        onClick={() => onSelect(item)}
      >
        {item[field]}
      </div>
    </div>
  );
};
