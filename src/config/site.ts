/**
 * ============================================================================
 *  CONFIGURAÇÃO CENTRAL DA LANDING PAGE — ARIANE CARVALHO
 * ============================================================================
 *  Quase tudo o que precisa ser editado no dia a dia está neste arquivo:
 *  contatos, WhatsApp, endereço, serviços, faixas etárias, fotos, formação,
 *  depoimentos e redes sociais.
 *
 *  Regras de ouro:
 *  - Não publique informação que não foi confirmada pela Ariane.
 *  - Campos marcados como PENDENTE ficam vazios de propósito: enquanto
 *    estiverem vazios, nada aparece na página.
 *  - Configuração de analytics / Google Ads fica em `tracking.ts`.
 * ============================================================================
 */

/* -------------------------------------------------------------------------- */
/*  Profissional                                                              */
/* -------------------------------------------------------------------------- */
export const professional = {
  name: 'Ariane Carvalho',
  firstName: 'Ariane',
  profession: 'Terapeuta Ocupacional',
  registry: 'CREFITO 26101-TO',
  yearsOfPractice: 3,
  /** Formações confirmadas. Edite/adicione itens conforme comprovação. */
  education: [
    { title: 'Graduação em Terapia Ocupacional', detail: '' },
    { title: 'Pós-graduação em Neuropsicologia', detail: '' },
    { title: 'Formação em Análise do Comportamento Aplicada (ABA)', detail: '' },
  ],
  /** Áreas de atuação (sem caráter de título de especialista). */
  focusAreas: [
    'Desenvolvimento infantil',
    'Funções executivas',
    'Habilidades sociais',
    'Autonomia e participação ocupacional',
  ],
};

/* -------------------------------------------------------------------------- */
/*  Contato e WhatsApp                                                        */
/* -------------------------------------------------------------------------- */
export const contact = {
  /** Apenas dígitos, com DDI + DDD. */
  whatsappNumber: '5541991470015',
  whatsappDisplay: '+55 (41) 99147-0015',
  /** Mensagem usada pelos botões genéricos (cabeçalho, CTA final, barra fixa). */
  defaultMessage:
    'Olá! Conheci o trabalho da Ariane Carvalho pelo site e gostaria de informações sobre os atendimentos.',
  /** PENDENTE — deixe vazio para não exibir. */
  email: '',
};

export const social = {
  instagram: {
    handle: '@arianecarvalho.to',
    url: 'https://www.instagram.com/arianecarvalho.to/',
  },
  /** PENDENTE — preencha a URL para exibir. */
  facebook: '',
};

/* -------------------------------------------------------------------------- */
/*  Local de atendimento                                                      */
/* -------------------------------------------------------------------------- */
export const location = {
  clinicName: 'Clínica Jardim da Mente',
  /** Endereço exatamente como informado. Não acrescentar sala/complemento sem confirmação. */
  addressLine: 'Shopping Tirol, Rua Blumenau, 449-257',
  city: 'Eusébio',
  state: 'CE',
  stateName: 'Ceará',
  country: 'BR',
  mapsUrl: 'https://maps.app.goo.gl/LP9egheBPxgThH3b6',
  /** Mapa incorporado, carregado apenas quando a pessoa clica em "Ver mapa". */
  mapsEmbedUrl:
    'https://www.google.com/maps?q=Shopping+Tirol,+Rua+Blumenau,+449,+Eus%C3%A9bio,+CE&output=embed',
};

/* -------------------------------------------------------------------------- */
/*  Empresa (rodapé) — PENDENTE: preencher somente se necessário              */
/* -------------------------------------------------------------------------- */
export const business = {
  legalName: '',
  cnpj: '',
};

/* -------------------------------------------------------------------------- */
/*  Fotografias                                                               */
/* -------------------------------------------------------------------------- */
/**
 * Coloque os arquivos em `src/assets/fotos/` e informe aqui somente o nome
 * do arquivo (ex.: 'ariane-hero.jpg'). Formatos: jpg, jpeg, png, webp ou avif.
 * O site gera automaticamente versões otimizadas (AVIF/WebP) em vários tamanhos.
 *
 * Enquanto `file` estiver vazio:
 *  - na versão pública, o espaço da foto é omitido de forma elegante;
 *  - em desenvolvimento e nas prévias do Netlify, aparece um marcador
 *    identificado com a proporção recomendada.
 */
