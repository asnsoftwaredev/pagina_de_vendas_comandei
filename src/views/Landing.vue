<template>
  <!-- NAV -->
  <nav :class="{ rolagem: scrolled }">
    <div class="logo">
      <img :src="ComandeiLogo" alt="" />omandei<span class="logo-dot">.</span>
    </div>

    <div class="nav-links">
      <a href="#beneficios">Benefícios</a>
      <a href="#suporte">Suporte</a>
      <a href="#planos">Planos</a>
      <a href="#planos" class="nav-cta">Começar agora</a>
    </div>

    <button
      class="mobile-menu-btn"
      @click="mobileOpen = !mobileOpen"
      :class="{ open: mobileOpen }"
    >
      <span></span><span></span><span></span>
    </button>

    <Transition name="menu">
      <div class="mobile-menu" v-if="mobileOpen">
        <div class="mobile-menu-links">
          <a href="#beneficios" @click="mobileOpen = false">Benefícios</a>
          <a href="#suporte" @click="mobileOpen = false">Suporte</a>
          <a href="#planos" @click="mobileOpen = false">Planos</a>
        </div>
        <a href="#planos" class="nav-cta mobile-cta" @click="mobileOpen = false"
          >Começar agora</a
        >
      </div>
    </Transition>

    <!-- overlay para fechar clicando fora -->
    <Transition name="fade">
      <div
        class="mobile-overlay"
        v-if="mobileOpen"
        @click="mobileOpen = false"
      ></div>
    </Transition>
  </nav>

  <!-- HERO -->
  <section class="hero">
    <div class="hero-eyebrow">Feito para quem trabalha de verdade</div>
    <h1>
      Seu delivery organizado,<br />sem complicação e<br /><em
        >sem taxa por pedido</em
      >
    </h1>
    <p class="hero-sub">
      Tudo que você precisa pra gerenciar seu delivery — pedidos, entregadores,
      bairros, relatórios — num sistema que o seu suporte conhece pelo nome.
    </p>
    <div class="hero-ctas">
      <a href="#planos" class="btn-primary">Quero começar agora</a>
      <a href="#beneficios" class="btn-ghost">Ver como funciona</a>
    </div>
    <p class="hero-note">
      Sem taxa por pedido &nbsp;·&nbsp; Suporte real &nbsp;·&nbsp; Cancele
      quando quiser
    </p>
  </section>

  <!-- PROOF STRIP -->
  <div class="proof-strip">
    <div v-for="item in proofItems" :key="item.label" class="proof-item">
      <svg
        width="16"
        height="16"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        stroke-width="2"
        v-html="item.icon"
      ></svg>
      <span
        ><span class="proof-num">{{ item.num }}</span
        >&nbsp;{{ item.label }}</span
      >
    </div>
  </div>

  <!-- BENEFÍCIOS -->
  <section id="beneficios" class="benefits-section">
    <div class="section-label">O que muda no seu dia a dia</div>
    <h2>Cada parte do negócio<br /><em>sob controle</em></h2>
    <p class="section-desc">
      Não são apenas funcionalidades. É o que você vai parar de se preocupar a
      partir do primeiro acesso.
    </p>
    <div class="benefits-grid">
      <div v-for="b in benefits" :key="b.title" class="benefit-card">
        <div class="benefit-icon" v-html="b.icon"></div>
        <div class="benefit-title">{{ b.title }}</div>
        <p class="benefit-desc">{{ b.desc }}</p>
      </div>
    </div>
  </section>

  <!-- SUPORTE -->
  <div class="support-block" id="suporte">
    <div class="support-inner">
      <div>
        <div class="section-label">Suporte que resolve</div>
        <h2>Quando você trava,<br /><em>a gente desbloqueia</em></h2>
        <p class="section-desc" style="margin-bottom: 0">
          Não tem bot. Não tem fila de 3 dias. Tem uma equipe que conhece o
          sistema e sabe que seu delivery não pode parar.
        </p>
      </div>
      <div class="support-steps">
        <div v-for="step in supportSteps" :key="step.num" class="support-step">
          <div class="step-num">{{ step.num }}</div>
          <div class="step-content">
            <h4>{{ step.title }}</h4>
            <p>{{ step.desc }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>

  <!-- COMPARAÇÃO -->
  <div class="compare-section">
    <div class="compare-inner">
      <div class="compare-part1">
        <div class="compare-label">Faça a conta você mesmo</div>
        <h2 class="compare-h2">
          Clientes comandei<br /><em>pagam zero taxa por pedido!</em>
        </h2>
        <p class="compare-desc">
          Arraste o slider com o volume de pedidos do seu negócio e veja a
          diferença.
        </p>
      </div>
      <div class="compare-part2">
        <div class="form-wrapper">
          <div class="form-label">
            <span>Pedidos por mês</span>
            <strong>{{ pedidos }} pedidos</strong>
          </div>
          <div class="range-track">
            <div
              class="range-fill"
              :style="{ width: rangePercent + '%' }"
            ></div>
            <input
              type="range"
              v-model.number="pedidos"
              min="50"
              max="2000"
              step="50"
            />
          </div>
        </div>
        <div class="compare-stack">
          <div class="compare-card">
            <div class="compare-row them">
              <img :src="GenericoLogo" alt="" class="logo-card" />
              <div class="compare-calc">
                <div class="compare-tag bad">Concorrência</div>
                <div class="calc-row">
                  <span>Taxa por pedido</span><span>R$ 1,99</span>
                </div>
                <div class="calc-row">
                  <span>Mensalidade base</span><span>R$ 79,90</span>
                </div>
                <div class="calc-row total bad-total">
                  <span>Total no mês</span
                  ><span>{{ formatCurrency(themTotal) }}</span>
                </div>
              </div>
            </div>

            <div class="compare-divider">VS</div>

            <div class="compare-row uss">
              <img :src="ComandeiLogo" alt="" class="logo-card" />
              <div class="compare-calc">
                <div class="compare-tag good">Comandei</div>
                <div class="calc-row">
                  <span>Taxa por pedido</span
                  ><span class="teal-text">R$ 0,00</span>
                </div>
                <div class="calc-row">
                  <span>Mensalidade fixa</span><span>R$ 149,90</span>
                </div>
                <div class="calc-row total good-total">
                  <span>Total no mês</span><span>R$ 149,90</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <!-- PLANOS -->
  <div class="plans-section" id="planos">
    <div class="plans-inner">
      <div class="plans-header">
        <div class="section-label" style="text-align: center">
          Simples assim
        </div>
        <h2 style="text-align: center">
          Um preço fixo.<br /><em>Sem surpresa no mês.</em>
        </h2>
        <p
          class="section-desc"
          style="text-align: center; margin: 16px auto 0; max-width: 400px"
        >
          Escolha como prefere pagar. Cancele quando quiser, sem multa e sem
          burocracia.
        </p>
      </div>
      <div class="plans-grid">
        <div
          v-for="plan in plans"
          :key="plan.name"
          :class="['plan-card', { featured: plan.featured }]"
        >
          <div v-if="plan.badge" class="plan-badge">{{ plan.badge }}</div>
          <div class="plan-name">{{ plan.name }}</div>
          <div class="plan-price">
            <span class="plan-currency">R$</span>
            <span class="plan-amount">{{ plan.amount }}</span>
            <span class="plan-period">{{ plan.period }}</span>
          </div>
          <p class="plan-desc">{{ plan.desc }}</p>
          <div v-if="plan.economia" class="plan-economia">
            {{ plan.economia }}
          </div>
          <ul class="plan-features">
            <li v-for="f in plan.features" :key="f">{{ f }}</li>
          </ul>
          <a
            href="#"
            :class="plan.featured ? 'btn-primary' : 'btn-ghost'"
            style="display: block; text-align: center; padding: 14px"
          >
            {{ plan.cta }}
          </a>
        </div>
      </div>
      <p class="plans-note">
        Sem taxa de setup &nbsp;·&nbsp; Sem fidelidade no mensal &nbsp;·&nbsp;
        Nota fiscal incluída
      </p>
    </div>
  </div>

  <!-- DEPOIMENTO -->
  <div class="testimonial-section">
    <div class="testimonial-inner">
      <blockquote>
        Antes eu gastava horas toda semana tentando organizar os pedidos no
        papel. Hoje abro o Comandei e em cinco minutos já sei o que aconteceu no
        dia.
      </blockquote>
      <div class="testimonial-author">
        <div class="author-avatar">MR</div>
        <div class="author-info">
          <div class="author-name">Marcos Rodrigues</div>
          <div class="author-role">
            Dono da Burger do Marcos — Feira de Santana, BA
          </div>
        </div>
      </div>
    </div>
  </div>

  <!-- FAQ -->
  <div class="faq-section">
    <div class="faq-inner">
      <div style="text-align: center; margin-bottom: 48px">
        <div class="section-label" style="text-align: center">
          Perguntas frequentes
        </div>
        <h2 style="text-align: center">
          Tira as dúvidas<br /><em>antes de começar</em>
        </h2>
      </div>
      <div
        v-for="(item, i) in faqs"
        :key="i"
        :class="['faq-item', { open: item.open }]"
      >
        <div class="faq-q" @click="toggleFaq(i)">{{ item.q }}</div>
        <div class="faq-a">{{ item.a }}</div>
      </div>
    </div>
  </div>

  <!-- FINAL CTA -->
  <div class="final-cta">
    <div class="section-label" style="text-align: center">
      Pronto pra começar?
    </div>
    <h2>Seu delivery organizado<br /><em>ainda esta semana</em></h2>
    <p>Cadastro em menos de 5 minutos. Só CNPJ e razão social pra começar.</p>
    <a
      href="#planos"
      class="btn-primary"
      style="font-size: 16px; padding: 16px 44px"
      >Criar minha conta agora</a
    >
  </div>

  <!-- FOOTER -->
  <footer>
    <div class="logo footer-logo" style="font-size: 18px">
      <img :src="ComandeiLogo" alt="" />omandei<span class="logo-dot">.</span>
    </div>
    <p>© 2025 Comandei Delivery. Todos os direitos reservados.</p>
    <div class="footer-links">
      <a href="#">Termos de uso</a>
      <a href="#">Privacidade</a>
      <a href="#">Contato</a>
    </div>
  </footer>
</template>

<script setup>
import { ref, computed, reactive, onMounted, onUnmounted } from "vue";
import ComandeiLogo from "../assets/comandei-logo.png";
import GenericoLogo from "../assets/generico-logo.png";

const pedidos = ref(300);
const themTotal = computed(() => pedidos.value * 1.99 + 79.9);
const economia = computed(() => Math.max(0, themTotal.value - 149.9));

function formatCurrency(val) {
  return "R$ " + val.toFixed(2).replace(".", ",");
}

const rangePercent = computed(() => ((pedidos.value - 50) / (2000 - 50)) * 100);
const scrolled = ref(false);
const mobileOpen = ref(false);

function handleScroll() {
  scrolled.value = window.scrollY > 50;
}

onMounted(() => window.addEventListener("scroll", handleScroll));
onUnmounted(() => window.removeEventListener("scroll", handleScroll));

const faqs = reactive([
  {
    q: "Preciso de treinamento pra usar o sistema?",
    a: "Não. O sistema foi pensado pra quem não tem gerente de TI. Você cria sua conta, cadastra sua empresa com CNPJ e razão social, e já consegue usar. Se tiver dúvida em qualquer passo, o suporte está disponível pra te guiar.",
    open: false,
  },
  {
    q: "Posso cancelar a qualquer momento?",
    a: "Sim. No plano mensal, você cancela quando quiser sem multa e sem burocracia. No plano anual, você tem acesso até o fim do período pago.",
    open: false,
  },
  {
    q: "Funciona no celular?",
    a: "Sim, o sistema é acessível direto pelo navegador do celular, tablet ou computador. Não precisa instalar nada.",
    open: false,
  },
  {
    q: "O sistema tem integração com apps de delivery como iFood?",
    a: "Estamos em desenvolvimento constante de novas integrações. Se você tem uma integração específica que precisa, fale com nosso time — a gente ouve e prioriza conforme a demanda dos clientes.",
    open: false,
  },
  {
    q: "E se eu tiver um problema no meio de uma operação?",
    a: "O suporte funciona em horário comercial e nosso tempo médio de resposta é abaixo de 2 horas. Em casos urgentes durante operação, priorizamos o atendimento.",
    open: false,
  },
]);

function toggleFaq(index) {
  faqs[index].open = !faqs[index].open;
}

const proofItems = [
  {
    num: "+200",
    label: "empresas ativas",
    icon: `<path stroke-linecap="round" stroke-linejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0"/>`,
  },
  {
    num: "<2h",
    label: "tempo médio de resposta",
    icon: `<path stroke-linecap="round" stroke-linejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z"/>`,
  },
  {
    num: "R$ 0",
    label: "de taxa por pedido",
    icon: `<path stroke-linecap="round" stroke-linejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>`,
  },
  {
    num: "Mensal",
    label: "atualizações contínuas",
    icon: `<path stroke-linecap="round" stroke-linejoin="round" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"/>`,
  },
];

const benefits = [
  {
    icon: '<i class="fa-solid fa-motorcycle"></i>',
    title: "Seus motoboys sabem o que fazer",
    desc: "Gerencie entregadores, acompanhe disponibilidade e organize as rotas sem precisar ficar no telefone toda vez que sai um pedido.",
  },
  {
    icon: '<i class="fa-solid fa-map"></i>',
    title: "Cada bairro com seu preço justo",
    desc: "Configure taxas por bairro e saiba exatamente quanto entra em cada entrega. Sem chute, sem prejuízo escondido no frete.",
  },
  {
    icon: '<i class="fa-solid fa-chart-column"></i>',
    title: "O que está vendendo, em dois minutos",
    desc: "Relatório de pedidos com total vendido, produtos mais pedidos e cancelamentos. Decisão com dado, não com achismo.",
  },
  {
    icon: '<i class="fa-solid fa-clock"></i>',
    title: "O cardápio abre e fecha sozinho",
    desc: "Configure seus horários uma vez. O sistema para de receber pedido quando você fecha e volta a aceitar quando abre. Sem pedido chegando fora de hora.",
  },
  {
    icon: '<i class="fa-solid fa-credit-card"></i>',
    title: "Seu cliente paga como quiser",
    desc: "Pix, dinheiro, cartão — você configura quais aceita. Nenhuma venda perdida por falta de opção de pagamento.",
  },
  {
    icon: '<i class="fa-solid fa-plug"></i>',
    title: "Pronto pra crescer com você",
    desc: "Novas integrações entram conforme o mercado pede. Você sugere, a gente ouve, e o sistema evolui junto com o seu negócio.",
  },
];

const supportSteps = [
  {
    num: "01",
    title: "Você abre o chamado",
    desc: "Via chat, WhatsApp ou e-mail — como for mais fácil pra você no momento.",
  },
  {
    num: "02",
    title: "A gente entende o problema",
    desc: "Nada de resposta automática genérica. Alguém lê, entende o contexto e já começa a resolver.",
  },
  {
    num: "03",
    title: "Resolvido com retorno claro",
    desc: "Você sabe o que foi feito, por que aconteceu e o que fazer se aparecer de novo. Sem você ficar no escuro.",
  },
  {
    num: "04",
    title: "Vira melhoria no sistema",
    desc: "Problemas recorrentes entram no roadmap. O que te atrapalhou hoje pode ser resolvido de vez pra todo mundo.",
  },
];

const plans = [
  {
    name: "Mensal",
    amount: "149",
    period: ",90/mês",
    desc: "Ideal pra quem quer testar sem compromisso.",
    featured: false,
    badge: null,
    economia: null,
    cta: "Começar agora",
    features: [
      "Gerenciamento completo de pedidos",
      "Controle de entregadores",
      "Bairros e taxas configuráveis",
      "Relatórios de desempenho",
      "Suporte via chat e WhatsApp",
      "Atualizações incluídas",
    ],
  },
  {
    name: "Anual",
    amount: "119",
    period: ",90/mês",
    desc: "Pague uma vez, use o ano todo com desconto.",
    featured: true,
    badge: "Mais escolhido",
    economia: "Você economiza R$ 359,90 comparado ao mensal",
    cta: "Quero o plano anual",
    features: [
      "Tudo do plano mensal",
      "Prioridade no suporte",
      "Acesso antecipado a novas integrações",
      "Onboarding guiado com a equipe",
    ],
  },
];
</script>
