import { EmailPreview } from "./EmailPreview";

export function EmailList({ emails, params, onEmailPreviewClicked }) {
  console.log('emails list', emails )
  return (
    <ul className="email-list">
      {emails.map((email) => (
        <li key={email.id}>
          <EmailPreview email={email} currentFolder={params.folder} onEmailPreviewClicked={onEmailPreviewClicked}/>
        </li>
      ))}
    </ul>
  );
}