export const photos = {
  hero: {
    /* PROVISÓRIA: recorte (sem alteração) do cartaz "Vivência IPD", baixa resolução.
       Substituir por retrato profissional em alta resolução assim que disponível. */
    file: 'ariane-provisoria-cartaz-ipd.png',
    alt: 'Ariane Carvalho, terapeuta ocupacional, sorrindo no consultório',
    label: 'Imagem 1 — Hero: fotografia profissional de Ariane',
    ratio: '4 / 5',
    recommended: '1600 × 2000 px, vertical',
  },
  about: {
    file: '',
    alt: 'Ariane Carvalho no ambiente clínico',
    label: 'Imagem 2 — Apresentação: Ariane no ambiente clínico',
    ratio: '4 / 5',
    recommended: '1600 × 2000 px, vertical',
  },
  room: {
    file: '',
    alt: 'Sala de Terapia Ocupacional na Clínica Jardim da Mente',
    label: 'Imagem 3 — Estrutura: sala de Terapia Ocupacional',
    ratio: '3 / 2',
    recommended: '1800 × 1200 px, horizontal',
  },
  space: {
    file: '',
    alt: 'Recursos e espaços terapêuticos da clínica',
    label: 'Imagem 4 — Ambiente: outros espaços ou recursos terapêuticos',
    ratio: '3 / 2',
    recommended: '1800 × 1200 px, horizontal',
  },
  training: {
    file: '',
    alt: 'Ariane Carvalho em evento científico',
    label: 'Imagem 5 — Formação: congressos e eventos científicos',
    ratio: '3 / 2',
    recommended: '1800 × 1200 px, horizontal',
  },
} as const;

export type PhotoKey = keyof typeof photos;

/**
 * Eventos científicos / atualizações — PENDENTE.
 * Adicione apenas eventos reais, com nome conforme certificado.
 * Exemplo de item: { name: 'Nome do congresso', year: '2026', place: 'Cidade/UF' }
 */
export const scientificEvents: { name: string; year?: string; place?: string }[] = [];

/* -------------------------------------------------------------------------- */
/*  Serviços                                                                  */
/* -------------------------------------------------------------------------- */
export type ServiceId =
  | 'terapia-ocupacional-individual'
  | 'avaliacao'
  | 'ipd'
  | 'pequenos-exploradores'
  | 'orientacao-parental';

export interface Service {
  /** Também é a âncora da seção (ex.: arianecarvalho.to/#avaliacao). */
  id: ServiceId;
  /** Identificador curto usado nos eventos de analytics. */
  trackingKey: string;
  name: string;
  summary: string;
  description: string;
  /** Deixe vazio para não exibir faixa etária. */
  ageRange: string;
  skills: string[];
  entry: string;
  /** Situação de vagas exibida na página. */
  status: string;
  /** Se `null`, o serviço não tem botão de contratação. */
  cta: { label: string; message: string } | null;
  note?: string;
}

