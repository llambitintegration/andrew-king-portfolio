"use client"

import Image from "next/image"
import { useEffect, useRef, useState } from "react"
import { getResume } from "@/lib/getResume"
import { getGitHubRepositories, getRepoLanguageColor } from "@/lib/github"
import type { GitHubRepository } from "@/types/github"

const SECTIONS = [
  { id: "about", label: "About", num: "01" },
  { id: "experience", label: "Experience", num: "02" },
  { id: "skills", label: "Skills", num: "03" },
  { id: "projects", label: "Projects", num: "04" },
  { id: "contact", label: "Contact", num: "05" },
] as const

type SectionId = (typeof SECTIONS)[number]["id"]

const FALLBACK_PROJECTS: Array<{
  name: string
  description: string
  language: string
  color: string
  year: string
  href?: string
}> = [
  {
    name: "project-lark",
    description:
      "Agentic automation platform — LLM task orchestration with structured workflow automation for engineering productivity.",
    language: "Python",
    color: "#3572A5",
    year: "2025",
  },
  {
    name: "project-moose",
    description:
      "Operations & work-management platform: inventory, resource capacity, and enhanced task management with real-time WebSocket sync.",
    language: "TypeScript",
    color: "#3178c6",
    year: "2025",
  },
  {
    name: "project-sparrow",
    description:
      "Enterprise automation MVP combining image-recognition APIs with a PostgreSQL backend for the insurance sector.",
    language: "Python",
    color: "#3572A5",
    year: "2025",
  },
  {
    name: "ics-security-platform",
    description:
      "ICS security automation platform with REST integrations, secrets management, and compliance audit logging.",
    language: "C#",
    color: "#178600",
    year: "2024",
  },
  {
    name: "iot-edge-telemetry",
    description:
      "Containerized IoT edge-processing service with real-time storage, SQL-backed history, and performance dashboards.",
    language: "Docker",
    color: "#384d54",
    year: "2024",
  },
  {
    name: "embeddings-knowledge-cluster",
    description: "Embeddings analysis of 75k+ messages via K-means clustering for manufacturing knowledge management.",
    language: "Python",
    color: "#3572A5",
    year: "2023",
  },
]

function MailIcon() {
  return (
    <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.4">
      <rect x="2" y="3" width="12" height="10" rx="1" />
      <path d="M2 5l6 4 6-4" />
    </svg>
  )
}
function LinkedInIcon() {
  return (
    <svg viewBox="0 0 16 16" fill="currentColor">
      <path d="M3.5 2a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3zM2 6h3v8H2V6zm5 0h2.85v1.1h.04C10.3 6.4 11.3 5.8 12.6 5.8 15.5 5.8 16 7.7 16 10.3V14h-3V11c0-.7 0-1.7-1-1.7s-1.2.8-1.2 1.7V14H7V6z" />
    </svg>
  )
}
function GitHubIcon() {
  return (
    <svg viewBox="0 0 16 16" fill="currentColor">
      <path d="M8 0a8 8 0 0 0-2.5 15.6c.4.07.55-.17.55-.38v-1.4c-2.2.5-2.7-1-2.7-1-.36-.9-.9-1.16-.9-1.16-.7-.5.06-.5.06-.5.8.06 1.2.83 1.2.83.7 1.2 1.9.86 2.36.66.07-.5.27-.86.5-1.06-1.78-.2-3.65-.9-3.65-4 0-.88.32-1.6.83-2.16-.08-.2-.36-1.02.08-2.13 0 0 .67-.22 2.2.83a7.6 7.6 0 0 1 4 0c1.53-1.05 2.2-.83 2.2-.83.44 1.1.16 1.93.08 2.13.52.56.83 1.28.83 2.16 0 3.1-1.88 3.78-3.66 4 .28.24.54.72.54 1.46v2.16c0 .2.14.45.55.38A8 8 0 0 0 8 0z" />
    </svg>
  )
}
function ArrowRight() {
  return (
    <svg viewBox="0 0 16 16" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="1.6">
      <path d="M3 8h10M9 4l4 4-4 4" />
    </svg>
  )
}

