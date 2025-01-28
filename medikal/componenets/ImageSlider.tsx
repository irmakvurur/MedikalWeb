'use client';
import { useState, useEffect } from 'react';
import Image from 'next/image';
import { StaticImageData } from 'next/image';
import foto1 from "@/public/foto1.jpg";
import foto2 from "@/public/foto2.jpg";
import foto3 from "@/public/foto3.jpg";
import { ChevronLeft, ChevronRight } from 'lucide-react';

// Interface for image data
interface ImageData {
  src: StaticImageData;
}

// Image data array
const images: ImageData[] = [
    {
      src: foto1,
    },
    {
      src: foto2,
    },
    {
      src: foto3,
    },
  ];

export default function ImageSlider(): JSX.Element {
  // State to keep track of the current image index
  const [currentIndex, setCurrentIndex] = useState<number>(0);

  // State to determine if the image is being hovered over
  const [isHovered, setIsHovered] = useState<boolean>(false);

  // Function to show the previous slide
  const prevSlide = (): void => {
    setCurrentIndex(
      (prevIndex) => (prevIndex - 1 + images.length) % images.length
    );
  };

  // Function to show the next slide
  const nextSlide = (): void => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  // useEffect hook to handle automatic slide transition
  useEffect(() => {
    // Start interval for automatic slide change if not hovered
    if (!isHovered) {
      const interval = setInterval(() => {
        nextSlide();
      }, 3000);

      // Cleanup the interval on component unmount
      return () => {
        clearInterval(interval);
      };
    }
  }, [isHovered]);

  // Handle mouse over event
  const handleMouseOver = (): void => {
    setIsHovered(true);
  };

  // Handle mouse leave event
  const handleMouseLeave = (): void => {
    setIsHovered(false);
  };

  return (
    <div className="slide">
      <div
        className="slide"
        onMouseOver={handleMouseOver}
        onMouseLeave={handleMouseLeave}
      >
        <Image
          src={images[currentIndex].src}
          alt={`Slider Image ${currentIndex + 1}`}
          layout="fill"
          objectFit="content"
          className="rounded-xl"
        />
        <button 
          className="ok left"
          onClick={prevSlide}
        >
          <ChevronLeft className="text-gray-400 hover:text-white" />
        </button>
        <button
          className="ok right"
          onClick={nextSlide}
        >
          <ChevronRight className="text-gray-400 hover:text-white" />
        </button>
      </div>
      <div className="dots">
        {images.map((_, index) => (
          <div
            key={index}
            className={`h-2 w-6 ${
              index === currentIndex
                ? 'bg-[#beff46] rounded-full'
                : 'bg-gray-300 rounded-full'
            } transition-all duration-500 ease-in-out`}
          ></div>
        ))}
      </div>
    </div>
  );
}
