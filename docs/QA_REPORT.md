# QA Report

## Escopo
Microsite estático, sem backend, publicado como arquivos imutáveis em CDN.

## Critérios
- conteúdo visível sem JavaScript;
- progressive enhancement de motion;
- `prefers-reduced-motion` suportado;
- navegação por teclado e foco visível;
- menu mobile operável;
- before/after controlável por `<input type="range">`;
- imagens fora da primeira dobra com lazy loading;
- hero com `fetchpriority="high"`;
- imagens WebP sem exposição das fotos originais identificáveis;
- diagramas rotulados e tabela com conteúdo textual equivalente.

## Breakpoints planejados
1440 / 1280 / 1024 / 768 / 430 / 390 / 375 / 360.

## Limitação de QA
Lighthouse e validação visual automatizada em browser dependem de runtime de navegador disponível. O build estático é validado por integridade de HTML, referências de assets e sintaxe JavaScript.
