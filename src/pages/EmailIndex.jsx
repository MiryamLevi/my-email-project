import { useEffect, useState } from "react";
import { emailService } from "../services/emails.service";
import { EmailList } from "../cmps/EmailList";
import { EmailFilter } from "../cmps/EmailFilter";
import { Outlet, useParams, useSearchParams } from "react-router-dom";

export function EmailIndex() {
  const [emails, setEmails] = useState(null);
  const [searchParams, setSearchParams] = useSearchParams(); 
  const params = useParams();
  const [filterBy, setFilterBy] = useState(emailService.getFilterFromParams(searchParams));
  const [isAscending, setIsAscending] = useState(true);

  useEffect(() => {
    setSearchParams(filterBy);
    loadEmails();
  }, [filterBy, params.folder]);

  async function loadEmails() {
    const allEmails = await emailService.query(filterBy, params, isAscending);
    setEmails(allEmails);
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

  function onToggleStar(emailID) {
    // setEmails((prevEmails) => {
    //   return prevEmails.map((email) => {
    //     if (email.id === emailID) {
    //       email.isStarred = !email.isStarred;
    //       emailService.save(email);
    //     }
    //   });
    // });
  }

  if (!emails) return <div>"Loading..."</div>;
  const { txt } = filterBy;
  return (
    <section className="email-index">
      <EmailFilter filterBy={{ txt }} onSetFilter={onSetFilter} />
      <EmailList
        emails={emails}
        onRemoveEmail={onRemoveEmail}
        params={params}
        onToggleStar={onToggleStar}
      />
      <Outlet context={ {onAddEmail} } />
    </section>
  );
}
