import Link from "next/link";
import ThemeToggleButton from "./ThemeToggleButton";

const Header = () => {
  return (
    <header className="text-gray-600 body-font">
      <div className="container mx-auto flex flex-wrap p-5 flex-col md:flex-row items-center">
        <a className="flex title-font font-medium items-center text-gray-900 mb-4 md:mb-0">
          <img src="/logo.jpg" alt="Logo" className="w-10 h-10 rounded-full" />
          <span className="ml-3 text-xl">Raghav tex</span>
        </a>
        <nav className="md:ml-auto md:mr-auto flex flex-wrap items-center text-base justify-center">
          <Link href="/first" className="mr-5 hover:text-gray-900">
            First Link
          </Link>
          <Link href="/second" className="mr-5 hover:text-gray-900">
            Second Link
          </Link>
          <Link href="/third" className="mr-5 hover:text-gray-900">
            Third Link
          </Link>
          <Link href="/fourth" className="mr-5 hover:text-gray-900">
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
