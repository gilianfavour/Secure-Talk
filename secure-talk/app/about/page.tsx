import Link from 'next/link'

export default function AboutPage() {
  return (
    <main className="w-full">

      {/* ── Hero ── */}
      <section className="relative overflow-hidden px-6 py-20 text-center">
        {/* Ambient glows */}
        <div className="pointer-events-none absolute -top-24 left-1/2 -translate-x-1/2 h-[400px] w-[600px] rounded-full bg-[radial-gradient(ellipse,rgba(74,144,226,0.08)_0%,transparent_70%)]" />

        <div className="relative z-10 mx-auto max-w-[580px]">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-[#4A90E2]/20 bg-[#4A90E2]/08 px-4 py-1.5">
            <span className="h-1.5 w-1.5 rounded-full bg-[#50C9C3]" />
            <span className="text-xs text-[#4A90E2]">Our mission &amp; values</span>
          </div>

          <h1 className="mb-4 text-[40px] font-medium leading-[1.2] tracking-[-0.5px] text-[#1F2933]">
            Built for the things<br />
            <span className="text-[#4A90E2]">you can not say out loud.</span>
          </h1>

          <p className="mx-auto text-[17px] leading-[1.65] text-[#6B7280]">
            Secure Talk exists because everyone deserves a place to be heard —
            without their name, without judgment, without fear.
          </p>
        </div>
      </section>

      {/* ── Story sections ── */}
      <section className="px-6 pb-16">
        <div className="mx-auto max-w-2xl space-y-0 divide-y divide-[#E5E7EB]">

          <ContentBlock
            number="01"
            title="Why Secure Talk exists"
            color="#4A90E2"
          >
            Many people struggle to speak openly about their thoughts and feelings
            due to fear of judgment, exposure, or stigma. Secure Talk was created
            to remove those barriers and give everyone a place where they can be
            heard — without fear, without consequence.
          </ContentBlock>

          <ContentBlock
            number="02"
            title="Our approach"
            color="#50C9C3"
          >
            We believe that expressing yourself is the first step toward healing.
            That&apos;s why Secure Talk allows you to share anonymously, choose your
            level of privacy, and receive support in a safe and controlled
            environment — on your own terms.
          </ContentBlock>

          <ContentBlock
            number="03"
            title="Your privacy matters"
            color="#4CAF50"
          >
            Your identity is never required. Posts are temporary and automatically
            removed after a set period. Private messages are only ever visible to
            trusted counsellors — no exceptions.
          </ContentBlock>

        </div>
      </section>

      {/* ── Trust pillars ── */}
      <section className="bg-[#F9FAFB] px-6 py-16">
        <div className="mx-auto max-w-3xl">
          <p className="mb-10 text-center text-sm font-medium uppercase tracking-widest text-[#9CA3AF]">
            What we stand for
          </p>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
            <PillarCard
              icon={<ShieldIcon />}
              title="Anonymity first"
              desc="No accounts, no names, no tracking. You're a voice, not a profile."
            />
            <PillarCard
              icon={<HeartIcon />}
              title="Compassion always"
              desc="Every response — from the community or counsellors — is held to a standard of kindness."
            />
            <PillarCard
              icon={<LockIcon />}
              title="Private by design"
              desc="Your words live only as long as you need them to. Nothing is stored longer than necessary."
            />
          </div>
        </div>
      </section>

      {/* ── Contact ── */}
      <section className="px-6 py-16">
        <div className="mx-auto max-w-3xl">
          <p className="mb-10 text-center text-sm font-medium uppercase tracking-widest text-[#9CA3AF]">
            Get in touch
          </p>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">

            {/* Email */}
            <a
              href="mailto:securetalkug@gmail.com"
              className="group flex items-center gap-4 rounded-2xl border border-[#E5E7EB] bg-white p-6 no-underline transition-all duration-150 hover:-translate-y-0.5 hover:border-[#4A90E2]/30 hover:shadow-sm"
            >
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#4A90E2]/10">
                <EmailIcon />
              </div>
              <div>
                <p className="mb-0.5 text-[13px] font-medium uppercase tracking-wider text-[#9CA3AF]">Email</p>
                <p className="text-[15px] font-medium text-[#1F2933] transition-colors group-hover:text-[#4A90E2]">
                  securetalkug@gmail.com
                </p>
              </div>
            </a>

            {/* Phone */}
            <a
              href="tel:+256777223463"
              className="group flex items-center gap-4 rounded-2xl border border-[#E5E7EB] bg-white p-6 no-underline transition-all duration-150 hover:-translate-y-0.5 hover:border-[#50C9C3]/30 hover:shadow-sm"
            >
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#50C9C3]/10">
                <PhoneIcon />
              </div>
              <div>
                <p className="mb-0.5 text-[13px] font-medium uppercase tracking-wider text-[#9CA3AF]">Phone</p>
                <p className="text-[15px] font-medium text-[#1F2933] transition-colors group-hover:text-[#50C9C3]">
                  +256 777 223 463
                </p>
              </div>
            </a>

          </div>
        </div>
      </section>

      {/* ── Closing CTA ── */}
      <section className="px-6 py-20 text-center">
        <div className="mx-auto max-w-[480px]">
          <p className="mb-2 text-[22px] font-medium leading-snug text-[#1F2933]">
            You are not alone.
          </p>
          <p className="mb-8 text-[16px] leading-relaxed text-[#6B7280]">
            You don&apos;t have to go through things in silence. Whenever you&apos;re ready,
            this space is here for you.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-3">
            <Link
              href="/share?type=public"
              className="inline-block rounded-xl bg-[#4A90E2] px-6 py-3 text-[15px] font-medium text-white no-underline transition-all duration-150 hover:-translate-y-px hover:opacity-90"
            >
              Share with community
            </Link>
            <Link
              href="/share?type=private"
              className="inline-block rounded-xl border border-[#4A90E2]/25 bg-white px-6 py-3 text-[15px] font-medium text-[#1F2933] no-underline transition-all duration-150 hover:-translate-y-px hover:bg-[#F9FAFB]"
            >
              Get private support
            </Link>
          </div>
        </div>
      </section>

    </main>
  )
}

/* ── Sub-components ── */

function ContentBlock({
  number,
  title,
  color,
  children,
}: {
  number: string
  title: string
  color: string
  children: React.ReactNode
}) {
  return (
    <div className="flex gap-8 py-10">
      <span
        className="mt-1 shrink-0 text-[13px] font-semibold tabular-nums"
        style={{ color }}
      >
        {number}
      </span>
      <div>
        <h2 className="mb-3 text-[19px] font-medium text-[#1F2933]">{title}</h2>
        <p className="text-[16px] leading-[1.7] text-[#6B7280]">{children}</p>
      </div>
    </div>
  )
}

function PillarCard({
  icon,
  title,
  desc,
}: {
  icon: React.ReactNode
  title: string
  desc: string
}) {
  return (
    <div className="rounded-2xl border border-[#E5E7EB] bg-white p-6">
      <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-xl bg-[#F3F4F6]">
        {icon}
      </div>
      <p className="mb-1.5 text-sm font-medium text-[#1F2933]">{title}</p>
      <p className="text-[13px] leading-[1.6] text-[#9CA3AF]">{desc}</p>
    </div>
  )
}

/* ── Icons ── */

function ShieldIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
      <path d="M10 2L3 5.5v5c0 4.1 3 7.1 7 7.9 4-.8 7-3.8 7-7.9v-5L10 2z" stroke="#4A90E2" strokeWidth="1.4" fill="rgba(74,144,226,0.1)" />
      <path d="M7 10.5l2.5 2.5 3.5-4" stroke="#4A90E2" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

function HeartIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
      <path d="M10 16s-7-4.5-7-9a4 4 0 017-2.65A4 4 0 0117 7c0 4.5-7 9-7 9z" stroke="#50C9C3" strokeWidth="1.4" fill="rgba(80,201,195,0.1)" strokeLinejoin="round" />
    </svg>
  )
}

function LockIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
      <rect x="4" y="9" width="12" height="8" rx="2" stroke="#4CAF50" strokeWidth="1.4" fill="rgba(76,175,80,0.1)" />
      <path d="M7 9V7a3 3 0 016 0v2" stroke="#4CAF50" strokeWidth="1.4" strokeLinecap="round" />
    </svg>
  )
}

function EmailIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
      <rect x="2" y="4" width="16" height="12" rx="2" stroke="#4A90E2" strokeWidth="1.4" fill="rgba(74,144,226,0.1)" />
      <path d="M2 7l8 5 8-5" stroke="#4A90E2" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

function PhoneIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
      <path d="M4 3h4l1.5 4-2 1.5c1 2 2.5 3.5 4.5 4.5L13.5 11l4 1.5V17a1 1 0 01-1 1C6.5 18 2 11 2 4a1 1 0 011-1h1z" stroke="#50C9C3" strokeWidth="1.4" fill="rgba(80,201,195,0.1)" strokeLinejoin="round" />
    </svg>
  )
}