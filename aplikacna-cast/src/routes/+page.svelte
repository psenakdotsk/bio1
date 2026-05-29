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

    const sysprompt: Message = { role: "system", content: `Si AI model. Rozprávaj sa s použivateľom hlavne po Slovensky. ` };
    
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

    function formatNumberString(numstr: string) {
        const numarr = numstr.split("").reverse()
        const newArr = []

        let n = 0;
        let decimal = true
        for(const numi in numarr) {
            if(!decimal) n++;
            const num = numarr[numi]
            newArr.unshift(num)
            if(num===".") decimal = false;
            if(n===3 && !decimal && numarr[+numi+1] !== ".") {
                n=0
                newArr.unshift(" ")
            }
        }

        return newArr.join("")
    }

    function formatLiquidVolume(ml: number) {
  const units = [
    { name: "l", value: 1_000 },                  // liter
    { name: "dl", value: 100 },                   // deciliter
    { name: "cl", value: 10 },                    // centiliter
    { name: "ml", value: 1 },                     // milliliter
  ];

  const abs = Math.abs(ml);

  const unit =
    units.find(u => abs >= u.value) || units[units.length - 1];

  const converted = ml / unit.value;

  return `${formatNumberString(converted.toFixed(2))} ${unit.name}`;
}

function formatEnergy(wh: number) {
  let unit = "Wh"
  if(wh > 100) {
        wh /= 1000
        unit = "kWh"
    }

  return `${formatNumberString(wh.toFixed(2))} ${unit}`;
}

function deleteChat() {
    localStorage.removeItem("my_convo_5.4")
    localStorage.removeItem("my_impact_5.4")
    localStorage.removeItem("my_energy_5.4")
    location.reload()
}

onMount(() => {
    if(!localStorage.getItem("visited")) {
        localStorage.setItem("visited", "true")
        orpc.addUser()
    }
})
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

{#if myEnergyTotal === 0 || myLocalTotal === 0}
    <p class="text-muted-foreground italic">Napíš prvú správu pre výpočet porovnaní...</p>
{:else}

<h1 class="text-3xl font-bold">A koľko by si spotreboval pri ChatGPT?</h1><br>
<table class="gap-4 w-full">
    <tbody><tr>
        <td class="text-center">
            <b class="text-lg">{formatEnergy(myEnergyTotal)}</b>
            <p>spotrebovanej energie</p>
        </td>
        <td class="text-center">
            <b class="text-lg">{formatLiquidVolume(myLocalTotal)}</b>
            <p>spotrebovanej vody</p>
        </td>
    </tr></tbody>
</table>
<br>
<h1 class="text-3xl font-bold">Pri ChatGPT ale nie si jediný použivatel</h1><br>
<p>ChatGPT má približne 200 000 000 použivateľov <b>denne.</b></p>
<p>Keby každý z nich mal tento chat s ChatGPT vyšlo by to spolu na <b>{formatLiquidVolume(myLocalTotal * 200000000)}</b></p>

<br>

<h1 class="text-3xl font-bold">To je velké číslo, ale koľko to je naozaj?</h1><br>

    <p>Priemerný človek vypije 2l vody denne. 
        Tento chat napísaný každým denným použivateľom ChatGPT je ako voda vypitá <b>{((myLocalTotal * 200000000) / 2000).toFixed(0)} ľuďmi</b>
    </p>
    <br>

    <p>Jeden cyklus práčky spotrebuje približne 0.50kWh elektriny. 
        Tento chat napísaný každým denným použivateľom ChatGPT spotrebuje energiu na <b>{ (myEnergyTotal * 2 * 200000000).toFixed(0) } cyklov</b>
    </p>
    <br>

    <p>iPhone 17 nabiješ 
        <b>{((myEnergyTotal * 200000000) / 15).toFixed(0)} krát</b> energiou spotrebovanou týmto chatom napísaným každým denným použivateľom ChatGPT
    </p>



    <p></p>

    <br>
    <hr>
    <br><br>

    <Button onclick={deleteChat}>Zmazať chat</Button>
{/if}