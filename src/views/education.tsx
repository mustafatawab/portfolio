import { GraduationCap, School, Laptop, Award } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { education } from "@/lib/edu";
const Education = () => {
  

  const getColorClasses = (color: string) => {
    const colors = {
      blue: {
        bg: "bg-blue-500",
        text: "text-blue-400",
        badge: "bg-blue-500/20 text-blue-400 border-blue-500/30",
      },
      green: {
        bg: "bg-emerald-500",
        text: "text-emerald-400",
        badge: "bg-emerald-500/20 text-emerald-400 border-emerald-500/30",
      },
      purple: {
        bg: "bg-purple-500",
        text: "text-purple-400",
        badge: "bg-purple-500/20 text-purple-400 border-purple-500/30",
      },
      orange: {
        bg: "bg-orange-500",
        text: "text-orange-400",
        badge: "bg-orange-500/20 text-orange-400 border-orange-500/30",
      },
    };
    return colors[color as keyof typeof colors];
  };

  return (
    <section id="education" className="py-24 bg-background">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="gradient-text">Education</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-3xl mx-auto">
            Academic foundation and continuous learning in AI and computer science
          </p>
        </div>

        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-6">
          {education.map((edu, index) => {
            const Icon = edu.icon;
            const colorClasses = getColorClasses(edu.color);
            
            return (
              <div
                key={index}
                className="bg-card/50 backdrop-blur-sm border border-border/50 rounded-xl p-6 hover:border-primary/30 transition-smooth animate-fade-in"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="flex items-start gap-4 mb-4">
                  <div className={`p-4 rounded-full ${colorClasses.bg} flex-shrink-0`}>
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-semibold text-foreground mb-1">
                      {edu.degree}
                    </h3>
                    <p className={`text-sm font-medium ${colorClasses.text}`}>
                      {edu.institution} • {edu.period}
                    </p>
                  </div>
                </div>
                
                <p className="text-muted-foreground text-sm mb-4 leading-relaxed">
                  {edu.description}
                </p>
                
                <div className="flex flex-wrap gap-2">
                  {edu.achievements.map((achievement, i) => (
                    <Badge
                      key={i}
                      variant="outline"
                      className={`${colorClasses.badge} border`}
                    >
                      {achievement}
                    </Badge>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Education;
