function escapeXml(value) {
  return String(value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

function hashString(value) {
  return String(value).split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
}

function renderSparkles(seed, accent) {
  const circles = [];
  for (let index = 0; index < 8; index += 1) {
    const x = 90 + ((seed + index * 97) % 620);
    const y = 70 + ((seed * 7 + index * 61) % 180);
    const radius = 6 + ((seed + index * 19) % 10);
    circles.push(`<circle cx="${x}" cy="${y}" r="${radius}" fill="${accent}" opacity="0.12" />`);
  }
  return circles.join('');
}

function renderItem(type, palette) {
  switch (type) {
    case 'Candle Set':
      return `
        <ellipse cx="450" cy="500" rx="160" ry="28" fill="#d7c9d0" opacity="0.45" />
        <rect x="290" y="258" width="66" height="176" rx="24" fill="#fff8ef" stroke="${palette.ribbon}" stroke-width="6" />
        <rect x="378" y="220" width="76" height="214" rx="26" fill="#fffdf8" stroke="${palette.accent}" stroke-width="6" />
        <rect x="482" y="272" width="66" height="162" rx="22" fill="#f9efe0" stroke="${palette.ribbon}" stroke-width="6" />
        <path d="M323 232 C313 204 337 192 348 220 C355 202 376 212 366 236 C358 254 334 259 323 232 Z" fill="#ffb347" />
        <path d="M414 188 C402 156 431 144 444 176 C455 154 479 168 468 197 C456 220 427 221 414 188 Z" fill="#ffb347" />
        <path d="M514 247 C506 221 525 212 536 233 C541 220 559 229 552 249 C545 264 522 265 514 247 Z" fill="#ffb347" />`;
    case 'Knit Throw':
      return `
        <ellipse cx="450" cy="500" rx="170" ry="28" fill="#d7c9d0" opacity="0.45" />
        <path d="M240 248 Q285 215 340 230 L590 292 Q635 302 620 351 L590 438 Q580 468 532 460 L284 416 Q238 409 222 372 L198 304 Q190 271 240 248 Z" fill="#f7efe7" stroke="${palette.ribbon}" stroke-width="8" />
        <path d="M265 268 L556 326" stroke="${palette.accent}" stroke-width="10" stroke-linecap="round" opacity="0.45" />
        <path d="M252 300 L542 356" stroke="${palette.ribbon}" stroke-width="8" stroke-linecap="round" opacity="0.26" />
        <path d="M238 334 L528 390" stroke="${palette.accent}" stroke-width="8" stroke-linecap="round" opacity="0.22" />
        <path d="M227 366 L516 420" stroke="${palette.ribbon}" stroke-width="7" stroke-linecap="round" opacity="0.18" />
        <path d="M560 321 l12 22 M579 325 l12 22 M598 330 l12 22 M549 349 l12 22 M568 353 l12 22 M587 357 l12 22" stroke="${palette.ribbon}" stroke-width="6" stroke-linecap="round" />`;
    case 'Ceramic Mug':
      return `
        <ellipse cx="450" cy="500" rx="145" ry="28" fill="#d7c9d0" opacity="0.45" />
        <path d="M292 228 h230 a24 24 0 0 1 24 24 v164 a60 60 0 0 1 -60 60 h-158 a60 60 0 0 1 -60 -60 v-164 a24 24 0 0 1 24 -24 Z" fill="#fffaf6" stroke="${palette.ribbon}" stroke-width="8" />
        <path d="M522 268 h44 a48 48 0 0 1 0 96 h-44" fill="none" stroke="${palette.ribbon}" stroke-width="12" stroke-linecap="round" />
        <path d="M322 316 h146" stroke="${palette.accent}" stroke-width="12" stroke-linecap="round" opacity="0.7" />
        <path d="M340 276 C330 234 352 214 362 188" stroke="#ffffff" stroke-width="8" stroke-linecap="round" opacity="0.8" />
        <path d="M394 272 C386 230 410 210 420 184" stroke="#ffffff" stroke-width="8" stroke-linecap="round" opacity="0.8" />`;
    case 'Planner Bundle':
      return `
        <ellipse cx="450" cy="500" rx="160" ry="28" fill="#d7c9d0" opacity="0.45" />
        <rect x="266" y="228" width="194" height="246" rx="18" fill="#fffaf8" stroke="${palette.ribbon}" stroke-width="8" />
        <rect x="286" y="252" width="154" height="22" rx="10" fill="${palette.accent}" opacity="0.4" />
        <path d="M296 310 h124 M296 346 h110 M296 382 h124 M296 418 h88" stroke="${palette.ribbon}" stroke-width="8" stroke-linecap="round" opacity="0.24" />
        <rect x="428" y="246" width="138" height="224" rx="18" fill="#f9f1ff" stroke="${palette.ribbon}" stroke-width="8" />
        <path d="M454 292 h88 M454 332 h76 M454 372 h90 M454 412 h64" stroke="${palette.accent}" stroke-width="8" stroke-linecap="round" opacity="0.34" />`;
    case 'Pen Set':
      return `
        <ellipse cx="450" cy="500" rx="160" ry="28" fill="#d7c9d0" opacity="0.45" />
        <rect x="238" y="264" width="420" height="168" rx="28" fill="#fff8f5" stroke="${palette.ribbon}" stroke-width="8" />
        <g transform="rotate(-16 340 344)">
          <rect x="270" y="284" width="42" height="178" rx="18" fill="#fffdf8" stroke="${palette.ribbon}" stroke-width="6" />
          <polygon points="291,250 312,284 270,284" fill="${palette.accent}" />
        </g>
        <g transform="rotate(-8 430 344)">
          <rect x="394" y="270" width="42" height="190" rx="18" fill="#f8f3ff" stroke="${palette.ribbon}" stroke-width="6" />
          <polygon points="415,238 436,270 394,270" fill="${palette.accent}" />
        </g>
        <g transform="rotate(7 520 350)">
          <rect x="484" y="278" width="42" height="182" rx="18" fill="#fffdf8" stroke="${palette.ribbon}" stroke-width="6" />
          <polygon points="505,246 526,278 484,278" fill="${palette.accent}" />
        </g>`;
    case 'Desktop Tray':
      return `
        <ellipse cx="450" cy="506" rx="174" ry="24" fill="#d7c9d0" opacity="0.45" />
        <rect x="250" y="274" width="390" height="162" rx="26" fill="#f7efe7" stroke="${palette.ribbon}" stroke-width="8" />
        <rect x="286" y="306" width="106" height="98" rx="18" fill="#fffdf8" stroke="${palette.accent}" stroke-width="6" />
        <circle cx="460" cy="354" r="42" fill="#fff9ef" stroke="${palette.ribbon}" stroke-width="6" />
        <rect x="518" y="304" width="80" height="110" rx="16" fill="#fffaf8" stroke="${palette.ribbon}" stroke-width="6" />
        <path d="M546 328 h28 M546 350 h28 M546 372 h28" stroke="${palette.accent}" stroke-width="6" stroke-linecap="round" />`;
    case 'Spa Box':
      return `
        <ellipse cx="450" cy="500" rx="170" ry="28" fill="#d7c9d0" opacity="0.45" />
        <rect x="246" y="272" width="414" height="150" rx="24" fill="#fff8fb" stroke="${palette.ribbon}" stroke-width="8" />
        <rect x="294" y="234" width="66" height="176" rx="18" fill="#fffdf8" stroke="${palette.accent}" stroke-width="6" />
        <rect x="390" y="256" width="74" height="154" rx="18" fill="#fef7ff" stroke="${palette.ribbon}" stroke-width="6" />
        <ellipse cx="560" cy="386" rx="60" ry="28" fill="#f8e7f0" stroke="${palette.ribbon}" stroke-width="6" />
        <path d="M318 266 h20 M412 286 h32" stroke="${palette.ribbon}" stroke-width="6" stroke-linecap="round" />`;
    case 'Silk Sleep Set':
      return `
        <ellipse cx="450" cy="500" rx="170" ry="28" fill="#d7c9d0" opacity="0.45" />
        <rect x="238" y="286" width="200" height="138" rx="54" fill="#fff9fd" stroke="${palette.ribbon}" stroke-width="8" />
        <ellipse cx="304" cy="356" rx="28" ry="24" fill="#f6ddea" />
        <ellipse cx="372" cy="356" rx="28" ry="24" fill="#f6ddea" />
        <path d="M438 356 h54" stroke="${palette.ribbon}" stroke-width="10" stroke-linecap="round" opacity="0.5" />
        <rect x="468" y="250" width="170" height="188" rx="28" fill="#fffdf8" stroke="${palette.accent}" stroke-width="8" />
        <circle cx="554" cy="344" r="42" fill="#fef2f7" />`;
    case 'Bath Ritual Kit':
      return `
        <ellipse cx="450" cy="500" rx="170" ry="28" fill="#d7c9d0" opacity="0.45" />
        <rect x="258" y="332" width="178" height="104" rx="34" fill="#fffdf8" stroke="${palette.ribbon}" stroke-width="8" />
        <path d="M286 332 v-36 q0 -28 28 -28 h68 q28 0 28 28 v36" fill="none" stroke="${palette.ribbon}" stroke-width="8" />
        <circle cx="548" cy="336" r="56" fill="#fff7f8" stroke="${palette.accent}" stroke-width="8" />
        <path d="M548 280 v112 M492 336 h112" stroke="${palette.ribbon}" stroke-width="8" opacity="0.26" />
        <rect x="612" y="258" width="34" height="182" rx="16" fill="#f3e4d5" stroke="${palette.ribbon}" stroke-width="6" />
        <rect x="600" y="238" width="58" height="42" rx="18" fill="#f8cfa0" stroke="${palette.accent}" stroke-width="6" />`;
    case 'Recipe Tin':
      return `
        <ellipse cx="450" cy="500" rx="170" ry="28" fill="#d7c9d0" opacity="0.45" />
        <rect x="258" y="274" width="360" height="168" rx="28" fill="#fffdf8" stroke="${palette.ribbon}" stroke-width="8" />
        <rect x="286" y="230" width="304" height="74" rx="22" fill="#fff4e8" stroke="${palette.accent}" stroke-width="8" />
        <rect x="314" y="326" width="86" height="76" rx="16" fill="#fff7ef" stroke="${palette.ribbon}" stroke-width="6" />
        <rect x="414" y="326" width="86" height="76" rx="16" fill="#fff7ef" stroke="${palette.ribbon}" stroke-width="6" />
        <rect x="514" y="326" width="64" height="76" rx="16" fill="#fff7ef" stroke="${palette.ribbon}" stroke-width="6" />`;
    case 'Baker Bundle':
      return `
        <ellipse cx="450" cy="500" rx="176" ry="26" fill="#d7c9d0" opacity="0.45" />
        <path d="M294 420 C332 328 354 292 394 244" stroke="${palette.ribbon}" stroke-width="16" stroke-linecap="round" />
        <path d="M394 244 C434 274 458 302 492 354" stroke="${palette.ribbon}" stroke-width="10" stroke-linecap="round" opacity="0.46" />
        <g transform="rotate(18 560 334)">
          <rect x="542" y="250" width="34" height="188" rx="14" fill="#f0ddc6" stroke="${palette.ribbon}" stroke-width="6" />
          <rect x="514" y="220" width="90" height="44" rx="18" fill="#fff7ef" stroke="${palette.accent}" stroke-width="6" />
        </g>
        <path d="M236 382 C260 342 308 318 340 318 C370 318 408 342 426 382" fill="none" stroke="${palette.accent}" stroke-width="14" stroke-linecap="round" />`;
    case 'Tea Time Set':
      return `
        <ellipse cx="450" cy="500" rx="176" ry="26" fill="#d7c9d0" opacity="0.45" />
        <ellipse cx="428" cy="392" rx="114" ry="70" fill="#fffdf8" stroke="${palette.ribbon}" stroke-width="8" />
        <rect x="338" y="304" width="180" height="118" rx="32" fill="#fff7ef" stroke="${palette.accent}" stroke-width="8" />
        <path d="M518 346 h36 a34 34 0 1 1 0 68 h-36" fill="none" stroke="${palette.ribbon}" stroke-width="8" />
        <path d="M392 304 q34 -64 72 0" fill="none" stroke="${palette.ribbon}" stroke-width="8" />
        <rect x="270" y="396" width="70" height="58" rx="18" fill="#fffdf8" stroke="${palette.ribbon}" stroke-width="6" />
        <rect x="560" y="396" width="70" height="58" rx="18" fill="#fffdf8" stroke="${palette.ribbon}" stroke-width="6" />`;
    case 'Audio Kit':
      return `
        <ellipse cx="450" cy="500" rx="170" ry="28" fill="#d7c9d0" opacity="0.45" />
        <path d="M314 286 C314 190 382 142 450 142 C518 142 586 190 586 286" fill="none" stroke="${palette.ribbon}" stroke-width="22" stroke-linecap="round" />
        <rect x="294" y="290" width="82" height="150" rx="30" fill="#fffdf8" stroke="${palette.accent}" stroke-width="8" />
        <rect x="524" y="290" width="82" height="150" rx="30" fill="#fffdf8" stroke="${palette.accent}" stroke-width="8" />
        <circle cx="450" cy="308" r="58" fill="${palette.wrap}" opacity="0.55" />`;
    case 'Smart Desk Lamp':
      return `
        <ellipse cx="450" cy="500" rx="170" ry="28" fill="#d7c9d0" opacity="0.45" />
        <ellipse cx="438" cy="452" rx="126" ry="34" fill="#fff7ef" stroke="${palette.ribbon}" stroke-width="8" />
        <path d="M436 450 L480 328 L414 292 L372 452" fill="none" stroke="${palette.ribbon}" stroke-width="16" stroke-linecap="round" stroke-linejoin="round" />
        <path d="M402 288 L508 234 L550 310 L444 364 Z" fill="#fffdf8" stroke="${palette.accent}" stroke-width="8" />
        <circle cx="534" cy="302" r="10" fill="${palette.ribbon}" />`;
    case 'Cable Organizer':
      return `
        <ellipse cx="450" cy="500" rx="166" ry="24" fill="#d7c9d0" opacity="0.45" />
        <rect x="248" y="286" width="402" height="144" rx="26" fill="#fffdf8" stroke="${palette.ribbon}" stroke-width="8" />
        <path d="M300 360 C300 312 352 312 352 356 C352 400 404 402 404 356" fill="none" stroke="${palette.accent}" stroke-width="12" stroke-linecap="round" />
        <path d="M448 360 C448 312 500 312 500 356 C500 400 552 402 552 356" fill="none" stroke="${palette.ribbon}" stroke-width="12" stroke-linecap="round" />
        <rect x="274" y="314" width="34" height="26" rx="10" fill="#fff7ef" stroke="${palette.ribbon}" stroke-width="4" />
        <rect x="578" y="314" width="34" height="26" rx="10" fill="#fff7ef" stroke="${palette.ribbon}" stroke-width="4" />`;
    case 'Plant Pot Trio':
      return `
        <ellipse cx="450" cy="510" rx="176" ry="26" fill="#d7c9d0" opacity="0.45" />
        <path d="M280 290 C280 246 328 222 352 184" stroke="#5aa469" stroke-width="16" stroke-linecap="round" />
        <path d="M448 302 C438 240 486 216 514 170" stroke="#5aa469" stroke-width="16" stroke-linecap="round" />
        <path d="M578 300 C588 254 620 236 636 196" stroke="#5aa469" stroke-width="16" stroke-linecap="round" />
        <ellipse cx="334" cy="184" rx="28" ry="16" fill="#8fd694" />
        <ellipse cx="506" cy="170" rx="30" ry="18" fill="#8fd694" />
        <ellipse cx="632" cy="196" rx="26" ry="16" fill="#8fd694" />
        <path d="M250 330 h120 l-18 116 h-84 Z" fill="#c88c5a" stroke="${palette.ribbon}" stroke-width="8" />
        <path d="M416 342 h120 l-18 104 h-84 Z" fill="#d29b69" stroke="${palette.ribbon}" stroke-width="8" />
        <path d="M554 338 h120 l-18 110 h-84 Z" fill="#bb8050" stroke="${palette.ribbon}" stroke-width="8" />`;
    case 'Seed Starter Set':
      return `
        <ellipse cx="450" cy="500" rx="176" ry="24" fill="#d7c9d0" opacity="0.45" />
        <rect x="252" y="320" width="396" height="128" rx="26" fill="#8b5e3c" opacity="0.26" />
        <rect x="276" y="332" width="90" height="90" rx="16" fill="#c48a5a" stroke="${palette.ribbon}" stroke-width="6" />
        <rect x="386" y="332" width="90" height="90" rx="16" fill="#c48a5a" stroke="${palette.ribbon}" stroke-width="6" />
        <rect x="496" y="332" width="90" height="90" rx="16" fill="#c48a5a" stroke="${palette.ribbon}" stroke-width="6" />
        <path d="M322 332 C322 286 344 272 356 242" stroke="#5aa469" stroke-width="12" stroke-linecap="round" />
        <path d="M432 332 C432 286 456 270 468 238" stroke="#5aa469" stroke-width="12" stroke-linecap="round" />
        <path d="M542 332 C542 286 566 272 576 244" stroke="#5aa469" stroke-width="12" stroke-linecap="round" />
        <ellipse cx="346" cy="248" rx="20" ry="12" fill="#8fd694" />
        <ellipse cx="460" cy="244" rx="20" ry="12" fill="#8fd694" />
        <ellipse cx="570" cy="248" rx="20" ry="12" fill="#8fd694" />`;
    case 'Botanical Journal':
      return `
        <ellipse cx="450" cy="500" rx="170" ry="24" fill="#d7c9d0" opacity="0.45" />
        <path d="M248 266 h182 q46 0 76 44 q30 -44 76 -44 h182 v188 h-182 q-42 0 -76 -34 q-34 34 -76 34 h-182 Z" fill="#fffdf8" stroke="${palette.ribbon}" stroke-width="8" />
        <path d="M448 266 v188" stroke="${palette.accent}" stroke-width="8" />
        <path d="M342 392 C320 346 334 314 364 278 C372 322 402 354 430 384" fill="none" stroke="#5aa469" stroke-width="10" stroke-linecap="round" />
        <path d="M538 392 C564 350 554 316 524 278 C516 322 488 350 466 380" fill="none" stroke="#5aa469" stroke-width="10" stroke-linecap="round" />`;
    case 'Book Sleeve':
      return `
        <ellipse cx="450" cy="500" rx="170" ry="24" fill="#d7c9d0" opacity="0.45" />
        <rect x="286" y="224" width="308" height="248" rx="26" fill="#f0e1d7" stroke="${palette.ribbon}" stroke-width="8" />
        <rect x="312" y="250" width="256" height="194" rx="20" fill="#fffdf8" stroke="${palette.accent}" stroke-width="6" />
        <rect x="340" y="274" width="92" height="146" rx="16" fill="#f8f2ff" stroke="${palette.ribbon}" stroke-width="6" />
        <rect x="444" y="274" width="92" height="146" rx="16" fill="#fff8ef" stroke="${palette.ribbon}" stroke-width="6" />`;
    case 'Reading Light':
      return `
        <ellipse cx="450" cy="500" rx="170" ry="24" fill="#d7c9d0" opacity="0.45" />
        <path d="M246 282 h190 v160 h-190 Z" fill="#fffdf8" stroke="${palette.ribbon}" stroke-width="8" />
        <path d="M436 282 h190 v160 h-190 Z" fill="#fff7ef" stroke="${palette.ribbon}" stroke-width="8" />
        <path d="M436 282 l-18 20 l-18 -20" fill="#fffdf8" stroke="${palette.ribbon}" stroke-width="6" />
        <path d="M554 248 C606 220 630 246 620 292 C610 334 560 342 530 314" fill="none" stroke="${palette.accent}" stroke-width="10" stroke-linecap="round" />
        <circle cx="612" cy="298" r="18" fill="${palette.accent}" opacity="0.6" />`;
    case 'Bookmark Wallet':
      return `
        <ellipse cx="450" cy="500" rx="170" ry="24" fill="#d7c9d0" opacity="0.45" />
        <rect x="268" y="248" width="362" height="214" rx="26" fill="#fffdf8" stroke="${palette.ribbon}" stroke-width="8" />
        <rect x="306" y="284" width="80" height="136" rx="16" fill="#f8f2ff" stroke="${palette.accent}" stroke-width="6" />
        <rect x="410" y="284" width="80" height="136" rx="16" fill="#fff8ef" stroke="${palette.ribbon}" stroke-width="6" />
        <rect x="514" y="284" width="80" height="136" rx="16" fill="#f8f2ff" stroke="${palette.accent}" stroke-width="6" />
        <path d="M346 284 v44 l-16 -10 l-16 10 v-44" fill="${palette.ribbon}" />`;
    case 'Celebration Box':
      return `
        <ellipse cx="450" cy="505" rx="176" ry="24" fill="#d7c9d0" opacity="0.45" />
        <rect x="266" y="280" width="368" height="160" rx="26" fill="#fffdf8" stroke="${palette.ribbon}" stroke-width="8" />
        <rect x="434" y="280" width="24" height="160" rx="12" fill="${palette.accent}" />
        <rect x="266" y="348" width="368" height="22" rx="11" fill="${palette.accent}" />
        <path d="M446 278 C430 238 398 232 386 266 C372 304 416 318 446 278 Z" fill="${palette.ribbon}" opacity="0.85" />
        <path d="M446 278 C462 238 494 232 506 266 C520 304 476 318 446 278 Z" fill="${palette.ribbon}" opacity="0.85" />
        <circle cx="308" cy="224" r="12" fill="${palette.accent}" /><circle cx="574" cy="228" r="12" fill="${palette.accent}" />`;
    case 'Confetti Kit':
      return `
        <ellipse cx="450" cy="505" rx="176" ry="24" fill="#d7c9d0" opacity="0.45" />
        <path d="M320 420 L404 258 L482 308 L396 454 Z" fill="#fff7ef" stroke="${palette.ribbon}" stroke-width="8" />
        <path d="M438 244 l32 26 M480 220 l22 34 M520 214 l14 36" stroke="${palette.accent}" stroke-width="8" stroke-linecap="round" />
        <circle cx="546" cy="196" r="12" fill="#f04e98" />
        <circle cx="582" cy="242" r="10" fill="#f2c94c" />
        <circle cx="604" cy="188" r="8" fill="#7b5ea7" />
        <rect x="280" y="382" width="70" height="22" rx="11" fill="${palette.accent}" />`;
    case 'Mini Photo Booth Set':
      return `
        <ellipse cx="450" cy="505" rx="176" ry="24" fill="#d7c9d0" opacity="0.45" />
        <rect x="248" y="278" width="136" height="176" rx="20" fill="#fffdf8" stroke="${palette.ribbon}" stroke-width="8" />
        <rect x="304" y="238" width="136" height="176" rx="20" fill="#fff7ef" stroke="${palette.accent}" stroke-width="8" />
        <rect x="418" y="300" width="194" height="132" rx="26" fill="#f8f2ff" stroke="${palette.ribbon}" stroke-width="8" />
        <circle cx="484" cy="366" r="28" fill="#fffdf8" stroke="${palette.accent}" stroke-width="6" />
        <rect x="528" y="330" width="44" height="20" rx="10" fill="${palette.accent}" />`;
    case 'Story Play Set':
      return `
        <ellipse cx="450" cy="505" rx="176" ry="24" fill="#d7c9d0" opacity="0.45" />
        <rect x="266" y="306" width="82" height="82" rx="16" fill="#ffd166" stroke="${palette.ribbon}" stroke-width="6" />
        <rect x="360" y="268" width="82" height="120" rx="16" fill="#9bdeac" stroke="${palette.ribbon}" stroke-width="6" />
        <rect x="458" y="316" width="82" height="72" rx="16" fill="#f4978e" stroke="${palette.ribbon}" stroke-width="6" />
        <rect x="554" y="286" width="82" height="102" rx="16" fill="#cdb4db" stroke="${palette.ribbon}" stroke-width="6" />
        <rect x="324" y="388" width="230" height="54" rx="18" fill="#fffdf8" stroke="${palette.accent}" stroke-width="6" />`;
    case 'Puzzle Pack':
      return `
        <ellipse cx="450" cy="505" rx="176" ry="24" fill="#d7c9d0" opacity="0.45" />
        <path d="M320 286 h90 v52 q32 -10 32 22 q0 32 -32 22 v50 h-90 v-50 q-32 10 -32 -22 q0 -32 32 -22 Z" fill="#fff7ef" stroke="${palette.ribbon}" stroke-width="8" />
        <path d="M446 286 h90 v52 q32 -10 32 22 q0 32 -32 22 v50 h-90 v-50 q-32 10 -32 -22 q0 -32 32 -22 Z" fill="#f8f2ff" stroke="${palette.accent}" stroke-width="8" />
        <path d="M384 352 h66" stroke="${palette.ribbon}" stroke-width="8" />`;
    case 'Creative Box':
      return `
        <ellipse cx="450" cy="505" rx="176" ry="24" fill="#d7c9d0" opacity="0.45" />
        <rect x="258" y="294" width="378" height="150" rx="26" fill="#fffdf8" stroke="${palette.ribbon}" stroke-width="8" />
        <rect x="312" y="246" width="28" height="166" rx="14" fill="#ff6b6b" />
        <rect x="360" y="232" width="28" height="180" rx="14" fill="#ffd166" />
        <rect x="408" y="218" width="28" height="194" rx="14" fill="#4ecdc4" />
        <rect x="456" y="236" width="28" height="176" rx="14" fill="#7b5ea7" />
        <rect x="514" y="270" width="84" height="110" rx="16" fill="#f8f2ff" stroke="${palette.accent}" stroke-width="6" />`;
    case 'Pet Pamper Box':
      return `
        <ellipse cx="450" cy="505" rx="176" ry="24" fill="#d7c9d0" opacity="0.45" />
        <rect x="252" y="294" width="394" height="148" rx="26" fill="#fffdf8" stroke="${palette.ribbon}" stroke-width="8" />
        <path d="M350 362 c0 -34 24 -58 54 -58 s54 24 54 58 c0 28 -20 50 -54 50 s-54 -22 -54 -50 Z" fill="#fff7ef" stroke="${palette.accent}" stroke-width="6" />
        <circle cx="382" cy="322" r="18" fill="#f0c5a7" /><circle cx="426" cy="322" r="18" fill="#f0c5a7" />
        <rect x="512" y="304" width="92" height="118" rx="18" fill="#f8f2ff" stroke="${palette.ribbon}" stroke-width="6" />
        <path d="M536 350 h44 M536 378 h44" stroke="${palette.accent}" stroke-width="6" stroke-linecap="round" />`;
    case 'Treat Jar Set':
      return `
        <ellipse cx="450" cy="505" rx="176" ry="24" fill="#d7c9d0" opacity="0.45" />
        <rect x="286" y="240" width="94" height="202" rx="28" fill="#fffdf8" stroke="${palette.ribbon}" stroke-width="8" />
        <rect x="402" y="220" width="104" height="222" rx="30" fill="#fff7ef" stroke="${palette.accent}" stroke-width="8" />
        <rect x="528" y="248" width="94" height="194" rx="28" fill="#fffdf8" stroke="${palette.ribbon}" stroke-width="8" />
        <rect x="302" y="210" width="62" height="36" rx="12" fill="${palette.ribbon}" />
        <rect x="424" y="188" width="60" height="38" rx="12" fill="${palette.ribbon}" />
        <rect x="544" y="216" width="62" height="36" rx="12" fill="${palette.ribbon}" />`;
    case 'Walking Essentials':
      return `
        <ellipse cx="450" cy="505" rx="176" ry="24" fill="#d7c9d0" opacity="0.45" />
        <path d="M330 438 C298 364 336 290 434 250" fill="none" stroke="${palette.ribbon}" stroke-width="14" stroke-linecap="round" />
        <path d="M434 250 C524 216 596 250 612 314" fill="none" stroke="${palette.ribbon}" stroke-width="14" stroke-linecap="round" />
        <circle cx="610" cy="322" r="22" fill="#fffdf8" stroke="${palette.accent}" stroke-width="8" />
        <rect x="286" y="302" width="132" height="126" rx="26" fill="#fff7ef" stroke="${palette.accent}" stroke-width="8" />
        <rect x="328" y="266" width="48" height="50" rx="18" fill="#fffdf8" stroke="${palette.ribbon}" stroke-width="6" />`;
    case 'Journey Pouch':
      return `
        <ellipse cx="450" cy="505" rx="176" ry="24" fill="#d7c9d0" opacity="0.45" />
        <path d="M270 304 Q286 240 350 240 h200 q64 0 80 64 l-30 124 q-10 42 -58 42 h-184 q-48 0 -58 -42 Z" fill="#fffdf8" stroke="${palette.ribbon}" stroke-width="8" />
        <path d="M302 312 h296" stroke="${palette.accent}" stroke-width="10" stroke-linecap="round" />
        <circle cx="450" cy="378" r="48" fill="#f8f2ff" stroke="${palette.ribbon}" stroke-width="6" />`;
    case 'Travel Journal':
      return `
        <ellipse cx="450" cy="505" rx="176" ry="24" fill="#d7c9d0" opacity="0.45" />
        <rect x="294" y="218" width="250" height="250" rx="22" fill="#fffdf8" stroke="${palette.ribbon}" stroke-width="8" />
        <path d="M334 286 h170 M334 330 h146 M334 374 h166" stroke="${palette.accent}" stroke-width="8" stroke-linecap="round" opacity="0.36" />
        <path d="M544 218 l56 42 v166" fill="none" stroke="${palette.ribbon}" stroke-width="8" stroke-linejoin="round" />
        <path d="M498 224 v252" stroke="${palette.ribbon}" stroke-width="8" opacity="0.3" />`;
    case 'Passport Wallet':
      return `
        <ellipse cx="450" cy="505" rx="176" ry="24" fill="#d7c9d0" opacity="0.45" />
        <rect x="276" y="240" width="178" height="222" rx="24" fill="#f8f2ff" stroke="${palette.ribbon}" stroke-width="8" />
        <path d="M338 302 q28 -22 56 0 q-28 22 -56 0 Z" fill="${palette.accent}" opacity="0.6" />
        <rect x="430" y="270" width="194" height="188" rx="26" fill="#fffdf8" stroke="${palette.accent}" stroke-width="8" />
        <path d="M470 316 h114 M470 356 h94 M470 396 h118" stroke="${palette.ribbon}" stroke-width="8" stroke-linecap="round" opacity="0.28" />`;
    case 'Sketch Ritual Set':
      return `
        <ellipse cx="450" cy="505" rx="176" ry="24" fill="#d7c9d0" opacity="0.45" />
        <rect x="248" y="292" width="404" height="148" rx="26" fill="#fffdf8" stroke="${palette.ribbon}" stroke-width="8" />
        <rect x="304" y="228" width="30" height="188" rx="14" fill="#d97706" />
        <rect x="354" y="210" width="30" height="206" rx="14" fill="#8b5cf6" />
        <rect x="404" y="238" width="30" height="178" rx="14" fill="#ef4444" />
        <rect x="468" y="252" width="118" height="126" rx="18" fill="#fff7ef" stroke="${palette.accent}" stroke-width="6" />
        <path d="M494 288 l50 54" stroke="${palette.ribbon}" stroke-width="8" opacity="0.28" />`;
    case 'Mini Gallery Frame':
      return `
        <ellipse cx="450" cy="505" rx="176" ry="24" fill="#d7c9d0" opacity="0.45" />
        <rect x="278" y="212" width="344" height="260" rx="20" fill="#c79b64" stroke="${palette.ribbon}" stroke-width="8" />
        <rect x="314" y="248" width="272" height="188" rx="10" fill="#fffdf8" stroke="${palette.accent}" stroke-width="6" />
        <path d="M350 388 l72 -84 l52 58 l46 -40 l58 66 Z" fill="#d8f3dc" stroke="${palette.ribbon}" stroke-width="6" />
        <circle cx="528" cy="298" r="18" fill="#f2c94c" opacity="0.72" />`;
    case 'Creative Prompt Deck':
      return `
        <ellipse cx="450" cy="505" rx="176" ry="24" fill="#d7c9d0" opacity="0.45" />
        <rect x="296" y="264" width="164" height="214" rx="20" fill="#fffdf8" stroke="${palette.ribbon}" stroke-width="8" />
        <rect x="364" y="230" width="164" height="214" rx="20" fill="#f8f2ff" stroke="${palette.accent}" stroke-width="8" />
        <rect x="432" y="196" width="164" height="214" rx="20" fill="#fff7ef" stroke="${palette.ribbon}" stroke-width="8" />
        <path d="M472 260 h84 M472 298 h64 M472 336 h86" stroke="${palette.accent}" stroke-width="8" stroke-linecap="round" opacity="0.34" />`;
    default:
      return `
        <ellipse cx="450" cy="500" rx="160" ry="28" fill="#d7c9d0" opacity="0.45" />
        <rect x="260" y="246" width="380" height="194" rx="28" fill="#fffdf8" stroke="${palette.ribbon}" stroke-width="8" />
        <circle cx="450" cy="344" r="62" fill="${palette.accent}" opacity="0.26" />
        <text x="450" y="360" text-anchor="middle" font-size="72">${escapeXml(palette.icon || '🎁')}</text>`;
  }
}

export function makeGiftImage({ title, category, itemType, icon, accent, wrap, ribbon }) {
  const safeTitle = escapeXml(title);
  const safeCategory = escapeXml(category);
  const safeItemType = escapeXml(itemType || category);
  const seed = hashString(title + category + itemType);

  const svg = `
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 900 700">
    <defs>
      <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stop-color="${wrap}" />
        <stop offset="100%" stop-color="#fffdf8" />
      </linearGradient>
      <linearGradient id="surface" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stop-color="#fffdf8" />
        <stop offset="100%" stop-color="#f3ece5" />
      </linearGradient>
      <filter id="shadow" x="-20%" y="-20%" width="140%" height="140%">
        <feDropShadow dx="0" dy="18" stdDeviation="16" flood-opacity="0.18" />
      </filter>
    </defs>

    <rect width="900" height="700" rx="48" fill="url(#bg)" />
    ${renderSparkles(seed, accent)}
    <path d="M0 548 C160 510 290 540 450 560 C616 582 744 560 900 526 L900 700 L0 700 Z" fill="url(#surface)" opacity="0.88" />
    <g filter="url(#shadow)">
      ${renderItem(itemType, { accent, wrap, ribbon, icon })}
    </g>
    <rect x="42" y="42" width="166" height="40" rx="20" fill="#ffffff" opacity="0.72" />
    <text x="126" y="68" text-anchor="middle" font-family="Verdana, sans-serif" font-size="20" font-weight="700" fill="#392b44">GiftWrapped</text>
    <rect x="72" y="572" width="756" height="86" rx="28" fill="#ffffff" opacity="0.90" />
    <text x="450" y="612" text-anchor="middle" font-family="Verdana, sans-serif" font-size="34" font-weight="700" fill="#392b44">${safeTitle}</text>
    <text x="450" y="642" text-anchor="middle" font-family="Verdana, sans-serif" font-size="20" fill="#6c5778">${safeItemType} · ${safeCategory}</text>
  </svg>`;

  return `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(svg)}`;
}
