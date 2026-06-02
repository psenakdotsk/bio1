---
theme: academic
title: AI a životné prostredie
drawings:
  persist: false
transition: fade
hideInToc: true
coverDate: 
---

# AI a životné prostredie
Ján Pšenák

<div class="absolute bottom-6 right-6">8. ročník, SZŠ Edulienka 2025/26</div>
<img class="absolute bottom-6 left-6 rounded-3xl w-20" src="/elogo.png" alt="school logo" />

---
hideInToc: true
---

# Obsah

<Toc columns="3" />

---

# Úvod
<v-clicks>

- AI dnes nájdeme všade
- Jeden z hlavných problémov je chladenie, pri ktorom sa používa voda 
- Otázka ktorú som chcel zodpovedať, bola: Koľko vody míňame používaním AI? Je to také zlé, ako všetci hovoria, že to je?

</v-clicks>


---

# Prečo som si vybral tému

- Keďže AI tu využíva takmer každý a AI má skrytú cenu v environmentalistike, prišlo mi, ako dôležité na to poukázať

---

# Pôvod problému

- Každý jeden výpočet v čipoch premieňa elektrickú energiu na teplo
- Toto teplo sa musí z čipu odviesť preč, inak by sa roztavil.
- Pre firmy je lacnejšie vodu vypariť do vzduchu a kúpiť ďalšiu, než investovať do drahých systémov, ktoré ju točia dookola využívajúc stále tú istú vodu
<img src="/ctower.jpg">

<!--
Obrázok je chladiaca veža
-->

---

# Vzorka (alebo koho/čo to ovplyvňuje)

- Ľudia v oblastiach blízko datacentier
  - V meste The Dalles, Oregon má Google datacentrá, ktoré spotrebúvajú **tretinu** celkovej vody mesta
  - Predpokladá sa, že do 2036 ceny vody im narastú o 99%
- Príroda
  - Keďže datacentrá využívajú takéto veľké množstvá vody, môže oslabovať lokálne vodné ekosystémy

<img src="/thedallesdtct.jpg" class="mt-4 ml-2 w-80">

---

# Čo je to LLM

<v-clicks>

- LLM (Large Language Model) je podkategória umelej inteligencie na generovanie textu
- Nájdeme ho v aplikáciach, ako ChatGPT, Claude, Gemini, ale dokonca aj Google, sociálne siete a iné aplikácie.

</v-clicks>

---
transition: slide-up
---

# Ako funguje AI (veľmi zjednodušene)

- Prvý krok je tzv. tokenizácia.
- Tokenizácia je proces delenia textu na tzv. tokeny a číslovanie ich (čísluje ich, lebo AI je v skutočnosti veľký matematický príklad)
- Tokeny nie sú to isté ako slová

---
transition: slide-down
hideInToc: true
layout: center
---

# Ako funguje AI (veľmi zjednodušene)
### (demo tokenizácie)

<span><Token :index="4421">Token</Token><Token :index="482">iz</Token><Token :index="75413">ácia</Token><Token :index="4725"> nie</Token><Token :index="1264"> je</Token><Token :index="316"> to</Token><Token :index="2496"> ist</Token><Token :index="377">é</Token><Token :index="20267"> ako</Token><Token :index="18203"> roz</Token><Token :index="72340">delen</Token><Token :index="396">ie</Token><Token :index="898"> na</Token><Token :index="1925"> sl</Token><Token :index="49271">ová</Token><Token :index="13">.</Token></span>

---
layout: two-cols
transition: slide-up
hideInToc: true
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

<h1 class="text-center">Tento proces ale stojí veľa energie*</h1>
<p class="text-xs text-center">* podľa veľkosti modelu, pri modeloch, ako GPT-5.4 z ChatGPT stojí veľa energie</p>

---

# Energia

- AI beží (takmer vždy) v dátových centrách
- Každý prompt = výpočty (podobné, ako sme si ukázali len s ešte viac vecami)
- Podla výskumu od Microsoft Research (2025) - Energy Use of AI Inference: Efficiency Pathways and Test-Time Compute, jeden prompt je približne 0.34Wh (1224 joulov)

