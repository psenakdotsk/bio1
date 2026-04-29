---
# try also 'default' to start simple
theme: eloc
# random image from a curated Unsplash collection by Anthony
# like them? see https://unsplash.com/collections/94734566/slidev
# some information about your slides (markdown enabled)
title: AI a životné prostredie
# https://sli.dev/features/drawing
drawings:
  persist: false
# slide transition: https://sli.dev/guide/animations.html#slide-transitions
transition: fade
---

# AI a životné prostredie
Ján Pšenák

<div class="absolute bottom-6 right-6">8. ročník, SZŠ Edulienka 2025/26</div>
<img class="absolute bottom-6 left-6 rounded-3xl w-20" src="/elogo.png" />

---

# Úvod
- AI dnes najdeme všade
- Jeden z hlavných problémov je ale chladenie, na ktoré sa používa voda
- Otázka ktorú som chcel zodpovedať bola: Kolko vody míňame použivaním AI? Je to také zlé ako všetci hovoria že to je?

---

# Čo je to LLM
- LLM (Large Language Model) je podkategória umelej inteligencie na generovanie textu
- Nájdeme ho v aplikáciach ako ChatGPT, Claude, Gemini, ale dokonca aj Google, Gmail, Spotify, sociálne siete a iné aplikácie.

---
transition: slide-up
---

# Ako funguje AI (velmi zjednodušene)

- Prvý krok je tzv. tokenizácia.
- Tokenizácia je proces delenia textu na tzv. tokeny a čislovanie ich (čísluje ich lebo AI je v skutočnosti velký matematický príklad)
- Tokeny nie sú to isté ako slová

---
transition: slide-down
---

# Ako funguje AI (velmi zjednodušene)
### (demo tokenizácie)

<span><Token :index="4421">Token</Token><Token :index="482">iz</Token><Token :index="75413">ácia</Token><Token :index="4725"> nie</Token><Token :index="1264"> je</Token><Token :index="316"> to</Token><Token :index="2496"> ist</Token><Token :index="377">é</Token><Token :index="20267"> ako</Token><Token :index="18203"> roz</Token><Token :index="72340">delen</Token><Token :index="396">ie</Token><Token :index="898"> na</Token><Token :index="1925"> sl</Token><Token :index="49271">ová</Token><Token :index="13">.</Token></span>

---
layout: two-cols
transition: slide-up
---

# Ako funguje AI (velmi zjednodušene)

- Ďalej tokeny prechádzajú cez neurónovú sieť generujúcu text

::right::
<img src="/nn.png" class="ml-16 w-150" />

---
src: ./pages/inference.md
transition: slide-down
---

---
layout: center
---

<h1 class="text-center">Tento proces ale stojí vela energie*</h1>
<p class="text-xs text-center">* podľa velkosti modelu, pri modeloch ako GPT-5.4 z ChatGPT stojí vela energie</p>

---

# Energia

- AI beží (takmer vždy) v dátových centrách
- Každý prompt = výpočty (podobné ako sme si ukázali len s ešte viac vecmi)
- Podla výskumu od Microsoft Research (2025) - Energy Use of AI Inference: Efficiency Pathways and Test-Time Compute, jeden prompt je približne 0.34Wh (1224 joulov)
- Toto ale závisí podľa velkosti modelu a velkosti promptu
- O tomto rozpráva výskum TokenPowerBench od <span class="text-xs">Chenxu Niu, Wei Zhang, Jie Li, Yongjian Zhao, Tongyang Wang, Xi Wang, Yong Chen (2025)</span>

---

# Voda

- Keďže existuje zákon zachovania energie, energia z hardvéru serverov sa premieňa na teplo, a datacentrá nechcú aby sa servery pokazili od prehrievania musia ich chladiť
- Najefektívnejšia a zároveň lacná metóda na chladenie vo velkostí týchto datacentier je vodné chladenie a odparovacie chladiace systémy (cooling towers)
- Voda sa používa na odvádzanie tepla, ktoré vzniká pri výpočtoch

---

# Prečo je to problém

- Na chladenie sa vela krát používa upravená mestská voda (kvalitou podobná pitnej vode)
- Problém prichádza s tým že táto voda sa potom vyparuje do atmosféry
- Tam problém prichádza s tým že keď sa vyparí pitná voda, dostane sa do kolobehu vody a nemusí sa dostať naspäť do pitného zdroja, čo spôsobí stratu pitnej vody
- Pri velkom škálovaní ide o velmi významné množstvo vody

---

# Trochu matematiky