import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { emailService } from "../services/emails.service";
import { IoIosArrowRoundBack } from "react-icons/io";
import { FaRegTrashAlt } from "react-icons/fa";

{
  /* 
• Allow deleting an email (using the service)
*/
}

export function EmailDetails() {
  const [email, setEmail] = useState(null);
  const params = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    loadEmail();
  }, [params.emailID]);

  async function loadEmail() {
    try{
    const email = await emailService.getById(params.emailId);
    console.log("specific email", email);
    email.isRead = true;
    setEmail(email);
    }
    catch(error)
    {
      navigate("/" + params.folder)
      console.log('Has issues loading email', error);
    }
  }

  function onEmailDelete(emailID)
  {
    emailService.remove(emailID);
    navigate("/" + params.folder);
  }

  if (!email) return <div>Loading...</div>;
  let emailSentAt = email.sentAt? new Date(email.sentAt * 1000).toLocaleString(): "";

  function onBack() {
    console.log("isRead", email.isRead);
    emailService.save(email);
    navigate("/" + params.folder);
  }

  return (
    <section className="email-details">
      <label onClick={onBack}>
        <IoIosArrowRoundBack />
      </label>
      <label htmlFor="delete" onClick={()=>onEmailDelete(email.id)}><FaRegTrashAlt/></label>
      <div className="details-container">
        <h2>{email.subject}</h2>
        <h4>From: {email.from}</h4>
        <h4>To: {email.to}</h4>
        {emailSentAt !== "" && <h4> Sent at: {emailSentAt}</h4>}
        <h3>{email.body}</h3>
      </div>
    </section>
  );
}
