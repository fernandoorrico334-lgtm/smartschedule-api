import React, { useMemo, useState } from "react";
import {
  ArrowRight,
  Bot,
  CalendarCheck2,
  CheckCircle2,
  Clock3,
  MessageCircleMore,
  PhoneCall,
  ShieldCheck,
  Sparkles,
  Star,
  TrendingUp,
  Zap,
  Building2,
} from "lucide-react";

const API_BASE = import.meta.env.VITE_API_BASE || "http://127.0.0.1:8000";

const metrics = [
  { label: "Resposta imediata", value: "24/7" },
  { label: "Leads qualificados", value: "IA" },
  { label: "Menos atrito", value: "+Agenda" },
];

const benefits = [
  {
    icon: MessageCircleMore,
    title: "Resposta na hora",
    text: "Seu lead recebe retorno imediato, com linguagem profissional e sem depender de alguém parar tudo para responder.",
  },
  {
    icon: Bot,
    title: "Qualificação com IA",
    text: "A AgendAI entende a intenção do cliente, prioriza quem está pronto para fechar e organiza melhor seu atendimento.",
  },
  {
    icon: CalendarCheck2,
    title: "Agendamento sem enrolação",
    text: "Menos troca de mensagens, mais confirmação de horários e menos oportunidades perdidas por demora.",
  },
  {
    icon: TrendingUp,
    title: "Mais conversão",
    text: "A proposta não é só automatizar. É transformar atendimento em agendamento e agendamento em cliente.",
  },
  {
    icon: ShieldCheck,
    title: "Fluxo profissional",
    text: "Seu processo fica mais claro, mais previsível e com uma experiência muito mais premium para o cliente final.",
  },
  {
    icon: Clock3,
    title: "Menos lead perdido",
    text: "Cada minuto sem resposta custa venda. Com a AgendAI, seu negócio responde antes do concorrente.",
  },
];

const segments = [
  "Clínicas e consultórios",
  "Estúdios e personal trainers",
  "Estética e harmonização",
  "Mentorias e consultorias",
  "Imobiliárias e times comerciais",
  "Escritórios e serviços premium",
];

const steps = [
  "O lead chega pelo seu site, anúncio, formulário ou WhatsApp.",
  "A AgendAI responde imediatamente com contexto e clareza.",
  "A IA entende a intenção do contato e ajuda na qualificação.",
  "O sistema conduz para o melhor horário com menos atrito.",
  "Você entra na etapa certa: fechar, atender e converter.",
];

