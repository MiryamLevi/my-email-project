// • Support hover state
// • let the action (star, trash) to be another component
import { CiStar } from "react-icons/ci";
import { FaStar } from "react-icons/fa";
import { Link } from "react-router-dom";

export function EmailPreview({
  email,
  currentFolder,
  onEmailPreviewClicked,
  onToggleStar,
}) {
  const datetime = new Date(email.sentAt * 1000).toLocaleString("en-US");
  const fromName = email.from.split("@")[0];

  let textStyle = {
    fontWeight: email.isRead ? "normal" : "bold",
  };

  function toggleStar(ev) {
    onToggleStar(email.id);
  }

  return (
    <tr className="email-preview">
      <td onClick={toggleStar}>
        {email.isStarred ? <FaStar  fill="yellow" /> : <CiStar  />}
      </td>
      <td>
        <Link to={`/${currentFolder}/${email.id}`}>
          <p
            style={textStyle}
            onClick={() => {
              onEmailPreviewClicked(email.id);
            }}
          >
            {fromName} | {email.subject} | {datetime}
          </p>
        </Link>
      </td>
    </tr>
  );
}
