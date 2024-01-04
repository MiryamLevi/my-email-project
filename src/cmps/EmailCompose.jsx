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
import { Link, useNavigate, useOutletContext } from "react-router-dom";

export function EmailCompose() {
  const [email, setEmail] = useState(emailService.createEmail());
  const navigate = useNavigate();
  const {onAddEmail} = useOutletContext();

  function handleChange({ target }) {
    let { name, value } = target
    setEmail((prevEmail) => ({ ...prevEmail, [name]:value }));
    console.log("email after handleChange: ", email);
  }

  async function onSaveEmail(ev) {
    ev.preventDefault();
    try {
      await onAddEmail(email)
      navigate("/inbox");
    } catch (error) {
      console.log("had issues saving email", error);
    }
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
        <input
          id="from"
          name="from"
          value={from}
          onChange={handleChange}
          type="email"
        ></input>
      </label>
      <label htmlFor="to">
        To:{" "}
        <input
          id="to"
          name="to"
          type="email"
          value={to}
          onChange={handleChange}
        ></input>
      </label>
      <label htmlFor="subject">
        Subject:{" "}
        <input
          name="subject"
          id="subject"
          type="text"
          value={subject}
          onChange={handleChange}
        ></input>
      </label>
      <input
        name="body"
        type="text"
        value={body}
        onChange={handleChange}
      ></input>
      <button id="send" name="send">
        Send
      </button>
    </form>
  );
}
