# Description

A reusable Svelte-based text logger component.

# Usage

First, in the script, setup the TextLoggerController
```javascript
let loggerController: TextLoggerController = new TextLoggerController();
```

Note: The TextLoggerController contains a default configuration. However this can be overriden as follows:
```javascript
let config: ITextLoggerConfiguration = {
    defaultStyle: "font-family: 'Courier New', Courier, monospace; color: lightgray;",
    backgroundColor: "darkslategray"
}
let loggerController: TextLoggerController = new TextLoggerController(config);
```

Next, add custom styles. These are optional.
```javascript
loggerController.AddStyle("b", "font-weight: bold;");
loggerController.AddStyle("red", "color: red;");
loggerController.AddStyle("hl", "color: black; background-color: yellow;");
```

To make a log statement, call the LogString method. If custom styles were added, use them like HTML tags as folows:
```javascript
loggerController.LogString("This text is <b>bold</b>, this text is <red>red</red>, this text is <hl>highlighted</hl>, and this text is <b><hl><red>bold, red, and highlighted</red></hl></b>.");
```

Note: Svelte reactivity is trigger using the assignment operator. To trigger an update, use:
```javascript
loggerController.model = loggerController.model;
```

Finally, simply add the component to the DOM:
```html
<TextLogger model={loggerController.model}></TextLogger>
```
