import React, { useMemo, useState } from "react";
import {
  ArrowRight,
  CalendarCheck2,
  Brain,
  MessageCircleMore,
  Clock3,
  Building2,
  Sparkles,
  ShieldCheck,
  PhoneCall,
  CheckCircle2,
  Bot,
  LayoutDashboard,
  Wand2,
  Star,
  BadgeCheck,
  MessagesSquare,
  TrendingUp,
} from "lucide-react";

const API_BASE = import.meta.env.VITE_API_BASE || "http://127.0.0.1:8000";

const demoResult = {
  nome: "Fernando",
  prioridade_ia: "alta",
  status: "agendado",
  horario_sugerido: "09:00",
  horario_confirmado: "09:00",
  resumo_ia:
    "Lead com alta intenção de fechamento, buscando avaliação personalizada e com preferência por atendimento no período da manhã.",
  resposta_ia:
    "Olá, Fernando! Recebi seu interesse e já separei um horário às 09:00 para facilitar seu atendimento. Se quiser, posso deixar seu agendamento encaminhado agora mesmo.",
};

const niches = [
  "Clínicas e consultórios",
  "Estúdios e personal trainers",
  "Estética e harmonização",
  "Mentorias e consultorias",
  "Imobiliárias e times comerciais",
  "Escritórios e serviços premium",
];

const benefits = [
  {
    icon: MessageCircleMore,
    title: "Resposta automática imediata",
    text: "Seu lead recebe retorno em segundos, com linguagem profissional e sem depender de alguém parar tudo para responder manualmente.",
  },
  {
    icon: Brain,
    title: "Qualificação inteligente com IA",
    text: "A AgendAI entende a intenção do cliente, identifica prioridade e ajuda você a focar em quem está mais pronto para fechar.",
  },
  {
    icon: CalendarCheck2,
    title: "Agendamento sem atrito",
    text: "Menos vai e volta no WhatsApp. O sistema sugere horários disponíveis e acelera a confirmação do atendimento.",
  },
  {
    icon: Clock3,
    title: "Menos lead perdido",
    text: "Cada minuto sem resposta reduz sua chance de venda. Com resposta rápida, você diminui perdas e aumenta sua conversão.",
  },
  {
    icon: ShieldCheck,
    title: "Operação mais organizada",
    text: "Status, contexto, horários e histórico ficam claros, deixando seu atendimento mais profissional e previsível.",
  },
  {
    icon: TrendingUp,
    title: "Mais clientes na agenda",
    text: "A proposta não é só automatizar. É transformar demanda em atendimento confirmado e novas oportunidades de venda.",
  },
];

const steps = [
  "O lead chega pelo site, anúncio, formulário ou WhatsApp.",
  "A AgendAI responde imediatamente com contexto e clareza.",
  "A inteligência identifica a intenção e qualifica o contato.",
  "O sistema sugere horários e reduz o atrito no agendamento.",
  "Sua equipe entra no momento certo para fechar e atender.",
];

const highlights = [
  { icon: Bot, title: "IA aplicada ao atendimento" },
  { icon: LayoutDashboard, title: "Fluxo comercial escalável" },
  { icon: Wand2, title: "Implementação personalizada" },
  { icon: Star, title: "Experiência premium" },
];

const trustPoints = [
  "Sistema pensado para negócios que dependem de agendamento",
  "Implementação personalizada conforme sua operação",
  "Estrutura com foco em conversão e fechamento",
];

function SectionTitle({ eyebrow, title, subtitle, light = false }) {
  return (
    <div className="max-w-3xl">
      <p
        className={`text-sm font-semibold uppercase tracking-[0.25em] ${
          light ? "text-slate-400" : "text-slate-500"
        }`}
      >
        {eyebrow}
      </p>
      <h2
        className={`mt-3 text-3xl font-semibold tracking-tight sm:text-4xl ${
          light ? "text-white" : "text-slate-950"
        }`}
      >
        {title}
      </h2>
      <p
        className={`mt-4 text-base leading-7 ${
          light ? "text-slate-300" : "text-slate-600"
        }`}
      >
        {subtitle}
      </p>
    </div>
  );
}

