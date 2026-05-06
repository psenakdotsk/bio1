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
<v-clicks>

- AI dnes najdeme všade
- Jeden z hlavných problémov je ale chladenie, na ktoré sa používa voda 
- Otázka ktorú som chcel zodpovedať bola: Koľko vody míňame použivaním AI? Je to také zlé ako všetci hovoria že to je?

</v-clicks>
---

# Čo je to LLM

<v-clicks>

- LLM (Large Language Model) je podkategória umelej inteligencie na generovanie textu
- Nájdeme ho v aplikáciach ako ChatGPT, Claude, Gemini, ale dokonca aj Google, Gmail, Spotify, sociálne siete a iné aplikácie.

</v-clicks>

---
transition: slide-up
---

# Ako funguje AI (veľmi zjednodušene)

- Prvý krok je tzv. tokenizácia.
- Tokenizácia je proces delenia textu na tzv. tokeny a čislovanie ich (čísluje ich lebo AI je v skutočnosti velký matematický príklad)
- Tokeny nie sú to isté ako slová

---
transition: slide-down
---

# Ako funguje AI (veľmi zjednodušene)
### (demo tokenizácie)

<span><Token :index="4421">Token</Token><Token :index="482">iz</Token><Token :index="75413">ácia</Token><Token :index="4725"> nie</Token><Token :index="1264"> je</Token><Token :index="316"> to</Token><Token :index="2496"> ist</Token><Token :index="377">é</Token><Token :index="20267"> ako</Token><Token :index="18203"> roz</Token><Token :index="72340">delen</Token><Token :index="396">ie</Token><Token :index="898"> na</Token><Token :index="1925"> sl</Token><Token :index="49271">ová</Token><Token :index="13">.</Token></span>

---
layout: two-cols
transition: slide-up
---

# Ako funguje AI (veľmi zjednodušene)

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
<p class="text-xs text-center">* podľa veľkosti modelu, pri modeloch ako GPT-5.4 z ChatGPT stojí vela energie</p>

---

# Energia

- AI beží (takmer vždy) v dátových centrách
- Každý prompt = výpočty (podobné ako sme si ukázali len s ešte viac vecmi)
- Podla výskumu od Microsoft Research (2025) - Energy Use of AI Inference: Efficiency Pathways and Test-Time Compute, jeden prompt je približne 0.34Wh (1224 joulov)

---

# Energia

- Toto ale závisí podľa veľkosti modelu a veľkosti promptu
- O tomto rozpráva výskum TokenPowerBench od <span class="text-xs">Chenxu Niu, Wei Zhang, Jie Li, Yongjian Zhao, Tongyang Wang, Xi Wang, Yong Chen (2025)</span>
- Hovorí o tom od čoho závisí energia minutá pri používaní LLM
- Hlavne ale hovorí o jednotke J/token (jouly na token)
- Toto je asi hlavná jednotka na meranie energetickej efektivity pri AI modeloch

---

# Voda

- Keďže existuje zákon zachovania energie, energia z hardvéru serverov sa premieňa na teplo, a datacentrá nechcú aby sa servery pokazili od prehrievania musia ich chladiť
- Najefektívnejšia a zároveň lacná metóda na chladenie vo veľkostí týchto datacentier je vodné chladenie a odparovacie chladiace systémy (cooling towers)
- Voda sa používa na odvádzanie tepla, ktoré vzniká pri výpočtoch
- Na meranie efektivity sa využíva veličina WUE (Water Usage Effectiveness), vypočítava sa vzorcom $WUE = \frac{Využitá \; voda}{Využitá \; energia}$

---

# Prečo je to problém

- Na chladenie sa velakrát používa upravená mestská voda (kvalitou podobná pitnej vode)
- Problém prichádza s tým že táto voda sa potom vyparuje do atmosféry
- Tam problém prichádza s tým že keď sa vyparí pitná voda, dostane sa do kolobehu vody a nemusí sa dostať naspäť do pitného zdroja, čo spôsobí stratu pitnej vody
- Pri velkom škálovaní ide o veľmi významné množstvo vody

---

# Trochu matematiky

Začneme zakladným príkladom na výpočet energie


$E = P \cdot t$
- E = energia (Wh)
- P = výkon grafickej karty (W)
- t = čas výpočtu (h)

---

# Trochu matematiky

Čas závisí od počtu tokenov

$t = \frac{N_{tok}}{r_{tok}}$
- $N_{tok} = počet tokenov v správe
- $r_{tok}$ = rýchlosť spracovania (tokeny za hodinu)

---

# Trochu matematiky

Toto spojíme do vzorcai

$E = P \cdot \frac{N_{tok}}{r_{tok}}$

---

# Trochu matematiky

Na výpočet využitej vody vieme vynásobiť hodnotu WUE AI datacentra energiou pri generovaní. Podľa Datacenter Knowledge, priemerné WUE pre veľké datacentrá je 1.8L/kWh. To je 0.0018L/Wh

Teraz ak chceme získať počet litrov vody urobíme to takto.

$Voda = P \cdot \frac{N_{tok}}{r_{tok}} \cdot 0.0018$

---

# Trochu matematiky

Ešte ale nemáme zodpovedanú otázku čo je $P$.

<span v-click class="text-center">

$P$ je energia generovaná grafickou kartou, v tomto prípade vo wattoch. Pri grafickej karte Nvidia H100 SXM, často využívanej pri AI modeloch, je energia 600-680W. Ako priemer si zoberieme `650W`

</span>
---

# Trochu matematiky

<span>S týmto si vieme urobiť nasledujúce vzorce na počítanie energie a minutej vody</span>

$E = 650 \cdot \frac{N_{tok}}{r_{tok}}$

$Voda = 650 \cdot \frac{N_{tok}}{r_{tok}} \cdot 0.0018$

---

# Zdroje
- [https://www.datacenterknowledge.com/cooling/a-guide-to-data-center-water-usage-effectiveness-wue-and-best-practices](https://www.datacenterknowledge.com/cooling/a-guide-to-data-center-water-usage-effectiveness-wue-and-best-practices)