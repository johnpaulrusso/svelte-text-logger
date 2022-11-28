<script lang="ts">
    import type { ITextLoggerModel } from "./TextLoggerModel";

    export let model: ITextLoggerModel;
</script>

<div class="container">
    <div class="datetime-col">
        {#each model.messages as m}
            <div class="log-item log-date" style="font-family: {model.fontFamily};">{m.datetime.toLocaleString()}:</div>
        {/each}
    </div>
    <div class="message-col">
        {#each model.messages as m}
            <div class="log-item log-message" style="font-family: {model.fontFamily};">{m.message}</div>
        {/each}
    </div>
</div>

<style>
    .container{
        overflow-y: auto;
        overflow-x: auto;
        display: flex;
    }

    .datetime-col{
        flex-shrink: 0;
    }
    .message-col{
        flex-shrink: 0;
        white-space: nowrap;
    }
    
    .log-date{
        padding-right: 10px;
    }
</style>