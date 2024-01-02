import { RiInboxFill } from "react-icons/ri";
import { IoMdStarOutline } from "react-icons/io";


export function AsideItem({item})
{
    return (
        <article className='aside-item'>
            {item.name === 'Inbox' && <label ><RiInboxFill /> Inbox</label>}
            {item.name === 'Starred' && <label><IoMdStarOutline/> Starred</label>}
            {item.name == 'Draft' && < />}
        </article>
    )
}