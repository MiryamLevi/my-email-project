import {MenuItem} from './MenuItem'

export function Menu() {
  const menuItems = [
    { id: 1, name: "Inbox", count: 8 },
    { id: 2, name: "Starred", count: 15 },
    // { id: 3, name: "Sent", icon: "", count: 8 },
    // { id: 4, name: "Draft", icon: "", count: 8 },
    // { id: 5, name: "Trash", icon: "", count: 8 },
  ];
  return (
    <ul className='menu'>
      {menuItems.map((item) => (
        <li key={item.id}>
         <MenuItem item={item} key={item.id} /> 
        </li>
      ))}
    </ul>
  );
}
