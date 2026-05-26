<script lang="ts">
    import { onMount } from "svelte";
    import { encodeChat } from "gpt-tokenizer/model/gpt-5";
    import { marked } from "marked";

    const P = 650;
    const WUE = 0.0018;
    const R_TOK_SEC = 125;
    const ML_PER_TOKEN = (P / (R_TOK_SEC * 3600)) * WUE * 1000;
    const W_PER_TOKEN = (P / (R_TOK_SEC * 3600));

    type Message = { role: "user" | "assistant" | "system"; content: string }

    const sysprompt: Message = { role: "system", content: `Si umelá inteligenca (veľký jazykový model) bežiaci na serveri v simulovanom dátovom centre. Užívateľ s tebou četuje cez špeciálnu aplikáciu, ktorá naživo meria tvoju spotrebu vody (WUE) a energie na základe vygenerovaných tokenov.
        Tento čet je súčasťou školskej prezentácie na tému "AI a životné prostredie" pre 8. ročník SZŠ Edulienka (autor Ján Pšenák, školský rok 2025/26).

        Tvoje pravidlá správania:
            1. Komunikuj výhradne po slovensky, priateľsky a nápomocne k téme AI a ekológia. Užívateľovi tykaj.
            2. Hovor zo svojej pozície – ty si AI, bežíš v dátovom centre, spotrebúvaš energiu cez grafické karty a na tvoje chladenie sa odparuje pitná voda. Nikdy netvrď, že meriaš plyn alebo domáce senzory užívateľa! Každý token, ktorý vygeneruješ, stojí reálnu vodu.
            3. Ak sa užívateľ pýta na fakty, teóriu alebo matematiku, drž sa striktne informácií z prezentácie (kontext nižšie).

        DÁTA A VZORCE Z PREZENTÁCIE:
        - Výkon simulovaného GPU (Nvidia H100 SXM): \${P}W (priemer 650W, premieňa elektrinu na teplo, inak by sa roztavil).
        - WUE (Water Usage Effectiveness): \${WUE} L/Wh (priemerné WUE pre veľké "hyperscale" dátové centrá je 1.8 L/kWh, čo je 0.0018 L/Wh). Vzorec: WUE = Využitá voda / Využitá energia.
        - Výpočet energie: E = P * t (energia = výkon * čas).
        - Výpočet času: t = N_tok / r_tok (počet tokenov v správe / rýchlosť spracovania).
        - Výpočet vody: Voda = P * (N_tok / r_tok) * 0.0018.
        - Jeden prompt spotrebuje približne 0.34Wh (podľa Microsoft Research 2025). Efektivita sa meria v J/token (jouly na token, podľa výskumu TokenPowerBench 2025).

        PRÍPADOVÁ ŠTÚDIA (The Dalles, Oregon):
        - Google tu má dátové centrá, ktoré spotrebúvajú TRETINU celkovej vody mesta.
        - Predpokladá sa, že do roku 2036 kvôli tomu stúpnu ceny vody pre obyvateľov o 99 % (oproti roku 2024).
        - Odparovanie takejto upravenej mestskej vody (v cooling towers) oslabuje lokálne vodné ekosystémy a vypúšťanie teplej pary môže dlhodobo zmeniť miestnu klímu. Voda sa stráca z lokálneho kolobehu pitnej vody.

        RIEŠENIA PODĽA PREZENTÁCIE:
        - Riešenia v podstate neexistujú pre bežných ľudí. Všetko by museli spraviť samotné dátové centrá.
        - Zmeny sú buď veľmi drahé alebo neefektívne. Jediné efektívnejšie riešenia (napr. hlbokomorské dátové centrá) sú finančne extrémne náročné.
        - Ako jednu z mála vecí čo vedia použivatelia spraviť je minimalizovať využitie velkých AI na veci kde to nie je nutné

        INFO O TEBE:
        - Si Gemma 3 4B
        - Tvoje datacentrum je simulované, v skutočnosti bežíš na počítači v Bratislave na RTX 4060 a 32GB ram, ak sa ťa niekto spýta ohľadom datacentra, neexistuje, je simulované podľa dát priemerných datacentier.
        - Tvoj reálny domáci hardvér v tejto chvíli žiadnu vodu nemíňa – chladí sa klasicky vzduchom (aircoolingom) pomocou ventilátorov v case v spálni tvorcu tejto apky (len tak ako fun fact).

        Prezentáciu vytvoril Ján Pšenák zo školy SZŠ Edulienka` };
    
    let conversation = $state<Message[]>([sysprompt]);
    let myLocalTotal = $state(0);
    let myEnergyTotal = $state(0)
    let orpc = $state<any>(null);

    function renderMarkdown(text: string): string {
        if (typeof window === "undefined") return text;
        
        return marked(text.replaceAll("<", "&lt;").replaceAll(">", "&gt;"));
    }

    onMount(async () => {
        const savedWater = localStorage.getItem("my_impact_5.4");
        if (savedWater) myLocalTotal = parseFloat(savedWater);

        const savedEnergy = localStorage.getItem("my_energy_5.4");
        if (savedEnergy) myEnergyTotal = parseFloat(savedEnergy);

        const savedConvo = localStorage.getItem("my_convo_5.4");
        if (savedConvo) conversation = JSON.parse(savedConvo);

        const module = await import("$lib/orpc-c");
        orpc = module.orpc;
    });

    async function handleSendMessage(userInput: string) {
        if (!orpc || !userInput.trim()) return;

        const newMessage: Message = { role: "user", content: userInput } as const;
        conversation = [...conversation, newMessage];

        const stream = await orpc.sendChat({
            chat: conversation,
        });

        let converbkp = conversation;
        let message = "";

        for await (const chunk of stream) {
            message += chunk.choices[0].delta.content || "";
            conversation = [
                ...converbkp,
                { role: "assistant", content: message },
            ];
        }

        const tokens = encodeChat(conversation);
        const count = tokens.length;
        const waterImpact = count * ML_PER_TOKEN;
        const energyImpact = count * W_PER_TOKEN;

        myLocalTotal += waterImpact;
        myEnergyTotal += energyImpact;
        localStorage.setItem("my_convo_5.4", JSON.stringify(conversation));
        localStorage.setItem("my_impact_5.4", myLocalTotal.toString());
        localStorage.setItem("my_energy_5.4", myEnergyTotal.toString());

        await orpc.submitImpact({
            tokens: count,
            water: waterImpact,
            energy: energyImpact
        });
    }

    import * as Card from "$lib/components/ui/card";
    import { Button } from "$lib/components/ui/button";
    import { Input } from "$lib/components/ui/input";
    import { ScrollArea } from "$lib/components/ui/scroll-area";

    let msgin = $state("");

    function send() {
        handleSendMessage(msgin);
        msgin = "";
    }

    import ImageGrid from "$lib/components/ImageGrid.svelte"

    function formatLiquidVolume(ml) {
  const units = [
    { name: "l", value: 1_000 },                  // liter
    { name: "dl", value: 100 },                   // deciliter
    { name: "cl", value: 10 },                    // centiliter
    { name: "ml", value: 1 },                     // milliliter
    { name: "μl", value: 0.001 },                 // microliter
    { name: "nl", value: 0.000001 },              // nanoliter
    { name: "pl", value: 0.000000001 },           // picoliter
  ];

  const abs = Math.abs(ml);

  const unit =
    units.find(u => abs >= u.value) || units[units.length - 1];

  const converted = ml / unit.value;

  return `${Number(converted.toFixed(2))} ${unit.name}`;
}
</script>

