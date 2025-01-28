import Footer from '@/componenets/Footer'; // Yazım hatası düzeltildi
import Header from '@/componenets/Header'; // Yazım hatası düzeltildi
import '../app/globals.css';
import React, { useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { MapProvider } from './ContactMap';
import { MapComponent } from './Map';

const Contact = () => {
  useEffect(() => {
    // Google Maps script'i yüklendiğinde haritayı başlat
    if (window.google && window.initMap) {
      window.initMap();
    }
  }, []);

  return (
    <div>
      <Header />
      <h1 className='ortala'>İletişim</h1>

      <div className="contact-container"> {/* Flex container */}
        <div className="contact-section">
          <Link href="/" className="flex items-center">
            <Image
              src="/konum.png"
              alt="Adres"
              width={80}
              height={18}
              className="object-contain"
            />
          </Link>
          <div className="contact-info">
            <h3  className='contact-header'>Adres</h3>
            <p>est odio, consectetur ac quam ut</p>
          </div>
        </div>

        <div className="contact-section">
          <Link href="/" className="flex items-center">
            <Image
              src="/mail.png"
              alt="Mail"
              width={80}
              height={18}
              className="object-contain"
            />
          </Link>
          <div className="contact-info">
            <h3  className='contact-header'>E-Mail</h3>
            <p className="contact-info">ışık@gmail.com</p>
          </div>
        </div>

        <div className="contact-section">
          <Link href="/" className="flex items-center">
            <Image
              src="/tel.png"
              alt="Telefon"
              width={100}
              height={18}
              className="object-contain"
            />
          </Link>
          <div className="contact-info">
            <h3 className='contact-header'>Telefon</h3>
            <p>0500 000 00 00</p>
          </div>
        </div>
      </div>

      {/* Harita burada yer alacak */}
      <div className="map-container"> {/* Harita için kapsayıcı div */}
        <MapProvider>
          <MapComponent />
        </MapProvider>
      </div>
    </div>
  );
}

export default Contact;
