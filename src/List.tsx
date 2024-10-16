import React, { forwardRef, lazy } from 'react'
import { ListItem } from './ListItem'
import "./List.css"

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

interface ListProps {
  data: Array<any>;
  useCheckbox: boolean;
  field: string;
  onScroll: () => void;
  onSelect: (item: Item) => void;
  isSelected: (item:Item) => boolean;
}
const List = forwardRef<HTMLDivElement, ListProps>(({ data, onScroll, onSelect, isSelected, useCheckbox, field }, ref) => {
    

  return (
    <div className='container' ref={ref} onScroll={onScroll}>
           {data.map((option, index) => (
         
                <ListItem key={index} item={option} onSelect={onSelect} isSelected={isSelected} field={field} useCheckbox={useCheckbox}></ListItem>
             
            ))}
    </div>
  )
});
export default List;