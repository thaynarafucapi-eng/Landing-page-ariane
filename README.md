# Landing Page — Ariane Carvalho · Terapeuta Ocupacional

Página única, estática, para apresentar os atendimentos de Ariane Carvalho (Eusébio/CE) e converter visitantes em contatos pelo WhatsApp.

- **Tecnologia:** [Astro](https://astro.build), que gera HTML estático. O JavaScript é mínimo (menu, mapa sob demanda, medição).
- **Hospedagem:** Netlify (publica sozinho a cada `push` na branch configurada).
- **Domínio previsto:** `arianecarvalho.to` (ainda não registrado).

---

## 1. Onde editar cada coisa

| O que | Arquivo |
| --- | --- |
| Nome, registro, formação, anos de atuação | `src/config/site.ts` → `professional` |
| WhatsApp (número e mensagem padrão), e-mail | `src/config/site.ts` → `contact` |
| Instagram / Facebook | `src/config/site.ts` → `social` |
| Endereço e Google Maps | `src/config/site.ts` → `location` |
| **Serviços** (textos, faixas etárias, situação, mensagens do WhatsApp) | `src/config/site.ts` → `services` |
| Fotografias | `src/assets/fotos/` + `src/config/site.ts` → `photos` |
| Congressos e eventos científicos | `src/config/site.ts` → `scientificEvents` |
| Depoimentos (desativados) | `src/config/site.ts` → `testimonials` |
| Título e descrição para o Google | `src/config/site.ts` → `seo` |
| Google Tag Manager / GA4 / Google Ads | `src/config/tracking.ts` (ou variáveis de ambiente no Netlify) |
| Textos das seções (famílias, abordagem, FAQ etc.) | `src/components/*.astro` |
| Cores e tipografia | `src/styles/global.css` (início do arquivo) |
| Política de Privacidade | `src/pages/politica-de-privacidade.astro` |

Campos marcados como **PENDENTE** ficam vazios de propósito. Enquanto estiverem vazios, nada aparece na página.

### Fotografias

1. Coloque o arquivo em `src/assets/fotos/` (jpg, png, webp ou avif; de preferência com 1600 px ou mais no lado maior).
2. Em `src/config/site.ts`, informe o nome do arquivo no espaço correspondente:

| Espaço | Chave | Proporção |
| --- | --- | --- |
| Imagem 1 — Hero (Ariane) | `photos.hero.file` | 4:5 vertical |
| Imagem 2 — Ariane no ambiente clínico | `photos.about.file` | 4:5 vertical |
| Imagem 3 — Sala de TO | `photos.room.file` | 3:2 horizontal |
| Imagem 4 — Outros espaços/recursos | `photos.space.file` | 3:2 horizontal |
| Imagem 5 — Congressos/eventos | `photos.training.file` | 3:2 horizontal |

3. Revise o texto alternativo (`alt`) de cada foto.

O site gera versões otimizadas (AVIF/WebP) em vários tamanhos.

Enquanto uma foto não existe:
- **Na versão pública**, o espaço é omitido e o layout se ajusta. No hero, entra um painel com a árvore da marca e a frase conceitual.
- **No desenvolvimento local e nas prévias do Netlify**, aparece um marcador identificado com a proporção recomendada.

Regras: não usar fotos de pacientes, nem imagens de crianças que simulem atendimentos, nem rostos gerados ou alterados por IA.

### Serviços

Cada serviço em `services` tem: nome, resumo, descrição, faixa etária (`ageRange`, vazia = não exibe), habilidades, forma de ingresso, situação e botão (`cta`).

- `cta: null` remove o botão. É o caso da Orientação Parental, que é exclusiva para famílias já acompanhadas.
- O `id` de cada serviço é também a âncora do link, útil para anúncios:
  `/#avaliacao`, `/#terapia-ocupacional-individual`, `/#ipd`, `/#pequenos-exploradores`, `/#orientacao-parental`.

### Depoimentos

Estão **desativados** (`testimonials.enabled = false`, lista vazia). Nesse estado, a seção não é gerada no HTML; não fica escondida no código-fonte.
Ative somente com relatos reais, autorizados por escrito e revisados à luz das normas de publicidade do sistema COFFITO/CREFITO.

### Fontes

O manual define **Creato Display** (institucional) e **Australia Custom** (usada apenas na logo).
A logo é o arquivo vetorial original extraído do manual, então a Australia Custom não é necessária no site.
Enquanto os arquivos licenciados da Creato Display não forem fornecidos, o site usa **Albert Sans** (licença OFL) como **substituta técnica**.

Para usar a Creato Display:
1. Coloque `CreatoDisplay-Regular.woff2`, `-Medium.woff2` e `-Bold.woff2` em `public/fonts/` (confirme que a licença permite uso web).
2. No início de `src/styles/global.css`, adicione os `@font-face` e troque `--font-sans` para começar por `'Creato Display'`.
3. Em `src/layouts/Base.astro`, remova a linha `import '@fontsource-variable/albert-sans';`.

### Logo e marca

Arquivos em `public/marca/`, extraídos **sem redesenho** do PDF oficial de identidade visual:
`logo-ariane-carvalho.svg` (colorida), `logo-ariane-carvalho-branca.svg`, `arvore.svg` e `arvore-branca.svg`.
Para trocar, substitua os arquivos mantendo os nomes. Depois, rode o script abaixo para atualizar o favicon e a imagem de compartilhamento:

```bash
NODE_PATH=$(npm root -g) node scripts/generate-brand-images.mjs   # requer Playwright
```

O logo e os personagens do **IPD** (`src/assets/ipd/`) pertencem ao programa. Seu uso aqui foi autorizado pela cliente. A página informa que o IPD tem identidade e autoria próprias.

---

## 2. Rodar localmente

Requer Node.js 22 ou superior.

```bash
npm install
npm run dev            # http://localhost:4321 (mostra os marcadores de foto)
npm run build          # gera a pasta dist/
npm run preview        # serve dist/ como em produção
npm run check:links    # confere WhatsApp, H1, depoimentos, marcadores etc.
```

---

## 3. Publicação no Netlify

A configuração está em `netlify.toml`:

- comando de build: `npm run build`
- pasta publicada: `dist`
- Node 22
- cabeçalhos de segurança e cache
- prévias de branch e de pull request mostram os marcadores de foto, e o `robots.txt` delas bloqueia indexação

### Conectar o repositório (uma vez)

1. Netlify → **Add new project → Import an existing project → GitHub**.
2. Escolha `thaynarafucapi-eng/Landing-page-ariane`.
3. Branch de produção: a branch que deve ir ao ar (recomendado: `main`).
4. Os campos de build são lidos do `netlify.toml`. Clique em **Deploy**.

A partir daí, cada `push` na branch de produção publica o site automaticamente.

### Domínio `arianecarvalho.to`

O domínio **ainda não está registrado**. Até lá, o site funciona no endereço gratuito `*.netlify.app`, e canonical, sitemap e Open Graph usam esse endereço automaticamente.

1. **Registrar** `arianecarvalho.to`. O `.to` é o domínio de Tonga; nem todo registrador vende, e o preço costuma ser maior que o de um `.com.br`. O próprio Netlify (Domains → Register) ou registradores que vendem `.to` são opções.
2. No Netlify: **Domain management → Add a domain** → `arianecarvalho.to`. Adicione também `www.arianecarvalho.to`.
3. Configure o DNS por **um** dos caminhos:
   - **Netlify DNS (mais simples):** no registrador, troque os *nameservers* pelos 4 que o Netlify indicar.
   - **DNS externo:** registro `A` de `arianecarvalho.to` para o IP de balanceamento do Netlify, e `CNAME` de `www` para `<seu-site>.netlify.app`. Use os valores exibidos no painel do Netlify, que podem mudar.
4. Defina `arianecarvalho.to` como **Primary domain**. O endereço `.netlify.app` passa a redirecionar para ele.
5. **HTTPS:** em *Domain management → HTTPS*, o Netlify emite o certificado (Let's Encrypt) sozinho depois que o DNS propagar (de minutos a 48 h). Ative **Force HTTPS** se a opção aparecer.
6. Faça um novo deploy (**Deploys → Trigger deploy**) para que canonical, sitemap e Open Graph passem a usar o domínio definitivo.
   Alternativa: defina a variável de ambiente `SITE_URL=https://arianecarvalho.to`.

---

## 4. Medição (GA4, Google Tag Manager, Google Ads)

Nada está instalado. Sem IDs configurados, a página não carrega nenhum script de terceiros, não grava cookies e não exibe o banner de consentimento.

Para ativar, no Netlify (**Site configuration → Environment variables**):

| Variável | Exemplo | Uso |
| --- | --- | --- |
| `PUBLIC_GTM_ID` | `GTM-ABC1234` | Recomendado: configure GA4 e Ads dentro do GTM |
| `PUBLIC_GA4_ID` | `G-XXXXXXXXXX` | GA4 direto (sem GTM) |
| `PUBLIC_ADS_ID` | `AW-123456789` | Google Ads direto (sem GTM) |
| `PUBLIC_ADS_WHATSAPP_LABEL` | `AbCdEf...` | Rótulo da conversão "Clique no WhatsApp" |

Depois, faça um novo deploy. Com algum ID ativo:

- aparece um aviso de cookies, e as tags do Google **só carregam após "Aceitar"**;
- o rodapé ganha o link "Preferências de cookies";
- a Política de Privacidade passa a descrever a medição.

**Eventos** enviados ao `dataLayer`, prontos para gatilhos no GTM:

| Evento | Quando | Parâmetros |
| --- | --- | --- |
| `whatsapp_click` | qualquer botão de WhatsApp | `service`, `placement`, UTMs |
| `service_interest` | botão de um serviço específico | `service`, `placement`, UTMs |
| `map_click` | "Como chegar", "Ver mapa", link do rodapé | `placement`, UTMs |
| `page_view` | carregamento | `page_path`, UTMs |

Valores de `service`: `avaliacao`, `to_individual`, `ipd`, `pequenos_exploradores`, `geral`.
Os parâmetros `utm_*` são guardados só na sessão do navegador. Nenhum dado pessoal ou clínico é coletado.
**Um clique no WhatsApp indica interesse, não agendamento.** Nomeie a conversão de acordo.

Links de campanha sugeridos:

```
https://arianecarvalho.to/?utm_source=instagram&utm_medium=bio&utm_campaign=perfil
https://arianecarvalho.to/?utm_source=google&utm_medium=cpc&utm_campaign=avaliacao#avaliacao
https://arianecarvalho.to/?utm_source=whatsapp&utm_medium=compartilhamento#ipd
```

---

## 5. Checklist antes de publicar no domínio definitivo

**Conteúdo e ética**
- [ ] Ariane revisou todos os textos, especialmente serviços, formação e FAQ.
- [ ] Textos conferidos frente às normas de publicidade do COFFITO/CREFITO (nome, profissão e registro visíveis; sem promessa de resultado).
- [ ] Faixas etárias confirmadas (IPD sem idade publicada, por decisão da cliente).
- [ ] Uso do logo e dos personagens do IPD autorizado por escrito pelos titulares do programa.
- [ ] Política de Privacidade revisada (idealmente por profissional jurídico).

**Fotos e marca**
- [ ] Fotos 1 a 5 inseridas (ou conscientemente omitidas) e com `alt` revisado.
- [ ] Nenhum marcador de foto visível na produção (`npm run check:links`).
- [ ] Decisão sobre a fonte: Creato Display licenciada ou Albert Sans mantida.

**Funcionamento**
- [ ] Testar todos os botões de WhatsApp no celular (número +55 41 99147-0015 e mensagens corretas).
- [ ] "Como chegar" abre o local correto no Google Maps.
- [ ] Menu mobile, barra fixa do WhatsApp e FAQ funcionando em iPhone e Android.
- [ ] Link do Instagram `@arianecarvalho.to` correto.

**Técnico**
- [ ] Domínio registrado, DNS apontado, HTTPS ativo e domínio definido como principal.
- [ ] Novo deploy feito após definir o domínio (canonical, sitemap e Open Graph corretos).
- [ ] `https://arianecarvalho.to/robots.txt` libera indexação e aponta o sitemap.
- [ ] Sitemap enviado no Google Search Console.
- [ ] Prévia de compartilhamento testada (WhatsApp/Instagram/Facebook).
- [ ] Lighthouse/PageSpeed rodado no domínio publicado.
- [ ] Se usar Google Ads: IDs configurados, banner de consentimento testado, conversão "Clique no WhatsApp" validada no Tag Assistant.

---

## 6. Estrutura

```
├── netlify.toml               publicação, cabeçalhos, contextos
├── astro.config.mjs           URL do site (SITE_URL / URL do Netlify)
├── public/
│   ├── marca/                 logos originais (SVG)
│   ├── favicon.svg, favicon-32.png, apple-touch-icon.png
│   └── og-image.jpg           imagem de compartilhamento (1200×630)
├── scripts/
│   ├── check-build.mjs        verificações pós-build
│   └── generate-brand-images.mjs
└── src/
    ├── config/site.ts         ★ conteúdo editável
    ├── config/tracking.ts     ★ medição
    ├── assets/fotos/          ★ suas fotografias
    ├── assets/ipd/            logo e personagens do IPD
    ├── components/            seções da página
    ├── layouts/Base.astro     <head>, SEO, dados estruturados
    ├── pages/                 index, política, 404, robots.txt, sitemap.xml
    ├── scripts/               medição e animação discreta
    └── styles/global.css      tokens da marca e estilos
```
