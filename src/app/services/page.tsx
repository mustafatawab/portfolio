import Services from "@/views/services";
import React from "react";
import ServiceCard from "@/components/ServiceCard";
import { services } from "@/lib/services";
const page = () => {
  return (
    <main>
      <section className="bg-slate-900 text-white py-20">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">My Services</h1>
          <p className="text-xl text-slate-300 max-w-2xl">
            Checkout my services and lets get in touch.
          </p>
        </div>
      </section>

      <section id="services" className="py-20 bg-white dark:bg-slate-900 ">
        <div className="p-5 container  mx-auto">
          <h2 className="text-4xl font-bold text-center py-5">What I offer</h2>
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
