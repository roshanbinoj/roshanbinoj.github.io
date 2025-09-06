import { FaLocationArrow, FaPhone, FaEnvelope } from "react-icons/fa6";
import Image from "next/image";

import { socialMedia } from "@/data";
import MagicButton from "./MagicButton";

const Footer = () => {
  return (
    <footer className="w-full pt-20 pb-10" id="contact">
      {/* background grid */}
      <div className="w-full absolute left-0 -bottom-72 min-h-96">
        <div className="relative w-full h-full">
          <Image
            src="/footer-grid.svg"
            alt="grid"
            fill
            className="opacity-50 object-cover"
          />
        </div>
      </div>

      <div className="flex flex-col items-center">
        <h1 className="heading lg:max-w-[45vw]">
          Let’s collaborate — available for{" "}
          <span className="text-purple">internships & projects</span>
        </h1>

        <div className="flex flex-col sm:flex-row items-center gap-3 mt-4">
          <a
            href="https://drive.google.com/file/d/1caAlu1GJ-BUzUFKkhZc0AAqFa9XA8Tsx/view?usp=drive_link"
            target="_blank"
            rel="noopener noreferrer"
            className="mt-2 sm:mt-0"
          >
            <MagicButton
              title="Download Resume"
              icon={<FaLocationArrow />}
              position="right"
            />
          </a>
        </div>
      </div>

      <div className="flex mt-6 md:flex-row flex-col justify-between items-center">
        <p className="md:text-base text-sm md:font-normal font-light">
          Copyright © 2025 Roshan Binoj
        </p>

        <div className="flex items-center md:gap-3 gap-6">
          {socialMedia.map((info) => (
            <a
              key={`footer-${info.id}`}
              href={info.link ?? "#"}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`Open social link ${info.id}`}
              className="w-10 h-10 cursor-pointer flex justify-center items-center backdrop-filter backdrop-blur-lg saturate-180 bg-opacity-75 bg-black-200 rounded-lg border border-black-300"
            >
              <Image
                src={info.img}
                alt={`social-${info.id}`}
                width={20}
                height={20}
              />
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
};

export default Footer;
