<script lang="ts">
    import type { ITextLoggerModel } from "./TextLoggerModel";

    export let model: ITextLoggerModel;
</script>

<div class="container">
    <div class="datetime-col">
        {#each model.messages as m}
            <div>{m.datetime}</div>
        {/each}
    </div>
    <div class="message-col">
        {#each model.messages as m}
            <div>{m.message}</div>
        {/each}
    </div>
</div>

<style>
    .container{
        overflow-y: auto;
        display: flex;
    }
</style>