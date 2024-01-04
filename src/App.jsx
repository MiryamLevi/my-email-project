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

  return (
    <Router>
      <section className="main-app bg">
        <AppHeader />
        <Aside />
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
            {/* <Route path="/" element={<Navigate replace to="/inbox" />} /> */}
            <Route path="/:folder" element={<EmailIndex />}>
              <Route path="/:folder/:emailId" element={<EmailDetails />} />
              <Route
                path="/:folder/edit/:emailId?"
                element={<EmailCompose />}
              />
            </Route>
          </Routes>
        </main>
        <AppFooter />
      </section>
    </Router>
  );
}
