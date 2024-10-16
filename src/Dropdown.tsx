import React, {
  useEffect,
  useRef,
  useState,
  Suspense,
  lazy,
  useMemo,
} from "react";
import axios from "axios";
import "./Dropdown.css";
import List from "./List";
import { ListItem } from "./ListItem";
import { VirtualScroll } from "./VirtualScroll";
import { MdClear } from "react-icons/md";

interface Item {
  postId: number;
  id: number;
  name: string;
  email: string;
  body: string;
}

interface DropdownProps {
  canFilter: boolean;
  withLazyLoading: boolean;
  emptyFilterMessage: string;
  singleSelect: boolean;
  useCheckbox: boolean;
}

export const Dropdown = ({
  canFilter,
  withLazyLoading,
  emptyFilterMessage,
  singleSelect,
  useCheckbox,
}: DropdownProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [options, setOptions] = useState<Item[]>([]);
  const [filteredOptions, setFilteredOptions] = useState<Item[]>(options);
  const [filteredOptionsVirtual, setFilteredOptionsVirtual] =
    useState<Item[]>(options);
  const [searchInputValue, setSearchInputValue] = useState("");
  const listRef = useRef<HTMLDivElement | null>(null);
  const [loading, setIsLoading] = useState(false);
  const [field, setField] = useState("name");
  const [selected, setSelected] = useState([]);
  const [page, setPage] = useState(1);
  const dropdownRef = useRef<HTMLDivElement | null>(null)

  const selectedValue = useMemo(() => {
    if (selected.length) {
      if (singleSelect) {
        return selected[0][field];
      } else {
        return selected.map((item) => item[field]);
      }
    }
    return [];
  }, [selected]);
  const toggleList = () => {
    setIsOpen(!isOpen);
  };
  useEffect(() => {
    const fetchData = async () => {
      try {
        if (withLazyLoading) {
          const { data } = await axios.get(
            "https://jsonplaceholder.typicode.com/comments?page=1"
          );
          setOptions(data);
          setFilteredOptions(data);
          setFilteredOptionsVirtual(data);
        } else {
          const { data } = await axios.get("https://jsonplaceholder.typicode.com/comments");
          setOptions(data);
          setFilteredOptions(data);
          setFilteredOptionsVirtual(data);
        }
      } catch (error) {
        console.log("error when fetching data", error);
      }
    };
    fetchData();
  }, [withLazyLoading]);

  const loadMoreData = async () => {
    if (!loading) {
      try {
        const { data } = await axios.get(
          `https://jsonplaceholder.typicode.com/comments?page=${page}`
        );
        setFilteredOptions((prev) => [...prev, ...data]);
        setPage((prev) => prev + 1);
      } catch (error) {
        console.log("error when fetching data", error);
      } finally {
        setIsLoading(false);
      }
    }
  };

  const handleScroll = () => {
    if (listRef.current) {
      const { scrollTop, scrollHeight, clientHeight } = listRef.current;
      if (scrollHeight - scrollTop <= clientHeight + 100) {
        loadMoreData();
      }
    }
  };
  const handleInputChange = (value: string) => {
    setSearchInputValue(value);
    const filtered = options.filter((option) =>
      option[field].toLocaleLowerCase().includes(value.toLocaleLowerCase())
    );
    if (withLazyLoading) {
      setFilteredOptions(filtered);
    } else {
      setFilteredOptionsVirtual(filtered);
    }
  };
  const handleSelect = React.useCallback(
    (item: Item) => {
      if (isSelected(item)) {
        const updatedSelected = selected.filter((selectedItem) => {
          return selectedItem.id !== item.id;
        });
        setSelected(updatedSelected);
      } else {
        if (singleSelect) {
          setSelected([item]);
        } else {
          setSelected((prev) => [...prev, item]);
        }
      }
    },
    [singleSelect, selected]
  );
  const handleSelectAll = () => {
    const data = withLazyLoading ? filteredOptions : filteredOptionsVirtual
    if (selected.length === data.length) {
      setSelected([])
    } else {
      setSelected(data)
    }
  }
  const isSelected = (item: Item) => {
    return selected.some((selectedItem) => selectedItem.id === item.id);
  };
  const clearSelected = (e) => {
    e.stopPropagation();
    setSelected([]);
  };
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false); // Close the dropdown
      }
    };

    // Add event listener to detect clicks outside
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      // Cleanup event listener when component unmounts
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [dropdownRef]);
  return (
    <div className="dropdown-container" ref={dropdownRef}>
      <div className="input-wrapper">
       {!singleSelect && <div className="selected-chips">
          {selected.slice(0, 3).map((item, index) => (
            <div className="chip" key={index}>
              {item[field]}
              <span className="chip-close" onClick={() => handleSelect(item)}>
                <MdClear />
              </span>
            </div>
          ))}
          {selected.length > 3 && <span className="more-chips"> +{selected.length - 3}</span>}
        </div>}
        <input
          value={singleSelect ? selectedValue : null}
          placeholder={selected.length > 0 ? '' : 'Select'}
          onClick={toggleList}
          style={{ cursor: "pointer" }}
        />
        {selected.length > 0 && (
          <span className="clear-icon" onClick={(e) => clearSelected(e)}>
            <MdClear />
          </span>
        )}
        <span className="arrow-icon" onClick={toggleList}>
          ▼
        </span>
      </div>
      {loading && <div>Loading more...</div>}
      {isOpen && (
        <div className="opened-list">
          <div className="input-container">
            {!singleSelect && <input type="checkbox" className="select-all-checkbox" checked={selected.length === filteredOptionsVirtual.length} onChange={() => handleSelectAll()}></input>}
            {canFilter && (
              <input
                className="filter-input"
                value={searchInputValue}
                placeholder="Search.."
                onChange={(e) => handleInputChange(e.target.value)}
              ></input>
            )}
          </div>
          {withLazyLoading ? (
            <List
              ref={listRef}
              data={filteredOptions}
              onScroll={handleScroll}
              onSelect={handleSelect}
              isSelected={isSelected}
              field={field}
              useCheckbox={useCheckbox}
            ></List>
          ) : (
            <VirtualScroll
              rowHeight={200}
              totalItems={filteredOptionsVirtual.length}
              containerHeight="300px"
              items={filteredOptionsVirtual}
              visibleItemsLength={30}
              field={field}
              onSelect={handleSelect}
              isSelected={isSelected}
              useCheckbox={useCheckbox}
            />
          )}
        </div>
      )}
    </div>
  );
};
