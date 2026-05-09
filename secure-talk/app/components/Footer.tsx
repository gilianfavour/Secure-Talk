import Link from "next/link";

export default function Footer() {
  return (
    <footer className="mt-20 border-t border-[#E5E7EB] bg-white">

      <div className="mx-auto max-w-5xl px-6 py-10 grid md:grid-cols-3 gap-8 text-sm">

        {/* Brand */}
        <div className="space-y-3">
          <h2 className="font-semibold text-[#4A90E2]">Secure Talk</h2>
          <p className="leading-relaxed text-[#6B7280]">
            A safe and anonymous space where you can share your thoughts
            and receive support without fear or judgment.
          </p>
        </div>

        {/* Navigation */}
        <div className="space-y-3">
          <h3 className="font-medium text-[#1F2933]">Explore</h3>
          <div className="flex flex-col gap-2">
            {[
              { label: "Home",  href: "/" },
              { label: "Feed",  href: "/feed" },
              { label: "Share", href: "/share" },
              { label: "About", href: "/about" },
            ].map(({ label, href }) => (
              <Link
                key={href}
                href={href}
                className="w-fit text-[#6B7280] transition-colors duration-150 hover:text-[#4A90E2]"
              >
                {label}
              </Link>
            ))}
          </div>
        </div>

        {/* Privacy */}
        <div className="space-y-3">
          <h3 className="font-medium text-[#1F2933]">Privacy</h3>
          <p className="leading-relaxed text-[#6B7280]">
            Your identity is never required. All posts are anonymous and
            automatically removed after 14 days.
          </p>
          <div className="flex items-center gap-1.5 text-[12px] text-[#9CA3AF]">
            <span className="h-1.5 w-1.5 rounded-full bg-[#50C9C3]" />
            No accounts. No tracking. No data stored.
          </div>
        </div>

      </div>

      {/* Bottom bar */}
      <div className="border-t border-[#F3F4F6] px-6 py-4 text-center text-xs text-[#9CA3AF]">
        © {new Date().getFullYear()} Secure Talk. All rights reserved.
      </div>

    </footer>
  );
}