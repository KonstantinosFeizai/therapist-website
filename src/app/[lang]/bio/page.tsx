import { getDictionary } from "@/lib/dictionary";
import Image from "next/image";
import BlobLottie from "@/components/BlobLottie";

export default async function BioPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  const dict = await getDictionary(lang as "el" | "en");

  return (
    <main className="min-h-screen relative overflow-hidden">
      {/* Decorative Background Blobs */}
      <div className="absolute top-[10%] -left-20 w-96 h-96 bg-rose-100/40 rounded-full blur-[120px] pointer-events-none"></div>
      <div className="absolute top-[40%] -right-20 w-[500px] h-[500px] bg-sky-100/30 rounded-full blur-[130px] pointer-events-none"></div>
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center gap-12 lg:gap-20">
            {/* Φωτογραφία */}
            <div className="relative w-[82%] max-w-[320px] md:w-1/3 md:max-w-[400px]">
              <BlobLottie className="pointer-events-none absolute -inset-32 z-0 opacity-50" />
              <div className="relative z-10 aspect-[3/4] rounded-[2.5rem] overflow-hidden shadow-[0_30px_80px_rgba(15,23,42,0.35)]">
                <div className="absolute inset-0 bg-slate-100 flex items-center justify-center">
                  <span className="text-slate-400 text-xs tracking-widest uppercase">
                    Portrait
                  </span>
                </div>
                <Image
                  src="/images/melisa.png"
                  alt="Melissa Tsela"
                  fill
                  className="object-cover"
                />
              </div>
            </div>

            {/* Κείμενο */}
            <div className="flex-1 text-center md:text-left">
              <h1 className="text-4xl font-semibold text-slate-800 sm:text-5xl mb-6">
                {dict.bio.hero_title}
              </h1>
              <p className="text-xl text-slate-600 font-light leading-relaxed">
                {dict.bio.hero_description}
              </p>
              <div className="mt-8 p-8  rounded-[2.5rem] border border-white shadow-xl shadow-rose-500/5 relative overflow-hidden group">
                {/* Μια διακριτική λεπτομέρεια στην γωνία */}
                <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                  <svg
                    width="40"
                    height="40"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="text-rose-600"
                  >
                    <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z" />
                  </svg>
                </div>

                <h2 className="text-[10px] font-bold text-rose-500 uppercase tracking-[0.3em] mb-3">
                  {dict.bio.approach_title}
                </h2>
                <p className="text-slate-600 leading-relaxed italic font-light text-lg">
                  {dict.bio.approach_text}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Εκπαίδευση & Εμπειρία */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            {/* Εκπαίδευση */}
            <div>
              <h3 className="text-2xl font-semibold text-slate-800 mb-10 flex items-center gap-3">
                <span className="w-8 h-px bg-rose-300"></span>
                {dict.bio.education_title}
              </h3>
              <ul className="space-y-8 border-l-2 border-rose-100 ml-4 pl-8">
                <li className="relative">
                  <span className="absolute -left-[43px] top-1 w-5 h-5 rounded-full bg-rose-50 border-2 border-rose-300 shadow-sm flex items-center justify-center">
                    <span className="w-1.5 h-1.5 rounded-full bg-rose-400"></span>
                  </span>
                  <p className="text-slate-600 leading-snug">
                    {dict.bio.edu_uni}
                  </p>
                </li>
                <li className="relative">
                  <span className="absolute -left-[41px] top-1 w-4 h-4 rounded-full bg-rose-400 border-4 border-white"></span>
                  <p className="text-slate-600 leading-snug font-medium">
                    {dict.bio.edu_systemic}
                  </p>
                </li>
                <li className="relative">
                  <span className="absolute -left-[41px] top-1 w-4 h-4 rounded-full bg-rose-400 border-4 border-white"></span>
                  <p className="text-slate-600 leading-snug">
                    {dict.bio.edu_psychoanalysis}
                  </p>
                </li>
                <li className="relative">
                  <span className="absolute -left-[41px] top-1 w-4 h-4 rounded-full bg-rose-400 border-4 border-white"></span>
                  <p className="text-slate-600 leading-snug">
                    {dict.bio.edu_narrative}
                  </p>
                </li>
              </ul>
            </div>

            {/* Εμπειρία */}
            <div>
              <h3 className="text-2xl font-semibold text-slate-800 mb-10 flex items-center gap-3">
                <span className="w-8 h-px bg-sky-200"></span>
                {dict.bio.experience_title}
              </h3>
              <div className="space-y-6">
                {[
                  dict.bio.exp_center,
                  dict.bio.exp_volunteer,
                  dict.bio.exp_practice,
                ].map((exp, index) => (
                  <div
                    key={index}
                    className="bg-white/90 p-6 rounded-2xl shadow-sm border border-slate-200/60 hover:shadow-md transition-shadow"
                  >
                    <p className="text-slate-600 text-sm leading-relaxed">
                      {exp}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Τι είναι η Συστημική */}
      <section className="py-24">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h3 className="text-3xl font-light text-slate-800 mb-8">
            {dict.bio.systemic_title}
          </h3>
          <p className="text-lg text-slate-500 leading-relaxed mb-12">
            {dict.bio.systemic_desc}
          </p>
          <div className="inline-block p-8 bg-rose-50/50 rounded-[3rem] border border-rose-100 text-left">
            <h4 className="text-sm font-bold text-rose-500 uppercase tracking-widest mb-4">
              {dict.bio.systemic_tech_title}
            </h4>
            <p className="text-slate-600 italic leading-relaxed">
              {dict.bio.systemic_tech_desc}
            </p>
          </div>
        </div>
      </section>

      {/* Quality Note */}
      <section className="pb-24">
        <div className="max-w-7xl mx-auto px-6">
          <div className="h-px bg-slate-200/60 w-full mb-12"></div>
          <p className="text-center text-slate-500 text-sm italic font-light tracking-wide">
            {dict.bio.quality_note}
          </p>
        </div>
      </section>
    </main>
  );
}
