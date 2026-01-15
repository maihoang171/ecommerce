import HeroHeader from "./HeroHeader";
import Navbar from "./Navbar";

function Header() {
  return (
    <>
      <header className="p-5 flex flex-col gap-4">
        <Navbar />
        <HeroHeader />
      </header>
    </>
  );
}

export default Header;
