import React from "react";
import "./ListItem.css";

interface Item {
  postId: number;
  id: number;
  name: string;
  email: string;
  body: string;
}

interface ListItemProps {
  item: Object;
  field: string;
  useCheckbox: boolean;
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
  console.log(isSelected, "mmmmm")
  return (
    <div className={`${isSelected(item) ? "selected-item" : "list-item"}`} onClick={() =>onSelect(item)}>
      {useCheckbox && 
      <input 
      type="checkbox" 
      checked={isSelected(item)} 
      className="checkbox" 
      onChange={(e) =>{
        e.stopPropagation()
        onSelect(item)
        }}>
      </input>}
      <div
        onClick={() => onSelect(item)}
      >
        {item[field]}
      </div>
    </div>
  );
};
