<script lang="ts">

	import TextLogger from "$lib/TextLogger.svelte";
	import { TextLoggerController } from "$lib/TextLoggerController";
	import type { ITextLoggerConfiguration } from "$lib/TextLoggerModel";

    let config: ITextLoggerConfiguration = {
        defaultStyle: "font-family: 'Courier New', Courier, monospace; color: lightgray;",
        backgroundColor: "darkslategray"
    }
    let loggerController: TextLoggerController = new TextLoggerController(config);

    loggerController.AddStyle("b", "font-weight: bold;");
    loggerController.AddStyle("red", "color: red;");
    loggerController.AddStyle("hl", "color: black; background-color: yellow;");

    loggerController.LogString("Welcome to the TextLogger test harness.");
    loggerController.LogString("Example Usage: loggerController.AddStyle(\"red\", \"color: red;\")");
    loggerController.LogString("Example Usage: loggerController.LogString(\"Hello World!\")");
    loggerController.LogString("This text is <b>bold</b>, this text is <red>red</red>, this text is <hl>highlighted</hl>, and this text is <b><hl><red>bold, red, and highlighted</red></hl></b>.");

    function onLog()
    {
        let inputElement = document.getElementById("test-message-input") as HTMLInputElement
        if(inputElement)
        {
            let message = inputElement.value;
            loggerController.LogString(message);
            loggerController.model = loggerController.model;

            inputElement.value = "";
            inputElement.focus();
        }
    }

    function onClear()
    {
        let inputElement = document.getElementById("test-message-input") as HTMLInputElement
        if(inputElement)
        {
            loggerController.Clear();   
            loggerController.model = loggerController.model;

            inputElement.value = "";
            inputElement.focus();
        }
    }
</script>

<div class="container">
    <div class="logger">
        <TextLogger model={loggerController.model}></TextLogger>
    </div>
    <div class="harness-input">
        <input id="test-message-input" type="text" placeholder="Enter a log message here...">
        <button on:click={onLog}>Log</button>
        <button on:click={onClear}>Clear</button>
    </div>
</div>

<style>
    .container{
        display: flex;
        flex-direction: column;
    }
    .logger{
        border: solid 2px;
        height: 200px;
    }
    .harness-input{
        display: flex;
        padding-top: 10px;
    }
    input{
        flex: 1;
    }
    button{
        flex-basis: 50px;
        margin-left: 5px;
    }
</style>