---
hideInToc: true
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

<img src="/voda.png" class="mt-4 h-50" />

---

# Prečo je to problém

- Na chladenie sa veľakrát používa upravená mestská voda (kvalitou podobnej pitnej vode)
- Problém nastáva s tým, že táto voda sa potom vyparuje do atmosféry
- Tam problém nastáva s tým, že keď sa vyparí pitná voda, dostane sa do kolobehu vody a nemusí sa dostať naspäť do pitného zdroja, čo spôsobí stratu pitnej vody
- Pri veľkom škálovaní ide o veľmi významné množstvo vody

---

# Prejavy

- Ak datacentrum niekde odparí 1mil litrov vody denne, neprejaví sa to všade rovnako. Prejaví sa to hlavne miestne, kde zrazu chýba voda ktorú "vypila" AI
- Taktiež vypúšťanie teplej pary dlhodobo vie tam zmeniť klímu

---

# Trochu matematiky

Začneme základným príkladom na výpočet energie


$E = P \cdot t$
- E = energia (Wh)
- P = výkon grafickej karty (W)
- t = čas výpočtu (h)

---
hideInToc: true
---

# Trochu matematiky

Čas závisí od počtu tokenov

$t = \frac{N_{tok}}{r_{tok}}$
- $N_{tok}$ = počet tokenov v správe
- $r_{tok}$ = rýchlosť spracovania (tokeny za hodinu)

---
hideInToc: true
---

# Trochu matematiky

Toto spojíme do vzorca

$E = P \cdot \frac{N_{tok}}{r_{tok}}$

---
hideInToc: true
---

# Trochu matematiky

Na výpočet využitej vody vieme vynásobiť hodnotu WUE AI datacentra energiou pri generovaní. Podľa Datacenter Knowledge, priemerné WUE pre veľké "hyperscale" dátové centrá je približne 1.8 L/kWh. To je 0.0018L/Wh

Teraz ak chceme získať počet litrov vody urobíme to takto.

$Voda = P \cdot \frac{N_{tok}}{r_{tok}} \cdot 0.0018$

---
hideInToc: true
---

# Trochu matematiky

Ešte ale nemáme zodpovedanú otázku čo je $P$.

<span v-click class="text-center">

$P$ je energia generovanou grafickou kartou, v tomto prípade vo wattoch. Pri grafickej karte Nvidia H100 SXM, často využívanej pri AI modeloch, je energia 600-680W. Ako priemer si zoberieme `650W`

</span>

---
hideInToc: true
---

# Trochu matematiky

<span>S týmto si vieme urobiť nasledujúce vzorce na počítanie energie a minutej vody</span>

<v-clicks>

$E = 650 \cdot \frac{N_{tok}}{r_{tok}}$

$Voda = 650 \cdot \frac{N_{tok}}{r_{tok}} \cdot 0.0018$

</v-clicks>

---
hideInToc: true
layout: center
---

<span class="text-center">

# **POZOR! Toto nevypočíta presné číslo, ale vypočíta to len odhad**

</span>

---

# Koľko vody to ale naozaj je?

- Ako aplikačnú časť som urobil simuláciu
- V simulácii chatujete s AI modelom (Gemma 3 4B) a počíta to dáta koľko by to spotrebovalo 
- Potom tam bude štatistika porovnávajúca tvoj chat s inými vecami čo spotrebovávajú energiu a vodu.

<!--
Podľa neoficiálnych odhadov ChatGPT má asi 1 trilión parametrov (2500x väčšie), ale toto nie sú oficiálne zdroje
-->

---

# Plán projektu

- Keďže apka je viacmenej robenie jednej veci, bral som to ako jednu úlohu na ktorú som mal čas robiť keď mám slidy aspoň zväčša hotové.

---

