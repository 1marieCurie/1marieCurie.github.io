import { readFile, mkdir } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import { dirname, join, resolve } from 'node:path';
import sharp from 'sharp';

// This build-time asset uses the portrait already committed to the portfolio.
// Keep the portrait in the repository; do not rely on a remote third-party URL.
const projectRoot = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const photo = await readFile(join(projectRoot, 'public/profile-khadija.jpg'));
const photo64 = photo.toString('base64');

const svg = `
<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630">
  <defs>
    <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#0b1324"/>
      <stop offset="58%" stop-color="#0b1730"/>
      <stop offset="100%" stop-color="#15284d"/>
    </linearGradient>
    <radialGradient id="glow" cx="85%" cy="40%" r="64%">
      <stop offset="0%" stop-color="#375fd1" stop-opacity=".31"/>
      <stop offset="100%" stop-color="#375fd1" stop-opacity="0"/>
    </radialGradient>
    <linearGradient id="portraitEdge" x1="0" y1="0" x2="1" y2="1">
      <stop stop-color="#729afa"/>
      <stop offset="100%" stop-color="#273c6f"/>
    </linearGradient>
    <clipPath id="portraitClip">
      <rect x="790" y="73" width="344" height="458" rx="26"/>
    </clipPath>
  </defs>
  <rect width="1200" height="630" fill="url(#bg)"/>
  <rect width="1200" height="630" fill="url(#glow)"/>
  <path d="M40 0V630 M120 0V630 M200 0V630 M280 0V630 M360 0V630 M440 0V630 M520 0V630 M600 0V630 M680 0V630 M760 0V630 M840 0V630 M920 0V630 M1000 0V630 M1080 0V630 M1160 0V630" fill="none" stroke="#a4baf4" stroke-width="1" opacity=".035"/>
  <path d="M0 74H1200 M0 154H1200 M0 234H1200 M0 314H1200 M0 394H1200 M0 474H1200 M0 554H1200" fill="none" stroke="#a4baf4" stroke-width="1" opacity=".035"/>
  <rect x="55" y="53" width="56" height="52" rx="13" fill="#214477" stroke="#4872ad" stroke-width="1.5"/>
  <text x="83" y="88" fill="#fff" text-anchor="middle" font-family="DejaVu Sans, sans-serif" font-size="20" font-weight="bold">KM</text>
  <text x="129" y="83" fill="#a2b9dc" font-family="DejaVu Sans, sans-serif" font-size="15" letter-spacing="3">PERSONAL PORTFOLIO</text>
  <rect x="64" y="144" width="80" height="4" rx="2" fill="#5b8dff"/>
  <text x="58" y="259" fill="#f7faff" font-family="DejaVu Sans, sans-serif" font-size="82" font-weight="bold" letter-spacing="-3">Khadija</text>
  <text x="58" y="349" fill="#f7faff" font-family="DejaVu Sans, sans-serif" font-size="82" font-weight="bold" letter-spacing="-3">Mellak<tspan fill="#79a6ff">.</tspan></text>
  <text x="63" y="406" fill="#9fc0fa" font-family="DejaVu Sans, sans-serif" font-size="29" font-weight="bold">AI &amp; Software Engineering</text>
  <text x="63" y="454" fill="#c5d0e5" font-family="DejaVu Sans, sans-serif" font-size="17">LLMs  /  Generative AI  /  Data Engineering</text>
  <path d="M63 489H674" stroke="#506182" stroke-width="1.5" opacity=".8"/>
  <text x="63" y="526" fill="#9aaed2" font-family="DejaVu Sans, sans-serif" font-size="13" font-weight="bold" letter-spacing="2">PROJECTS   ·   RESEARCH   ·   EXPERIENCE</text>
  <rect x="62" y="555" width="317" height="41" rx="20" fill="#1b3767" stroke="#5278b2" stroke-width="1.3"/>
  <text x="85" y="582" fill="#e8efff" font-family="DejaVu Sans, sans-serif" font-size="16">1mariecurie.github.io</text>
  <path d="M350 575l8-8m-8 0h8v8" fill="none" stroke="#8fb8ff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
  <rect x="773" y="55" width="378" height="492" rx="34" fill="#09152d" opacity=".7"/>
  <rect x="782" y="65" width="360" height="475" rx="29" fill="url(#portraitEdge)"/>
  <image x="790" y="73" width="344" height="458" preserveAspectRatio="xMidYMid slice" clip-path="url(#portraitClip)" href="data:image/jpeg;base64,PHOTO_DATA_PLACEHOLDER"/>
  <rect x="790" y="73" width="344" height="458" rx="26" fill="none" stroke="#b2c5ed" stroke-opacity=".65" stroke-width="1.5"/>
  <rect x="975" y="512" width="172" height="38" rx="18" fill="#244d8a" stroke="#8bb6ff"/>
  <circle cx="993" cy="531" r="4.5" fill="#85f2cf"/>
  <text x="1007" y="536" fill="#f3f8ff" font-family="DejaVu Sans, sans-serif" font-size="12" font-weight="bold">OPEN TO PFE 2027</text>
</svg>
`.replace('PHOTO_DATA_PLACEHOLDER', photo64);

await mkdir(join(projectRoot, 'public'), { recursive: true });
const output = join(projectRoot, 'public/portfolio-preview.png');
const info = await sharp(Buffer.from(svg), { density: 72 })
  .png({ compressionLevel: 9, palette: false })
  .toFile(output);
console.log('Generated social preview:', info.width, 'x', info.height, info.size, 'bytes');
