'use client';
import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

const Header: React.FC = () => {
  return (
    <>
    <header className="w-full absolute z-1">
      <nav className="nav max-w-[1440px] mx-auto flex justify-between items-center sm:px-16 px-6 py-4">
        <Link href="/" className="flex items-center">
          <div className="relative w-[150px] h-[40px]"> {/* Kapsayıcı div */}
            <Image 
              src="/foto.png" 
              alt="logo" 
              width={250}
              height={100}
            />
          </div>
        </Link>

        <div className="yan flex items-center space-x-10">
          <Link href="/" className="link">
            Anasayfa
          </Link>&nbsp;&nbsp;&nbsp;
          <Link href="/About" className="link">
            Hakkımızda
          </Link>&nbsp;&nbsp;&nbsp;
          <Link href="/ProductPage" className="link">
            Ürünler
          </Link>&nbsp;&nbsp;&nbsp;
          <Link href="/Contact" className="link">
            İletişim
          </Link>&nbsp;&nbsp;&nbsp;
        </div>
      </nav>
    </header>
    <div className="header-spacing"></div>
    </>
  );
};

export default Header;


      