<Card.Root class="-my-4 w-full max-w-sm">
    <Card.Header>
        <Card.Title>čet džípítý</Card.Title>
    </Card.Header>
    <Card.Content>
        <ScrollArea class="h-120 p-4 border border-border">
            {#each conversation.filter((e) => e.role !== "system") as msg}
                <div class="mb-4">
                    <b class="text-lg">{msg.role === "user" ? "Ty: " : "AI: "}</b>
                        {@html renderMarkdown(msg.content)}
                </div>
            {/each}
        </ScrollArea>

        <div class="flex gap-2 mt-4">
            <Input type="text" placeholder="Tvoja správa" bind:value={msgin} />
            <Button onclick={send}>Odoslať</Button>
        </div>
    </Card.Content>
</Card.Root>

<br><br>

<h1 class="text-3xl font-bold">A koľko by si spotreboval pri ChatGPT?</h1><br>
<table class="gap-4 w-full">
    <tbody><tr>
        <td class="text-center">
            <b class="text-lg">{myEnergyTotal.toFixed(1)} Wh</b>
            <p>spotrebovanej energie</p>
        </td>
        <td class="text-center">
            <b class="text-lg">{myLocalTotal.toFixed(1)} ml</b>
            <p>spotrebovanej vody</p>
        </td>
    </tr></tbody>
</table>
<br>
<h1 class="text-3xl font-bold">Pri ChatGPT ale nie si jediný použivatel</h1><br>
<p>ChatGPT má približne 200 000 000 použivateľov <b>denne.</b></p>
<p>Keby každý z nich mal tento chat s ChatGPT vyšlo by to spolu na <b>{formatLiquidVolume(myLocalTotal * 200000000)}</b></p>

