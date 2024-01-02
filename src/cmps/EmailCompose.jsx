// Nested rout able component (page)
// •
// Has a form with
// :
// to,
// subject and body
// •
// Use the service to
// send an email (
// add
// an email
// to
// the
// list

import { useState } from "react";
import { emailService } from "../services/emails.service";
import { Link } from "react-router-dom";

export function EmailCompose() {
  const [email, setEmail] = useState(emailService.createEmail());

  function onEmailSend() {
    // get all the information from the fields and add an email preview to the "sent" aside menu
  }

  function handleChange({ target }) {
    // ----
    setEmail((prevEmail) => ({ ...prevEmail, ...target }));
  }

  function onSaveEmail()
  {
    
  }

  const { from, to, subject, body } = email;
  return (
    <form className="compose-form" onSubmit={onSaveEmail}>
      <Link to="/inbox">
        <button>x</button>
      </Link>
      <header>New Email</header>
      <label htmlFor="from">
        From:{" "}
        <input id="from" name="from" value={from} onChange={handleChange} type="email"
        ></input>
      </label>
      <label htmlFor="to">
        To: <input id="to" name="to" type="email" value={to} onChange={handleChange}></input>
      </label>
      <label htmlFor="subject">
        Subject: <input name="subject" id="subject" type="text" value={subject} onChange={handleChange}></input>
      </label>
      <input name="body" type="text" value={body} onChange={handleChange}></input>
      <button type="submit" id="send" name="send" onClick={onEmailSend}>
        Send
      </button>
    </form>
  );
}
