import { resumeData } from "@/data/resume"
import Image from "next/image"
import { Mail, Phone, Globe, Linkedin } from "lucide-react"

export default function ResumePage() {
  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-300 font-mono p-8 md:p-12 print:p-0 print:bg-white print:text-black">
      {/* Print-only styles for better A4 layout */}
      <style>{`
        @media print {
          @page { margin: 1cm; size: A4; }
          body { -webkit-print-color-adjust: exact; }
          .no-print { display: none; }
          a { text-decoration: none; color: inherit; }
        }
      `}</style>

      {/* Back Button (Screen only) */}
      {/* Removed the Back Button link */}

      <div className="max-w-4xl mx-auto bg-zinc-900/50 border border-zinc-800 p-8 md:p-12 shadow-2xl print:shadow-none print:border-none print:bg-white print:p-0">
        {/* Header */}
        <header className="border-b-2 border-zinc-800 print:border-black mb-8 pb-8 flex flex-col md:flex-row justify-between items-start gap-8">
          <div className="flex-1">
            <h1 className="text-4xl md:text-5xl font-bold text-white print:text-black mb-4 tracking-tight">
              {resumeData.name}
            </h1>
            <h2 className="text-xl text-green-500 print:text-black font-bold mb-6">{resumeData.title}</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-zinc-400 print:text-zinc-600">
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <Mail size={14} />
                  <a href={`mailto:${resumeData.contact.email}`} className="hover:text-green-500">
                    {resumeData.contact.email}
                  </a>
                </div>
                <div className="flex items-center gap-2">
                  <Phone size={14} />
                  <span>{resumeData.contact.phone}</span>
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <Globe size={14} />
                  <a href={resumeData.contact.website} className="hover:text-green-500">
                    {resumeData.contact.website.replace("https://", "")}
                  </a>
                </div>
                <div className="flex items-center gap-2">
                  <Linkedin size={14} />
                  <a href={resumeData.contact.linkedin} className="hover:text-green-500">
                    {resumeData.contact.linkedin.replace("https://www.", "")}
                  </a>
                </div>
              </div>
            </div>
          </div>

          <div className="relative shrink-0 w-32 h-32 md:w-40 md:h-40 rounded-xl overflow-hidden border-2 border-zinc-800 print:border-zinc-300 print:hidden">
            <Image src="/profile.png" alt={resumeData.name} fill className="object-cover object-top grayscale" />
          </div>
          <div className="hidden print:block relative shrink-0 w-40 h-40 rounded-xl overflow-hidden border-2 border-black">
            <Image src="/profile.png" alt={resumeData.name} fill className="object-cover object-top" />
          </div>
        </header>

        {/* Summary */}
        <section className="mb-8">
          <h3 className="text-green-500 print:text-black font-bold uppercase tracking-wider mb-3 flex items-center gap-2">
            <span className="w-2 h-2 bg-green-500 print:bg-black rounded-full"></span>
            Professional Summary
          </h3>
          <p className="leading-relaxed text-zinc-300 print:text-zinc-800">{resumeData.summary}</p>
        </section>

        {/* Core Competencies */}
        <section className="mb-8">
          <h3 className="text-green-500 print:text-black font-bold uppercase tracking-wider mb-4 flex items-center gap-2">
            <span className="w-2 h-2 bg-green-500 print:bg-black rounded-full"></span>
            Technical Expertise
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {resumeData.coreCompetencies.map((area, i) => (
              <div key={i}>
                <h4 className="text-white print:text-black font-bold text-sm mb-2">{area.category}</h4>
                <ul className="space-y-1">
                  {area.skills.map((skill, j) => (
                    <li key={j} className="text-sm text-zinc-400 print:text-zinc-700 flex items-start gap-2">
                      <span className="text-green-500 print:text-black mt-1">›</span>
                      {skill}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        {/* Experience */}
        <section className="mb-8">
          <h3 className="text-green-500 print:text-black font-bold uppercase tracking-wider mb-6 flex items-center gap-2">
            <span className="w-2 h-2 bg-green-500 print:bg-black rounded-full"></span>
            Professional Experience
          </h3>
          <div className="space-y-8">
            {resumeData.experience.map((exp, i) => (
              <div key={i} className="relative pl-4 md:pl-0">
                <div className="flex flex-col md:flex-row md:justify-between md:items-baseline mb-2">
                  <div>
                    <h4 className="text-lg font-bold text-white print:text-black">{exp.role}</h4>
                    <p className="text-green-500 print:text-black font-medium">{exp.company}</p>
                  </div>
                  <span className="text-sm text-zinc-500 print:text-zinc-600 font-medium mt-1 md:mt-0">
                    {exp.period}
                  </span>
                </div>
                <p className="text-zinc-400 print:text-zinc-700 mb-3 italic text-sm">{exp.description}</p>
                {exp.achievements && (
                  <ul className="space-y-2">
                    {exp.achievements.map((ach, j) => (
                      <li key={j} className="text-sm text-zinc-300 print:text-zinc-800 flex items-start gap-2">
                        <span className="text-zinc-600 print:text-zinc-400 mt-1">•</span>
                        <span>{ach}</span>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </div>
        </section>

        {/* Technical Skills Matrix */}
        <section className="mb-8 break-inside-avoid">
          <h3 className="text-green-500 print:text-black font-bold uppercase tracking-wider mb-4 flex items-center gap-2">
            <span className="w-2 h-2 bg-green-500 print:bg-black rounded-full"></span>
            Skills Matrix
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {Object.entries(resumeData.technicalExpertise).map(([category, skills]) => (
              <div key={category}>
                <h4 className="text-xs font-bold text-zinc-500 print:text-zinc-600 uppercase mb-2">
                  {category.replace(/([A-Z])/g, " $1").trim()}
                </h4>
                <div className="flex flex-wrap gap-1">
                  {skills.map((skill) => (
                    <span key={skill} className="text-xs text-zinc-300 print:text-zinc-800">
                      {skill}
                      <span className="text-zinc-600 mx-1">/</span>
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  )
}
