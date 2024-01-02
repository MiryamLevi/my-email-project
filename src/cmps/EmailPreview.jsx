// • Support hover state
// • let the action (star, trash) to be another component
import { CiStar } from "react-icons/ci";
import { Link } from "react-router-dom";

export function EmailPreview({ email, currentFolder, onEmailPreviewClicked }) {
  const datetime = new Date(email.sentAt * 1000).toLocaleString("en-US");
  const fromName = email.from.split("@")[0];

  let textStyle = {
    fontWeight: email.isRead ? "normal" : "bold",
  };

  function onSelectEmail(ev)
  {
    ev.target.style.backgroundColor = 'blue';  
  }
  
  return (
    <section
      className="email-preview"
      onClick={() => {
        onEmailPreviewClicked(email.id);
      }}
    >
      <input type="checkbox" name="chooseEmail" key={email.id} onClick={onSelectEmail}/>
        <label><CiStar onClick={()=>console.log("yellow")}/></label>
      <Link to={`/${currentFolder}/${email.id}`}>
        <p style={textStyle}>
          {fromName} | {email.subject} | {datetime}{" "}
        </p>
      </Link>
    </section>
  );
}