function TopBar({ active, onOpen }: { active: SectionId | null; onOpen: () => void }) {
  return (
    <div className="ak-topbar">
      <div className="ak-wrap ak-topbar-inner">
        <a href="#top" className="ak-brand">
          <span className="ak-dot" />
          <span>
            <em>Andrew</em> King
          </span>
        </a>
        <nav className="ak-navpills" aria-label="Primary">
          {SECTIONS.map((s) => (
            <a key={s.id} href={`#${s.id}`} className={active === s.id ? "is-active" : ""}>
              {s.label}
            </a>
          ))}
        </nav>
        <a href="#contact" className="ak-cta">
          Get in touch <ArrowRight />
        </a>
        <button className="ak-menubtn" aria-label="Open menu" onClick={onOpen}>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
            <path d="M4 7h16M4 12h16M4 17h16" />
          </svg>
        </button>
      </div>
    </div>
  )
}

function MobileSheet({ open, onClose }: { open: boolean; onClose: () => void }) {
  return (
    <div className={`ak-mobilesheet${open ? " is-open" : ""}`} role="dialog" aria-modal="true" aria-label="Navigation">
      <header>
        <div className="ak-brand">
          <span className="ak-dot" />
          <span>
            <em>Andrew</em> King
          </span>
        </div>
        <button className="ak-menubtn" aria-label="Close menu" onClick={onClose}>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
            <path d="M6 6l12 12M6 18L18 6" />
          </svg>
        </button>
      </header>
      <nav>
        {SECTIONS.map((s) => (
          <a key={s.id} href={`#${s.id}`} onClick={onClose}>
            {s.label}
            <span className="ak-num">{s.num}</span>
          </a>
        ))}
      </nav>
      <div className="ak-foot">Austin, TX · Available for select engagements</div>
    </div>
  )
}

function Hero({ resume }: { resume: ReturnType<typeof getResume> }) {
  return (
    <section className="ak-hero" id="top">
      <div className="ak-wrap">
        <span className="ak-kicker">
          <span className="ak-live" /> Available · {resume.personalInfo.availability}
        </span>
        <h1 className="ak-display">
          <em>Andrew</em> King &mdash;
          <br />
          AI/ML &amp; Automation
          <br />
          Engineer.
        </h1>
        <p className="ak-lede">
          Senior solutions engineer with <strong>10+ years</strong> architecting industrial systems across{" "}
          <strong>PLC, motion control, robotics, and fieldbus</strong>. I translate complex automation requirements into
          reliable, production-grade systems — and bridge them to modern AI/ML stacks.
        </p>
        <div className="ak-herometa">
          <span className="ak-metachip">
            <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.4">
              <circle cx="8" cy="6.5" r="2.5" />
              <path d="M8 14s5-4 5-7.5A5 5 0 1 0 3 6.5C3 10 8 14 8 14z" />
            </svg>
            {resume.personalInfo.location.fullLocation}
          </span>
          <span className="ak-metachip">
            <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.4">
              <rect x="2" y="4" width="12" height="9" rx="1.5" />
              <path d="M5 4V2.5M11 4V2.5M2 7h12" />
            </svg>
            10+ years industry
          </span>
          <span className="ak-metachip">
            <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.4">
              <path d="M2 8a6 6 0 1 0 12 0A6 6 0 0 0 2 8z" />
              <path d="M8 4v4l3 2" />
            </svg>
            UT Austin · M.S. ME
          </span>
        </div>
        <div className="ak-heroctas">
          <a href="#projects" className="ak-cta">
            See selected work <ArrowRight />
          </a>
          <a href="#contact" className="ak-cta ak-ghost">
            Start a conversation
          </a>
        </div>
      </div>
      <div className="ak-scroll-cue">Scroll</div>
    </section>
  )
}