export default function App() {
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
          objetivo: `Lead vindo da landing AgendAI - Segmento: ${
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
    <div className="min-h-screen bg-slate-950 text-white">
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(16,185,129,0.18),transparent_28%),radial-gradient(circle_at_top_right,rgba(59,130,246,0.14),transparent_24%),linear-gradient(180deg,#020617_0%,#07111f_45%,#0f172a_100%)]" />
        <div className="absolute left-0 top-0 h-72 w-72 rounded-full bg-emerald-500/10 blur-3xl" />
        <div className="absolute right-0 top-12 h-80 w-80 rounded-full bg-cyan-400/10 blur-3xl" />

        <div className="relative mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
          <header className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="rounded-2xl border border-white/10 bg-white/5 p-3 backdrop-blur">
                <Sparkles className="h-5 w-5 text-emerald-300" />
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
              className="hidden rounded-2xl border border-white/10 bg-white px-4 py-2.5 text-sm font-medium text-slate-950 transition hover:bg-slate-100 sm:inline-flex"
            >
              Quero ver no meu negócio
            </a>
          </header>

          <div className="grid gap-14 pb-20 pt-12 lg:grid-cols-[1.08fr_0.92fr] lg:items-center lg:pt-16">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full border border-emerald-400/20 bg-emerald-400/10 px-4 py-2 text-sm text-emerald-200 backdrop-blur">
                <Zap className="h-4 w-4" />
                Automatize atendimento, qualificação e agenda
              </div>

              <h1 className="mt-6 max-w-5xl text-4xl font-semibold leading-[1.02] tracking-tight text-white sm:text-5xl lg:text-7xl">
                Seus leads chegam.
                <span className="block text-white/95">A AgendAI responde, qualifica e agenda.</span>
                <span className="block bg-gradient-to-r from-emerald-300 via-emerald-400 to-cyan-300 bg-clip-text text-transparent">
                  Você só fecha.
                </span>
              </h1>

              <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-300 sm:text-xl">
                Pare de perder clientes por demora no atendimento. A AgendAI responde na hora,
                organiza seu fluxo e transforma conversa em agendamento confirmado.
              </p>

              <div className="mt-8 flex flex-col gap-4 sm:flex-row">
                <a
                  href="#contato"
                  className="inline-flex items-center justify-center gap-2 rounded-2xl bg-emerald-400 px-6 py-4 text-base font-semibold text-slate-950 transition hover:bg-emerald-300"
                >
                  Quero automatizar e fechar mais clientes
                  <ArrowRight className="h-4 w-4" />
                </a>
                <a
                  href="#demo"
                  className="inline-flex items-center justify-center rounded-2xl border border-white/10 bg-white/5 px-6 py-4 text-base font-medium text-white transition hover:bg-white/10"
                >
                  Ver demonstração
                </a>
              </div>

              <div className="mt-6 flex flex-wrap gap-4 text-sm text-slate-300">
                <span className="inline-flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-emerald-300" /> Sem compromisso
                </span>
                <span className="inline-flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-emerald-300" /> Demonstração rápida
                </span>
                <span className="inline-flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-emerald-300" /> Implementação personalizada
                </span>
              </div>

              <div className="mt-10 grid gap-4 sm:grid-cols-3">
                {metrics.map((item) => (
                  <div
                    key={item.label}
                    className="rounded-3xl border border-white/10 bg-white/5 p-5 backdrop-blur"
                  >
                    <p className="text-2xl font-semibold text-white">{item.value}</p>
                    <p className="mt-1 text-sm text-slate-400">{item.label}</p>
                  </div>
                ))}
              </div>
            </div>

            <div id="demo" className="relative">
              <div className="absolute -inset-4 rounded-[2rem] bg-emerald-400/10 blur-2xl" />
              <div className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-white/8 p-6 shadow-[0_30px_80px_rgba(0,0,0,0.35)] backdrop-blur-xl">
                <div className="flex items-center justify-between border-b border-white/10 pb-4">
                  <div>
                    <p className="text-xs uppercase tracking-[0.25em] text-slate-400">
                      Demonstração real
                    </p>
                    <h3 className="mt-2 text-2xl font-semibold text-white">
                      Como a AgendAI atua no atendimento
                    </h3>
                  </div>
                  <span className="rounded-full border border-emerald-400/20 bg-emerald-400/10 px-3 py-1 text-xs font-semibold text-emerald-200">
                    IA ativa
                  </span>
                </div>

                <div className="mt-6 grid gap-4 sm:grid-cols-2">
                  <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                    <p className="text-xs uppercase tracking-[0.22em] text-slate-400">Cliente</p>
                    <p className="mt-2 text-lg font-semibold text-white">Fernando</p>
                  </div>
                  <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                    <p className="text-xs uppercase tracking-[0.22em] text-slate-400">Status</p>
                    <p className="mt-2 text-lg font-semibold text-emerald-300">Agendado</p>
                  </div>
                </div>

                <div className="mt-4 flex flex-wrap gap-2">
                  <span className="rounded-full bg-white/10 px-3 py-1 text-xs text-slate-200">
                    Prioridade alta
                  </span>
                  <span className="rounded-full bg-white/10 px-3 py-1 text-xs text-slate-200">
                    Horário sugerido 09:00
                  </span>
                  <span className="rounded-full bg-white/10 px-3 py-1 text-xs text-slate-200">
                    Confirmado 09:00
                  </span>
                </div>

                <div className="mt-6 rounded-3xl border border-white/10 bg-slate-950/70 p-5">
                  <p className="text-xs uppercase tracking-[0.22em] text-slate-400">Resumo</p>
                  <p className="mt-3 text-sm leading-7 text-slate-200">
                    Lead com alta intenção de fechamento, buscando avaliação personalizada e com preferência por atendimento no período da manhã.
                  </p>
                </div>

                <div className="mt-4 rounded-3xl border border-emerald-400/20 bg-emerald-400/10 p-5">
                  <p className="text-xs uppercase tracking-[0.22em] text-emerald-200/80">
                    Mensagem pronta para atendimento
                  </p>
                  <p className="mt-3 text-sm leading-7 text-emerald-100">
                    Olá, Fernando! Recebi seu interesse e já separei um horário às 09:00 para facilitar seu atendimento. Se quiser, posso deixar seu agendamento encaminhado agora mesmo.
                  </p>
                </div>

                <div className="mt-6 grid gap-4 sm:grid-cols-3">
                  <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                    <p className="text-xs text-slate-400">Velocidade</p>
                    <p className="mt-2 text-xl font-semibold text-white">Imediata</p>
                  </div>
                  <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                    <p className="text-xs text-slate-400">Qualificação</p>
                    <p className="mt-2 text-xl font-semibold text-white">Com IA</p>
                  </div>
                  <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                    <p className="text-xs text-slate-400">Pronto para escalar</p>
                    <p className="mt-2 text-xl font-semibold text-white">Sim</p>
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
            {segments.map((item) => (
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

      <section className="bg-slate-50">
        <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <p className="text-sm font-semibold uppercase tracking-[0.25em] text-slate-500">
              Por que a AgendAI vende mais
            </p>
            <h2 className="mt-3 text-3xl font-semibold tracking-tight text-slate-950 sm:text-5xl">
              Mais velocidade. Mais organização. Mais clientes.
            </h2>
            <p className="mt-4 text-lg leading-8 text-slate-600">
              A AgendAI responde em segundos, qualifica automaticamente e reduz a perda de leads que esfriam enquanto você atende manualmente.
            </p>
          </div>

          <div className="mt-10 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {benefits.map((benefit) => {
              const Icon = benefit.icon;
              return (
                <div
                  key={benefit.title}
                  className="rounded-[28px] bg-white p-6 shadow-[0_10px_40px_rgba(15,23,42,0.06)] ring-1 ring-slate-200 transition hover:-translate-y-1 hover:shadow-[0_20px_50px_rgba(15,23,42,0.10)]"
                >
                  <div className="inline-flex rounded-2xl bg-slate-100 p-3">
                    <Icon className="h-5 w-5 text-slate-800" />
                  </div>
                  <h3 className="mt-5 text-lg font-semibold text-slate-950">{benefit.title}</h3>
                  <p className="mt-3 text-sm leading-6 text-slate-600">{benefit.text}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="bg-white">
        <div className="mx-auto grid max-w-7xl gap-12 px-4 py-20 sm:px-6 lg:grid-cols-[0.9fr_1.1fr] lg:px-8">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.25em] text-slate-500">
              Como funciona na prática
            </p>
            <h2 className="mt-3 text-3xl font-semibold tracking-tight text-slate-950 sm:text-5xl">
              Da primeira mensagem até o agendamento confirmado.
            </h2>
            <p className="mt-4 text-lg leading-8 text-slate-600">
              A lógica é simples: responder rápido, qualificar com inteligência e conduzir o lead até a melhor ação comercial.
            </p>
          </div>

          <div className="space-y-4">
            {steps.map((step, index) => (
              <div
                key={step}
                className="flex gap-4 rounded-[28px] bg-slate-50 p-5 shadow-sm ring-1 ring-slate-200"
              >
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-slate-950 text-sm font-semibold text-white">
                  {index + 1}
                </div>
                <p className="pt-1 text-sm leading-7 text-slate-700">{step}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[linear-gradient(180deg,#07111f_0%,#0b1220_100%)] text-white">
        <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
          <div className="grid gap-10 lg:grid-cols-[1fr_0.95fr]">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.25em] text-slate-400">
                Implementação sob medida
              </p>
              <h2 className="mt-3 max-w-3xl text-3xl font-semibold tracking-tight sm:text-5xl">
                Eu implemento a AgendAI no seu negócio e ajusto o fluxo para sua operação.
              </h2>
              <p className="mt-4 max-w-3xl text-lg leading-8 text-slate-300">
                A solução pode ser adaptada para captação, atendimento, qualificação, agendamento e integração com WhatsApp, Google Calendar ou CRM.
              </p>

              <div className="mt-10 grid gap-4 sm:grid-cols-2">
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
                  <div className="space-y-3 text-sm text-slate-300">
                    <div className="flex items-center gap-3">
                      <CheckCircle2 className="h-4 w-4 text-emerald-300" />
                      <span>Sistema pensado para negócios que dependem de agendamento</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <CheckCircle2 className="h-4 w-4 text-emerald-300" />
                      <span>Implementação personalizada conforme sua operação</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <CheckCircle2 className="h-4 w-4 text-emerald-300" />
                      <span>Estrutura com foco em conversão e fechamento</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div
              id="contato"
              className="rounded-[2rem] bg-white p-6 text-slate-900 shadow-[0_30px_80px_rgba(0,0,0,0.25)]"
            >
              <div className="flex items-start gap-3">
                <div className="rounded-2xl bg-emerald-100 p-3 text-emerald-700">
                  <PhoneCall className="h-5 w-5" />
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
                  <label className="mb-2 block text-sm font-medium text-slate-700">Seu nome</label>
                  <input
                    value={form.nome}
                    onChange={(e) => handleChange("nome", e.target.value)}
                    className="w-full rounded-2xl border border-slate-300 px-4 py-3 outline-none transition focus:border-slate-950"
                    placeholder="Fernando"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm font-medium text-slate-700">Empresa</label>
                  <input
                    value={form.empresa}
                    onChange={(e) => handleChange("empresa", e.target.value)}
                    className="w-full rounded-2xl border border-slate-300 px-4 py-3 outline-none transition focus:border-slate-950"
                    placeholder="Nome do negócio"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm font-medium text-slate-700">WhatsApp</label>
                  <input
                    value={form.whatsapp}
                    onChange={(e) => handleChange("whatsapp", e.target.value)}
                    className="w-full rounded-2xl border border-slate-300 px-4 py-3 outline-none transition focus:border-slate-950"
                    placeholder="62999999999"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm font-medium text-slate-700">Segmento</label>
                  <input
                    value={form.segmento}
                    onChange={(e) => handleChange("segmento", e.target.value)}
                    className="w-full rounded-2xl border border-slate-300 px-4 py-3 outline-none transition focus:border-slate-950"
                    placeholder="Ex: clínica, estúdio, consultoria"
                  />
                </div>

                <button
                  onClick={handleSubmit}
                  disabled={submitting}
                  className="inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-slate-950 px-5 py-4 text-sm font-semibold text-white transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-60"
                >
                  <PhoneCall className="h-4 w-4" />
                  {submitting ? "Enviando..." : "Quero automatizar meu atendimento agora"}
                </button>

                <a
                  href={whatsappLink}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex w-full items-center justify-center gap-2 rounded-2xl border border-slate-300 bg-white px-5 py-4 text-sm font-medium text-slate-700 transition hover:bg-slate-50"
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
