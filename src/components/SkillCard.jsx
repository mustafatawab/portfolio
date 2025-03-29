import * as React from "react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { skills } from "@/lib/skills";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

export default function SkillCard() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 py-10">
      {skills &&
        skills.map((skill, i) => (
          <Card key={i}>
            <CardHeader>
              <CardTitle>{skill.label}</CardTitle>
            </CardHeader>

            <CardContent className="flex flex-wrap gap-2">
              {skill.stack.map((stack, i) => (
                <TooltipProvider key={i}>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Badge
                        className={` dark:text-white px-3 py-1 rounded-xl cursor-alias duration-500 hover:-translate-y-1
                            
                            ${
                              skill.label === "Frontend Technologies"
                                ? "bg-blue-200  dark:text-blue-900 text-blue-900 "
                                : skill.label === "Backend Technologies"
                                ? "bg-green-200 text-green-900 dark:text-green-900"
                                : "bg-purple-200 text-purple-900 dark:text-purple-900"
                            }
                            `}
                      >
                        {stack.label}
                      </Badge>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>{stack.tooltip}</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              ))}
            </CardContent>
          </Card>
        ))}
    </div>
  );
}
