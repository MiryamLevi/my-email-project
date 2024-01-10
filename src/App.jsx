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
import { UserMsg } from "./cmps/UserMsg.jsx";

export function App() {
  const [filterBy, setFilterBy] = useState(emailService.getDefaultFilter());

  return (
    <Router>
      <section className="main-app bg">
        <AppHeader />
        <Aside />
        <main className="container main">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/:folder" element={<EmailIndex />} >
            <Route path="/:folder/edit/:emailId?" element={<EmailCompose />} />
            </Route>
            <Route path="/:folder/:emailId" element={<EmailDetails />} />
          </Routes>
        </main>
        <UserMsg/>

        <AppFooter />
      </section>
    </Router>
  );
}
