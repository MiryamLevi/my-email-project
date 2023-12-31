import { useEffect, useState } from "react";
import { emailService } from "../services/emails.service";
import { EmailList } from "../cmps/EmailList";
import { EmailFilter } from "../cmps/EmailFilter";
import { Outlet } from "react-router-dom";

export function EmailIndex() {
  const [emails, setEmails] = useState(null);
  
  const [filterBy, setFilterBy] = useState(emailService.getDefaultFilter());

  useEffect(() => {
    loadEmails();
  }, [filterBy]);


  async function loadEmails() {
    const allEmails = await emailService.query(filterBy);
    setEmails(allEmails);
    console.log(allEmails);
  }

  function onSetFilter(filterBy)
  {
    setFilterBy(prevFilter=>({...prevFilter, ...filterBy}))
  }

  async function onRemoveEmail(emailID) {
    try {
      await emailService.remove(emailID);
      setEmails((prevEmails) => {
        return prevEmails.filter((email) => email.id !== emailID);
      });
    } catch (error) {
      console.log("error:", error);
    }
  }

  function onEmailPreviewClicked(emailID) {
    setEmails((prevEmails) => {
      return prevEmails.map((email) => {
        if (email.id === emailID) email.isRead = true;
      });
    });
    console.log("email clicked");
  }

  if (!emails) return <div>"Loading..."</div>;
  const {subject,} = filterBy
  return (
    <section className="email-index">
      <EmailFilter filterBy={{subject}} onSetFilter={onSetFilter} />
      <EmailList
        emails={emails}
        onRemoveEmail={onRemoveEmail}
        onEmailPreviewClicked={onEmailPreviewClicked}
      />
      <Outlet/>
    </section>
  );
}
