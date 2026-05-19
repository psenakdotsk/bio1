<script lang="ts">
    import { onMount } from "svelte";
    import { encodeChat } from "gpt-tokenizer/model/gpt-5";

    // Stav konverzácie a lokálneho dopadu
    let conversation = $state<
        { role: "user" | "assistant" | "system"; content: string }[]
    >([]);
    let myLocalTotal = $state(0);
    let orpc = $state<any>(null);

    // Konštanty z prezentácie
    const P = 650;
    const WUE = 0.0018;
    const R_TOK_SEC = 125;
    const ML_PER_TOKEN = (P / (R_TOK_SEC * 3600)) * WUE * 1000;

    onMount(async () => {
        // Obnova celkovej histórie vody
        const savedWater = localStorage.getItem("my_impact_5.4");
        if (savedWater) myLocalTotal = parseFloat(savedWater);

        // Voliteľné: Ak chceš obnoviť aj históriu správ z localStorage
        const savedConvo = localStorage.getItem("my_convo_5.4");
        if (savedConvo) conversation = JSON.parse(savedConvo);

        const module = await import("$lib/orpc-c");
        orpc = module.orpc;
    });

    async function handleSendMessage(userInput: string) {
    if (!orpc || !userInput.trim()) return;

    // 1. Add user message to history
    const newMessage = { role: "user", content: userInput } as const;
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

    // 2. Tokenize the ENTIRE conversation history (like real APIs charge)
    const tokens = encodeChat(conversation);
    const count = tokens.length;

    // 3. Compute water impact for this total turn
    const waterImpact = count * ML_PER_TOKEN;

    // 4. FIX: Correctly update state and persist BOTH conversation and water total
    myLocalTotal += waterImpact;
    localStorage.setItem("my_convo_5.4", JSON.stringify(conversation));
    localStorage.setItem("my_impact_5.4", myLocalTotal.toString()); // <-- FIXED

    // 5. FIX: Send both required properties matching backend Zod validator
    await orpc.submitImpact({
        tokens: count,
        water: waterImpact // <-- FIXED
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
</script>

<Card.Root class="-my-4 w-full max-w-sm">
    <Card.Header>
        <Card.Title>Aplikačná časť k AI a životné prostredie</Card.Title>
    </Card.Header>
    <Card.Content>
        <ScrollArea class="h-120 p-4 border border-border"
            >{#each conversation.filter((e) => e.role !== "system") as msg}
                <p>
                    <b>{msg.role === "user" ? "Ty: " : "AI: "}</b>{msg.content}
                </p>
            {/each}</ScrollArea
        >

        <div class="flex">
            <Input type="text" placeholder="Tvoja správa" bind:value={msgin} />
            <Button onclick={send}>Odoslať</Button>
        </div>
    </Card.Content>
</Card.Root>

