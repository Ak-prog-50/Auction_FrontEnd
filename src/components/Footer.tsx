const Footer = () => {
  return (
    <footer className="p-4 fixed left-0 w-full bottom-0 bg-white shadow md:flex md:items-center md:justify-between md:p-6 dark:bg-gray-800">
      <span className="text-sm text-gray-500 sm:text-center dark:text-gray-400">
        © 2022 Created By <a className="hover:underline">Akalanka Pathirage</a>
      </span>
      <ul className="flex flex-wrap items-center mt-3 text-sm text-gray-500 dark:text-gray-400 sm:mt-0">
        <li>
          <a href="/" className="mr-4 hover:underline md:mr-6 ">
            Home
          </a>
        </li>
        <li>
          <a href="https://github.com/ak-prog-50" target="_blank" className="mr-4 hover:underline md:mr-6">
            Admin Page
          </a>
        </li>
        <li>
          <a href="https://github.com/ak-prog-50" target="_blank" className="mr-4 hover:underline md:mr-6">
            Github
          </a>
        </li>
        <li>
          <a href="/admin" className="hover:underline">
            Read More
          </a>
        </li>
      </ul>
    </footer>
  );
};

export default Footer;
