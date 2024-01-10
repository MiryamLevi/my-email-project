import { useState } from "react"

export function UserMsg() {
    const [message, setMessage] = useState({txt: 'I am a user message', type: 'success'})

    function onCloseMsg()
    {
        setMessage(null)
    }

    if(!message) return <></>
    return (
       <div className={"usr-msg " + message.type}>
        <p>{message.txt}</p>
        <button onClick={onCloseMsg}>x</button>
       </div>
    )

}