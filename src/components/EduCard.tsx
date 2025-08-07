"use client";
import React from "react";
import { motion } from "framer-motion";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardTitle,
} from "@/components/ui/card";

interface EduTypeProp {
  school: String;
  from: String;
  to: String;
  field: String;
  description: String[];
}

const EduCard = ({ edu }: { edu: EduTypeProp }) => {
  const { school, to, from, field, description } = edu;
  return (
    <div className="md:flex gap-3 h-full w-full ">
      <motion.div
        initial={{ height: 0 }}
        whileInView={{ height: 200 }}
        transition={{ duration: 0.5, delay: 2 * 0.1 }}
        viewport={{ once: true }}
        className="md:block hidden bg-blue-300 w-[1px]  rounded-4xl  my-2 relative"
      >
        <motion.div className="rounded-full bg-blue-600 w-2 h-2 absolute -top-1 -left-1"></motion.div>
      </motion.div>
      <Card className="shadow-none w-full hover:bg-blue-100  dark:hover:bg-blue-700">
        <CardContent className="space-y-2">
          <div className="flex justify-between items-center">
            <CardTitle className="text-lg"> {field}</CardTitle>
            <CardDescription>
              {from} - {to}
            </CardDescription>
          </div>
          <div>{school}</div>
          <CardDescription className="">
            <ul className="">
              {description.map((item, i) => (
                  <li key={i}>- {item}.</li>
                ))}
            </ul>
            {/* {description} */}
          </CardDescription>
        </CardContent>
        {/* <CardFooter>Card Footer</CardFooter> */}
      </Card>
    </div>
  );
};

export default EduCard;