function BenefitCard({ icon: Icon, title, text }) {
  return (
    <div className="group rounded-[28px] bg-white/90 p-6 shadow-[0_10px_40px_rgba(15,23,42,0.06)] ring-1 ring-slate-200 backdrop-blur transition duration-300 hover:-translate-y-1 hover:shadow-[0_24px_70px_rgba(15,23,42,0.12)]">
      <div className="inline-flex rounded-2xl bg-slate-100 p-3 transition group-hover:bg-emerald-100">
        <Icon className="h-5 w-5 text-slate-700 group-hover:text-emerald-700" />
      </div>
      <h3 className="mt-5 text-lg font-semibold text-slate-950">{title}</h3>
      <p className="mt-3 text-sm leading-6 text-slate-600">{text}</p>
    </div>
  );
}

function Badge({ children }) {
  return (
    <span className="inline-flex rounded-full bg-emerald-100 px-3 py-1 text-xs font-semibold text-emerald-700 ring-1 ring-emerald-200">
      {children}
    </span>
  );
}

export default function AgendAILandingPage() {
  const [submitting, setSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [form, setForm] = useState({
    nome: "",
    empresa: "",
    whatsapp: "",
    segmento: "",
  });

  const whatsappLink = useMemo(() => {
    const text = encodeURIComponent(
      `Olá! Vim pela landing page da AgendAI e quero automatizar meu atendimento.\n\nNome: ${
        form.nome || "Não informado"
      }\nEmpresa: ${form.empresa || "Não informada"}\nWhatsApp: ${
        form.whatsapp || "Não informado"
      }\nSegmento: ${form.segmento || "Não informado"}`
    );
    return `https://wa.me/5562983100643?text=${text}`;
  }, [form]);

  const handleChange = (field, value) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async () => {
    setSubmitting(true);
    setSuccessMessage("");
    setErrorMessage("");

    try {
      const response = await fetch(`${API_BASE}/appointments`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          nome: form.nome || "Lead da landing",
          whatsapp: form.whatsapp || "62999999999",
          objetivo: `Lead vindo da landing premium - Segmento: ${
            form.segmento || "não informado"
          } - Empresa: ${form.empresa || "não informada"}`,
          preferencia_horario: "qualquer",
        }),
      });

      if (!response.ok) {
        throw new Error("Falha ao enviar lead para a API.");
      }

      setSuccessMessage(
        "Perfeito. Seus dados foram enviados. Você será redirecionado para o WhatsApp."
      );

      setTimeout(() => {
        window.location.href = whatsappLink;
      }, 900);
    } catch (error) {
      console.error("Erro ao salvar lead na API:", error);
      setErrorMessage(
        "Não foi possível enviar automaticamente agora. Você ainda pode abrir o WhatsApp e falar comigo direto."
      );
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#f7f8fb] text-slate-900">
      <section className="relative overflow-hidden bg-[#07111f] text-white">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(16,185,129,0.18),transparent_28%),radial-gradient(circle_at_top_right,rgba(56,189,248,0.12),transparent_24%),linear-gradient(180deg,rgba(255,255,255,0.03),transparent)]" />
        <div className="absolute -left-16 top-24 h-72 w-72 rounded-full bg-emerald-500/10 blur-3xl" />
        <div className="absolute right-0 top-0 h-80 w-80 rounded-full bg-sky-500/10 blur-3xl" />

        <div className="relative mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="rounded-2xl bg-white/10 p-3 text-white ring-1 ring-white/10 backdrop-blur">
                <Sparkles className="h-5 w-5" />
              </div>
              <div>
                <p className="text-lg font-semibold tracking-tight">AgendAI</p>
                <p className="text-sm text-slate-400">
                  Automação inteligente de atendimento e agendamento
                </p>
              </div>
            </div>

            <a
              href="#contato"
              className="hidden rounded-2xl bg-white px-4 py-2.5 text-sm font-medium text-slate-900 transition hover:bg-slate-100 sm:inline-flex"
            >
              Quero ver no meu negócio
            </a>
          </div>
        </div>

        <div className="relative mx-auto grid max-w-7xl gap-14 px-4 pb-20 pt-10 sm:px-6 lg:grid-cols-[1.05fr_0.95fr] lg:px-8 lg:pb-28 lg:pt-16">
          <div className="flex flex-col justify-center">
            <Badge>Automatize atendimento, qualificação e agenda</Badge>

            <h1 className="mt-6 max-w-5xl text-4xl font-semibold tracking-tight sm:text-5xl lg:text-6xl">
              Seus leads chegam. A AgendAI responde, qualifica e agenda
              automaticamente. Você só fecha.
            </h1>

            <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-300">
              Cada minuto sem resposta é um cliente perdido. A AgendAI atende na
              hora, organiza tudo e transforma conversa em agendamento
              confirmado.
            </p>

            <p className="mt-4 text-sm text-slate-300">
              Sistema já testado em negócios que dependem de agendamento.
            </p>
            <p className="mt-2 text-xs text-slate-400">
              Sem compromisso • Demonstração rápida • Implementação
              personalizada
            </p>

            <div className="mt-8 flex flex-col gap-4 sm:flex-row">
              <a
                href="#contato"
                className="inline-flex items-center justify-center gap-2 rounded-2xl bg-emerald-500 px-5 py-3.5 text-sm font-medium text-slate-950 transition hover:bg-emerald-400"
              >
                Quero automatizar e fechar mais clientes
                <ArrowRight className="h-4 w-4" />
              </a>
              <a
                href="#demo"
                className="inline-flex items-center justify-center rounded-2xl border border-white/15 bg-white/5 px-5 py-3.5 text-sm font-medium text-white backdrop-blur transition hover:bg-white/10"
              >
                Ver demonstração
              </a>
            </div>

            <div className="mt-10 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
              {highlights.map(({ icon: Icon, title }) => (
                <div
                  key={title}
                  className="rounded-2xl border border-white/10 bg-white/5 p-4 backdrop-blur"
                >
                  <Icon className="h-5 w-5 text-emerald-300" />
                  <p className="mt-3 text-sm font-medium text-white">{title}</p>
                </div>
              ))}
            </div>
          </div>

          <div id="demo" className="relative">
            <div className="absolute inset-0 -translate-y-4 translate-x-4 rounded-[2rem] bg-emerald-500/10 blur-2xl" />
            <div className="relative rounded-[2rem] border border-white/10 bg-white/8 p-6 shadow-2xl backdrop-blur-xl ring-1 ring-white/10">
              <div className="flex items-center justify-between gap-3 border-b border-white/10 pb-4">
                <div>
                  <p className="text-sm uppercase tracking-[0.2em] text-slate-400">
                    Demonstração real
                  </p>
                  <h3 className="mt-1 text-xl font-semibold">
                    Como a AgendAI atua no atendimento
                  </h3>
                </div>
                <div className="rounded-full bg-emerald-500/15 px-3 py-1 text-xs font-semibold text-emerald-300">
                  IA ativa
                </div>
              </div>

              <div className="mt-6 grid gap-4 sm:grid-cols-2">
                <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                  <p className="text-xs uppercase tracking-[0.2em] text-slate-400">
                    Cliente
                  </p>
                  <p className="mt-2 text-lg font-semibold">{demoResult.nome}</p>
                </div>
                <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                  <p className="text-xs uppercase tracking-[0.2em] text-slate-400">
                    Status
                  </p>
                  <p className="mt-2 text-lg font-semibold text-emerald-300">
                    {demoResult.status}
                  </p>
                </div>
              </div>

              <div className="mt-4 flex flex-wrap gap-2">
                <span className="rounded-full bg-white/10 px-3 py-1 text-xs">
                  Prioridade: {demoResult.prioridade_ia}
                </span>
                <span className="rounded-full bg-white/10 px-3 py-1 text-xs">
                  Sugerido: {demoResult.horario_sugerido}
                </span>
                <span className="rounded-full bg-white/10 px-3 py-1 text-xs">
                  Confirmado: {demoResult.horario_confirmado}
                </span>
              </div>

              <div className="mt-6 space-y-5">
                <div className="rounded-2xl border border-white/10 bg-[#08111c] p-5">
                  <p className="text-xs uppercase tracking-[0.2em] text-slate-400">
                    Resumo
                  </p>
                  <p className="mt-3 text-sm leading-7 text-slate-200">
                    {demoResult.resumo_ia}
                  </p>
                </div>

                <div className="rounded-2xl border border-emerald-500/20 bg-emerald-500/10 p-5">
                  <p className="text-xs uppercase tracking-[0.2em] text-emerald-200/80">
                    Mensagem pronta para atendimento
                  </p>
                  <p className="mt-3 text-sm leading-7 text-emerald-200">
                    {demoResult.resposta_ia}
                  </p>
                </div>

                <div className="grid gap-4 sm:grid-cols-3">
                  <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                    <p className="text-xs text-slate-400">Resposta imediata</p>
                    <p className="mt-2 text-xl font-semibold">24/7</p>
                  </div>
                  <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                    <p className="text-xs text-slate-400">Qualificação</p>
                    <p className="mt-2 text-xl font-semibold">IA</p>
                  </div>
                  <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                    <p className="text-xs text-slate-400">Escala</p>
                    <p className="mt-2 text-xl font-semibold">Pronta</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="border-y border-slate-200 bg-white">
        <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {niches.map((item) => (
              <div
                key={item}
                className="flex items-center gap-3 rounded-2xl bg-slate-50 px-5 py-4 shadow-sm ring-1 ring-slate-200"
              >
                <Building2 className="h-5 w-5 text-slate-500" />
                <span className="text-sm font-medium text-slate-700">{item}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[#f7f8fb]">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
          <SectionTitle
            eyebrow="Por que a AgendAI vende mais"
            title="Mais velocidade. Mais organização. Mais clientes."
            subtitle="A AgendAI responde em segundos, qualifica automaticamente e reduz a perda de leads que esfriam enquanto você atende manualmente."
          />

          <div className="mt-10 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {benefits.map((benefit) => (
              <BenefitCard key={benefit.title} {...benefit} />
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white">
        <div className="mx-auto grid max-w-7xl gap-12 px-4 py-16 sm:px-6 lg:grid-cols-[0.9fr_1.1fr] lg:px-8 lg:py-24">
          <div>
            <SectionTitle
              eyebrow="Como funciona na prática"
              title="Da primeira mensagem até o agendamento confirmado."
              subtitle="A lógica é simples: responder rápido, qualificar com inteligência e conduzir o lead até o agendamento."
            />
          </div>

          <div className="space-y-4">
            {steps.map((step, index) => (
              <div
                key={step}
                className="flex gap-4 rounded-[28px] bg-slate-50 p-5 shadow-sm ring-1 ring-slate-200"
              >
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-slate-900 text-sm font-semibold text-white">
                  {index + 1}
                </div>
                <p className="pt-1 text-sm leading-7 text-slate-700">{step}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[#07111f] text-white">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
          <SectionTitle
            eyebrow="Implementação sob medida"
            title="Eu implemento a AgendAI no seu negócio e ajusto o fluxo para sua operação."
            subtitle="A solução pode ser adaptada para captação, atendimento, qualificação, agendamento e integração com WhatsApp, Google Calendar ou CRM, de acordo com o seu processo comercial."
            light
          />

          <div className="mt-10 grid gap-10 lg:grid-cols-[1fr_0.95fr]">
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="rounded-[28px] border border-white/10 bg-white/5 p-5 backdrop-blur">
                <h3 className="text-lg font-semibold">Implementação personalizada</h3>
                <p className="mt-2 text-sm leading-6 text-slate-300">
                  Configuro o fluxo, ajusto as etapas e deixo tudo pronto para o seu atendimento funcionar com mais velocidade e organização.
                </p>
              </div>
              <div className="rounded-[28px] border border-white/10 bg-white/5 p-5 backdrop-blur">
                <h3 className="text-lg font-semibold">Escala com o seu negócio</h3>
                <p className="mt-2 text-sm leading-6 text-slate-300">
                  Depois da base pronta, dá para evoluir com WhatsApp oficial, lembretes, follow-up e integrações extras.
                </p>
              </div>
              <div className="rounded-[28px] border border-white/10 bg-white/5 p-5 backdrop-blur sm:col-span-2">
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="mt-0.5 h-5 w-5 text-emerald-300" />
                  <p className="text-sm leading-7 text-slate-300">
                    Ideal para negócios que querem parar de perder leads por demora e transformar atendimento em agendamento confirmado.
                  </p>
                </div>
              </div>

              <div className="rounded-[28px] border border-white/10 bg-white/5 p-5 backdrop-blur sm:col-span-2">
                <div className="space-y-3">
                  {trustPoints.map((item) => (
                    <div key={item} className="flex items-center gap-3 text-sm text-slate-300">
                      <BadgeCheck className="h-4 w-4 text-emerald-300" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div
              id="contato"
              className="rounded-[2rem] bg-white p-6 text-slate-900 shadow-[0_30px_80px_rgba(0,0,0,0.25)]"
            >
              <div className="flex items-center gap-3">
                <div className="rounded-2xl bg-emerald-100 p-3 text-emerald-700">
                  <MessagesSquare className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="text-2xl font-semibold tracking-tight">
                    Quero ver a AgendAI funcionando no meu negócio
                  </h3>
                  <p className="mt-1 text-sm leading-6 text-slate-500">
                    Preencha abaixo e fale comigo no WhatsApp para entender como isso pode funcionar no seu processo.
                  </p>
                </div>
              </div>

              {successMessage && (
                <div className="mt-5 rounded-2xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-700">
                  {successMessage}
                </div>
              )}

              {errorMessage && (
                <div className="mt-5 rounded-2xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-700">
                  {errorMessage}
                </div>
              )}

              <div className="mt-6 space-y-4">
                <div>
                  <label className="mb-2 block text-sm font-medium text-slate-700">
                    Seu nome
                  </label>
                  <input
                    value={form.nome}
                    onChange={(e) => handleChange("nome", e.target.value)}
                    className="w-full rounded-2xl border border-slate-300 px-4 py-3 outline-none transition focus:border-slate-900"
                    placeholder="Fernando"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm font-medium text-slate-700">
                    Empresa
                  </label>
                  <input
                    value={form.empresa}
                    onChange={(e) => handleChange("empresa", e.target.value)}
                    className="w-full rounded-2xl border border-slate-300 px-4 py-3 outline-none transition focus:border-slate-900"
                    placeholder="Nome do negócio"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm font-medium text-slate-700">
                    WhatsApp
                  </label>
                  <input
                    value={form.whatsapp}
                    onChange={(e) => handleChange("whatsapp", e.target.value)}
                    className="w-full rounded-2xl border border-slate-300 px-4 py-3 outline-none transition focus:border-slate-900"
                    placeholder="62999999999"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm font-medium text-slate-700">
                    Segmento
                  </label>
                  <input
                    value={form.segmento}
                    onChange={(e) => handleChange("segmento", e.target.value)}
                    className="w-full rounded-2xl border border-slate-300 px-4 py-3 outline-none transition focus:border-slate-900"
                    placeholder="Ex: clínica, estúdio, consultoria"
                  />
                </div>

                <button
                  onClick={handleSubmit}
                  disabled={submitting}
                  className="inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-slate-900 px-5 py-3.5 text-sm font-medium text-white transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-60"
                >
                  <PhoneCall className="h-4 w-4" />
                  {submitting
                    ? "Enviando..."
                    : "Quero automatizar meu atendimento agora"}
                </button>

                <a
                  href={whatsappLink}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex w-full items-center justify-center gap-2 rounded-2xl border border-slate-300 bg-white px-5 py-3.5 text-sm font-medium text-slate-700 transition hover:bg-slate-50"
                >
                  <PhoneCall className="h-4 w-4" />
                  Abrir WhatsApp direto
                </a>

                <p className="text-xs leading-6 text-slate-500">
                  Sem compromisso • Demonstração rápida • Primeiros contatos podem receber implantação personalizada.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}