<script lang="ts">
	import { onMount, afterUpdate, createEventDispatcher } from "svelte";
    import type { ITextLoggerModel } from "./TextLoggerModel";

    const dispatch = createEventDispatcher();

    export let model: ITextLoggerModel;

    let loggerElement: HTMLElement | null = null;
    let datetimeColumnElement: HTMLElement | null = null;
    let prevMessagesLength = 0;
    let disableAutoScroll: boolean = false;

    onMount(() => {
        loggerElement = document.getElementById("log-container");
        if(loggerElement){
            datetimeColumnElement = loggerElement.getElementsByClassName("datetime-col").item(0) as HTMLElement;
        }
        scrollToLatestLogMessage()
    })

    afterUpdate(() => {
        if(!disableAutoScroll)
        {
            if(model.messages.length != prevMessagesLength)
            {
                scrollToLatestLogMessage(true);
            }
        }
    });

    export const reload = () =>
    {
        scrollToLatestLogMessage();
    }

    /*export this function so that the client can trigger this*/
    function scrollToLatestLogMessage(smooth: boolean = false)
    {
        if(loggerElement && datetimeColumnElement)
        {
            let messages = datetimeColumnElement.getElementsByClassName("log-date");
            let lastMessage: HTMLElement | null = messages.item(messages.length - 1) as HTMLElement;

            if(lastMessage)
            {
                lastMessage.scrollIntoView({behavior: smooth ? "smooth" : "auto", 
                                            block: "end", 
                                            inline: "start"});   
            }

            prevMessagesLength = model.messages.length;
        }
    }

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
        dispatch('logs-cleared');
    }
    function onDisableAutoScroll()
    {
        disableAutoScroll = true;
    }
    function onEnableAutoScroll()
    {
        disableAutoScroll = false;
    }
    
</script>

<div class="container" style="background-color: {model.config.controlbarColor};">
<div class="control-bar">
    {#if disableAutoScroll}
        <span title="Unlock Auto-Scrolling" class="material-symbols-outlined control-button" style="color: {model.config.controlbarButtonColor};" on:click={onEnableAutoScroll} on:keydown={()=>{}}>lock</span>
    {:else}
        <span title="Lock Auto-Scrolling" class="material-symbols-outlined control-button" style="color: {model.config.controlbarButtonColor};" on:click={onDisableAutoScroll} on:keydown={()=>{}}>lock_open</span>
    {/if}
    <span title="Clear Logs" class="material-symbols-outlined control-button" style="color: {model.config.controlbarButtonColor};" on:click={onClear} on:keydown={()=>{}}>clear_all</span>

</div>
<div class="log-container" id="log-container" style="background-color: {model.config.backgroundColor};">
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