[//]: # ()
[//]: # (# Zopár štatistík pre porovnanie)

[//]: # ()
[//]: # (- Jeden človek bežne vypije 2l vody za deň.)

[//]: # (- Celková denná spotreba priemerného Slováka je asi 100l)

[//]: # (- Z toho osobná hygiena a splachovanie WC je 70l)

[//]: # (- Olympijský bazén ma objem asi 2.5mil litra vody)

[//]: # (- Na vypestovanie 1kg ryže sa spotrebuje 3000l vody)

[//]: # (- Na produkciu 1kg mäsa sa spotrebuje asi 16000l vody)

[//]: # (- Na 10 jabĺk sa spotrebuje asi 700l vody)

[//]: # ()
[//]: # (---)

# Koľko je jedno `ahoj!`

- V našej simulácii spotrebuje 0.11 Wh energie, a 0,19 ml vody
- Pri 200 miliónoch používateľoch denne (približne koľko má ChatGPT) je to 38 480 l vody
- To by pokrylo približne polovicu toho čo by vypili ľudia v Karlovej Vsi za deň
- Priemerný Slovák by si s touto vodou vystačil na rok aj s hygienou
- Dali by sa s tým naplniť až 2 stredne veľké rodinné bazény (priemer asi 5m a hĺbku 1m)
- Dali by sa uvariť 2 šálky kávy pre každého Petržalčana

<!--
Petržálka: 113000 obyvatelov

1 šálka kávy: 0.15l

Kolko šálok kávy: 38 480 / 0.15 = 256533
kolko šálok na človeka 256533 / 161000 = 2
-->

---
layout: center
hideInToc: true
---

# Na svete zomiera podľa WHO asi 1 milión ľudí na následky nedostatku pitnej vody.
Z toho je takmer 400 000 detí do 5 rokov (asi 1100 každý deň)

- Teraz si to predstavte v kontexte toho, že jedno `ahoj` od každého používateľa minie spolu 38 480l vody

<!--
Jeden provokatívny slide
-->

---
layout: center
---

# Demo apky

<CustomPlayer src="/demo.mp4" />

---
layout: center
---

<img src="https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=https://bio.psenaksk.dpdns.org" alt="">
<p class="text-center font-bold">bio.psenaksk.dpdns.org</p>

---

# Ako to vieme riešiť?

<v-clicks depth="2">

- Nevieme
- Všetko čo ide spraviť by
    1. museli spraviť samotné datacentrá
    2. bolo by buď veľmi drahé alebo neefektívne
- Jediné riešenia, ktoré existujú, ktoré sú efektívnejšie (hlbokomorské datacentrá) sú peňažne drahé.
- Najjednoduchšie a najlacnejšie riešenie zo strany datacentier je využívať nepitnú vodu (niektoré to už robia)
- Ako jednu z mála vecí čo vieme spraviť je minimalizovať využitie veľkých AI na veci kde to nie je nutné

</v-clicks>

---

# Výzvy pri robení projektu

- Časový management
- Dostupnosť dát

---

# Zdroje
- [https://www.datacenterknowledge.com/cooling/a-guide-to-data-center-water-usage-effectiveness-wue-and-best-practices](https://www.datacenterknowledge.com/cooling/a-guide-to-data-center-water-usage-effectiveness-wue-and-best-practices)
- https://www.watersolutions.sk/info/spotreba-vody-na-slovensku/
- https://www.demandsage.com/chatgpt-statistics/
- https://www.digitaltrends.com/phones/iphone-17-charging-speeds/
- https://sk.factory-water-fountain-equipment.com/info/standard-dimensions-of-international-swimming-31829358.html
- https://www.activesustainability.com/water/do-you-know-your-water-footprint-7-pieces-of-curious-data-about-water-usage
- https://www.opb.org/article/2026/01/15/as-googles-water-demands-grow-the-dalles-aims-to-pull-more-from-mount-hood-forest/
- https://sk.wikipedia.org/wiki/Bratislava_%E2%80%93_mestsk%C3%A1_%C4%8Das%C5%A5_Petr%C5%BEalka
- https://sk.wikipedia.org/wiki/Bratislava_%E2%80%93_mestsk%C3%A1_%C4%8Das%C5%A5_Star%C3%A9_Mesto
- https://sk.wikipedia.org/wiki/Bratislava_%E2%80%93_mestsk%C3%A1_%C4%8Das%C5%A5_Karlova_Ves

---
layout: center
hideInToc: true
---

# Ďakujem za pozornosť
