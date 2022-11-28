<script lang="ts">
	import { TextLoggerController } from "$lib/TextLoggerController";
	import TextLogger from "$lib/TextLogger.svelte";

    let loggerController = new TextLoggerController();

    loggerController.LogString("Hello World!");
    loggerController.LogString("This is a text logger demo.");
    loggerController.LogString("Example Usage: loggerController.LogString(\"Hello World!\")");
</script>

<TextLogger model={loggerController.model}></TextLogger>