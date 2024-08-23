import Link from "next/link";
import ThemeToggleButton from "./ThemeToggleButton";

const Header = () => {
  return (
    <header className="body-font">
      <div className="container mx-auto flex flex-wrap p-5 flex-col md:flex-row items-center">
        <a className="flex title-font font-medium items-center  mb-4 md:mb-0">
          <img src="/logo.jpg" alt="Logo" className="w-10 h-10 rounded-full" />
        </a>
        <Link href="/" className="hover:text-gray-500">
          <span className="ml-3 text-xl">Raghav tex</span>
        </Link>
        <nav className="md:ml-auto md:mr-auto flex flex-wrap items-center text-base justify-center">
          <Link href="/raw-material" className="mr-5 hover:text-gray-500">
            Raw Material
          </Link>
          <Link href="/company" className="mr-5 hover:text-gray-500">
            Company
          </Link>
          <Link href="/tana" className="mr-5 hover:text-gray-500">
            Tana
          </Link>
          <Link href="/fourth" className="mr-5 hover:text-gray-500">
            Fourth Link
          </Link>
        </nav>
        <div className="">
          <ThemeToggleButton />
          {/* Your other components */}
        </div>
      </div>
    </header>
  );
};

export default Header;
