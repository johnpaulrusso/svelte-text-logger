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

    function onClear()
    {
        model.messages = [];
    }
</script>

<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200" />
<div class="container" style="background-color: {model.config.controlbarColor};">
<div class="control-bar">
    <span title="Clear Logs" class="material-symbols-outlined control-button" style="color: {model.config.controlbarButtonColor};" on:click={onClear} on:keydown={()=>{}}>clear_all</span>
</div>
<div class="log-container" style="background-color: {model.config.backgroundColor};">
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
</div>

<style>
    .container{
        display: flex;
        flex-direction: column;
        flex: 1;
        overflow-y: auto;
    }

    .control-bar{
        flex: 0;
        display: flex;
        justify-content: flex-end;
    }
    
    .material-symbols-outlined {
      font-variation-settings:
      'FILL' 0,
      'wght' 250,
      'GRAD' 0,
      'opsz' 20;
    }
    .control-button{
        cursor: pointer;
    }

    .log-container{
        padding-top: 1px;

        overflow-y: auto;
        overflow-x: auto;

        display: flex;

        flex: 1;
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