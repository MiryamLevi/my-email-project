import { EmailIndex } from "./EmailIndex";
import { Menu } from "../cmps/Menu";
import {HashRouter as Router, Routes, Route, Navigate, Link } from "react-router-dom";
import { EmailDetails } from "../cmps/EmailDetails";
import { EmailCompose } from "../cmps/EmailCompose";
import { LuPencil } from "react-icons/lu";

export function Home() {
  return (
    <section className="home">
      {/* <EmailCompose/> */}
      {/* <Link to="/inbox/edit"><div className="compose"><LuPencil/> Compose</div></Link> */}
      <Menu/>
      <Router>
        <article className="menu-item-content">
          <Routes>
          <Route path="/inbox" element={<EmailIndex/>} >
            {/* change the route */}
            <Route path='/inbox/edit' element={<EmailCompose/>}/> 
          </Route>
          <Route path="/inbox/:emailID" element={<EmailDetails/>} />
          {/* <Route path="/starred" element={<EmailIndex/>} />
          <Route path="/trash" element={<EmailIndex/>} />  */}
          <Route index element={<Navigate to="/inbox" />} />
          </Routes>
        </article>
      </Router>
    </section>
  );
}
