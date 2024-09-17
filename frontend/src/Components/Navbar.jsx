import React from "react";

const Navbar = () => {
  return (
    <header className="flex justify-between items-center p-5 bg-green-500 fixed min-w-full z-10">
      <div className="text-2xl font-bold text-black">HERBAL FLOW</div>
      <nav className="flex gap-8 text-lg">
        <a href="#home" className="text-black hover:text-green-700">
          Home
        </a>
        <a href="#shop" className="text-black hover:text-green-700">
          Shop
        </a>
        <a href="#about" className="text-black hover:text-green-700">
          About us
        </a>
        <a href="/login" className="text-black hover:text-green-700">
          Login
        </a>
      </nav>
    </header>
  );
};

export default Navbar;
