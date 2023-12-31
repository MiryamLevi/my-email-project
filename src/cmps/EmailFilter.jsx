// • Allow filtering
// Start with Search and Read / Unread

import { useEffect, useState } from "react";

export function EmailFilter({filterBy, onSetFilter}) {
  const [filterByToEdit, setFilterByToEdit] = useState(filterBy);

  useEffect(()=>onSetFilter(filterByToEdit),[filterByToEdit])

  function handleChange(ev) {
    let { name: field, value, type } = ev.target;
    if (type === "number") value = +value;
    setFilterByToEdit((prevFilter) => ({ ...prevFilter, [field]: value }));
  }

  const { subject } = filterByToEdit;
  return (
    <form className="email-filter">
      <label htmlFor="subject">search: </label>
      <input
        type="text"
        id="subject"
        name="subject"
        value={subject}
        onChange={handleChange}
      ></input>
    </form>
  );
}
