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
---

# Ako funguje AI (velmi zjednodušene)

- Ďalej tokeny prechádzajú cez neurónovú sieť generujúcu text

::right::
<img src="/nn.png" class="ml-16 w-150" />

---

<NeuralNet />