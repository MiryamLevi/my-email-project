
import { useEffect, useState } from "react";
import { FaSearch } from "react-icons/fa";

export function EmailFilter({filterBy, onSetFilter}) {
  const [filterByToEdit, setFilterByToEdit] = useState(filterBy);

  useEffect(()=>onSetFilter(filterByToEdit),[filterByToEdit])

  function handleChange(ev) {
    let { name: field, value, type } = ev.target;
    if (type === "number") value = +value;
    setFilterByToEdit((prevFilter) => ({ ...prevFilter, [field]: value }));
  }

  const { txt } = filterByToEdit;
  return (
    <form className="email-filter">
      <FaSearch />
      <input
      className="filter-input"
        type="text"
        id="txt"
        name="txt"
        value={txt}
        onChange={handleChange}
        placeholder="Search"
      ></input>
    </form>
  );
}
