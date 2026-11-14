/**
 * Verificações do HTML gerado (rode após `npm run build`):
 *   npm run check:links
 * Confere WhatsApp, mensagens, títulos, marcadores pendentes e depoimentos.
 */
import { readFileSync } from 'node:fs';

const html = readFileSync(new URL('../dist/index.html', import.meta.url), 'utf8');
const EXPECTED_NUMBER = '5541991470015';
let failures = 0;
const ok = (cond, msg) => {
  console.log(`${cond ? '✔' : '✘'} ${msg}`);
  if (!cond) failures++;
};

const waLinks = [...html.matchAll(/href="(https:\/\/wa\.me\/[^"]+)"/g)].map((m) => m[1].replace(/&amp;/g, '&'));
ok(waLinks.length > 0, `${waLinks.length} links de WhatsApp encontrados`);
ok(waLinks.every((l) => l.startsWith(`https://wa.me/${EXPECTED_NUMBER}?text=`)), 'Todos usam o número oficial e têm mensagem');
const messages = new Set(waLinks.map((l) => decodeURIComponent(l.split('text=')[1])));
console.log('  Mensagens distintas:');
messages.forEach((m) => console.log(`   • ${m}`));

const waAnchors = [...html.matchAll(/<a[^>]+href="https:\/\/wa\.me[^>]*>/g)].map((m) => m[0]);
ok(waAnchors.every((a) => a.includes('target="_blank"') && a.includes('rel="noopener"')), 'WhatsApp abre em nova aba com rel=noopener');
ok(waAnchors.every((a) => a.includes('data-track="whatsapp"')), 'Todos os botões de WhatsApp são rastreáveis');

ok((html.match(/<h1[\s>]/g) || []).length === 1, 'Exatamente um H1');
ok(!html.includes('data-pending-photo'), 'Nenhum marcador de foto pendente no HTML público');
ok(!html.includes('id="depoimentos"'), 'Seção de depoimentos ausente (desativada)');
ok(!/GTM-|G-[A-Z0-9]{6,}|AW-\d/.test(html.replace(/GTM-XXXXXXX|G-XXXXXXXXXX|AW-XXXXXXXXX/g, '')), 'Nenhum ID de rastreamento embutido');
ok(html.includes('https://maps.app.goo.gl/LP9egheBPxgThH3b6'), 'Link do Google Maps correto');
ok(html.includes('CREFITO 26101-TO'), 'Registro profissional presente');
const orient = html.split('id="orientacao-parental"')[1]?.split('</article>')[0] ?? '';
ok(orient !== '' && !orient.includes('wa.me'), 'Orientação parental sem botão de contratação');

if (failures) {
  console.error(`\n${failures} verificação(ões) falharam.`);
  process.exit(1);
}
console.log('\nTodas as verificações passaram.');
