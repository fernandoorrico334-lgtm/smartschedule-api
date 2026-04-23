import React, { useMemo, useState } from "react";
import {
  ArrowRight,
  BadgeCheck,
  Bot,
  BrainCircuit,
  Building2,
  CalendarCheck2,
  Clock3,
  PhoneCall,
  Sparkles,
  TrendingUp,
  Users,
  Zap,
} from "lucide-react";

const API_BASE = import.meta.env.VITE_API_BASE || "http://127.0.0.1:8000";

const featureCards = [
  {
    icon: Zap,
    title: "Responde na hora",
    text: "Atenda instantaneamente seus leads e nunca mais perca oportunidades por demora.",
  },
  {
    icon: BrainCircuit,
    title: "Qualifica com IA",
    text: "Entenda o interesse do lead, colete contexto e priorize quem realmente importa.",
  },
  {
    icon: CalendarCheck2,
    title: "Agenda automaticamente",
    text: "Sugere os melhores horários e conduz o lead até a confirmação com menos atrito.",
  },
  {
    icon: Clock3,
    title: "Funciona 24h por dia",
    text: "Sua empresa continua atendendo mesmo fora do horário comercial e nos finais de semana.",
  },
];

const stats = [
  { value: "+80%", label: "Mais agendamentos", icon: TrendingUp },
  { value: "-70%", label: "Tempo de resposta", icon: Clock3 },
  { value: "24H", label: "Atendimento contínuo", icon: Bot },
  { value: "+1000", label: "Empresas atendidas", icon: Users },
];

const proofList = [
  "Atendimento humanizado com IA avançada",
  "Respostas rápidas e precisas",
  "Informações organizadas e seguras",
  "Integração com seu fluxo atual",
];

