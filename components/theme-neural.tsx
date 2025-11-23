"use client"

import { useState, useEffect } from "react"
import { resumeData } from "@/data/resume"
import { Terminal, Cpu, Network, ChevronRight, Command, FileText, ChevronLeft, MessageSquare } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

interface BlogPost {
  id: string | number
  title: string
  date: string
  category: string
  readTime: string
  content: string
  link?: string
}

interface NeuralThemeProps {
  initialBlogs?: BlogPost[]
  initialActiveTab?: string
  initialSelectedBlogId?: string
}

export function NeuralTheme({
  initialBlogs = [],
  initialActiveTab = "overview",
  initialSelectedBlogId = undefined,
}: NeuralThemeProps) {
  const [activeTab, setActiveTab] = useState(initialActiveTab)
  const [selectedBlog, setSelectedBlog] = useState<string | null>(initialSelectedBlogId || null)
  const [selectedCategory, setSelectedCategory] = useState<string>("ALL")
  const [currentPage, setCurrentPage] = useState(1)
  const [booted, setBooted] = useState(false)
  const ITEMS_PER_PAGE = 2 // Low number to demonstrate pagination with few posts

  const [traitIndex, setTraitIndex] = useState(0)
  useEffect(() => {
    const interval = setInterval(() => {
      setTraitIndex((prev) => (prev + 1) % (resumeData.personalTraits?.length || 1))
    }, 3000)
    return () => clearInterval(interval)
  }, [])

  useEffect(() => {
    const hasBooted = sessionStorage.getItem("neural_booted")
    if (hasBooted) {
      setBooted(true)
    } else {
      setTimeout(
        () => {
          setBooted(true)
          sessionStorage.setItem("neural_booted", "true")
        },
        initialSelectedBlogId ? 300 : 800,
      )
    }
  }, [initialSelectedBlogId])

  useEffect(() => {
    if (activeTab !== "blogs") {
      setSelectedBlog(null)
      setSelectedCategory("ALL")
    }
  }, [activeTab])

  useEffect(() => {
    if (initialActiveTab) setActiveTab(initialActiveTab)
    if (initialSelectedBlogId) setSelectedBlog(initialSelectedBlogId)
  }, [initialActiveTab, initialSelectedBlogId])

  const allBlogs = initialBlogs.length > 0 ? initialBlogs : resumeData.blogs || []
  const filteredBlogs =
    selectedCategory === "ALL" ? allBlogs : allBlogs.filter((blog) => blog.category === selectedCategory)

  const totalPages = Math.ceil(filteredBlogs.length / ITEMS_PER_PAGE)
  const currentBlogs = filteredBlogs.slice((currentPage - 1) * ITEMS_PER_PAGE, currentPage * ITEMS_PER_PAGE)

  const categories = ["ALL", ...Array.from(new Set(allBlogs.map((blog) => blog.category || "Uncategorized")))]

  const pathMap: Record<string, string> = {
    overview: "~",
    stack: "~/tech_stack",
    experience: "~/logs",
    blogs: "~/blog_posts",
    endorsements: "~/endorsements",
  }

  const TabButton = ({ id, label, icon: Icon, href }: any) => (
    <Link
      href={href}
      className={`flex items-center gap-2 px-4 py-2 text-sm font-mono border transition-all duration-300 cursor-pointer ${
        activeTab === id
          ? "border-green-500 text-green-500 bg-green-500/10 shadow-[0_0_10px_rgba(34,197,94,0.3)]"
          : "border-zinc-800 text-zinc-500 hover:text-zinc-300 hover:border-zinc-700"
      }`}
    >
      <Icon size={14} />
      <span>{label}</span>
    </Link>
  )

  const EncryptionMarker = () => (
    <div className="flex gap-1 mb-2">
      {[...Array(5)].map((_, i) => (
        <span key={i} className="text-[10px] text-green-500 opacity-50">
          *
        </span>
      ))}
    </div>
  )

  if (!booted) {
    return (
      <div className="min-h-screen bg-black text-green-500 font-mono flex items-center justify-center p-4">
        <div className="max-w-md w-full">
          <p className="mb-2">Initializing system...</p>
          <div className="w-full bg-zinc-900 h-1 mb-2">
            <div className="bg-green-500 h-full animate-[width_1s_ease-out_forwards] w-full"></div>
          </div>
          <p className="text-xs text-zinc-500">LOADING KERNEL MODULES... OK</p>
          <p className="text-xs text-zinc-500">MOUNTING FILESYSTEM... OK</p>
          <p className="text-xs text-zinc-500">STARTING UI DAEMON... OK</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-black text-zinc-300 font-mono selection:bg-green-500/30 neural-scrollbar pb-20">
      {/* Top Bar */}
      <div className="fixed top-0 left-0 right-0 h-10 border-b border-zinc-800 bg-black/90 backdrop-blur-sm z-40 flex items-center px-4 justify-between">
        <div className="flex items-center gap-2 text-xs text-green-500">
          <Terminal size={14} />
          <span>j@sathish-me:{pathMap[activeTab] === "~" ? "~/" : pathMap[activeTab]}</span>
        </div>
        <div className="flex gap-4 text-xs text-zinc-600">
          <Link
            href="/resume"
            className="flex items-center gap-1 hover:text-green-500 transition-colors cursor-pointer"
            title="View Full Resume"
          >
            <FileText size={12} />
            <span className="hidden sm:inline">VIEW_RESUME</span>
          </Link>
          <span className="hidden sm:inline text-zinc-700">|</span>
          <span className="hidden sm:inline">UPTIME: 14Y 5M</span>
          <span className="hidden sm:inline">CTX: 200K</span>
          <span className="hidden sm:inline">AGENTS: 5</span>
        </div>
      </div>

      <main className="pt-20 px-6 max-w-5xl mx-auto">
        {/* Header Area */}
        <header
          className={`border-l-2 border-green-500 pl-6 relative transition-all duration-500 ease-in-out overflow-hidden ${
            selectedBlog !== null ? "max-h-0 opacity-0 mb-0 py-0" : "max-h-[500px] opacity-100 mb-16 py-2"
          }`}
        >
          <div className="absolute -left-[5px] top-0 w-2 h-2 bg-green-500 rounded-full"></div>
          <div className="absolute -left-[5px] bottom-0 w-2 h-2 bg-green-500 rounded-full"></div>

          <div className="flex flex-col-reverse md:flex-row justify-between items-start gap-8">
            <div className="flex-1">
              <h1 className="text-4xl md:text-6xl font-bold text-white mb-4 tracking-tight">
                {resumeData.name}
                <span className="animate-blink inline-block w-3 h-8 md:h-12 bg-green-500 ml-2 align-middle"></span>
              </h1>
              <p className="text-zinc-500 max-w-2xl">{resumeData.summary}</p>

              <div className="flex gap-4 mt-6 text-sm flex-wrap">
                <a
                  href={resumeData.contact.linkedin}
                  target="_blank"
                  className="text-zinc-400 hover:text-green-400 transition-colors"
                  rel="noreferrer"
                >
                  [LINKEDIN]
                </a>
                <a
                  href={resumeData.contact.medium}
                  target="_blank"
                  className="text-zinc-400 hover:text-green-400 transition-colors"
                  rel="noreferrer"
                >
                  [MEDIUM]
                </a>
                <a
                  href={`mailto:${resumeData.contact.email}`}
                  className="text-zinc-400 hover:text-green-400 transition-colors"
                >
                  [EMAIL]
                </a>
              </div>
            </div>

            <div className="relative shrink-0 group">
              <div className="absolute inset-0 bg-green-500/20 translate-x-2 translate-y-2 rounded-sm transition-transform group-hover:translate-x-1 group-hover:translate-y-1"></div>
              <div className="relative w-32 h-32 md:w-48 md:h-48 border-2 border-zinc-800 overflow-hidden rounded-sm grayscale hover:grayscale-0 transition-all duration-500">
                <Image
                  src="/profile.png"
                  alt={resumeData.name}
                  fill
                  className="object-cover object-top"
                  sizes="(max-width: 768px) 128px, 192px"
                  priority
                />
                {/* Scanline overlay */}
                <div className="absolute inset-0 bg-[linear-gradient(rgba(18,18,18,0)_50%,rgba(0,255,0,0.05)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] z-10 bg-[length:100%_2px,3px_100%] pointer-events-none"></div>
              </div>
            </div>
          </div>
        </header>

        {/* Navigation */}
        <div
          className={`flex flex-wrap gap-4 border-b border-zinc-800 pb-4 transition-all duration-500 ${selectedBlog !== null ? "mb-8" : "mb-12"}`}
        >
          <TabButton id="overview" label="./OVERVIEW" icon={Command} href="/" />
          <TabButton id="stack" label="./TECH_STACK" icon={Cpu} href="/tech-stack" />
          <TabButton id="experience" label="./LOGS" icon={Network} href="/logs" />
          <TabButton id="blogs" label="./BLOG_POSTS" icon={FileText} href="/blog" />
          <TabButton id="endorsements" label="./ENDORSEMENTS" icon={MessageSquare} href="/endorsements" />
        </div>

        {/* Content Area */}
        <div className="min-h-[400px]">
          {activeTab === "overview" && (
            <div className="grid md:grid-cols-2 gap-12 animate-in fade-in slide-in-from-bottom-4 duration-500">
              <div>
                <h3 className="text-green-500 mb-6 flex items-center gap-2">
                  <ChevronRight size={16} /> SYSTEM_PHILOSOPHY
                </h3>
                <p className="text-zinc-400 leading-relaxed mb-8">{resumeData.philosophy}</p>

                <h3 className="text-green-500 mb-6 flex items-center gap-2">
                  <ChevronRight size={16} /> CORE_MODULES
                </h3>
                <ul className="space-y-3 text-zinc-400 text-sm">
                  {resumeData.coreCompetencies
                    .flatMap((c) => c.skills)
                    .slice(0, 6)
                    .map((skill, i) => (
                      <li key={i} className="flex items-center gap-3">
                        <span className="text-zinc-700">0{i + 1}</span>
                        <span>{skill}</span>
                      </li>
                    ))}
                </ul>
              </div>
              <div className="border border-zinc-800 bg-zinc-900/30 p-6 rounded-sm relative overflow-hidden group">
                <div className="absolute top-0 left-0 w-full h-1 bg-green-500/50"></div>
                <div className="absolute -right-12 -top-12 w-48 h-48 bg-green-500/10 blur-3xl rounded-full group-hover:bg-green-500/20 transition-all duration-1000"></div>

                <h3 className="text-white mb-4 font-bold">LATEST_METRICS</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-black/50 p-3 border border-zinc-800">
                    <div className="text-zinc-500 text-[10px] mb-1">SYSTEM_UPTIME</div>
                    <div className="text-green-400 font-mono text-xl">{resumeData.metrics?.uptime || "99.99%"}</div>
                  </div>
                  <div className="bg-black/50 p-3 border border-zinc-800">
                    <div className="text-zinc-500 text-[10px] mb-1">ARR_IMPACT</div>
                    <div className="text-green-400 font-mono text-xl">{resumeData.metrics?.arrImpact || "$1.5M+"}</div>
                  </div>
                  <div className="bg-black/50 p-3 border border-zinc-800">
                    <div className="text-zinc-500 text-[10px] mb-1">OPS_COST</div>
                    <div className="text-green-400 font-mono text-xl">{resumeData.metrics?.opsCost || "-40%"}</div>
                  </div>
                  <div className="bg-black/50 p-3 border border-zinc-800">
                    <div className="text-zinc-500 text-[10px] mb-1">TEAM_SCALE</div>
                    <div className="text-green-400 font-mono text-xl">{resumeData.metrics?.teamScale || "30+"}</div>
                  </div>
                </div>

                <div className="mt-8 pt-6 border-t border-zinc-800">
                  <p className="text-xs text-zinc-500 mb-2">BACKGROUND_PROCESSES (htop)</p>
                  {/* Replaced simple text ticker with htop-style table */}
                  <div className="font-mono text-[10px] md:text-xs overflow-x-auto bg-black/80 border border-zinc-800 rounded p-2">
                    <table className="w-full text-left border-collapse">
                      <thead>
                        <tr className="bg-zinc-800 text-black">
                          <th className="px-1 py-0.5 bg-green-500 text-black">PID</th>
                          <th className="px-1 py-0.5 text-green-500 bg-transparent">USER</th>
                          <th className="px-1 py-0.5 text-green-500 bg-transparent">CPU%</th>
                          <th className="px-1 py-0.5 text-green-500 bg-transparent">MEM%</th>
                          <th className="px-1 py-0.5 text-green-500 bg-transparent">TIME+</th>
                          <th className="px-1 py-0.5 text-green-500 bg-transparent">COMMAND</th>
                        </tr>
                      </thead>
                      <tbody>
                        {/* @ts-ignore - we know personalTraits is now an array of objects */}
                        {resumeData.personalTraits.map((process: any, i: number) => (
                          <tr key={process.pid} className="border-b border-zinc-900/50 hover:bg-zinc-900/50">
                            <td className="px-1 py-0.5 text-green-300">{process.pid}</td>
                            <td className="px-1 py-0.5 text-zinc-400">{process.user}</td>
                            <td className="px-1 py-0.5 text-zinc-300">{process.cpu}</td>
                            <td className="px-1 py-0.5 text-zinc-300">{process.mem}</td>
                            <td className="px-1 py-0.5 text-zinc-500">{process.time}</td>
                            <td className="px-1 py-0.5 text-white whitespace-nowrap">{process.command}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                    <div className="mt-2 flex gap-2 text-[10px] text-zinc-500">
                      <span>F1Help</span>
                      <span>F2Setup</span>
                      <span>F3Search</span>
                      <span>F10Quit</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === "stack" && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 animate-in fade-in slide-in-from-bottom-4 duration-500">
              {Object.entries(resumeData.technicalExpertise).map(([category, skills]) => (
                <div key={category} className="border border-zinc-800 p-4 hover:border-green-500/50 transition-colors">
                  <h4 className="text-green-500 text-xs uppercase mb-3 tracking-wider">
                    {category.replace(/([A-Z])/g, " $1").trim()}
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {skills.map((skill: string) => (
                      <span key={skill} className="text-xs bg-zinc-900 text-zinc-300 px-2 py-1">
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}

          {activeTab === "experience" && (
            <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
              {resumeData.experience.map((exp, i) => (
                <div key={i} className="relative pl-8 border-l border-zinc-800 group">
                  <div className="absolute -left-[5px] top-0 w-2 h-2 bg-zinc-800 rounded-full group-hover:bg-green-500 transition-colors"></div>
                  <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between mb-2">
                    <h3 className="text-white font-bold text-lg">{exp.role}</h3>
                    <span className="text-green-500 text-sm">{exp.period}</span>
                  </div>
                  <p className="text-zinc-500 text-sm mb-3">@{exp.company}</p>
                  <p className="text-zinc-400 mb-4">{exp.description}</p>
                  {exp.achievements && (
                    <ul className="space-y-1">
                      {exp.achievements.map((ach, j) => (
                        <li key={j} className="text-sm text-zinc-500 flex items-start gap-2">
                          <span className="text-green-500 mt-1">›</span>
                          {ach}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              ))}
            </div>
          )}

          {activeTab === "endorsements" && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
              {resumeData.testimonials?.map((t, i) => (
                <div
                  key={i}
                  className="border border-zinc-800 bg-zinc-900/20 p-6 relative group hover:border-green-500/30 transition-all"
                >
                  {/* Decoration corners */}
                  <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-green-500/50"></div>
                  <div className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-green-500/50"></div>

                  <div className="flex justify-between items-start mb-4 border-b border-zinc-800 pb-4">
                    <div>
                      {t.linkedin ? (
                        <a
                          href={t.linkedin}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-green-400 font-bold text-sm hover:underline hover:text-green-300 transition-colors flex items-center gap-2"
                        >
                          {t.name}
                          <span className="text-[10px] no-underline opacity-50">↗</span>
                        </a>
                      ) : (
                        <h4 className="text-green-400 font-bold text-sm">{t.name}</h4>
                      )}
                      <p className="text-zinc-500 text-xs font-mono">{t.role}</p>
                    </div>
                    <div className="text-[10px] text-zinc-600 font-mono px-2 py-1 border border-zinc-800 bg-zinc-900">
                      {t.context}
                    </div>
                  </div>

                  <div className="font-mono text-sm text-zinc-400 italic leading-relaxed relative">
                    <span className="absolute -left-2 -top-2 text-green-500/20 text-2xl">"</span>
                    {t.message}
                    <span className="absolute -bottom-4 text-green-500/20 text-2xl">"</span>
                  </div>

                  <div className="mt-4 pt-4 flex justify-end">
                    <span className="text-[10px] text-green-500/50 font-mono">VERIFIED_ENCRYPTED_MSG</span>
                  </div>
                </div>
              ))}
            </div>
          )}

          {activeTab === "blogs" && (
            <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
              {selectedBlog === null ? (
                <div className="flex flex-col md:flex-row gap-8">
                  <aside className="md:w-64 shrink-0">
                    <div className="border border-zinc-800 bg-zinc-900/20 p-4 sticky top-24">
                      <h3 className="text-green-500 text-sm font-bold mb-4 flex items-center gap-2">
                        <Terminal size={14} />
                        ./CATEGORIES
                      </h3>
                      <ul className="space-y-1">
                        {categories.map((category) => (
                          <li key={category}>
                            <button
                              onClick={() => {
                                setSelectedCategory(category)
                                setCurrentPage(1)
                              }}
                              className={`w-full text-left px-3 py-2 text-xs font-mono transition-all border-l-2 ${
                                selectedCategory === category
                                  ? "border-green-500 text-white bg-green-500/10 pl-4"
                                  : "border-transparent text-zinc-500 hover:text-zinc-300 hover:pl-4"
                              }`}
                            >
                              {selectedCategory === category && <span className="text-green-500 mr-2">›</span>}
                              {category}
                            </button>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </aside>

                  <div className="flex-1 space-y-6">
                    {currentBlogs.map((blog) => (
                      <Link
                        href={`/blog/${
                          blog.id ||
                          blog.title
                            .toLowerCase()
                            .replace(/[^a-z0-9]+/g, "-")
                            .replace(/^-|-$/g, "")
                        }`}
                        key={blog.id}
                        className="block border-b border-zinc-800 pb-6 group hover:border-green-500/50 transition-colors"
                      >
                        <div className="flex justify-between items-start mb-2">
                          <h3 className="text-xl font-bold text-white group-hover:text-green-400 transition-colors">
                            {blog.title}
                          </h3>
                          <span className="text-xs font-mono text-zinc-500">{blog.date}</span>
                        </div>
                        <p className="text-zinc-400 mb-3 line-clamp-2">{blog.summary}</p>
                        <div className="flex items-center gap-2 text-xs font-mono text-green-500">
                          <span>READ_POST</span>
                          <div className="w-0 group-hover:w-4 transition-all h-[1px] bg-green-500"></div>
                          <span>&gt;</span>
                        </div>
                      </Link>
                    ))}

                    {/* Pagination */}
                    {filteredBlogs.length > ITEMS_PER_PAGE && (
                      <div className="flex justify-center items-center gap-4 mt-8 text-sm font-mono text-zinc-500">
                        <button
                          onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                          disabled={currentPage === 1}
                          className="flex items-center gap-1 hover:text-green-500 disabled:opacity-50 disabled:hover:text-zinc-500 transition-colors"
                        >
                          <ChevronLeft size={14} />
                          PREV
                        </button>

                        <div className="flex gap-2">
                          {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                            <button
                              key={page}
                              onClick={() => setCurrentPage(page)}
                              className={`w-6 h-6 flex items-center justify-center border ${
                                currentPage === page
                                  ? "border-green-500 text-green-500 bg-green-500/10"
                                  : "border-zinc-800 hover:border-zinc-600"
                              }`}
                            >
                              {page}
                            </button>
                          ))}
                        </div>

                        <button
                          onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                          disabled={currentPage === totalPages}
                          className="flex items-center gap-1 hover:text-green-500 disabled:opacity-50 disabled:hover:text-zinc-500 transition-colors"
                        >
                          NEXT
                          <ChevronRight size={14} />
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              ) : (
                <div className="animate-in fade-in zoom-in-95 duration-300">
                  {(() => {
                    const blog = allBlogs.find((b) => String(b.id) === String(selectedBlog))
                    if (!blog) return <div>Blog not found</div>

                    return (
                      <article className="max-w-3xl mx-auto">
                        <div className="mb-8 border-b border-zinc-800 pb-8">
                          <Link
                            href="/?tab=blogs"
                            onClick={(e) => {
                              e.preventDefault()
                              setSelectedBlog(null)
                            }}
                            className="inline-flex items-center gap-2 text-green-500 text-sm font-mono mb-6 hover:underline cursor-pointer"
                          >
                            <ChevronLeft size={14} />
                            ../RETURN_TO_LIST
                          </Link>

                          <div className="flex gap-3 text-xs font-mono text-zinc-500 mb-4">
                            <span className="border border-zinc-800 px-2 py-1 rounded bg-zinc-900">
                              {blog.category}
                            </span>
                            <span className="border border-zinc-800 px-2 py-1 rounded bg-zinc-900">
                              {blog.readTime || "5 min read"}
                            </span>
                            <span className="border border-zinc-800 px-2 py-1 rounded bg-zinc-900">{blog.date}</span>
                          </div>

                          <h1 className="text-3xl md:text-4xl font-bold text-white mb-6 leading-tight">{blog.title}</h1>
                        </div>

                        <div
                          className="text-zinc-400 leading-relaxed [&_h1]:text-3xl [&_h1]:font-bold [&_h1]:text-white [&_h1]:mt-12 [&_h1]:mb-6 [&_h2]:text-2xl [&_h2]:font-bold [&_h2]:text-white [&_h2]:mt-10 [&_h2]:mb-4 [&_h2]:border-b [&_h2]:border-zinc-800 [&_h2]:pb-2 [&_h3]:text-xl [&_h3]:font-bold [&_h3]:text-green-400 [&_h3]:mt-8 [&_h3]:mb-3 [&_h4]:text-lg [&_h4]:font-bold [&_h4]:text-zinc-200 [&_h4]:mt-6 [&_h4]:mb-2 [&_p]:mb-6 [&_p]:leading-7 [&_strong]:text-white [&_strong]:font-bold [&_em]:italic [&_em]:text-zinc-300 [&_ul]:list-disc [&_ul]:pl-6 [&_ul]:mb-6 [&_ul_li]:mb-2 [&_ol]:list-decimal [&_ol]:pl-6 [&_ol]:mb-6 [&_ol_li]:mb-2 [&_li_p]:mb-2 [&_a]:text-green-400 [&_a]:underline [&_a]:decoration-green-500/30 [&_a]:underline-offset-4 [&_a]:transition-colors hover:[&_a]:decoration-green-500 hover:[&_a]:text-green-300 [&_blockquote]:border-l-4 [&_blockquote]:border-green-500/50 [&_blockquote]:pl-6 [&_blockquote]:italic [&_blockquote]:text-zinc-500 [&_blockquote]:my-8 [&_pre]:bg-[#1e1e1e] [&_pre]:border [&_pre]:border-zinc-800 [&_pre]:p-5 [&_pre]:rounded-sm [&_pre]:overflow-x-auto [&_pre]:mb-8 [&_pre]:font-mono [&_pre]:text-sm [&_pre]:leading-relaxed [&_pre_code]:bg-transparent [&_pre_code]:text-zinc-300 [&_pre_code]:p-0 [&_:not(pre)>code]:bg-zinc-900 [&_:not(pre)>code]:text-green-400 [&_:not(pre)>code]:px-1.5 [&_:not(pre)>code]:py-0.5 [&_:not(pre)>code]:rounded-sm [&_:not(pre)>code]:font-mono [&_:not(pre)>code]:text-sm [&_:not(pre)>code]:border [&_:not(pre)>code]:border-zinc-800 [&_img]:rounded-sm [&_img]:border [&_img]:border-zinc-800 [&_img]:my-8 [&_img]:max-w-full [&_table]:w-full [&_table]:border-collapse [&_table]:my-8 [&_table]:text-sm [&_th]:border-b [&_th]:border-zinc-700 [&_th]:text-left [&_th]:py-3 [&_th]:text-white [&_td]:border-b [&_td]:border-zinc-800 [&_td]:py-3 [&_td]:text-zinc-400"
                          dangerouslySetInnerHTML={{ __html: blog.content || "" }}
                        />

                        {/* Footer Navigation */}
                        <div className="mt-16 pt-8 border-t border-zinc-800 flex justify-between">
                          <Link
                            href="/?tab=blogs"
                            className="text-zinc-500 hover:text-green-500 text-sm font-mono transition-colors"
                          >
                            &lt;&lt; BACK_TO_INDEX
                          </Link>
                        </div>
                      </article>
                    )
                  })()}
                </div>
              )}
            </div>
          )}
        </div>
      </main>
    </div>
  )
}
