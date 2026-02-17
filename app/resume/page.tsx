import { resumeData } from "@/data/resume"
import Image from "next/image"
import { Mail, Phone, Globe, Linkedin } from "lucide-react"

export default function ResumePage() {
  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-300 font-mono p-4 md:p-12 print:p-0 print:bg-white print:text-black">
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

      <div className="max-w-4xl mx-auto bg-zinc-900/50 border border-zinc-800 p-6 md:p-12 shadow-2xl print:shadow-none print:border-none print:bg-white print:p-0">
        {/* Header */}
        <header className="border-b-2 border-zinc-800 print:border-black mb-6 pb-6 flex flex-row justify-between items-start gap-6">
          <div className="flex-1">
            <h1 className="text-3xl md:text-5xl font-bold text-white print:text-black mb-2 tracking-tight">
              {resumeData.name}
            </h1>
            <h2 className="text-lg md:text-xl text-green-500 print:text-black font-bold mb-4">{resumeData.title}</h2>

            <div className="grid grid-cols-2 gap-x-4 gap-y-2 text-sm text-zinc-400 print:text-zinc-600">
              <div className="flex items-center gap-2">
                <Mail size={14} className="shrink-0" />
                <a href={`mailto:${resumeData.contact.email}`} className="hover:text-green-500">
                  {resumeData.contact.email}
                </a>
              </div>
              <div className="flex items-center gap-2">
                <Globe size={14} className="shrink-0" />
                <a href={resumeData.contact.website} className="hover:text-green-500">
                  {resumeData.contact.website.replace("https://", "")}
                </a>
              </div>
              <div className="flex items-center gap-2">
                <Phone size={14} className="shrink-0" />
                <span>{resumeData.contact.phone}</span>
              </div>
              <div className="flex items-center gap-2">
                <Linkedin size={14} className="shrink-0" />
                <a href={resumeData.contact.linkedin} className="hover:text-green-500">
                  {resumeData.contact.linkedin.replace("https://www.", "")}
                </a>
              </div>
            </div>
          </div>

          <div className="relative shrink-0 w-28 h-28 md:w-40 md:h-40 rounded-xl overflow-hidden border-2 border-zinc-800 print:border-zinc-300 print:hidden">
            <Image src="/profile.png" alt={resumeData.name} fill className="object-cover object-top grayscale" />
          </div>
          <div className="hidden print:block relative shrink-0 w-40 h-40 rounded-xl overflow-hidden border-2 border-black">
            <Image src="/profile.png" alt={resumeData.name} fill className="object-cover object-top" />
          </div>
        </header>

        {/* Summary */}
        <section className="mb-6">
          <h3 className="text-green-500 print:text-black font-bold uppercase tracking-wider mb-2 flex items-center gap-2">
            <span className="w-2 h-2 bg-green-500 print:bg-black rounded-full"></span>
            Professional Summary
          </h3>
          <p className="leading-relaxed text-zinc-300 print:text-zinc-800 text-sm">{resumeData.summary}</p>
        </section>

        {/* Milestone Commits */}
        <section className="mb-6">
          <h3 className="text-green-500 print:text-black font-bold uppercase tracking-wider mb-3 flex items-center gap-2">
            <span className="w-2 h-2 bg-green-500 print:bg-black rounded-full"></span>
            Key Achievements
          </h3>
          <div className="space-y-3">
            {resumeData.experienceHighlights?.map((highlight, i) => (
              <div key={i} className="break-inside-avoid">
                <div className="flex items-baseline justify-between gap-4 mb-0.5">
                  <h4 className="text-sm font-bold text-white print:text-black">
                    <span className="mr-2">{highlight.icon}</span>
                    {highlight.title}
                  </h4>
                  <span className="text-xs text-green-500 print:text-zinc-600 font-medium shrink-0">
                    {highlight.impact}
                  </span>
                </div>
                <p className="text-xs text-zinc-400 print:text-zinc-700 leading-relaxed">
                  {highlight.description}
                </p>
              </div>
            ))}
          </div>
        </section>
        {/* New lines for arranging content in A4 page for printing */}
        <div className="print:hidden">
          <br />
        </div>
        {/* Experience */}
        <section className="mb-6">
          <h3 className="text-green-500 print:text-black font-bold uppercase tracking-wider mb-4 flex items-center gap-2">
            <span className="w-2 h-2 bg-green-500 print:bg-black rounded-full"></span>
            Professional Experience
          </h3>
          <div className="space-y-6">
            {resumeData.experience.map((exp, i) => (
              <div key={i} className="relative">
                <div className="flex flex-row justify-between items-baseline mb-1">
                  <div>
                    <h4 className="text-base font-bold text-white print:text-black">{exp.role}</h4>
                    <p className="text-green-500 print:text-black font-medium text-sm">{exp.company}</p>
                  </div>
                  <span className="text-sm text-zinc-500 print:text-zinc-600 font-medium shrink-0">
                    {exp.period}
                  </span>
                </div>
                <p className="text-zinc-400 print:text-zinc-700 mb-2 italic text-xs">{exp.description}</p>
                {exp.achievements && (
                  <ul className="space-y-1">
                    {exp.achievements.map((ach, j) => (
                      <li key={j} className="text-xs text-zinc-300 print:text-zinc-800 flex items-start gap-2">
                        <span className="text-zinc-600 print:text-zinc-400 mt-0.5">•</span>
                        <span>{ach}</span>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </div>
        </section>
        {/* New lines for arranging content in A4 page for printing */}
        <div className="print:hidden">
          <br />
        </div>
        {/* Technical Skills Matrix */}
        <section className="mb-6 break-inside-avoid">
          <h3 className="text-green-500 print:text-black font-bold uppercase tracking-wider mb-3 flex items-center gap-2">
            <span className="w-2 h-2 bg-green-500 print:bg-black rounded-full"></span>
            Skills Matrix
          </h3>
          <div className="grid grid-cols-4 gap-3">
            {Object.entries(resumeData.technicalExpertise).map(([category, skills]) => (
              <div key={category}>
                <h4 className="text-xs font-bold text-zinc-500 print:text-zinc-600 uppercase mb-1">
                  {category.replace(/([A-Z])/g, " $1").trim()}
                </h4>
                <div className="flex flex-wrap gap-0.5">
                  {skills.map((skill) => (
                    <span key={skill} className="text-[11px] text-zinc-300 print:text-zinc-800">
                      {skill}
                      <span className="text-zinc-600 mx-0.5">/</span>
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