export const services: Service[] = [
  {
    id: 'terapia-ocupacional-individual',
    trackingKey: 'to_individual',
    name: 'Terapia Ocupacional Individual',
    summary: 'Acompanhamento terapêutico individualizado, construído a partir das necessidades reais da criança e da família.',
    description:
      'Intervenções voltadas às habilidades que a criança precisa para participar das atividades do dia a dia — em casa, na escola e no brincar. Os objetivos são definidos a partir do que é significativo para a criança e para a família, e não apenas da coordenação motora.',
    ageRange: '2 a 14 anos',
    skills: [
      'Autonomia e autocuidado',
      'Brincar',
      'Habilidades motoras',
      'Autorregulação',
      'Funções executivas',
      'Participação social',
    ],
    entry: 'Começa com um acolhimento inicial',
    status: 'Recebendo interessados',
    cta: {
      label: 'Quero saber sobre o acompanhamento',
      message:
        'Olá! Conheci o trabalho da Ariane Carvalho pelo site e gostaria de informações sobre o acompanhamento individual em Terapia Ocupacional.',
    },
  },
  {
    id: 'avaliacao',
    trackingKey: 'avaliacao',
    name: 'Avaliação em Terapia Ocupacional',
    summary: 'Um processo para compreender como a criança participa das suas atividades cotidianas — e o que interfere nessa participação.',
    description:
      'A avaliação busca compreender habilidades, dificuldades funcionais, demandas ocupacionais e os fatores envolvidos na participação da criança em sua rotina. É o ponto de partida para decisões terapêuticas fundamentadas.',
    ageRange: '2 a 14 anos',
    skills: [
      'Habilidades e potencialidades',
      'Dificuldades funcionais',
      'Demandas da rotina',
      'Fatores de participação',
    ],
    entry: 'Agendamento direto pelo WhatsApp',
    status: 'Recebendo interessados',
    cta: {
      label: 'Agendar uma avaliação',
      message:
        'Olá! Gostaria de informações para agendar uma avaliação em Terapia Ocupacional com Ariane Carvalho.',
    },
  },
  {
    id: 'ipd',
    trackingKey: 'ipd',
    name: 'IPD — Inteligente, Porém Disperso',
    summary: 'Programa voltado ao desenvolvimento das funções executivas, com atividades e experiências estruturadas.',
    description:
      'O IPD é um programa com identidade e autoria próprias, dedicado ao desenvolvimento das funções executivas — o conjunto de habilidades que ajuda a criança a planejar, manter a atenção, controlar impulsos e se adaptar a mudanças.',
    // Faixa etária não exibida por decisão da cliente (consultar pelo WhatsApp).
    ageRange: '',
    skills: [
      'Atenção',
      'Controle inibitório',
      'Flexibilidade cognitiva',
      'Memória de trabalho',
      'Autorregulação',
    ],
    entry: 'Formulário de ingresso, enviado após o primeiro contato',
    status: 'Recebendo interessados',
    cta: {
      label: 'Quero conhecer o IPD',
      message:
        'Olá! Conheci o IPD pelo site da Ariane Carvalho e gostaria de saber como funciona o ingresso no programa.',
    },
  },
  {
    id: 'pequenos-exploradores',
    trackingKey: 'pequenos_exploradores',
    name: 'Pequenos Exploradores',
    summary: 'Grupo terapêutico infantil, mediado profissionalmente, que desenvolve habilidades por meio do brincar e da interação.',
    description:
      'Um grupo em que as crianças vivenciam experiências significativas com outras crianças, sob mediação terapêutica — favorecendo o brincar compartilhado, a interação e a participação.',
    ageRange: '4 a 10 anos',
    skills: [
      'Habilidades sociais',
      'Brincar compartilhado',
      'Autonomia',
      'Autorregulação',
      'Coordenação e planejamento motor',
      'Experiências sensoriais',
    ],
    entry: 'Formulário de ingresso, enviado após o primeiro contato',
    status: 'Recebendo interessados',
    cta: {
      label: 'Quero conhecer os Pequenos Exploradores',
      message:
        'Olá! Gostaria de conhecer o grupo Pequenos Exploradores e receber informações sobre o processo de inscrição.',
    },
  },
  {
    id: 'orientacao-parental',
    trackingKey: 'orientacao_parental',
    name: 'Orientação Parental e Familiar',
    summary: 'Parte integrante do acompanhamento terapêutico, voltada à família da criança atendida.',
    description:
      'A orientação favorece a compreensão das necessidades da criança e a continuidade das estratégias no cotidiano familiar, fortalecendo o que é trabalhado em terapia.',
    ageRange: '',
    skills: [],
    entry: 'Exclusiva para famílias já acompanhadas',
    status: 'Exclusiva para famílias em acompanhamento',
    cta: null,
    note: 'Para iniciar, conheça a avaliação ou o acompanhamento individual.',
  },
];

/* -------------------------------------------------------------------------- */
/*  Depoimentos — DESATIVADOS                                                 */
/* -------------------------------------------------------------------------- */
/**
 * Só ative com depoimentos reais, autorizados por escrito e revisados quanto
 * às normas de publicidade do sistema COFFITO/CREFITO.
 * Enquanto `enabled` for false, a seção NÃO é gerada no HTML publicado
 * (nada fica escondido no código-fonte).
 */
export const testimonials: {
  enabled: boolean;
  items: { text: string; author: string; context?: string }[];
} = {
  enabled: false,
  items: [],
};

/* -------------------------------------------------------------------------- */
/*  SEO                                                                       */
/* -------------------------------------------------------------------------- */
export const seo = {
  /** Domínio definitivo. A URL publicada pode ser sobrescrita por SITE_URL. */
  productionUrl: 'https://arianecarvalho.to',
  title: 'Terapeuta Ocupacional Infantil em Eusébio/CE | Ariane Carvalho',
  description:
    'Terapia Ocupacional infantil em Eusébio/CE com Ariane Carvalho (CREFITO 26101-TO): avaliação, acompanhamento individual e grupos terapêuticos voltados à autonomia e ao desenvolvimento.',
  ogImage: '/og-image.jpg',
  locale: 'pt_BR',
  themeColor: '#1E3A5F',
};

/* -------------------------------------------------------------------------- */
/*  Helpers                                                                   */
/* -------------------------------------------------------------------------- */
export function whatsappUrl(message: string = contact.defaultMessage): string {
  return `https://wa.me/${contact.whatsappNumber}?text=${encodeURIComponent(message)}`;
}
