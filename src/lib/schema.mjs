// Schema.org JSON-LD builders. Every page gets one @graph with the Organization, the
// WebSite, the WebPage and its BreadcrumbList, plus page-specific entities.
import { config, ORIGIN, BASE, abs, absAsset, url, companyName, companyAddress } from './util.mjs';

const SITE = ORIGIN + BASE;
export const ids = {
  org: SITE + '#organization',
  website: SITE + '#website',
  software: SITE + '#software',
  product: SITE + '#product',
  logo: SITE + '#logo',
};

const inLang = (lang) => (lang === 'ja' ? 'ja-JP' : 'en-US');

export function organization(lang) {
  const org = {
    '@type': 'Organization',
    '@id': ids.org,
    name: companyName(lang),
    alternateName: config.brand,
    url: abs(lang, 'home'),
    logo: { '@type': 'ImageObject', '@id': ids.logo, url: absAsset('img/logo-512.png'), width: 512, height: 512, caption: config.brand },
    image: { '@id': ids.logo },
    email: config.supportEmail,
    description:
      lang === 'ja'
        ? 'オンラインのシフト管理サービス「ShiftKumo」の開発・運営。ShiftKumo はスタッフのシフト表を自動で作成し、勤怠・人件費の管理まで行えます。'
        : 'Developer and operator of ShiftKumo, online employee scheduling software that automatically builds staff shift schedules and tracks hours and labor costs.',
    knowsLanguage: ['en', 'ja'],
    contactPoint: [
      {
        '@type': 'ContactPoint',
        contactType: 'customer support',
        email: config.supportEmail,
        url: abs(lang, 'support'),
        availableLanguage: ['English', 'Japanese'],
        hoursAvailable: {
          '@type': 'OpeningHoursSpecification',
          dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
          opens: '09:00:00+09:00',
          closes: '18:00:00+09:00',
        },
      },
      {
        '@type': 'ContactPoint',
        contactType: 'billing support',
        email: config.supportEmail,
        url: abs(lang, 'refund-policy'),
        availableLanguage: ['English', 'Japanese'],
      },
    ],
  };
  if (config.company.legalName.en) org.legalName = config.company.legalName.en;
  const addr = companyAddress(lang);
  if (config.company.postalAddress) org.address = { '@type': 'PostalAddress', ...config.company.postalAddress };
  else if (addr) org.address = { '@type': 'PostalAddress', streetAddress: addr };
  if (config.company.phone) org.telephone = config.company.phone;
  if (config.company.foundingYear) org.foundingDate = config.company.foundingYear;
  return org;
}

export function website(lang, t) {
  return {
    '@type': 'WebSite',
    '@id': ids.website,
    url: abs(lang, 'home'),
    name: config.brand,
    alternateName: config.domain,
    description: t.oneLiner,
    inLanguage: inLang(lang),
    publisher: { '@id': ids.org },
  };
}

export function webPage({ lang, key, type = 'WebPage', title, description, crumbs, extra = {} }) {
  const pageUrl = abs(lang, key);
  const page = {
    '@type': type,
    '@id': pageUrl + '#webpage',
    url: pageUrl,
    name: title,
    description,
    inLanguage: inLang(lang),
    isPartOf: { '@id': ids.website },
    publisher: { '@id': ids.org },
    dateModified: config.lastUpdated,
    primaryImageOfPage: { '@type': 'ImageObject', url: absAsset(`img/og-${lang}.png`) },
    ...extra,
  };
  const nodes = [page];
  if (crumbs && crumbs.length) {
    page.breadcrumb = { '@id': pageUrl + '#breadcrumb' };
    nodes.push({
      '@type': 'BreadcrumbList',
      '@id': pageUrl + '#breadcrumb',
      itemListElement: crumbs.map((c, i) => ({
        '@type': 'ListItem',
        position: i + 1,
        name: c.name,
        item: ORIGIN + c.href,
      })),
    });
  }
  return nodes;
}

const money = (n) => (Number.isInteger(n) ? String(n) : n.toFixed(2));

function returnPolicy(lang) {
  return {
    '@type': 'MerchantReturnPolicy',
    // The service is sold worldwide; Google requires at least one country here.
    applicableCountry: ['US', 'JP', 'CA', 'GB', 'AU', 'NZ', 'SG', 'HK', 'TW', 'KR', 'DE', 'FR', 'NL', 'IE', 'ES', 'IT'],
    returnPolicyCategory: 'https://schema.org/MerchantReturnFiniteReturnWindow',
    merchantReturnDays: config.refundDays,
    refundType: 'https://schema.org/FullRefund',
    returnFees: 'https://schema.org/FreeReturn',
    merchantReturnLink: abs(lang, 'refund-policy'),
  };
}

