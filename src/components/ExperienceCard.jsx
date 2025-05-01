import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardTitle,
} from "@/components/ui/card";
const ExperienceCard = ({ experience }) => {
  const { company, to, from, designation, description } = experience;
  return (
    <div className="md:flex gap-3 h-full w-full ">
      <div className="md:block hidden bg-blue-300 w-[1px]  rounded-4xl  my-2 relative">
        <div className="rounded-full bg-blue-600 w-2 h-2 absolute -top-1 -left-1"></div>
      </div>
      <Card className="shadow-none w-full hover:bg-blue-100  dark:hover:bg-blue-700">
        <CardContent className="space-y-2">
          <div className="flex justify-between items-center">
            <CardTitle className="text-lg"> {designation}</CardTitle>
            <CardDescription>
              {from} - {to}
            </CardDescription>
          </div>
          <div>{company}</div>
          <CardDescription className="">
            <ul className="">
              {description.trim().split(".").map((item, i) => (
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

export default ExperienceCard;
