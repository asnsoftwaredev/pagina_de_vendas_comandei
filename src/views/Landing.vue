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
          >Comprar agora</a
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

  <!-- POPUP -->
  <Transition name="popup">
    <div
      class="popup-overlay"
      v-if="popupVisible"
      @click.self="popupVisible = false"
    >
      <div class="popup">
        <button class="popup-close" @click="popupVisible = false">
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M18 6L6 18M6 6l12 12"
            />
          </svg>
        </button>

        <div class="popup-badge">Oferta por tempo limitado</div>

        <div class="popup-body">
          <p class="popup-pre">Plano Anual com</p>
          <div class="popup-discount">20% OFF</div>
          <div class="popup-price-row">
            <span class="popup-from">De <s>R$ 149,90</s></span>
            <div class="popup-price">
              <span class="popup-currency">R$</span>
              <span class="popup-amount">119</span>
              <span class="popup-period">,90/mês</span>
            </div>
          </div>
          <p class="popup-sub">
            Pague uma vez, use o ano todo. Cancele quando quiser.
          </p>
        </div>

        <div class="popup-timer">
          <span class="timer-label">Oferta expira em</span>
          <div class="timer-blocks">
            <div class="timer-block">
              <span class="timer-num">{{ timerDisplay.h }}</span>
              <span class="timer-unit">h</span>
            </div>
            <span class="timer-sep">:</span>
            <div class="timer-block">
              <span class="timer-num">{{ timerDisplay.m }}</span>
              <span class="timer-unit">min</span>
            </div>
            <span class="timer-sep">:</span>
            <div class="timer-block">
              <span class="timer-num">{{ timerDisplay.s }}</span>
              <span class="timer-unit">seg</span>
            </div>
          </div>
        </div>

        <a
          :href="featuredPlan.checkoutUrl"
          class="btn-primary popup-cta"
          @click="popupVisible = false"
        >
          Quero o plano anual agora
        </a>
        <button class="popup-skip" @click="popupVisible = false">
          Não, prefiro pagar mais caro
        </button>
      </div>
    </div>
  </Transition>

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
      <a href="#planos" class="btn-primary">Quero comprar agora</a>
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
            <div v-if="plan.precoOriginal" class="plan-price-from">
              De <s>R$ {{ plan.precoOriginal }}</s>
            </div>
            <div class="plan-price-main">
              <span class="plan-currency">R$</span>
              <span class="plan-amount">{{ plan.amount }}</span>
              <span class="plan-period">{{ plan.period }}</span>
            </div>
          </div>
          <p class="plan-desc">{{ plan.desc }}</p>
          <div v-if="plan.economia" class="plan-economia">
            {{ plan.economia }}
          </div>
          <ul class="plan-features">
            <li v-for="f in plan.features" :key="f">{{ f }}</li>
          </ul>
          <a
            :href="plan.checkoutUrl"
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

  <Transition name="fade">
    <button
      class="popup-reopen"
      v-if="popupShown && !popupVisible"
      @click="popupVisible = true"
    >
      <svg
        width="16"
        height="16"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="2"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          d="M7 7h10M7 12h10M7 17h6"
        />
      </svg>
      <span>Ver oferta</span>
      <div class="popup-reopen-badge">20% OFF</div>
    </button>
  </Transition>
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

onMounted(() => {
  window.addEventListener("scroll", handleScroll);
  window.addEventListener("scroll", handleScrollPopup);
  carregarPlanos();
});
onUnmounted(() => {
  window.removeEventListener("scroll", handleScroll);
  window.removeEventListener("scroll", handleScrollPopup);
  clearInterval(timerInterval);
});

// ── POPUP ─────────────────────────────────────────────────────────────────
const popupVisible = ref(false);
const popupShown = ref(false);

const timerSeconds = ref(5580);
let timerInterval = null;

const timerDisplay = computed(() => {
  const h = Math.floor(timerSeconds.value / 3600);
  const m = Math.floor((timerSeconds.value % 3600) / 60);
  const s = timerSeconds.value % 60;
  return {
    h: String(h).padStart(2, "0"),
    m: String(m).padStart(2, "0"),
    s: String(s).padStart(2, "0"),
  };
});

