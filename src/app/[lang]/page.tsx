import { getDictionary } from "@/lib/dictionary";
import FadeIn from "@/components/FadeIn";
import Link from "next/link";
import Image from "next/image";

export default async function Home({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  const dict = await getDictionary(lang as "el" | "en");

  return (
    <div
      className="relative min-h-screen bg-cover bg-center bg-fixed"
      style={{ backgroundImage: "url('/images/vecteezy_minimalist.jpg')" }}
    >
      {/* Overlay για καλύτερη αναγνωσιμότητα */}
      <div className="absolute inset-0 bg-white/80 -z-10"></div>

      <div className="relative isolate min-h-[calc(100vh-80px)] flex items-center">
        {/* Background Zen "Σύννεφα" με τα νέα χρώματα */}
        <div className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80">
          <div
            className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#e0f2fe] to-[#fce7f3] opacity-40 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]"
            style={{
              clipPath:
                "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
            }}
          ></div>
        </div>

        <div className="max-w-7xl mx-auto px-6 py-20 lg:flex lg:items-center lg:gap-x-12 lg:px-8">
          {/* Κείμενο (Αριστερή Στήλη) */}
          <div className="mx-auto max-w-2xl lg:mx-0 lg:flex-auto">
            <h1 className="text-4xl font-semibold tracking-tight text-slate-800 sm:text-6xl">
              {dict.home.welcome}
            </h1>

            {/* Το νέο μικρό κείμενο (Intro) */}
            <p className="mt-8 text-lg leading-relaxed text-slate-600">
              {dict.home.intro_text}
            </p>

            <div className="mt-10 flex flex-wrap items-center gap-6">
              <Link
                href={`/${lang}/booking`}
                className="rounded-full bg-sky-500 px-8 py-4 text-sm font-semibold text-white shadow-md hover:bg-sky-600 hover:shadow-sky-200 transition-all active:scale-95"
              >
                {dict.navigation.booking}
              </Link>
              <Link
                href={`/${lang}/bio`}
                className="text-sm font-semibold leading-6 text-slate-700 hover:text-pink-500 transition-colors flex items-center"
              >
                {dict.navigation.bio}{" "}
                <span className="ml-2" aria-hidden="true">
                  →
                </span>
              </Link>
            </div>
          </div>

          {/* Φωτογραφία (Δεξιά Στήλη) */}
          <div className="mt-16 sm:mt-24 lg:mt-0 lg:flex-shrink-0">
            <div className="relative">
              {/* Διακοσμητικό πλαίσιο πίσω από τη φωτό */}
              <div className="absolute -inset-4 rounded-3xl bg-gradient-to-tr from-sky-100 to-pink-100 blur-lg opacity-60"></div>

              {/* Κάδρο με background image */}
              <div 
                className="relative mx-auto w-[296px] h-[396px] sm:w-[336px] sm:h-[466px] rounded-3xl bg-cover bg-center p-2"
                style={{ backgroundImage: "url('/images/portrait_bg.jpg')" }}
              >
                <div className="relative w-full h-full rounded-3xl shadow-xl overflow-hidden">
                  <Image
                    src="/images/melisa.png"
                    alt="Melisa - Therapist"
                    fill
                    className="object-cover"
                    priority
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Services Section */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            {/* Card 1 - Ατομική Θεραπεία */}
            <FadeIn delay={0.3}>
              <div className="group relative">
                <div className="absolute inset-0 rounded-3xl bg-sky-50/60 ring-1 ring-sky-100 transition-all duration-300 group-hover:bg-sky-50"></div>
                <span className="absolute -top-6 left-10 h-16 w-16 rounded-full bg-sky-50/60 ring-1 ring-sky-100 transition-all duration-300 group-hover:bg-sky-50"></span>
                <span className="absolute -top-3 right-12 h-12 w-12 rounded-full bg-sky-50/60 ring-1 ring-sky-100 transition-all duration-300 group-hover:bg-sky-50"></span>
                <span className="absolute top-8 -left-6 h-14 w-14 rounded-full bg-sky-50/60 ring-1 ring-sky-100 transition-all duration-300 group-hover:bg-sky-50"></span>
                <div className="relative z-10 p-8">
                  <div className="w-12 h-12 bg-white rounded-2xl shadow-sm flex items-center justify-center text-sky-500 mb-6 group-hover:scale-110 transition-transform">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="w-6 h-6"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z"
                      />
                    </svg>
                  </div>
                  <h3 className="text-xl font-semibold text-slate-800 mb-4">
                    {dict.home.services.individual_title}
                  </h3>
                  <p className="text-slate-600 leading-relaxed text-sm">
                    {dict.home.services.individual_desc}
                  </p>
                </div>
              </div>
            </FadeIn>

            {/* Card 2 - Διαδικτυακές Συνεδρίες */}
            <FadeIn delay={0.2}>
              <div className="group relative">
                <div className="absolute inset-0 rounded-3xl bg-pink-50/60 ring-1 ring-pink-100 transition-all duration-300 group-hover:bg-pink-50"></div>
                <span className="absolute -top-6 left-8 h-16 w-16 rounded-full bg-pink-50/60 ring-1 ring-pink-100 transition-all duration-300 group-hover:bg-pink-50"></span>
                <span className="absolute -top-4 right-10 h-14 w-14 rounded-full bg-pink-50/60 ring-1 ring-pink-100 transition-all duration-300 group-hover:bg-pink-50"></span>
                <span className="absolute top-9 -left-7 h-12 w-12 rounded-full bg-pink-50/60 ring-1 ring-pink-100 transition-all duration-300 group-hover:bg-pink-50"></span>
                <div className="relative z-10 p-8">
                  <div className="w-12 h-12 bg-white rounded-2xl shadow-sm flex items-center justify-center text-pink-500 mb-6 group-hover:scale-110 transition-transform">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="w-6 h-6"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M9 17.25v1.007a3 3 0 0 1-.879 2.122L7.5 21h9l-.621-.621A3 3 0 0 1 15 18.257V17.25m6-12V15a2.25 2.25 0 0 1-2.25 2.25H5.25A2.25 2.25 0 0 1 3 15V5.25m18 0A2.25 2.25 0 0 0 18.75 3H5.25A2.25 0 0 0 3 5.25m18 0V12a2.25 2.25 0 0 1-2.25 2.25H5.25A2.25 2.25 0 0 1 3 12V5.25"
                      />
                    </svg>
                  </div>
                  <h3 className="text-xl font-semibold text-slate-800 mb-4">
                    {dict.home.services.online_title}
                  </h3>
                  <p className="text-slate-600 leading-relaxed text-sm">
                    {dict.home.services.online_desc}
                  </p>
                </div>
              </div>
            </FadeIn>

            {/* Card 3 - Προσωπική Ανάπτυξη */}
            <FadeIn delay={0.3}>
              <div className="group relative">
                <div className="absolute inset-0 rounded-3xl bg-slate-50 ring-1 ring-slate-100 transition-all duration-300 group-hover:bg-slate-100/50"></div>
                <span className="absolute -top-6 left-10 h-16 w-16 rounded-full bg-slate-50 ring-1 ring-slate-100 transition-all duration-300 group-hover:bg-slate-100/50"></span>
                <span className="absolute -top-3 right-12 h-12 w-12 rounded-full bg-slate-50 ring-1 ring-slate-100 transition-all duration-300 group-hover:bg-slate-100/50"></span>
                <span className="absolute top-8 -left-6 h-14 w-14 rounded-full bg-slate-50 ring-1 ring-slate-100 transition-all duration-300 group-hover:bg-slate-100/50"></span>
                <div className="relative z-10 p-8">
                  <div className="w-12 h-12 bg-white rounded-2xl shadow-sm flex items-center justify-center text-slate-500 mb-6 group-hover:scale-110 transition-transform">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="w-6 h-6"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M12 18v-5.25m0 0a6.01 6.01 0 0 0 1.5-.189m-1.5.189a6.01 6.01 0 0 1-1.5-.189m3.75 7.478a12.06 12.06 0 0 1-4.5 0m3.75 2.383a14.406 14.406 0 0 1-3 0M14.25 18v-.192c0-.983.658-1.823 1.508-2.316a7.5 7.5 0 1 0-7.517 0c.85.493 1.509 1.333 1.509 2.316V18"
                      />
                    </svg>
                  </div>
                  <h3 className="text-xl font-semibold text-slate-800 mb-4">
                    {dict.home.services.growth_title}
                  </h3>
                  <p className="text-slate-600 leading-relaxed text-sm">
                    {dict.home.services.growth_desc}
                  </p>
                </div>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>
      {/* Process Section */}
      <section className="py-24 bg-slate-50/50">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-[11px] font-bold tracking-[0.2em] text-pink-500 uppercase mb-4">
              {dict.home.process.subtitle || "Η Διαδρομή"}
            </h2>
            <h3 className="text-3xl font-light text-slate-800">
              {dict.home.process.title || "Πώς θα δουλέψουμε μαζί"}
            </h3>
          </div>

          {/* Timeline Container */}
          <div className="relative">
            {/* Horizontal Line (Desktop only) */}
            <div className="hidden md:block absolute top-12 left-[10%] right-[10%] h-px bg-slate-200"></div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-12 relative">
              {/* Βήμα 1 */}
              <div className="flex flex-col items-center text-center">
                <div className="w-24 h-24 rounded-full bg-white border border-slate-100 shadow-sm flex items-center justify-center text-2xl font-light text-sky-400 z-10 mb-8 transition-transform hover:scale-110">
                  01
                </div>
                <h4 className="text-lg font-semibold text-slate-800 mb-4">
                  {dict.home.process.step1_title || "Πρώτη Επαφή"}
                </h4>
                <p className="text-sm text-slate-500 leading-relaxed max-w-[250px]">
                  {dict.home.process.step1_desc ||
                    "Επικοινωνείτε μαζί μου μέσω της φόρμας ή του Calendly για να ορίσουμε μια πρώτη γνωριμία."}
                </p>
              </div>

              {/* Βήμα 2 */}
              <div className="flex flex-col items-center text-center">
                <div className="w-24 h-24 rounded-full bg-white border border-slate-100 shadow-sm flex items-center justify-center text-2xl font-light text-pink-400 z-10 mb-8 transition-transform hover:scale-110">
                  02
                </div>
                <h4 className="text-lg font-semibold text-slate-800 mb-4">
                  {dict.home.process.step2_title || "Η Συνάντηση"}
                </h4>
                <p className="text-sm text-slate-500 leading-relaxed max-w-[250px]">
                  {dict.home.process.step2_desc ||
                    "Πραγματοποιούμε την πρώτη μας συνεδρία όπου χτίζουμε τη βάση της εμπιστοσύνης μας."}
                </p>
              </div>

              {/* Βήμα 3 */}
              <div className="flex flex-col items-center text-center">
                <div className="w-24 h-24 rounded-full bg-white border border-slate-100 shadow-sm flex items-center justify-center text-2xl font-light text-slate-400 z-10 mb-8 transition-transform hover:scale-110">
                  03
                </div>
                <h4 className="text-lg font-semibold text-slate-800 mb-4">
                  {dict.home.process.step3_title || "Θεραπευτική Πορεία"}
                </h4>
                <p className="text-sm text-slate-500 leading-relaxed max-w-[250px]">
                  {dict.home.process.step3_desc ||
                    "Ξεκινάμε ένα εξατομικευμένο πλάνο που εστιάζει στις δικές σας ανάγκες και την εξέλιξή σας."}
                </p>
              </div>
            </div>

            {/* Final Button CTA */}
            <div className="mt-20 flex justify-center">
              <Link
                href={`/${lang}/contact`}
                className="group flex items-center gap-2 px-10 py-4 rounded-full border border-slate-200 text-slate-600 font-medium hover:bg-white hover:shadow-xl hover:shadow-slate-200/50 transition-all active:scale-95"
              >
                {dict.navigation.contact}
                <span className="transition-transform group-hover:translate-x-1">
                  →
                </span>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