/** One Offer per plan and currency, with billing period and refund policy. */
export function offers(lang, t) {
  const list = [];
  for (const p of config.plans) {
    for (const cur of ['USD', 'JPY']) {
      const price = cur === 'USD' ? p.usd : p.jpy;
      list.push({
        '@type': 'Offer',
        name: `${config.brand} ${t.plans[p.id].name}`,
        sku: `shiftkumo-${p.id}-${cur.toLowerCase()}`,
        price: money(price),
        priceCurrency: cur,
        availability: 'https://schema.org/InStock',
        url: abs(lang, 'checkout') + `?plan=${p.id}&currency=${cur.toLowerCase()}`,
        seller: { '@id': ids.org },
        category: 'Subscription',
        priceValidUntil: '2027-12-31',
        eligibleRegion: { '@type': 'Place', name: 'Worldwide' },
        priceSpecification: {
          '@type': 'UnitPriceSpecification',
          price: money(price),
          priceCurrency: cur,
          valueAddedTaxIncluded: true,
          billingDuration: p.iso,
        },
        hasMerchantReturnPolicy: returnPolicy(lang),
        description: t.common.trialLine(
          cur === 'USD' ? '$' + p.usd.toFixed(2) + ' USD' : '¥' + p.jpy.toLocaleString('en-US') + ' JPY',
          t.plans[p.id].every
        ),
      });
    }
  }
  return list;
}

export function software(lang, t, featureList) {
  const usd = config.plans.map((p) => p.usd);
  return {
    '@type': 'SoftwareApplication',
    '@id': ids.software,
    name: config.brand,
    url: abs(lang, 'home'),
    applicationCategory: 'BusinessApplication',
    applicationSubCategory: lang === 'ja' ? 'シフト管理・勤怠管理' : 'Employee scheduling',
    operatingSystem: 'Web browser (Windows, macOS, iOS, Android)',
    inLanguage: ['en', 'ja'],
    description: t.oneLiner,
    image: absAsset(`img/og-${lang}.png`),
    publisher: { '@id': ids.org },
    featureList,
    offers: {
      '@type': 'AggregateOffer',
      priceCurrency: 'USD',
      lowPrice: money(Math.min(...usd)),
      highPrice: money(Math.max(...usd)),
      offerCount: config.plans.length,
      url: abs(lang, 'pricing'),
    },
  };
}

export function product(lang, t) {
  return {
    '@type': 'Product',
    '@id': ids.product,
    name: `${config.brand} — ${lang === 'ja' ? 'シフト管理サービス' : 'Employee Scheduling Software'}`,
    brand: { '@type': 'Brand', name: config.brand },
    description: t.pricing.description,
    image: absAsset(`img/og-${lang}.png`),
    category: lang === 'ja' ? 'ソフトウェア > 業務用ソフトウェア > シフト管理' : 'Software > Business Software > Employee Scheduling',
    url: abs(lang, 'pricing'),
    manufacturer: { '@id': ids.org },
    isRelatedTo: { '@id': ids.software },
    additionalProperty: t.pricing.included.map((v) => ({ '@type': 'PropertyValue', name: lang === 'ja' ? '含まれる機能' : 'Included', value: v })),
    offers: offers(lang, t),
  };
}

export function faqPage(qa, idUrl) {
  return {
    '@type': 'FAQPage',
    '@id': idUrl + '#faq',
    mainEntity: qa.map(([q, a]) => ({
      '@type': 'Question',
      name: q,
      acceptedAnswer: { '@type': 'Answer', text: a },
    })),
  };
}

export function howTo(name, steps, idUrl, frag) {
  return {
    '@type': 'HowTo',
    '@id': idUrl + '#' + frag,
    name,
    step: steps.map((s, i) => ({ '@type': 'HowToStep', position: i + 1, text: s })),
  };
}

/** A HowTo whose steps are grouped into alternative sections ([{name, steps}]). */
export function howToSections(name, sections, idUrl, frag) {
  return {
    '@type': 'HowTo',
    '@id': idUrl + '#' + frag,
    name,
    step: sections.map((sec) => ({
      '@type': 'HowToSection',
      name: sec.name,
      itemListElement: sec.steps.map((s, i) => ({ '@type': 'HowToStep', position: i + 1, text: s })),
    })),
  };
}

export function graph(nodes) {
  return JSON.stringify({ '@context': 'https://schema.org', '@graph': nodes }).replace(/</g, '\\u003c');
}

export { url };
