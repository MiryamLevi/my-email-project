import { Home } from "./pages/Home";
import imgUrl from "./assets/imgs/logo.png";

export function App() {
  return (
    <section className="main-app bg">
      <header className="app-header">
        <section className="container">
          <img src={imgUrl} alt="logo" className="logo" />
        </section>
      </header>

      <main className="container">
        <Home />
      </main>

      <footer>
        <section className="container">Mails 2023 &copy;</section>
      </footer>
    </section>
  );
}