function About({ resume }: { resume: ReturnType<typeof getResume> }) {
  return (
    <section className="ak-block" id="about">
      <div className="ak-wrap">
        <div className="ak-section-head ak-reveal">
          <div className="ak-label">01 · Profile</div>
          <div>
            <h2>
              The work, in <em>plain language</em>.
            </h2>
            <p>
              From PLC structured text and EtherCAT fieldbus to FastAPI services, vector databases, and agentic AI —
              fluent across Beckhoff, Siemens, Allen Bradley, and B&amp;R controls; FANUC, KUKA, Universal Robots, and
              Yaskawa robotics; with applied software in Python, TypeScript, and Rust.
            </p>
          </div>
        </div>
        <div className="ak-about-grid">
          <div className="ak-portrait ak-reveal">
            <Image
              src="/images/andrew-headshot.jpg"
              alt="Andrew King"
              fill
              sizes="(max-width: 860px) 100vw, 40vw"
              priority
            />
          </div>
          <div className="ak-about-card ak-glass ak-reveal">
            <p>
              I&rsquo;m an automation &amp; controls engineer with a decade of architecting, commissioning, and
              supporting industrial systems — PLCs, motion control, robotics, fieldbus — and the last two years pulling
              that practice into modern AI/ML stacks.
            </p>
            <p>
              I&rsquo;m most useful at the seam: where customers need{" "}
              <strong>technical discovery and whiteboarding</strong>, where prototypes need to make it through{" "}
              <strong>commissioning</strong>, and where engineering teams need{" "}
              <strong>operator training that actually sticks</strong>.
            </p>
            <p style={{ marginBottom: 0 }}>
              Currently{" "}
              <strong>
                {resume.professionalExperience[0].position} at {resume.professionalExperience[0].company}
              </strong>
              , leading US deployments of multi-robot lines.
            </p>
            <div className="ak-stats">
              <div className="ak-stat">
                <div className="ak-num">
                  10<em>+</em>
                </div>
                <div className="ak-lbl">Yrs in industry</div>
              </div>
              <div className="ak-stat">
                <div className="ak-num">
                  25<em>%</em>
                </div>
                <div className="ak-lbl">Downtime reduction</div>
              </div>
              <div className="ak-stat">
                <div className="ak-num">
                  8<em>+</em>
                </div>
                <div className="ak-lbl">Industries touched</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

function YouTubeEmbed({ videoId, title, caption }: { videoId: string; title: string; caption?: string }) {
  const [playing, setPlaying] = useState(false)
  return (
    <figure className="ak-video">
      {playing ? (
        <iframe
          className="ak-video-frame"
          src={`https://www.youtube-nocookie.com/embed/${videoId}?autoplay=1&rel=0&modestbranding=1`}
          title={title}
          loading="lazy"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      ) : (
        <button
          type="button"
          className="ak-video-poster"
          onClick={() => setPlaying(true)}
          aria-label={`Play video: ${title}`}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={`https://i.ytimg.com/vi/${videoId}/hqdefault.jpg`} alt={title} loading="lazy" />
          <span className="ak-video-play" aria-hidden>
            <svg viewBox="0 0 24 24" fill="currentColor">
              <path d="M8 5v14l11-7z" />
            </svg>
          </span>
          <span className="ak-video-meta">
            <span className="ak-video-title">{title}</span>
            <span className="ak-video-host">youtube.com</span>
          </span>
        </button>
      )}
      {caption && <figcaption className="ak-video-caption">{caption}</figcaption>}
    </figure>
  )
}

function ExperienceCard({
  job,
  isCurrent,
}: {
  job: ReturnType<typeof getResume>["professionalExperience"][number]
  isCurrent: boolean
}) {
  const [open, setOpen] = useState(false)
  const [from, to] = job.duration.split(/\s*-\s*/)
  const primary = job.responsibilities.slice(0, 2)
  const more = job.responsibilities.slice(2)
  return (
    <div className="ak-exp ak-glass ak-reveal" data-open={open ? "true" : "false"}>
      <div className="ak-when">
        <div>
          {from} — {to ?? ""}
        </div>
        {isCurrent && <div className="ak-now">Currently</div>}
      </div>
      <div>
        <h3>{job.position}</h3>
        <div className="ak-org">
          {job.company}
          <span className="ak-sep">·</span>
          {job.location}
        </div>
        <ul>
          {primary.map((r, i) => (
            <li key={i}>{r}</li>
          ))}
        </ul>
        {more.length > 0 && (
          <ul className="ak-more">
            {more.map((r, i) => (
              <li key={i}>{r}</li>
            ))}
          </ul>
        )}
        {job.media?.kind === "youtube" && (
          <YouTubeEmbed videoId={job.media.videoId} title={job.media.title} caption={job.media.caption} />
        )}
        {job.media?.kind === "video" && (
          <figure className="ak-video">
            <video
              className="ak-video-frame"
              src={job.media.src}
              poster={job.media.poster}
              controls
              preload="metadata"
              playsInline
            />
            {job.media.caption && <figcaption className="ak-video-caption">{job.media.caption}</figcaption>}
          </figure>
        )}
        {job.videos && job.videos.length > 0 && (
          <ul className="ak-videos">
            {job.videos.map((v) => (
              <li key={v.src} className="ak-videos-item">
                <figure className="ak-video">
                  <video
                    className="ak-video-frame"
                    src={v.src}
                    poster={v.poster}
                    controls
                    preload="metadata"
                    playsInline
                  />
                  {v.caption && <figcaption className="ak-video-caption">{v.caption}</figcaption>}
                </figure>
              </li>
            ))}
          </ul>
        )}
        {job.gallery && job.gallery.length > 0 && (
          <ul className="ak-gallery">
            {job.gallery.map((g) => {
              const Tag = g.href ? "a" : "div"
              const tagProps = g.href ? { href: g.href, target: "_blank" as const, rel: "noopener noreferrer" } : {}
              return (
                <li key={g.src} className="ak-gallery-item">
                  <Tag className="ak-gallery-link" {...tagProps}>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={g.src} alt={g.alt} loading="lazy" />
                    {g.caption && <span className="ak-gallery-caption">{g.caption}</span>}
                  </Tag>
                </li>
              )
            })}
          </ul>
        )}
        {job.relevantSkills && job.relevantSkills.length > 0 && (
          <div className="ak-tags">
            {job.relevantSkills.map((t, i) => (
              <span key={t} className={`ak-tag${i === 0 ? " ak-tag-accent" : ""}`}>
                {t}
              </span>
            ))}
          </div>
        )}
      </div>
      {more.length > 0 ? (
        <button
          className="ak-toggle"
          aria-label="Toggle details"
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
        >
          <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.6">
            <path d="M8 3v10M3 8h10" />
          </svg>
        </button>
      ) : (
        <span aria-hidden />
      )}
    </div>
  )
}

function Experience({ resume }: { resume: ReturnType<typeof getResume> }) {
  return (
    <section className="ak-block" id="experience">
      <div className="ak-wrap">
        <div className="ak-section-head ak-reveal">
          <div className="ak-label">02 · Experience</div>
          <div>
            <h2>
              Where I&rsquo;ve <em>shipped</em>.
            </h2>
            <p>
              Roles spanning robotics integration, controls engineering, full-stack automation, ocean-going research,
              and ISS flight operations. Click any entry for the full responsibility set.
            </p>
          </div>
        </div>
        <div className="ak-timeline">
          {resume.professionalExperience.map((job, i) => (
            <ExperienceCard key={`${job.company}-${i}`} job={job} isCurrent={i === 0} />
          ))}
        </div>
      </div>
    </section>
  )
}

function Skills({ resume }: { resume: ReturnType<typeof getResume> }) {
  return (
    <section className="ak-block" id="skills">
      <div className="ak-wrap">
        <div className="ak-section-head ak-reveal">
          <div className="ak-label">03 · Capabilities</div>
          <div>
            <h2>
              Knowledge, skills <em>&amp; abilities</em>.
            </h2>
            <p>
              The full toolkit — from PLC structured text and EtherCAT fieldbus to FastAPI services, Postgres, and
              vector databases.
            </p>
          </div>
        </div>
        <div className="ak-skills-grid">
          {resume.coreCompetencies.primarySkills.map((cat, i) => (
            <div key={cat.category} className="ak-skill-card ak-glass ak-reveal">
              <div className="ak-head">
                <h4>{cat.category}</h4>
                <span className="ak-num">{String(i + 1).padStart(2, "0")}</span>
              </div>
              <div className="ak-chips">
                {cat.skills.map((s) => (
                  <span key={s} className="ak-tag">
                    {s}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function Projects() {
  const [repos, setRepos] = useState<GitHubRepository[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let cancelled = false
    getGitHubRepositories()
      .then(({ repositories, error }) => {
        if (cancelled) return
        if (!error) setRepos(repositories)
      })
      .finally(() => {
        if (!cancelled) setLoading(false)
      })
    return () => {
      cancelled = true
    }
  }, [])

  const usingFallback = !loading && repos.length === 0
  const visible = usingFallback
    ? FALLBACK_PROJECTS
    : repos.slice(0, 6).map((r) => ({
        name: r.name,
        description: r.description ?? "—",
        language: r.language ?? "—",
        color: getRepoLanguageColor(r.language ?? ""),
        year: new Date(r.updated_at).getFullYear().toString(),
        href: r.html_url,
      }))

  return (
    <section className="ak-block" id="projects">
      <div className="ak-wrap">
        <div className="ak-section-head ak-reveal">
          <div className="ak-label">04 · Selected projects</div>
          <div>
            <h2>
              Things I&rsquo;ve <em>built</em>.
            </h2>
            <p>A small set of representative work — a deeper case-study list is available on request.</p>
          </div>
        </div>
        <div className="ak-repos">
          {visible.map((p) => {
            const inner = (
              <>
                <div className="ak-top">
                  <span className="ak-name">{p.name}</span>
                  <span className="ak-lang">
                    <span className="ak-swatch" style={{ background: p.color }} />
                    {p.language}
                  </span>
                </div>
                <p>{p.description}</p>
                <div className="ak-meta">
                  <span>{p.year}</span>
                  {p.href && <span className="ak-arrow">→ open</span>}
                </div>
              </>
            )
            return p.href ? (
              <a key={p.name} className="ak-repo ak-glass" href={p.href} target="_blank" rel="noopener noreferrer">
                {inner}
              </a>
            ) : (
              <div key={p.name} className="ak-repo ak-glass">
                {inner}
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

function Contact({ resume }: { resume: ReturnType<typeof getResume> }) {
  return (
    <section className="ak-block" id="contact">
      <div className="ak-wrap">
        <div className="ak-contact ak-glass ak-reveal">
          <div>
            <div
              className="ak-mono"
              style={{
                fontSize: 11,
                letterSpacing: "0.16em",
                textTransform: "uppercase",
                color: "var(--ak-ink-muted)",
                marginBottom: 14,
              }}
            >
              05 · Get in touch
            </div>
            <h3>
              Let&rsquo;s talk about <em>your line</em>.
            </h3>
            <p>
              Available for consulting on automation architecture, robotics commissioning, and AI/ML integration into
              industrial systems. I respond within 48 hours.
            </p>
          </div>
          <div className="ak-channels">
            <a href={`mailto:${resume.personalInfo.contact.email}`}>
              <MailIcon />
              {resume.personalInfo.contact.email}
              <span className="ak-arrow">→</span>
            </a>
            <a href="https://www.linkedin.com/in/andrewcharlieking" target="_blank" rel="noopener noreferrer">
              <LinkedInIcon />
              LinkedIn
              <span className="ak-arrow">→</span>
            </a>
            <a href="https://github.com/llambitintegration" target="_blank" rel="noopener noreferrer">
              <GitHubIcon />
              GitHub
              <span className="ak-arrow">→</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}

export default function PortfolioPage() {
  const resume = getResume()
  const [active, setActive] = useState<SectionId | null>(null)
  const [menuOpen, setMenuOpen] = useState(false)
  const rootRef = useRef<HTMLDivElement>(null)

  // Active section highlighting via scroll
  useEffect(() => {
    const sectionEls = SECTIONS.map((s) => document.getElementById(s.id)).filter((el): el is HTMLElement => !!el)
    const onScroll = () => {
      const y = window.scrollY + window.innerHeight * 0.3
      let current: SectionId | null = null
      for (const el of sectionEls) {
        if (el.offsetTop <= y) current = el.id as SectionId
      }
      setActive(current)
    }
    window.addEventListener("scroll", onScroll, { passive: true })
    onScroll()
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  // Reveal-on-scroll
  useEffect(() => {
    if (!rootRef.current) return
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("is-in")
            io.unobserve(e.target)
          }
        })
      },
      { threshold: 0.12 },
    )
    rootRef.current.querySelectorAll(".ak-reveal").forEach((el) => io.observe(el))
    return () => io.disconnect()
  }, [])

  return (
    <div ref={rootRef} className="ak-shell">
      <TopBar active={active} onOpen={() => setMenuOpen(true)} />
      <MobileSheet open={menuOpen} onClose={() => setMenuOpen(false)} />
      <main>
        <Hero resume={resume} />
        <About resume={resume} />
        <Experience resume={resume} />
        <Skills resume={resume} />
        <Projects />
        <Contact resume={resume} />
      </main>
      <footer className="ak-foot">
        <div className="ak-wrap ak-row">
          <div>
            © {new Date().getFullYear()} Andrew King · {resume.personalInfo.location.fullLocation}
          </div>
          <div>Built with Paper Shaders · Figtree · Instrument Serif</div>
        </div>
      </footer>
    </div>
  )
}