function startTimer() {
  timerInterval = setInterval(() => {
    if (timerSeconds.value > 0) {
      timerSeconds.value--;
    } else {
      clearInterval(timerInterval);
    }
  }, 1000);
}

function handleScrollPopup() {
  if (!popupShown.value && window.scrollY > 4000) {
    popupVisible.value = true;
    popupShown.value = true;
    startTimer();
    window.removeEventListener("scroll", handleScrollPopup);
  }
}

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

const plans = reactive([
  {
    name: "Mensal",
    amount: "149",
    period: ",90/mês",
    desc: "Ideal pra quem quer testar sem compromisso.",
    featured: false,
    badge: null,
    economia: null,
    cta: "Começar agora",
    checkoutUrl: "#planos",
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
    checkoutUrl: "#planos",
    features: [
      "Tudo do plano mensal",
      "Prioridade no suporte",
      "Acesso antecipado a novas integrações",
      "Onboarding guiado com a equipe",
    ],
  },
]);

const featuredPlan = computed(
  () => plans.find((p) => p.featured) ?? plans[plans.length - 1]
);

function formatPrice(preco) {
  const [int, dec] = preco.toFixed(2).split(".");
  return { amount: int, period: (dec === "00" ? "" : `,${dec}`) + "/mês" };
}

function formatPrecoFull(preco) {
  const [int, dec] = preco.toFixed(2).split(".");
  return dec === "00" ? int : `${int},${dec}`;
}

function buildFeatures(p) {
  const features = (p.recursos || "")
    .split(/[\r\n,]+/)
    .map((f) => f.trim())
    .filter(Boolean);
  if (p.limiteTerminais > 0) {
    const t = p.limiteTerminais;
    features.unshift(`Até ${t} terminal${t > 1 ? "is" : ""} incluído${t > 1 ? "s" : ""}`);
  }
  if (p.precoPorTerminal > 0) {
    features.push(`+ R$ ${formatPrecoFull(p.precoPorTerminal)} por terminal adicional`);
  }
  return features;
}

async function carregarPlanos() {
  try {
    const res = await fetch("/api-planos/planos/search?sistemaNome=COMANDEI%20DELIVERY");
    if (!res.ok) return;
    const data = await res.json();
    const apiPlanos = (data.content || [])
      .filter((p) => p.ativo)
      .sort((a, b) => a.duracaoDias - b.duracaoDias || a.sequencia - b.sequencia);

    if (!apiPlanos.length) return;

    const maxDuracao = Math.max(...apiPlanos.map((p) => p.duracaoDias));

    const mensal = apiPlanos.find((p) => p.duracaoDias <= 31);
    const anual = apiPlanos.find((p) => p.duracaoDias >= 360);
    let economiaAnual = null;
    if (mensal && anual && anual.preco < mensal.preco) {
      const diff = (mensal.preco - anual.preco) * 12;
      economiaAnual = `Você economiza R$ ${diff.toFixed(2).replace(".", ",")} comparado ao mensal`;
    }

    const mapped = apiPlanos.map((p) => {
      const precoExibido = p.precoPromocional > 0 ? p.precoPromocional : p.preco;
      const { amount, period } = formatPrice(precoExibido);
      const precoOriginal = p.precoPromocional > 0 ? formatPrecoFull(p.preco) : null;
      const isFeatured = p.duracaoDias === maxDuracao;
      return {
        name: p.nome,
        amount,
        period,
        precoOriginal,
        desc: p.descricao,
        featured: isFeatured,
        badge: isFeatured ? "Mais escolhido" : null,
        economia: isFeatured ? economiaAnual : null,
        cta: isFeatured ? "Quero este plano" : "Começar agora",
        checkoutUrl: "https://crm.asnsoftware.com.br/checkout?plano=" + p.id,
        features: buildFeatures(p),
      };
    });

    plans.splice(0, plans.length, ...mapped);
  } catch (e) {
    console.error("Erro ao carregar planos:", e);
  }
}
</script>
