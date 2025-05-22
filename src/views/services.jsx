'use client'
import React from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { services } from "@/lib/services";
import { FaCheckCircle } from "react-icons/fa";
import Link from "next/link";
import { FaArrowRightLong } from "react-icons/fa6";
const Services = () => {

  return (
    <section id="services" className="py-20 bg-[#f1f5f9] dark:bg-slate-900 ">
      <div className="p-5 container  mx-auto">
        <h2 className="text-4xl font-bold text-center py-5">Services I offer?</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-2  gap-10 py-5">
          {services.map((service, i) => (
            <Card
              key={i}
              className="shadow-none p-5 hover:bg-blue-100 dark:hover:bg-transparent border-t-8 border-t-blue-600"
            >
              <CardHeader>
                <CardTitle>

                  <div className="text-black font-semibold text-xl  dark:text-white">{service.title}</div>
                </CardTitle>
              <CardDescription>

                <div className="text-gray-600 dark:text-gray-400">{service.content}</div>
              </CardDescription>
              </CardHeader>

              <CardContent className=" flex flex-col">
                <ul >
                  {service.points && service.points.map((pt, i) => <li key={i} className="flex items-center gap-2"> <span className=""> <FaCheckCircle className="text-blue-600 " /> </span> <p> {pt}</p></li>)}
                </ul>
              </CardContent>

              <CardFooter>
                <Link className="flex items-center gap-2 text-blue-600 group" href="#">Learn More <FaArrowRightLong className="group-hover:ml-1 duration-300"/>  </Link>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
