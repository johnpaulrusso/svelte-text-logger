<script lang="ts">
    import type { ITextLoggerModel } from "./TextLoggerModel";

    export let model: ITextLoggerModel;

    function getStyleFromStyleKeys(styleKeys: Array<string>) : string
    {
        let styleResult = "";
        styleKeys.forEach(key => {
            styleResult += model.styles[key];
        })
        return styleResult;
    }

</script>

<div class="container" style="background-color: {model.config.backgroundColor};">
    <div class="datetime-col">
        {#each model.messages as m}
            <div class="log-item log-date" style={model.config.defaultStyle}>{m.datetime.toLocaleString()}:</div>
        {/each}
    </div>
    <div class="message-col">
        {#each model.messages as m}
            <div class="log-item log-message">
                {#each m.messageSegments as s}
                    <div style={getStyleFromStyleKeys(s.styleKeys)}>{s.messageSegment}</div>
                {/each}
            </div>
        {/each}
    </div>
</div>

<style>
    .container{
        overflow-y: auto;
        overflow-x: auto;
        display: flex;
        height: 100%;
    }

    .datetime-col{
        flex-shrink: 0;
    }
    .message-col{
        flex-shrink: 0;
        white-space: pre;
    }
    
    .log-date{
        padding-right: 10px;
    }
    .log-message{
        display: flex;
    }
</style>