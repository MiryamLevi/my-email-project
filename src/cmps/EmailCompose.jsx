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

export function EmailCompose() {
  const [email, setEmail] = useState(emailService.createEmail());

  return (
    <form className="">
      <header>New Email</header>
      <label>
        From: <input name="from" type="text"></input>
      </label>
      <label>
        To: <input name="to" type="text"></input>
      </label>
      <label>
        Subject: <input name="subject" type="text"></input>
      </label>
      <input name="body" type="text"></input>
      <button type="submit" id="send" name="send"></button>
    </form>
  );
}
