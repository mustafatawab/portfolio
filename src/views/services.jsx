import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import mobile from "@/assets/mobile-app.png";
import devops from "@/assets/devops.png";
import desktop from "@/assets/desktop.png";
import web from "@/assets/web-development.png";
import wordress from "@/assets/wordpress.png";
import Image from "next/image";
const Services = () => {
  const services = [
    {
      title: "Web Development",
      content:
        "Creating full responsive and fully functional websites and web applications using different technologies.",
      img: web,
    },

    {
      title: "WordPress Developement",
      content:
        "Desing your website for your business , agency and blogging site using differenct content management system (Wix, Wordpress, Framer)",
      img: wordress,
    },

    {
      title: "Mobile App Development",
      content:
        "Build cross plat mobile apps for IOS and Android with publishing to you Play Store and Apple Store",
      img: mobile,
    },

    {
      title: "Desktop Apps",
      content:
        "Increase your sale by developing POS software and other billing softwares",
      img: desktop,
    },

    {
      title: "DevOps",
      content:
        "Facing problem with your running applications? Docker and Kubernetes will solve this problem. Make your app fully automated and containerize.",
      img: devops,
    },
  ];
  return (
    <section id="services" className="py-20 bg-[#f1f5f9] dark:bg-slate-900 ">
      <div className="p-5 w-full md:w-4/5  mx-auto">
        <h2 className="text-4xl font-bold text-center py-5">What I offer?</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3  gap-10 py-5">
          {services.map((service, i) => (
            <Card
              key={i}
              className="shadow-none p-10 hover:bg-blue-100 dark:hover:bg-transparent"
            >
              <CardHeader className="text-lg font-semibold space-y-5">
                <Image src={service.img} width={'100'} height={''} alt={service.title}/>
                {/* <p>
                  {service.title}
                  </p> */}
              </CardHeader>

              <CardContent className="text-gray-700 dark:text-gray-400">
                {service.content}
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
