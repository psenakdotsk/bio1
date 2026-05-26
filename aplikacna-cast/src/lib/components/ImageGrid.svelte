<script lang="ts">
    let { value, threshold = 500, src } = $props<{ value: number, threshold?: number, src: any }>();

    let fullBottles = $derived(Math.floor(value / threshold));
    let partialFill = $derived((value % threshold) / threshold);
</script>

<div class="flex flex-wrap gap-2 items-end">
    <!-- Plné fľaše -->
    {#each Array(fullBottles) as _}
        <img class="w-12 h-12 bg-red-600 rounded-t-lg rounded-b-sm animate-in zoom-in duration-500" src={src}
                alt="obrazok" />
    {/each}

    <!-- Čiastočne naplnená fľaša -->
    {#if partialFill > 0}
        <div class="w-8 h-12 rounded-t-lg rounded-b-sm relative overflow-hidden border">
            <img 
                class="absolute bottom-0 w-full h-12 transition-all duration-700" 
                style="width: {partialFill * 100}%"
                src={src}
                alt="obrazok"
            />
        </div>
    {/if}
</div>