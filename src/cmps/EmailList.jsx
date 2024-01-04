import { EmailPreview } from "./EmailPreview";

export function EmailList({ emails, params, onEmailPreviewClicked, onToggleStar }) {
  console.log(emails);
  return (
    <table>
      <tbody className="email-list">
        {emails.map((email) => (
          <>
         
            <EmailPreview
              key={email.id}
              email={email}
              currentFolder={params.folder}
              onEmailPreviewClicked={onEmailPreviewClicked}
              onToggleStar={onToggleStar}
            /></>
        ))}
      </tbody>
    </table>
  );
}
