<script lang="ts">

	import TextLogger from "$lib/TextLogger.svelte";
	import { TextLoggerController } from "$lib/TextLoggerController";

    let loggerController: TextLoggerController = new TextLoggerController();

    loggerController.LogString("Welcome to the TextLogger test harness.");
    loggerController.LogString("Example Usage: loggerController.LogString(\"Hello World!\")");

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