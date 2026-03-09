import type { Metadata } from "next";
import { getDictionary } from "@/lib/dictionary";
import ContactForm from "@/components/ContactForm";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang } = await params;
  const isGreek = lang === "el";

  return {
    title: isGreek ? "Επικοινωνία | Melisa Tsela" : "Contact | Melisa Tsela",
    description: isGreek
      ? "Επικοινωνήστε με τη Μελίσα Τσέλα για online συνεδρίες ψυχοθεραπείας και συμβουλευτικής."
      : "Contact Melisa Tsela for online psychotherapy and counseling sessions.",
    alternates: {
      canonical: `/${lang}/contact`,
    },
  };
}

export default async function ContactPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  const dict = await getDictionary(lang as "el" | "en");

  return (
    <main className="min-h-screen ">
      {/* Hero Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 text-center">
          <h1 className="text-4xl font-light text-slate-800 sm:text-5xl mb-6">
            {dict.contact.hero_title}
          </h1>
          <p className="max-w-2xl mx-auto text-lg text-slate-500 font-light">
            {dict.contact.hero_subtitle}
          </p>
        </div>
      </section>

      <section className="pb-24">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-12 items-start">
            {/* Client Component Φόρμας */}
            <div className="bg-white p-10 rounded-[2.5rem] border border-slate-100 shadow-sm">
              <h2 className="text-2xl font-semibold text-slate-800 mb-4">
                {dict.contact.form_title}
              </h2>
              <p className="text-slate-500 mb-8 leading-relaxed">
                {dict.contact.form_desc}
              </p>

              {/* Εδώ καλούμε το Component που έφτιαξες */}
              <ContactForm dict={dict} />
            </div>
          </div>

          {/* Online Notice Section */}
          <div className="mt-16 p-8 bg-sky-50/50 rounded-[2.5rem] border border-sky-100/50 flex flex-col md:flex-row items-center gap-6">
            <div className="w-14 h-14 bg-white rounded-full flex items-center justify-center text-sky-400 shadow-sm shrink-0">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-7 h-7"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3.75 6.75A2.25 2.25 0 0 1 6 4.5h12a2.25 2.25 0 0 1 2.25 2.25v7.5A2.25 2.25 0 0 1 18 16.5H6a2.25 2.25 0 0 1-2.25-2.25v-7.5ZM9 19.5h6m-4.5-3v3m3-3v3"
                />
              </svg>
            </div>
            <p className="text-slate-600 font-light leading-relaxed text-center md:text-left">
              {dict.contact.online_notice}
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
