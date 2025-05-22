import Link from "next/link"
import { ArrowRight, BookOpen, CheckCircle, Clock, Star } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"

export default function LearnSkillsPage() {
  const skills = [
    {
      title: "Web Development Fundamentals",
      description: "Learn HTML, CSS, and JavaScript to build the foundation of modern web development.",
      icon: <BookOpen className="h-6 w-6 text-emerald-600" />,
      level: "Beginner",
      duration: "4 weeks",
      topics: ["HTML5", "CSS3", "JavaScript Basics", "Responsive Design", "Web Accessibility"],
      link: "/courses/web-development",
    },
    {
      title: "React & Next.js Development",
      description: "Master React and Next.js to build modern, performant web applications.",
      icon: <BookOpen className="h-6 w-6 text-blue-600" />,
      level: "Intermediate",
      duration: "8 weeks",
      topics: [
        "React Fundamentals",
        "Hooks & State Management",
        "Next.js App Router",
        "Server Components",
        "API Integration",
      ],
      link: "/courses/nextjs-reactjs",
    },
    {
      title: "Vue.js Development",
      description: "Learn Vue.js to build reactive, component-based web applications.",
      icon: <BookOpen className="h-6 w-6 text-green-600" />,
      level: "Intermediate",
      duration: "6 weeks",
      topics: ["Vue.js Fundamentals", "Vue Router", "Vuex", "Composition API", "Vue 3 Features"],
      link: "/courses/vuejs",
    },
    {
      title: "Quasar Framework",
      description: "Build high-performance Vue.js applications with the Quasar Framework.",
      icon: <BookOpen className="h-6 w-6 text-purple-600" />,
      level: "Intermediate",
      duration: "5 weeks",
      topics: ["Quasar CLI", "UI Components", "Layouts", "Quasar Plugins", "Mobile Development"],
      link: "/courses/quasar-framework",
    },
    {
      title: "Python Programming",
      description: "Learn Python for backend development, data analysis, and automation.",
      icon: <BookOpen className="h-6 w-6 text-yellow-600" />,
      level: "Beginner to Intermediate",
      duration: "8 weeks",
      topics: ["Python Basics", "Data Structures", "OOP in Python", "Web Scraping", "API Development"],
      link: "/courses/python",
    },
    {
      title: "AI Agent Development",
      description: "Build autonomous AI agents that can perform complex tasks and solve problems.",
      icon: <BookOpen className="h-6 w-6 text-red-600" />,
      level: "Advanced",
      duration: "10 weeks",
      topics: ["Agent Architecture", "LLM Integration", "Tool Use", "Memory Systems", "Multi-agent Systems"],
      link: "/courses/ai-agents",
    },
    {
      title: "Generative AI Integration",
      description: "Learn to integrate and fine-tune generative AI models in your applications.",
      icon: <BookOpen className="h-6 w-6 text-indigo-600" />,
      level: "Advanced",
      duration: "8 weeks",
      topics: ["LLM Fundamentals", "Prompt Engineering", "AI SDK", "Fine-tuning Models", "Multimodal AI"],
      link: "/courses/generative-ai",
    },
  ]

  return (
    <main className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="bg-slate-900 text-white py-20">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">Learn In-Demand Skills</h1>
          <p className="text-xl text-slate-300 max-w-2xl">
            Master the technologies and skills that will help you build innovative applications and advance your career.
          </p>
        </div>
      </section>

      {/* Skills Overview Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">Skills You Can Learn</h2>
            <p className="text-slate-600 max-w-2xl mx-auto">
              Comprehensive learning paths designed to help you master modern development and AI skills
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {skills.map((skill, index) => (
              <Card key={index} className="border-slate-200 hover:shadow-md transition-shadow">
                <CardHeader>
                  <div className="bg-slate-100 p-3 rounded-lg w-fit mb-4">{skill.icon}</div>
                  <CardTitle>{skill.title}</CardTitle>
                  <CardDescription>{skill.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center gap-4 mb-4 text-sm text-slate-600">
                    <div className="flex items-center">
                      <Star className="h-4 w-4 mr-1 text-amber-500" />
                      {skill.level}
                    </div>
                    <div className="flex items-center">
                      <Clock className="h-4 w-4 mr-1 text-slate-500" />
                      {skill.duration}
                    </div>
                  </div>
                  <h4 className="font-medium mb-2">What you'll learn:</h4>
                  <ul className="space-y-1">
                    {skill.topics.map((topic, i) => (
                      <li key={i} className="flex items-start text-sm">
                        <CheckCircle className="h-4 w-4 mr-2 text-emerald-500 mt-0.5" />
                        <span>{topic}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
                <CardFooter>
                  <Link href={skill.link} className="w-full">
                    <Button className="w-full">
                      Learn More <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </Link>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Learning Approach Section */}
      <section className="py-16 bg-slate-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">My Teaching Approach</h2>
            <p className="text-slate-600 max-w-2xl mx-auto">
              Learn through a combination of theory, practical examples, and hands-on projects
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-xl shadow-sm text-center">
              <div className="bg-emerald-100 p-4 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <BookOpen className="h-6 w-6 text-emerald-600" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Comprehensive Curriculum</h3>
              <p className="text-slate-600">
                Structured learning paths that cover both fundamentals and advanced concepts, ensuring a solid
                understanding of the subject matter.
              </p>
            </div>

            <div className="bg-white p-8 rounded-xl shadow-sm text-center">
              <div className="bg-blue-100 p-4 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="h-6 w-6 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Practical Projects</h3>
              <p className="text-slate-600">
                Learn by doing with real-world projects that reinforce concepts and build your portfolio while you
                learn.
              </p>
            </div>

            <div className="bg-white p-8 rounded-xl shadow-sm text-center">
              <div className="bg-purple-100 p-4 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <Star className="h-6 w-6 text-purple-600" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Industry Best Practices</h3>
              <p className="text-slate-600">
                Learn not just how to code, but how to write clean, maintainable code following industry standards and
                best practices.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-slate-900 text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">Ready to start learning?</h2>
          <p className="text-slate-300 max-w-2xl mx-auto mb-8">
            Browse my courses and start your journey to becoming a skilled developer today.
          </p>
          <Link href="/courses">
            <Button size="lg" className="bg-emerald-500 hover:bg-emerald-600">
              View All Courses <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </div>
      </section>
    </main>
  )
}
