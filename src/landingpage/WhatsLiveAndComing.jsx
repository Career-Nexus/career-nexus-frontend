import { Check, Clock } from "lucide-react";

export default function WhatsLiveAndComing() {
  return (
    <section className="w-full bg-white py-16">
      <div className="mx-auto max-w-7xl px-6">
        {/* Title */}
        <h2 className="mb-12 text-center text-2xl font-semibold text-gray-900">
          What’s live and what’s coming
        </h2>

        {/* Cards */}
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
          {/* Live Now */}
          <div className="rounded-2xl bg-[#5DA05D] p-6">
            <div className="mb-4 flex items-center gap-2 text-white">
              <span className="flex h-6 w-6 items-center justify-center rounded-md bg-[#290E4A]">
                <Check size={14} />
              </span>
              <span className="font-medium">Live now</span>
            </div>

            <div className="rounded-xl bg-white p-6 min-h-[150px]">
              <ul className="divide-y divide-green-200 text-sm text-gray-700">
                <li className="py-3">Mentorship profiles</li>
                <li className="py-3">Community networking</li>
                <li className="py-3">Job board &amp; opportunities</li>
              </ul>
            </div>
          </div>

          {/* Coming Next */}
          <div className="rounded-2xl bg-[#290E4A] p-6">
            <div className="mb-4 flex items-center gap-2 text-white">
              <span className="flex h-6 w-6 items-center justify-center rounded-md bg-[#5DA05D]">
                <Clock size={14} />
              </span>
              <span className="font-medium">Coming next</span>
            </div>

            <div className="rounded-xl bg-white p-6 min-h-[150px]">
              <ul className="divide-y divide-green-200 text-sm text-gray-700">
                <li className="py-3">Certifications &amp; training pathways</li>
                <li className="py-3">University &amp; corporate partnerships</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
