import { useEffect, useState } from "react";
import { emailService } from "../services/emails.service";
import { EmailList } from "../cmps/EmailList";
import { EmailFilter } from "../cmps/EmailFilter";
import { Outlet, useParams } from "react-router-dom";

export function EmailIndex({}) {
  const [emails, setEmails] = useState(null);
  const params = useParams();
  const [filterBy, setFilterBy] = useState(emailService.getDefaultFilter());
  const [isAscending, setIsAscending] = useState(true);


  useEffect(() => {
    loadEmails();
  }, [filterBy]);

  async function loadEmails() {
    const allEmails = await emailService.query(filterBy,params, isAscending);
    setEmails(allEmails);
    console.log('allEmails', allEmails);
  }

  async function onAddEmail(emailToAdd) {
    try {
      const savedEmail = await emailService.save(emailToAdd);
      setEmails((prevEmails) => ({ ...prevEmails, savedEmail }));
    } catch (error) {
      console.log("had issues saving email", error);
    }
  }

  function onSetFilter(filterBy) {
    setFilterBy((prevFilter) => ({ ...prevFilter, ...filterBy }));
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
  const { subject } = filterBy;
  return (
    <section className="email-index">
      <EmailFilter filterBy={{ subject }} onSetFilter={onSetFilter} />
      <EmailList
        emails={emails}
        onRemoveEmail={onRemoveEmail}
        onEmailPreviewClicked={onEmailPreviewClicked}
        params={params}
      />
      <Outlet context={{onAddEmail}}/>
    </section>
  );
}
