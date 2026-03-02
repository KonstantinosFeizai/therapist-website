import { getDictionary } from "@/lib/dictionary";
import ContactForm from "@/components/ContactForm";
import ContactBookingButton from "@/components/ContactBookingButton";

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
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            {/* Κάρτα Calendly */}
            <div className="bg-white p-10 rounded-[2.5rem] border border-slate-100 shadow-sm hover:shadow-md transition-shadow">
              <div className="w-12 h-12 bg-rose-50 rounded-2xl flex items-center justify-center mb-6 text-rose-500">
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
                    d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5"
                  />
                </svg>
              </div>
              <h2 className="text-2xl font-semibold text-slate-800 mb-4">
                {dict.contact.booking_title}
              </h2>
              <p className="text-slate-500 mb-8 leading-relaxed">
                {dict.contact.booking_desc}
              </p>
              <ContactBookingButton text={dict.contact.booking_btn} />
            </div>

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
                  d="M15.75 10.5V6a3.75 3.75 0 1 0-7.5 0v4.5m11.356-1.993 1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 0 1-1.12-1.243l1.264-12A1.125 1.125 0 0 1 5.513 7.5h12.974c.576 0 1.059.435 1.119 1.007ZM8.625 10.5a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm7.5 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z"
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
