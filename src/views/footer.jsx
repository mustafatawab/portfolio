import React from "react";
import Link from "next/link";
import { BsLinkedin, BsGithub } from "react-icons/bs";
import { Mail } from "lucide-react";
const Footer = () => {
  return (
    <footer id="footer" className="py-3 bg-[#f1f5f9] dark:bg-black ">
      <div className="p-5 container  mx-auto">
        <div className="flex flex-col justify-center items-center gap-2 ">
          <div className="">
            <p className="text-gray-700">
              © 2025
              <Link href="/" className=" font-semibold">
                <span className="text-blue-600"> M</span>ustafa Tawab
              </Link>
              . All rights reserved.
            </p>
          </div>

          
          <div className="flex  gap-2 ">
            <span className="flex gap-2 items-center">
              <Link href={"https://www.linkedin.com/in/mustafa-tawab/"}>
              <BsLinkedin size="20" className="text-gray-600" />
              </Link>
            </span>

            <span className="flex gap-2 items-center">
              <Link href={"https://github.com/mustafatawab"}>
                <BsGithub size="20" className="text-gray-600" />
              </Link>
            </span>

            <span className="flex gap-2 items-center">
              <Link href={"mailto:tawab05@gmail.comm"}>
                <Mail size="20" className="text-gray-600" />
              </Link>
            </span>
          </div>
        </div>

        {/* <hr />

                <div className='mt-10 flex justify-center items-center text-center'>
                    <p>

                        © 2025 <strong> Mustafa Tawab</strong>. All rights reserved.
                    </p>
                </div> */}
      </div>
    </footer>
  );
};

export default Footer;
