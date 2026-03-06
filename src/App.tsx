import React, { useMemo, useState } from "react";
import { Phone, Calendar as CalendarIcon, ShieldCheck, FileText, Building2, Wrench, Snowflake, Star, X, MessageSquare, MapPin, ChevronDown, ChevronUp } from "lucide-react";
import { DayPicker } from "react-day-picker";
import "react-day-picker/style.css";
import { format } from "date-fns";
import { es } from "date-fns/locale";
import { motion, AnimatePresence } from "motion/react";

const WHATSAPP_NUMBER = "541160431982"; // TODO: replace if needed
const WHATSAPP_PREFILL = "Hola FríoPolar, quiero coordinar una visita.\n\nMi nombre es: \nZona/Barrio: \nEquipo: \nFalla: \nHorario preferido: ";

const WHATSAPP_LINK = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(WHATSAPP_PREFILL)}`;



const PROCESS = [
  {
    title: "Contacto Inicial",
    desc: "Nos escribís por WhatsApp o completás el formulario con los datos de tu equipo.",
    icon: MessageSquare,
  },
  {
    title: "Diagnóstico en Domicilio",
    desc: "Coordinamos una visita técnica para revisar el equipo y detectar la falla.",
    icon: MapPin,
  },
  {
    title: "Presupuesto y Reparación",
    desc: "Te pasamos el presupuesto en el momento y, si aceptás, reparamos en el día.",
    icon: Wrench,
  },
  {
    title: "Garantía por Escrito",
    desc: "Una vez finalizado, te entregamos el informe técnico y la garantía del trabajo.",
    icon: ShieldCheck,
  },
];

const FAQS = [
  {
    q: "¿Tienen garantía los trabajos?",
    a: "Sí, todos nuestros trabajos cuentan con garantía por escrito que varía entre 3 y 6 meses según la reparación realizada.",
  },
  {
    q: "¿Cobran la visita técnica?",
    a: "La visita técnica tiene un costo de diagnóstico que se bonifica totalmente si decidís realizar la reparación con nosotros.",
  },
  {
    q: "¿Reparan en el día?",
    a: "En el 90% de los casos resolvemos la falla en la primera visita, ya que contamos con stock de repuestos originales.",
  },
  {
    q: "¿Qué zonas cubren?",
    a: "Cubrimos toda la Ciudad Autónoma de Buenos Aires (CABA) y gran parte de Zona Norte y Zona Oeste del GBA.",
  },
];

const BRAND_LOGOS = [
  { name: "Samsung", src: "https://logo.clearbit.com/samsung.com" },
  { name: "LG", src: "https://logo.clearbit.com/lg.com" },
  { name: "Whirlpool", src: "https://logo.clearbit.com/whirlpool.com" },
  { name: "Electrolux", src: "https://logo.clearbit.com/electrolux.com" },
  { name: "Drean", src: "https://logo.clearbit.com/drean.com.ar" },
  { name: "BGH", src: "https://logo.clearbit.com/bgh.com.ar" },
  { name: "Carrier", src: "https://logo.clearbit.com/carrier.com" },
  { name: "York", src: "https://logo.clearbit.com/york.com" },
  { name: "Surrey", src: "https://logo.clearbit.com/surrey.com.ar" },
  { name: "Midea", src: "https://logo.clearbit.com/midea.com" },
];

const TESTIMONIALS = [
  {
    name: "María G.",
    text: "Llegaron puntuales y me dejaron el informe del trabajo. Se nota el nivel profesional.",
    rating: 5,
  },
  {
    name: "Agustín R.",
    text: "Me dieron presupuesto previo y garantía por escrito. Todo claro y prolijo.",
    rating: 5,
  },
  {
    name: "Administración (CABA)",
    text: "Armamos un plan mensual para el edificio. Respuesta rápida y buen seguimiento.",
    rating: 5,
  },
  {
    name: "Carlos P.",
    text: "Excelente servicio, repararon mi heladera en el día. Muy recomendables.",
    rating: 5,
  },
  {
    name: "Lucía M.",
    text: "Muy profesionales con la instalación del aire acondicionado. Dejaron todo impecable.",
    rating: 5,
  },
  {
    name: "Roberto F.",
    text: "El informe técnico me sirvió mucho para el seguro. Gracias por la rapidez.",
    rating: 5,
  },
  {
    name: "Elena S.",
    text: "Atención de primera. Me explicaron paso a paso el problema de mi freezer.",
    rating: 5,
  },
  {
    name: "Javier D.",
    text: "Cumplieron con todo lo pactado. La garantía me da mucha tranquilidad.",
    rating: 5,
  },
];

function Badge({ icon: Icon, title, desc }: { icon: any; title: string; desc: string }) {
  return (
    <div className="flex items-start gap-3 rounded-2xl border border-blue-100 bg-white/60 p-4 shadow-sm backdrop-blur">
      <div className="mt-0.5 rounded-xl border border-blue-100 bg-blue-50 p-2">
        <Icon className="h-5 w-5 text-blue-600" />
      </div>
      <div>
        <div className="text-sm font-semibold text-blue-900">{title}</div>
        <div className="text-sm text-blue-700/70">{desc}</div>
      </div>
    </div>
  );
}

function SectionTitle({ kicker, title, subtitle }: { kicker?: string; title: string; subtitle?: string }) {
  return (
    <div className="mx-auto max-w-3xl text-center">
      {kicker ? (
        <div className="text-xs font-semibold uppercase tracking-wider text-blue-600">{kicker}</div>
      ) : null}
      <h2 className="mt-2 text-2xl font-semibold tracking-tight text-blue-950 sm:text-3xl">{title}</h2>
      {subtitle ? <p className="mt-3 text-base text-blue-800/70">{subtitle}</p> : null}
    </div>
  );
}

function Stars({ n }: { n: number }) {
  const arr = Array.from({ length: 5 }, (_, i) => i < n);
  return (
    <div className="flex items-center gap-1">
      {arr.map((on, i) => (
        <Star key={i} className={`h-4 w-4 ${on ? "fill-blue-400 text-blue-400" : "text-blue-200"}`} />
      ))}
    </div>
  );
}

function FAQItem({ q, a }: { q: string; a: string }) {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="border-b border-blue-50 last:border-0">
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="flex w-full items-center justify-between py-5 text-left transition-colors hover:text-blue-600"
      >
        <span className="text-base font-semibold text-blue-950">{q}</span>
        {isOpen ? <ChevronUp className="h-5 w-5 text-blue-500" /> : <ChevronDown className="h-5 w-5 text-blue-400" />}
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <div className="pb-5 text-sm leading-relaxed text-blue-800/70">{a}</div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function App() {
  const [date, setDate] = useState<Date | undefined>(undefined);
  const [showCalendar, setShowCalendar] = useState(false);
  const [form, setForm] = useState({
    name: "",
    phone: "",
    zone: "",
    equipment: "",
    issue: "",
    timePref: "",
  });
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);

  const leadPayload = useMemo(() => ({
    ...form,
    source: "web",
    createdAt: new Date().toISOString(),
  }), [form]);

  async function submitLead(e: React.FormEvent) {
    e.preventDefault();
    setSending(true);
    setSent(false);

    // TODO: paste your n8n webhook URL here when ready
    const N8N_WEBHOOK_URL = ""; // e.g. https://YOUR_SERVER/webhook/friopolar/web/lead

    try {
      const dateStr = date ? format(date, "PPPP", { locale: es }) : "No seleccionada";
      const msg = `*NUEVA AGENDA - FRÍOPOLAR*\n\n*Cliente:* ${form.name}\n*WhatsApp:* ${form.phone}\n*Zona:* ${form.zone}\n*Equipo:* ${form.equipment}\n*Falla:* ${form.issue}\n*Fecha deseada:* ${dateStr}\n*Horario:* ${form.timePref}`;

      if (!N8N_WEBHOOK_URL) {
        // fallback: open WhatsApp with a structured message
        window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(msg)}`, "_blank");
      } else {
        await fetch(N8N_WEBHOOK_URL, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ ...leadPayload, selectedDate: date }),
        });
        setSent(true);
        // Also open WhatsApp for immediate notification
        window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(msg)}`, "_blank");
      }
    } catch (err) {
      // fallback to WhatsApp
      const msg = `Hola FríoPolar, quiero coordinar una visita.\n\nNombre: ${form.name}\nWhatsApp: ${form.phone}\nZona/Barrio: ${form.zone}\nEquipo: ${form.equipment}\nFalla: ${form.issue}\nHorario preferido: ${form.timePref}`;
      window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(msg)}`, "_blank");
    } finally {
      setSending(false);
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 via-white to-blue-50 text-slate-900 antialiased">
      {/* Top bar */}
      <header className="sticky top-0 z-40 border-b border-blue-100 bg-white/70 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
          <div className="flex items-center gap-2">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl border border-blue-100 bg-blue-50 shadow-sm">
              <Snowflake className="h-5 w-5 text-blue-600" />
            </div>
            <div className="leading-tight">
              <div className="text-sm font-semibold text-blue-950">FríoPolar</div>
              <div className="text-xs text-blue-700/70">Servicio técnico de refrigeración</div>
            </div>
          </div>

          <nav className="hidden items-center gap-6 text-sm text-slate-600 md:flex">
            <a className="hover:text-blue-600 transition-colors" href="#servicios">Servicios</a>
            <a className="hover:text-blue-600 transition-colors" href="#b2b">Edificios</a>
            <a className="hover:text-blue-600 transition-colors" href="#garantia">Garantía</a>
            <a className="hover:text-blue-600 transition-colors" href="#resenas">Reseñas</a>
          </nav>

          <div className="flex items-center gap-2">
            <a
              href={WHATSAPP_LINK}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 rounded-xl bg-blue-600 px-4 py-2 text-sm font-semibold text-white shadow-md hover:bg-blue-700 transition-all active:scale-95"
            >
              <Phone className="h-4 w-4" />
              WhatsApp
            </a>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="relative overflow-hidden bg-slate-50 py-24 lg:py-32">
        {/* Industrial Background Image with high transparency */}
        <div className="absolute inset-0 z-0 pointer-events-none">
          <img
            src="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&q=80&w=2070"
            alt="Industrial Background"
            className="w-full h-full object-cover opacity-15 grayscale"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-slate-50/50 to-slate-50"></div>
        </div>

        <div className="mx-auto grid max-w-6xl grid-cols-1 gap-10 px-4 py-14 md:grid-cols-2 md:py-20 relative z-10">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-blue-100 bg-blue-50 px-3 py-1 text-xs font-semibold text-blue-700 shadow-sm">
              <ShieldCheck className="h-4 w-4" /> Garantía digital • Informe PDF • Seguimiento
            </div>
            <h1 className="mt-5 text-4xl font-semibold tracking-tight text-blue-950 sm:text-5xl">
              Servicio técnico profesional
              <span className="block text-blue-600">con garantía digital</span>
            </h1>
            <p className="mt-4 text-base leading-relaxed text-slate-600">
              Turnos rápidos, presupuesto previo e informe técnico post-visita (PDF). Atención responsable para hogares y edificios.
            </p>

            <div className="mt-7 flex flex-col gap-3 sm:flex-row">
              <a
                href={WHATSAPP_LINK}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center justify-center gap-2 rounded-2xl bg-blue-600 px-6 py-3.5 text-sm font-semibold text-white shadow-lg shadow-blue-200 hover:bg-blue-700 transition-all active:scale-95"
              >
                <Phone className="h-4 w-4" /> Hablar por WhatsApp
              </a>
              <a
                href="#b2b"
                className="inline-flex items-center justify-center gap-2 rounded-2xl border border-blue-100 bg-white px-6 py-3.5 text-sm font-semibold text-blue-900 shadow-sm hover:bg-blue-50 transition-colors"
              >
                <Building2 className="h-4 w-4" /> Planes para edificios
              </a>
            </div>

            <div className="mt-8 grid grid-cols-1 gap-3 sm:grid-cols-2">
              <Badge icon={FileText} title="Informe técnico PDF" desc="Detalle del trabajo y recomendaciones." />
              <Badge icon={ShieldCheck} title="Garantía clara" desc="Condiciones transparentes y por escrito." />
              <Badge icon={CalendarIcon} title="Turnos organizados" desc="Confirmación y recordatorios." />
              <Badge icon={Wrench} title="Presupuesto previo" desc="Sin sorpresas: primero diagnóstico." />
            </div>
          </div>

          {/* Lead form card */}
          <div className="md:pl-6">
            <div className="rounded-3xl border bg-white p-6 shadow-sm">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-sm font-semibold">Coordinemos una visita</div>
                  <div className="mt-1 text-sm text-neutral-600">Dejá tus datos y abrimos WhatsApp con el mensaje listo.</div>
                </div>
                <div className="hidden rounded-2xl border bg-slate-50 px-3 py-2 text-xs text-neutral-700 sm:block">
                  Respuesta rápida
                </div>
              </div>

              <form onSubmit={submitLead} className="mt-5 grid grid-cols-1 gap-3">
                <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                  <input
                    className="rounded-2xl border px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-neutral-200"
                    placeholder="Nombre"
                    value={form.name}
                    onChange={(e) => setForm((s) => ({ ...s, name: e.target.value }))}
                    required
                  />
                  <input
                    className="rounded-2xl border px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-neutral-200"
                    placeholder="WhatsApp"
                    value={form.phone}
                    onChange={(e) => setForm((s) => ({ ...s, phone: e.target.value }))}
                    required
                  />
                </div>
                <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                  <input
                    className="rounded-2xl border px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-neutral-200"
                    placeholder="Zona / Barrio"
                    value={form.zone}
                    onChange={(e) => setForm((s) => ({ ...s, zone: e.target.value }))}
                  />
                  <select
                    className="rounded-2xl border px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-neutral-200"
                    value={form.equipment}
                    onChange={(e) => setForm((s) => ({ ...s, equipment: e.target.value }))}
                    required
                  >
                    <option value="">Equipo</option>
                    <option>Heladera</option>
                    <option>Freezer</option>
                    <option>Aire acondicionado</option>
                    <option>Cámara frigorífica</option>
                    <option>Otro</option>
                  </select>
                </div>
                <textarea
                  className="min-h-[90px] rounded-2xl border px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-neutral-200"
                  placeholder="Descripción de la falla"
                  value={form.issue}
                  onChange={(e) => setForm((s) => ({ ...s, issue: e.target.value }))}
                  required
                />
                <div className="relative">
                  <button
                    type="button"
                    onClick={() => setShowCalendar(!showCalendar)}
                    className="w-full flex items-center justify-between rounded-2xl border border-blue-100 bg-white px-4 py-3 text-sm text-slate-600 outline-none focus:ring-2 focus:ring-blue-100"
                  >
                    <div className="flex items-center gap-2">
                      <CalendarIcon className="h-4 w-4 text-blue-500" />
                      {date ? format(date, "dd/MM/yyyy") : "Seleccionar fecha de visita"}
                    </div>
                  </button>

                  {showCalendar && (
                    <div className="absolute left-0 sm:left-auto right-0 sm:right-auto bottom-full z-50 mb-2 min-w-[300px] rounded-3xl border border-blue-100 bg-white p-4 shadow-2xl animate-popover-up">
                      <div className="flex justify-between items-center mb-3 px-1">
                        <span className="text-[10px] font-bold text-blue-600 uppercase tracking-widest">Agenda tu visita</span>
                        <button onClick={() => setShowCalendar(false)} className="rounded-full p-1.5 hover:bg-blue-50 text-slate-400 hover:text-blue-600 transition-all">
                          <X className="h-4 w-4" />
                        </button>
                      </div>
                      <div className="flex justify-center border-t border-blue-50 pt-3 overflow-auto max-h-[380px]">
                        <DayPicker
                          mode="single"
                          selected={date}
                          onSelect={(d) => {
                            if (d) {
                              setDate(d);
                              setShowCalendar(false);
                            }
                          }}
                          locale={es}
                          disabled={{ before: new Date() }}
                          className="mx-auto"
                        />
                      </div>
                    </div>
                  )}
                </div>

                <input
                  className="rounded-2xl border border-blue-100 px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-blue-100"
                  placeholder="Horario preferido (ej: 18-20 hs)"
                  value={form.timePref}
                  onChange={(e) => setForm((s) => ({ ...s, timePref: e.target.value }))}
                />

                <button
                  type="submit"
                  disabled={sending}
                  className="mt-1 inline-flex items-center justify-center gap-2 rounded-2xl bg-blue-600 px-5 py-3.5 text-sm font-semibold text-white shadow-lg shadow-blue-100 hover:bg-blue-700 transition-all active:scale-95 disabled:opacity-60"
                >
                  <Phone className="h-4 w-4" />
                  {sending ? "Abriendo…" : "Hablar por WhatsApp"}
                </button>

                {sent ? (
                  <div className="text-sm text-green-700">Listo. Te contactamos a la brevedad.</div>
                ) : null}

                <div className="text-xs text-neutral-500">
                  Al continuar, aceptás ser contactado por WhatsApp. No compartimos tus datos.
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Brand strip */}
      <section className="py-10 overflow-hidden">
        <div className="mx-auto max-w-6xl px-4">
          <div className="rounded-3xl border border-blue-100 bg-white p-8 shadow-sm relative overflow-hidden">
            <div className="text-xs font-bold uppercase tracking-widest text-blue-600 mb-8 text-center">
              Especialistas en marcas líderes
            </div>

            <div className="relative flex overflow-x-hidden">
              <div className="animate-marquee flex items-center gap-12">
                {[...BRAND_LOGOS, ...BRAND_LOGOS].map((b, idx) => (
                  <div key={`${b.name}-${idx}`} className="group flex shrink-0 flex-col items-center justify-center gap-2 grayscale opacity-40 hover:grayscale-0 hover:opacity-100 transition-all duration-300">
                    <div className="flex h-12 items-center justify-center">
                      <img
                        src={b.src}
                        alt={b.name}
                        className="h-full w-auto object-contain"
                        onError={(e) => {
                          (e.currentTarget as HTMLImageElement).src = `https://ui-avatars.com/api/?name=${b.name}&background=eff6ff&color=2563eb&bold=true`;
                        }}
                        loading="lazy"
                      />
                    </div>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 transition-colors group-hover:text-blue-600">
                      {b.name}
                    </span>
                  </div>
                ))}
              </div>

              {/* Gradient overlays for smooth fade */}
              <div className="absolute inset-y-0 left-0 w-20 bg-gradient-to-r from-white to-transparent z-10"></div>
              <div className="absolute inset-y-0 right-0 w-20 bg-gradient-to-l from-white to-transparent z-10"></div>
            </div>

            <div className="mt-8 text-center text-[10px] text-slate-400">
              Las marcas mencionadas son propiedad de sus respectivos dueños. Brindamos servicio técnico independiente multimarca.
            </div>
          </div>
        </div>
      </section>

      {/* Services */}
      <section id="servicios" className="py-14">
        <div className="mx-auto max-w-6xl px-4">
          <SectionTitle
            kicker="Servicios"
            title="Reparación, mantenimiento e instalación"
            subtitle="Diagnóstico responsable, presupuesto previo y garantía clara."
          />

          <div className="mt-10 grid grid-cols-1 gap-4 md:grid-cols-2">
            {[{
              title: "Heladeras & Freezers",
              desc: "No enfría, escarcha, pierde agua, ruidos, placa, termostato.",
              icon: Snowflake,
            }, {
              title: "Aire acondicionado",
              desc: "Carga, limpieza, reparación, instalación, mantenimiento preventivo.",
              icon: Wrench,
            }, {
              title: "Cámaras frigoríficas",
              desc: "Mantenimiento B2B, control, revisión, reportes e SLA.",
              icon: Building2,
            }, {
              title: "Mantenimiento preventivo",
              desc: "Planes mensuales y recordatorios automáticos para evitar fallas.",
              icon: CalendarIcon,
            }].map((s) => (
              <div key={s.title} className="rounded-3xl border border-blue-100 bg-white p-6 shadow-sm hover:shadow-md transition-shadow">
                <div className="flex items-start gap-3">
                  <div className="rounded-2xl border border-blue-100 bg-blue-50 p-3">
                    <s.icon className="h-5 w-5 text-blue-600" />
                  </div>
                  <div>
                    <div className="text-base font-semibold text-blue-950">{s.title}</div>
                    <div className="mt-1 text-sm text-blue-800/70">{s.desc}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="py-14 bg-white/60" id="garantia">
        <div className="mx-auto max-w-6xl px-4">
          <SectionTitle
            kicker="Cómo trabajamos"
            title="Un proceso prolijo, rápido y transparente"
            subtitle="Para que sepas siempre qué se hace y por qué."
          />

          <div className="mt-10 grid grid-cols-1 gap-4 md:grid-cols-4">
            {[{
              n: "01",
              t: "Contacto",
              d: "Nos escribís por WhatsApp y te pedimos datos mínimos.",
              icon: Phone,
            }, {
              n: "02",
              t: "Diagnóstico",
              d: "Revisamos, explicamos el problema y pasamos presupuesto.",
              icon: Wrench,
            }, {
              n: "03",
              t: "Trabajo",
              d: "Reparación o mantenimiento con repuestos adecuados.",
              icon: ShieldCheck,
            }, {
              n: "04",
              t: "Informe + Garantía",
              d: "Te dejamos informe PDF y garantía clara.",
              icon: FileText,
            }].map((p) => (
              <div key={p.n} className="rounded-3xl border border-blue-100 bg-white p-6 shadow-sm">
                <div className="flex items-center justify-between">
                  <div className="text-xs font-bold text-blue-400">{p.n}</div>
                  <p.icon className="h-5 w-5 text-blue-600" />
                </div>
                <div className="mt-3 text-base font-semibold text-blue-950">{p.t}</div>
                <div className="mt-1 text-sm text-blue-800/70">{p.d}</div>
              </div>
            ))}
          </div>

          <div className="mt-8 flex justify-center">
            <a
              href={WHATSAPP_LINK}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 rounded-2xl bg-blue-600 px-5 py-3 text-sm font-semibold text-white shadow-md hover:bg-blue-700 transition-all active:scale-95"
            >
              <Phone className="h-4 w-4" /> Hablar por WhatsApp
            </a>
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-24">
        <div className="mx-auto max-w-6xl px-4">
          <SectionTitle
            kicker="Cómo trabajamos"
            title="Tu reparación en 4 pasos"
            subtitle="Un proceso transparente y profesional para tu tranquilidad."
          />

          <div className="mt-16 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
            {PROCESS.map((step, idx) => (
              <div key={step.title} className="relative group">
                {idx < PROCESS.length - 1 && (
                  <div className="absolute right-[-20%] top-10 hidden h-[2px] w-[40%] bg-blue-50 lg:block"></div>
                )}
                <div className="relative z-10 flex flex-col items-center text-center">
                  <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-[28px] border border-blue-100 bg-white shadow-sm transition-all group-hover:bg-blue-600 group-hover:text-white group-hover:shadow-blue-200 group-hover:shadow-xl">
                    <step.icon className="h-8 w-8" />
                  </div>
                  <div className="mb-2 text-lg font-bold text-blue-950">{step.title}</div>
                  <p className="text-sm leading-relaxed text-slate-500">{step.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* B2B */}
      <section id="b2b" className="py-14">
        <div className="mx-auto max-w-6xl px-4">
          <SectionTitle
            kicker="B2B"
            title="Planes para edificios y administraciones"
            subtitle="SLA, mantenimiento mensual e informes técnicos para consorcios."
          />

          <div className="mt-10 grid grid-cols-1 gap-4 md:grid-cols-2">
            <div className="rounded-3xl border bg-white p-7 shadow-sm">
              <div className="flex items-start gap-3">
                <div className="rounded-2xl border bg-slate-50 p-3">
                  <Building2 className="h-5 w-5" />
                </div>
                <div>
                  <div className="text-base font-semibold">Propuesta con SLA</div>
                  <div className="mt-1 text-sm text-neutral-600">
                    Tiempos de respuesta definidos, prioridad y seguimiento por estado.
                  </div>
                </div>
              </div>
              <ul className="mt-5 space-y-2 text-sm text-neutral-700">
                <li>• Visitas programadas y urgencias</li>
                <li>• Reporte técnico en PDF por intervención</li>
                <li>• Abono mensual preventivo</li>
                <li>• Historial por edificio/unidad</li>
              </ul>
              <a
                href={WHATSAPP_LINK}
                target="_blank"
                rel="noreferrer"
                className="mt-6 inline-flex items-center gap-2 rounded-2xl bg-blue-600 px-5 py-3 text-sm font-semibold text-white shadow-md hover:bg-blue-700 transition-all active:scale-95"
              >
                <Phone className="h-4 w-4" /> Pedir propuesta
              </a>
            </div>

            <div className="rounded-3xl border bg-white p-7 shadow-sm">
              <div className="flex items-start gap-3">
                <div className="rounded-2xl border bg-slate-50 p-3">
                  <FileText className="h-5 w-5" />
                </div>
                <div>
                  <div className="text-base font-semibold">Gestión y trazabilidad</div>
                  <div className="mt-1 text-sm text-neutral-600">
                    Orden y control para administraciones: tickets, estados, historial y próximos mantenimientos.
                  </div>
                </div>
              </div>
              <div className="mt-5 rounded-2xl border bg-slate-50 p-4 text-sm text-neutral-700">
                “La diferencia no es solo reparar: es documentar, prevenir y responder a tiempo.”
              </div>
              <div className="mt-6 flex flex-col gap-2 text-sm text-neutral-600">
                <div>✅ Ideal para: consorcios, locales, depósitos, restaurantes</div>
                <div>✅ Incluye: SLA + plan mensual + reportes</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section id="resenas" className="py-14 bg-white/60 overflow-hidden">
        <div className="mx-auto max-w-6xl px-4">
          <SectionTitle
            kicker="Confianza"
            title="Reseñas reales"
            subtitle="La mejor publicidad es un trabajo prolijo."
          />

          <div className="mt-12 relative flex overflow-x-hidden">
            <div className="animate-marquee-slow flex items-center gap-6">
              {[...TESTIMONIALS, ...TESTIMONIALS].map((t, idx) => (
                <div key={`${t.name}-${idx}`} className="w-[320px] shrink-0 rounded-3xl border border-blue-100 bg-white p-6 shadow-sm">
                  <Stars n={t.rating} />
                  <div className="mt-4 text-sm text-blue-900 leading-relaxed">“{t.text}”</div>
                  <div className="mt-4 text-sm font-semibold text-blue-950">{t.name}</div>
                </div>
              ))}
            </div>

            {/* Gradient overlays for smooth fade */}
            <div className="absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-white/60 to-transparent z-10 pointer-events-none"></div>
            <div className="absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-white/60 to-transparent z-10 pointer-events-none"></div>
          </div>

          <div className="mt-10 flex justify-center">
            <a
              href={WHATSAPP_LINK}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 rounded-2xl border border-blue-100 bg-white px-5 py-3 text-sm font-semibold text-blue-900 shadow-sm hover:bg-blue-50 transition-colors"
            >
              <Phone className="h-4 w-4" /> Consultar por WhatsApp
            </a>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-24 bg-slate-50/50">
        <div className="mx-auto max-w-3xl px-4">
          <div className="text-center mb-16">
            <div className="text-xs font-bold uppercase tracking-widest text-blue-600">Preguntas frecuentes</div>
            <h2 className="mt-4 text-3xl font-bold text-blue-950">Dudas comunes</h2>
          </div>
          <div className="rounded-3xl border border-blue-100 bg-white p-8 shadow-sm">
            {FAQS.map((faq) => (
              <div key={faq.q}>
                <FAQItem q={faq.q} a={faq.a} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Floating WhatsApp */}
      <motion.a
        href={WHATSAPP_LINK}
        target="_blank"
        rel="noreferrer"
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        className="fixed bottom-6 right-6 z-50 flex h-16 w-16 items-center justify-center rounded-full bg-green-500 text-white shadow-2xl shadow-green-500/40"
      >
        <Phone className="h-8 w-8" />
        <span className="absolute -top-2 -right-2 flex h-6 w-6 items-center justify-center rounded-full bg-red-500 text-[10px] font-bold">1</span>
      </motion.a>

      {/* Footer */}
      <footer className="border-t bg-white">
        <div className="mx-auto max-w-6xl px-4 py-10">
          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            <div>
              <div className="text-sm font-semibold text-blue-950">FríoPolar</div>
              <div className="mt-2 text-sm text-blue-800/70">Servicio técnico de refrigeración • Argentina</div>
              <a
                className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-blue-600 hover:text-blue-700 transition-colors"
                href={WHATSAPP_LINK}
                target="_blank"
                rel="noreferrer"
              >
                <Phone className="h-4 w-4" /> WhatsApp: +54 11 6043 1982
              </a>
            </div>

            <div>
              <div className="text-sm font-semibold">Zonas</div>
              <div className="mt-2 text-sm text-neutral-600">CABA y GBA (a confirmar por WhatsApp)</div>
              <div className="mt-2 text-sm text-neutral-600">Horarios: Lun–Sáb</div>
            </div>

            <div>
              <div className="text-sm font-semibold">Garantía</div>
              <div className="mt-2 text-sm text-neutral-600">
                Garantía por escrito según trabajo realizado y condiciones de uso.
              </div>
              <div className="mt-2 text-xs text-neutral-500">
                Las marcas y logos pertenecen a sus respectivos dueños. Servicio técnico independiente.
              </div>
            </div>
          </div>

          <div className="mt-8 text-xs text-neutral-500">© {new Date().getFullYear()} FríoPolar. Todos los derechos reservados.</div>
        </div>
      </footer>
    </div>
  );
}
