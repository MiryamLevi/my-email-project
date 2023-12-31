import { RiInboxFill } from "react-icons/ri";
// import { CiStar } from "react-icons/ci";
import { IoMdStarOutline } from "react-icons/io";


export function MenuItem({item})
{
    return (
        <article className='menu-item'>
            {item.name === 'Inbox' && <label ><RiInboxFill /> Inbox</label>}
            {item.name === 'Starred' && <label><IoMdStarOutline/> Starred</label>}
            {/* {item.name == '' && < />} */}
        </article>
    )
}