import { Badge } from "@/components/ui/badge";
import { experiences } from "@/lib/experience";


const Experience = () => {
  
  return (
    <section id="experience" className="py-24 relative overflow-hidden">
      <div className="container mx-auto px-6">
        <div className="text-center mb-20">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Work <span className="gradient-text">Experience</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            My journey in AI and machine learning
          </p>
        </div>

        <div className="relative max-w-7xl mx-auto">
          {/* Center Timeline Line */}
          <div className="absolute left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-accent-cyan via-primary to-purple-500 hidden lg:block" />

          <div className="space-y-24">
            {experiences.map((exp, index) => (
              <div
                key={index}
                className={`relative animate-fade-in ${
                  index % 2 === 0 ? 'lg:pr-[50%]' : 'lg:pl-[50%]'
                }`}
                style={{ animationDelay: `${index * 0.2}s` }}
              >
                {/* Timeline Dot */}
                <div className={`absolute left-1/2 top-8 w-4 h-4 rounded-full ${exp.dotColor} -ml-2 z-10 hidden lg:block animate-pulse`} />

                {/* Card */}
                <div className={`relative ${index % 2 === 0 ? 'lg:mr-12' : 'lg:ml-12'}`}>
                  <div className="bg-card/50 backdrop-blur-sm border border-border/50 rounded-xl p-8 hover:border-primary/50 transition-all duration-300 hover:shadow-[0_0_30px_rgba(139,92,246,0.3)] group">
                    <h3 className="text-2xl md:text-3xl font-bold mb-2 group-hover:text-primary transition-colors">
                      {exp.title}
                    </h3>
                    <p className="text-accent-cyan text-lg mb-4">
                      {exp.company} <span className="text-muted-foreground">• {exp.period}</span>
                    </p>
                    <p className="text-foreground/80 leading-relaxed mb-6">
                      {exp.description}
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {exp.tags.map((tag, i) => (
                        <Badge
                          key={i}
                          variant="secondary"
                          className="bg-primary/10 text-primary border-primary/20 hover:bg-primary/20 transition-colors"
                        >
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Experience;
