import { os } from '@orpc/server'
import { z } from 'zod' // oRPC používa Zod na validáciu vstupov

import OpenAI from 'openai'
const openai = new OpenAI({
  baseURL: import.meta.env.VITE_OLLAMA, // Pre Ollama (alebo :1234/v1 pre LM Studio)
  apiKey: 'ollama', // Ollama kľúč nepotrebuje, ale knižnica ho vyžaduje (daj hocičo)
})

// Globálne premenné (zostanú v pamäti Bun procesu počas tvojho dema)
let globalWaterMl = 0
let globalEnergy = 0
let globalTokens = 0

// Definícia procedúr
const submitImpact = os
    .input(z.object({
        water: z.number(),
        tokens: z.number(),
        energy: z.number()
    }))
    .handler(({ input }) => {
        globalWaterMl += input.water
        globalTokens += input.tokens
        globalEnergy += input.energy
        
        console.log(`Aktuálny stav: ${globalWaterMl.toFixed(2)}ml | ${globalTokens} tokenov | ${globalEnergy}Wh`)
        
        return { success: true }
    })

const getStats = os
    .handler(() => {
        return {
            totalMl: globalWaterMl,
            totalTokens: globalTokens,
            // Prepočet na litre pre lepšiu predstavu na tabuli
            totalLitres: globalWaterMl / 1000,
            totalWatts: globalEnergy
        }
    })

// router.ts
const sendChat = os
    .input(z.object({
        chat: z.array(z.object({
            role: z.enum(["user", "assistant", "system"]),
            content: z.string()
        }))
    }))
    .handler(async function* ({ input }) {
        // Simulácia GPT-5.4 streamingu
        const stream = await openai.chat.completions.create({
            model: import.meta.env.VITE_MODEL,
            messages: input.chat,
            stream: true
        })

        yield* stream
    })

const router = {
    submitImpact,
    getStats,
    sendChat
}

export default router
export type routerType = typeof router