const footerProduct = ["Funcionalidades", "Benefícios", "Preços"];
const footerCompany = ["Sobre nós", "Depoimentos", "Contato"];
const footerLegal = ["Política de Privacidade", "Termos de Uso"];

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
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          nome: form.nome || "Lead da landing",
          whatsapp: form.whatsapp || "62999999999",
          objetivo: `Lead vindo da landing AgendAI - Segmento: ${
            form.segmento || "não informado"
          } - Empresa: ${form.empresa || "não informada"}`,
          preferencia_horario: "qualquer",
        }),
      });

      if (!response.ok) throw new Error("Falha ao enviar lead.");

      setSuccessMessage(
        "Perfeito. Seus dados foram enviados. Você será redirecionado para o WhatsApp."
      );

      setTimeout(() => {
        window.location.href = whatsappLink;
      }, 900);
    } catch (error) {
      console.error(error);
      setErrorMessage(
        "Não foi possível enviar automaticamente agora. Você ainda pode abrir o WhatsApp e falar comigo direto."
      );
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#030712] text-white" lang="pt-BR">
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 cinematic-hero-bg" />
        <div className="absolute inset-0 cyber-grid opacity-30" />
        <div className="absolute inset-0 skyline-overlay opacity-45" />
        <div className="absolute left-[-8%] top-0 h-[24rem] w-[24rem] rounded-full bg-cyan-400/10 blur-3xl sm:h-[34rem] sm:w-[34rem]" />
        <div className="absolute right-[-6%] top-10 h-[24rem] w-[24rem] rounded-full bg-pink-500/10 blur-3xl sm:h-[34rem] sm:w-[34rem]" />
        <div className="absolute bottom-0 left-0 h-32 w-full bg-gradient-to-t from-[#030712] to-transparent sm:h-40" />

        <div className="relative mx-auto max-w-7xl px-4 py-6 sm:px-6 sm:py-8 lg:px-8">
          <header className="flex items-center justify-between gap-4">
            <div className="flex min-w-0 items-center gap-3">
              <div className="brand-chip rounded-2xl p-2.5 sm:p-3">
                <Sparkles className="h-5 w-5 text-cyan-300" />
              </div>
              <div className="min-w-0">
                <p className="truncate text-2xl font-semibold tracking-tight text-white sm:text-[1.8rem]">
                  AgendAI
                </p>
                <p className="max-w-[180px] text-xs text-slate-400 sm:max-w-none sm:text-sm">
                  Automação inteligente de atendimento e agendamento
                </p>
              </div>
            </div>

            <nav className="hidden items-center gap-6 text-sm uppercase tracking-wide text-slate-300 lg:flex xl:gap-8">
              <a href="#funcionalidades" className="hover:text-white">
                Funcionalidades
              </a>
              <a href="#beneficios" className="hover:text-white">
                Benefícios
              </a>
              <a href="#depoimentos" className="hover:text-white">
                Depoimentos
              </a>
              <a href="#precos" className="hover:text-white">
                Preços
              </a>
              <a href="#contato" className="hover:text-white">
                Contato
              </a>
            </nav>

            <a
              href="#contato"
              className="cta-cyber-top hidden text-sm font-semibold text-white sm:inline-flex"
            >
              Quero uma demonstração
            </a>
          </header>

          <div className="grid gap-10 pt-10 pb-14 sm:gap-12 sm:pt-14 sm:pb-18 lg:grid-cols-[0.95fr_1.05fr] lg:items-start lg:gap-16 lg:pt-16">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full border border-cyan-400/28 bg-cyan-400/10 px-3 py-2 text-xs text-cyan-200 sm:px-4 sm:text-sm">
                <Zap className="h-4 w-4" />
                Automação inteligente de atendimento
              </div>

              <h1 className="mt-6 max-w-5xl font-orbitron text-[2.6rem] font-bold uppercase leading-[0.95] text-white sm:mt-8 sm:text-5xl lg:text-[4.5rem]">
                Seus leads chegam.
                <span className="mt-2 block text-white">
                  A <span className="neon-pink">AgendAI</span> responde,
                </span>
                <span className="mt-2 block text-white">qualifica e agenda.</span>
                <span className="mt-2 block neon-pink">Você só fecha.</span>
              </h1>

              <p className="mt-6 max-w-2xl text-base leading-7 text-slate-300 sm:mt-8 sm:text-lg sm:leading-8">
                Pare de perder clientes por demora no atendimento. A AgendAI responde
                na hora, organiza seu fluxo e transforma conversa em agendamento confirmado.
              </p>

              <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:gap-4">
                <a
                  href="#contato"
                  className="cta-pink-tech w-full text-center text-sm font-semibold text-white sm:w-auto sm:text-base"
                >
                  Quero automatizar e fechar mais clientes
                  <ArrowRight className="h-4 w-4" />
                </a>

                <a
                  href="#demo"
                  className="cta-cyan-tech w-full text-center text-sm font-semibold text-cyan-200 sm:w-auto sm:text-base"
                >
                  Ver demonstração na prática
                </a>
              </div>

              <div className="mt-5 flex flex-wrap gap-2 sm:mt-6 sm:gap-3">
                <span className="mini-chip text-[10px] uppercase tracking-wide text-slate-300 sm:text-xs">
                  Sem compromisso
                </span>
                <span className="mini-chip text-[10px] uppercase tracking-wide text-slate-300 sm:text-xs">
                  Demonstração rápida
                </span>
                <span className="mini-chip text-[10px] uppercase tracking-wide text-slate-300 sm:text-xs">
                  Implementação personalizada
                </span>
              </div>
            </div>

            <div id="demo" className="relative">
              <div className="absolute -inset-4 rounded-[2.2rem] bg-cyan-400/10 blur-3xl" />
              <div className="demo-shell relative">
                <div className="demo-corners" />

                <div className="mb-5 flex items-start justify-between gap-4 border-b border-cyan-400/12 pb-4">
                  <div>
                    <p className="font-orbitron text-[10px] uppercase tracking-[0.24em] text-pink-300 sm:text-xs sm:tracking-[0.28em]">
                      Demonstração real
                    </p>
                    <h3 className="mt-2 text-[1.5rem] font-semibold leading-tight text-white sm:text-[1.95rem]">
                      Como a AgendAI atua no atendimento
                    </h3>
                  </div>
                  <span className="status-chip shrink-0">IA ativa</span>
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="demo-box p-4">
                    <p className="font-orbitron text-[10px] uppercase tracking-[0.18em] text-slate-400 sm:text-[11px] sm:tracking-[0.22em]">
                      Cliente
                    </p>
                    <p className="mt-2 text-base font-semibold text-white sm:text-lg">
                      Fernando
                    </p>
                  </div>

                  <div className="demo-box p-4">
                    <p className="font-orbitron text-[10px] uppercase tracking-[0.18em] text-slate-400 sm:text-[11px] sm:tracking-[0.22em]">
                      Status
                    </p>
                    <p className="mt-2 text-base font-semibold text-cyan-300 sm:text-lg">
                      Agendado
                    </p>
                  </div>
                </div>

                <div className="mt-4 flex flex-wrap gap-2">
                  <span className="pill pill-pink">Prioridade: alta</span>
                  <span className="pill pill-cyan">Sugerido: 09:00</span>
                  <span className="pill pill-cyan">Confirmado: 09:00</span>
                </div>

                <div className="demo-chat mt-5">
                  <div className="flex items-center justify-between gap-3">
                    <div className="flex items-center gap-2">
                      <div className="rounded-full bg-cyan-400/14 p-2">
                        <Bot className="h-4 w-4 text-cyan-300" />
                      </div>
                      <span className="text-[10px] uppercase tracking-[0.18em] text-slate-400 sm:text-[11px] sm:tracking-[0.22em]">
                        AgendAI AI
                      </span>
                    </div>
                    <span className="text-[11px] text-slate-500 sm:text-xs">08:42</span>
                  </div>

                  <p className="mt-4 text-sm leading-7 text-slate-100 sm:text-[15px] sm:leading-8">
                    Olá, Fernando! Recebi seu interesse e já separei um horário às 09:00
                    para facilitar seu atendimento. Se quiser, posso deixar seu agendamento
                    encaminhado agora mesmo.
                  </p>

                  <div className="mt-6 border-t border-white/8 pt-4">
                    <span className="text-[10px] uppercase tracking-[0.18em] text-slate-500 sm:text-[11px] sm:tracking-[0.22em]">
                      Fernando
                    </span>
                    <p className="mt-2 text-sm text-white sm:text-[15px]">
                      Perfeito! Pode confirmar.
                    </p>
                  </div>
                </div>

                <div className="mt-6 grid gap-3 sm:grid-cols-3 sm:gap-4">
                  <div className="demo-stat p-4 text-center">
                    <p className="text-[11px] text-slate-400 sm:text-xs">Velocidade</p>
                    <p className="mt-2 text-lg font-semibold text-white sm:text-xl">
                      Imediata
                    </p>
                  </div>
                  <div className="demo-stat p-4 text-center">
                    <p className="text-[11px] text-slate-400 sm:text-xs">Qualificação</p>
                    <p className="mt-2 text-lg font-semibold text-white sm:text-xl">
                      Com IA
                    </p>
                  </div>
                  <div className="demo-stat p-4 text-center">
                    <p className="text-[11px] text-slate-400 sm:text-xs">Atendimento</p>
                    <p className="mt-2 text-lg font-semibold text-white sm:text-xl">
                      24h por dia
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div id="beneficios" className="pt-4 sm:pt-8">
            <p className="font-orbitron text-center text-xs uppercase tracking-[0.24em] text-cyan-300 sm:text-sm sm:tracking-[0.28em]">
              Atendimento automático que gera resultados
            </p>
            <h2 className="mt-4 text-center font-orbitron text-2xl font-bold uppercase tracking-tight text-white sm:text-5xl">
              Mais agendamentos. Mais vendas. Menos trabalho.
            </h2>

            <div className="mt-8 grid gap-4 sm:mt-10 md:grid-cols-2 xl:grid-cols-4 xl:gap-5">
              {featureCards.map((item) => {
                const Icon = item.icon;
                return (
                  <div key={item.title} className="cyber-card p-5 sm:p-6">
                    <div className="inline-flex rounded-2xl border border-pink-500/25 bg-pink-500/10 p-3">
                      <Icon className="h-5 w-5 text-pink-300" />
                    </div>
                    <h3 className="mt-5 font-orbitron text-base font-semibold uppercase text-white sm:text-lg">
                      {item.title}
                    </h3>
                    <p className="mt-3 text-sm leading-7 text-slate-300">{item.text}</p>
                  </div>
                );
              })}
            </div>

            <div className="tech-panel-cyan sci-metric-bar mt-8 p-5 sm:p-6">
              <div className="grid gap-5 sm:gap-6 md:grid-cols-2 xl:grid-cols-4">
                {stats.map((item) => {
                  const Icon = item.icon;
                  return (
                    <div key={item.label} className="flex items-center gap-4">
                      <div className="rounded-2xl border border-cyan-400/20 bg-cyan-400/10 p-3">
                        <Icon className="h-5 w-5 text-cyan-300" />
                      </div>
                      <div>
                        <p className="font-orbitron text-2xl font-bold text-pink-300 sm:text-3xl">
                          {item.value}
                        </p>
                        <p className="text-sm text-slate-300">{item.label}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="funcionalidades" className="bg-[#030712]">
        <div className="mx-auto grid max-w-7xl gap-10 px-4 py-16 sm:px-6 sm:py-20 lg:grid-cols-[0.92fr_1.08fr] lg:gap-12 lg:px-8">
          <div className="phone-shell">
            <div className="phone-screen">
              <div className="flex items-center justify-between border-b border-white/8 pb-3">
                <div>
                  <p className="text-sm font-semibold text-white">AgendAI</p>
                  <p className="text-xs text-slate-400">Online</p>
                </div>
                <div className="flex gap-2">
                  <div className="h-2 w-2 rounded-full bg-cyan-300" />
                  <div className="h-2 w-2 rounded-full bg-pink-400" />
                </div>
              </div>

              <div className="mt-4 space-y-3 text-sm">
                <div className="bubble-left">
                  Olá! Vi que você tem interesse em nossos serviços. Como posso te ajudar hoje?
                </div>
                <div className="bubble-right">Quero saber mais sobre os planos</div>
                <div className="bubble-left">
                  Ótimo! Para te passar as melhores opções, qual é o seu principal objetivo com a automação?
                </div>
                <div className="bubble-right">Quero mais agendamentos</div>
                <div className="bubble-left">
                  Perfeito! Já separei um horário com nosso especialista para te mostrar como funciona na prática. Qual dia e horário prefere?
                </div>
                <div className="bubble-right">Amanhã às 09:00</div>
                <div className="bubble-left">
                  Agendamento confirmado para amanhã às 09:00.
                </div>
              </div>
            </div>
          </div>

          <div id="depoimentos" className="flex flex-col justify-center">
            <p className="font-orbitron text-xs uppercase tracking-[0.24em] text-cyan-300 sm:text-sm sm:tracking-[0.28em]">
              Experiência que encanta
            </p>
            <h2 className="mt-3 font-orbitron text-2xl font-bold uppercase tracking-tight text-white sm:text-5xl">
              Seus clientes têm uma experiência incrível.
              <span className="block neon-pink">Sua empresa, resultados reais.</span>
            </h2>
            <p className="mt-5 max-w-2xl text-base leading-7 text-slate-300 sm:text-lg sm:leading-8">
              A AgendAI oferece um atendimento rápido, personalizado e eficiente, que gera confiança e aumenta suas conversões.
            </p>

            <div className="mt-8 space-y-4">
              {proofList.map((item) => (
                <div key={item} className="flex items-center gap-3 text-slate-200">
                  <BadgeCheck className="h-5 w-5 shrink-0 text-cyan-300" />
                  <span>{item}</span>
                </div>
              ))}
            </div>

            <div className="tech-panel-pink sci-proof-panel mt-10 p-5 sm:p-6">
              <div className="grid gap-6 md:grid-cols-[1fr_auto] md:items-center">
                <div>
                  <div className="flex -space-x-3">
                    <div className="avatar-chip">F</div>
                    <div className="avatar-chip">M</div>
                    <div className="avatar-chip">R</div>
                    <div className="avatar-chip">A</div>
                  </div>
                  <p className="mt-4 font-orbitron text-base font-semibold uppercase text-white sm:text-lg">
                    +1000 empresas já transformaram seus resultados
                  </p>
                  <p className="mt-2 text-sm leading-6 text-slate-300">
                    Negócios que dependem de resposta rápida e agendamento já usam fluxos mais inteligentes para vender melhor.
                  </p>
                </div>

                <a
                  href="#contato"
                  className="cta-pink-tech w-full text-center text-sm font-semibold text-white md:w-auto"
                >
                  Quero ver no meu negócio
                  <ArrowRight className="h-4 w-4" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-[linear-gradient(180deg,#030712_0%,#07111f_100%)] text-white">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
          <div className="tech-panel-cyan sci-proof-panel p-5 sm:p-6 md:p-8">
            <div className="grid gap-8 lg:grid-cols-[1fr_auto] lg:items-center">
              <div className="flex items-start gap-4 sm:gap-5">
                <div className="rounded-[20px] border border-cyan-400/20 bg-cyan-400/10 p-3 sm:rounded-[24px] sm:p-4">
                  <CalendarCheck2 className="h-7 w-7 text-cyan-300 sm:h-8 sm:w-8" />
                </div>
                <div>
                  <h2 className="max-w-3xl text-2xl font-semibold tracking-tight text-white sm:text-4xl">
                    Pronto para transformar seu atendimento e aumentar seus resultados?
                  </h2>
                  <p className="mt-4 max-w-2xl text-base leading-7 text-slate-300 sm:text-lg sm:leading-8">
                    Solicite uma demonstração gratuita e veja a AgendAI funcionando no seu negócio.
                  </p>
                </div>
              </div>

              <div className="flex flex-col items-start gap-4 lg:items-end">
                <a
                  href="#contato"
                  className="cta-pink-tech w-full text-center text-sm font-semibold text-white sm:w-auto"
                >
                  Quero ver no meu negócio
                  <ArrowRight className="h-4 w-4" />
                </a>

                <div className="flex items-center gap-3">
                  <div className="flex -space-x-3">
                    <div className="avatar-chip">F</div>
                    <div className="avatar-chip">J</div>
                    <div className="avatar-chip">A</div>
                    <div className="avatar-chip">M</div>
                  </div>
                  <p className="text-sm text-slate-300">
                    +1000 empresas já transformaram seus resultados
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-14 grid gap-10 lg:mt-16 lg:grid-cols-[1fr_0.95fr]">
            <div>
              <p className="font-orbitron text-xs uppercase tracking-[0.24em] text-pink-300 sm:text-sm sm:tracking-[0.28em]">
                Implementação sob medida
              </p>
              <h2 className="mt-3 max-w-3xl font-orbitron text-2xl font-bold uppercase tracking-tight sm:text-5xl">
                Eu implemento a AgendAI no seu negócio e ajusto o fluxo para sua operação.
              </h2>
              <p className="mt-5 max-w-3xl text-base leading-7 text-slate-300 sm:text-lg sm:leading-8">
                A solução pode ser adaptada para captação, atendimento, qualificação, agendamento e integração com WhatsApp, Google Calendar ou CRM.
              </p>

              <div className="mt-8 grid gap-4 sm:mt-10 sm:grid-cols-2">
                {[
                  "Clínicas e consultórios",
                  "Estúdios e personal trainers",
                  "Estética e harmonização",
                  "Mentorias e consultorias",
                  "Imobiliárias e times comerciais",
                  "Escritórios e serviços premium",
                ].map((item) => (
                  <div
                    key={item}
                    className="cyber-card flex items-center gap-3 px-4 py-4"
                  >
                    <Building2 className="h-4 w-4 shrink-0 text-cyan-300" />
                    <span className="text-sm text-slate-200">{item}</span>
                  </div>
                ))}
              </div>
            </div>

            <div
              id="contato"
              className="rounded-[2rem] border border-pink-500/20 bg-white p-5 text-slate-900 shadow-[0_30px_80px_rgba(0,0,0,0.25)] sm:p-6"
            >
              <div className="flex items-start gap-3">
                <div className="rounded-2xl bg-pink-100 p-3 text-pink-700">
                  <PhoneCall className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold tracking-tight sm:text-2xl">
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
                    className="w-full rounded-2xl border border-slate-300 px-4 py-3 outline-none transition focus:border-pink-500"
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
                    className="w-full rounded-2xl border border-slate-300 px-4 py-3 outline-none transition focus:border-pink-500"
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
                    className="w-full rounded-2xl border border-slate-300 px-4 py-3 outline-none transition focus:border-pink-500"
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
                    className="w-full rounded-2xl border border-slate-300 px-4 py-3 outline-none transition focus:border-pink-500"
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

      <footer className="border-t border-white/10 bg-[#020617]">
        <div className="mx-auto grid max-w-7xl gap-8 px-4 py-10 sm:px-6 sm:py-12 md:grid-cols-2 lg:grid-cols-4 lg:gap-10 lg:px-8">
          <div>
            <p className="text-2xl font-semibold text-cyan-300">AgendAI</p>
            <p className="mt-3 text-sm leading-6 text-slate-400">
              Automação inteligente de atendimento e agendamento.
            </p>
          </div>

          <div>
            <p className="font-orbitron text-sm uppercase tracking-[0.22em] text-slate-300">
              Produto
            </p>
            <ul className="mt-4 space-y-2 text-sm text-slate-400">
              {footerProduct.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>

          <div>
            <p className="font-orbitron text-sm uppercase tracking-[0.22em] text-slate-300">
              Empresa
            </p>
            <ul className="mt-4 space-y-2 text-sm text-slate-400">
              {footerCompany.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>

          <div>
            <p className="font-orbitron text-sm uppercase tracking-[0.22em] text-slate-300">
              Legal
            </p>
            <ul className="mt-4 space-y-2 text-sm text-slate-400">
              {footerLegal.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>

            <div className="cyber-card mt-6 p-4 text-sm text-slate-300">
              Feito para negócios que não podem perder tempo.
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}