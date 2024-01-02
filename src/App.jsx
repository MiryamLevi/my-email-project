import { Home } from "./pages/Home";
import {
  HashRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { AppFooter } from "./cmps/AppFooter";
import { AppHeader } from "./cmps/AppHeader";
import { EmailIndex } from "./pages/EmailIndex";
import { EmailCompose } from "./cmps/EmailCompose";
import { EmailDetails } from "./cmps/EmailDetails";
import { Aside } from "./cmps/Aside";
import { emailService } from "./services/emails.service";
import { useState } from "react";

export function App() {
  const [filterBy, setFilterBy] = useState(emailService.getDefaultFilter());

  async function countEmailsByFilter(filterBy) {
    const emails = await emailService.query();
    console.log("the type", type(emails));
    // switch (filterBy) {
    //   case "Inbox":
    //     return emails.filter((email) => email.to === "user@appsus.com").count;
    //   case "Starred":
    //     return emails.filter((email) => email.isStarred).count;
    //   case "Trash":
    //     return emails.filter((email) => email.removedAt).count;
    //   case "Sent":
    //     return emails.filter((email) => email.sentAt).count;

    //   default:
    //     break;
    // }
    return;
  }

  return (
    <Router>
      <section className="main-app bg">
        <AppHeader />
        <Aside countEmailsByFilter={countEmailsByFilter} />
        <main className="container main">
          <Routes>
            {/* <Route path="/" element={<Home />} /> */}
            {/* <Route path="/inbox" element={<EmailIndex />}>
              {/* change the route */}
            {/* <Route path="/inbox/edit" element={<EmailCompose />} />
            </Route>
            <Route path="/inbox/:emailID" element={<EmailDetails />} />
            <Route
              path="/starred"
              element={<EmailIndex filterBy={filterBy} />}
            />
            <Route path="/sent" element={<EmailIndex />} />
            <Route path="/trash" element={<EmailIndex />} />
            <Route path="/draft" element={<EmailIndex />} />
            <Route index element={<Navigate to="/inbox" />} />*/}
            <Route path="/" element={<Navigate replace to="/inbox" />} />
            <Route path="/:folder" element={<EmailIndex />}>
              <Route path="/:folder/:emailId" element={<EmailDetails />} />
              <Route path="/:folder/edit" element={<EmailCompose />} />
            </Route>
          </Routes>
        </main>
        <AppFooter />
      </section>
    </Router>
  );
}
