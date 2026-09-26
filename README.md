# Casa que Acolhe

Microsite editorial para apresentar um estudo conceitual de readequação residencial voltado a idosos, com foco em segurança, orientação, autonomia, memória afetiva e conforto.

## Escopo atual

O material-fonte disponível documenta apenas **sala de estar + jantar**. O projeto não inventa plantas nem renders de quarto, banheiro e cozinha. Esses ambientes ficam explicitamente marcados como pendentes de fotos e medidas.

## Stack

HTML semântico + CSS + JavaScript nativo.

A opção por site estático é deliberada: este projeto não possui autenticação, banco ou estado de negócio. A entrega estática reduz dependências, runtime, superfície de falha, custo de carregamento e risco de exposição de dados, sendo adequada para Vercel/CDN.

## Design system

- Theme: Quiet Warm Architecture
- Display: Newsreader
- Accent: Cormorant Garamond
- Body: Atkinson Hyperlegible
- Motion: progressive enhancement com IntersectionObserver + requestAnimationFrame + CSS custom properties

## Recursos

- hero editorial;
- auditoria visual anonimizada;
- hotspots de risco;
- before/after acessível;
- diagrama conceitual de zonas;
- design bible;
- matriz filtrável de intervenções;
- cena noturna;
- galeria de 12 peças visuais;
- roadmap por fases;
- referências externas de segurança.

## Privacidade

As fotografias originais identificáveis não são publicadas no site. A vista “antes” é uma reconstituição anonimizada baseada na fotografia original.

## Arquivos

- `index.html`
- `styles.css`
- `motion.js`
- `assets/*.webp`
- `data/interventions.json`
- `docs/ARCHITECTURE_BRIEF.md`
- `docs/DESIGN_BIBLE.md`
- `docs/INTERVENTION_PLAN.md`
- `docs/QA_REPORT.md`
- `vercel.json`

## Deploy

Vercel: site estático, sem build command.

## Imagens

As visualizações fotorealistas são servidas por assets do Adobe Creative Cloud/Photoshop. As fotografias originais identificáveis dos moradores não são publicadas no HTML. A vista “antes” utilizada no comparador foi anonimizada por edição generativa preservando a configuração do ambiente.
