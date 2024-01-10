import { EmailPreview } from "./EmailPreview";

export function EmailList({
  emails,
  params,
  onToggleStar,
}) {
  // console.log("emails", emails);
  return (
    <table>
      <tbody className="email-list">
        {emails.map((email) => {
          console.log("email", email);
          return <EmailPreview
            key={email.id}
            email={email}
            currentFolder={params.folder}
            onToggleStar={onToggleStar}
          />;
        })}
      </tbody>
    </table>
  );
}
