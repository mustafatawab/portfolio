import Services from "@/views/services";
import React from "react";
import ServiceCard from "@/components/ServiceCard";
import { services } from "@/lib/services";
import Image from "next/image";
const page = () => {
  return (
    <main>
      <section className=" text-white py-20 relative flex justify-center items-center md:h-[60vh] overflow-hidden text-center">
        <div className="absolute inset-0 -z-10 bg-black">
          <Image
            src={"/bg.webp"}
            width={500}
            height={500}
            alt=""
            className="w-full h-full object-cover opacity-55"
          />
        </div>

        <div className="container mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">Services</h1>
          <p className="text-xl text-slate-300 max-w-2xl mx-auto">
            I provide Full Stack Web Development services in international
            market, creating modern, scalable web apps that engage visitors and
            deliver measurable results. Alongside development, I offer AI
            Powered solutions and integrate into your web application. I ensure
            your digital presence grows. Let’s build your online success
            together today.
          </p>
        </div>
      </section>

      <section id="services" className="py-20 dark:bg-slate-950 ">
        <div className="p-5 container  mx-auto">
          <h2 className="text-4xl font-bold text-center py-5">Services</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3  gap-5 py-5">
            {services.map((service, i) => (
              <ServiceCard
                key={i}
                icon={service.icon}
                title={service.title}
                content={service.content}
                points={service.points}
              />
            ))}
          </div>
        </div>
      </section>
    </main>
  );
};

export default page;
