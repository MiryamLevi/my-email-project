import imgUrl from "../assets/imgs/logo.png";

export function AppHeader() {
  return (
    <header className="app-header">
      <section className="container">
        <img src={imgUrl} alt="logo" className="logo" />
      </section>
    </header>
  );
}
