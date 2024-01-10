import imgUrl from "../assets/imgs/logo.png";

export function AppHeader() {
  return (
    <header className="app-header">
        <img src={imgUrl} alt="logo" className="logo" />
    </header>
  );
}
