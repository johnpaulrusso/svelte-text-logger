# Description

A reusable Svelte-based text logger component.

# Requirements

1.) The logger shall have two columns: "Date/Time" and "Message".

2.) The logger shall export a LogString method.

3.) The logger shall export a LogHTML method for pre-styled messages.

4.) The logger shall provide an export feature to save logs to a local device.

# Usage

```javascript
    let config: ITextLoggerConfiguration = {
        defaultStyle: "font-family: 'Courier New', Courier, monospace; color: lightgray;",
        backgroundColor: "darkslategray"
    }
    
    let loggerController: TextLoggerController = new TextLoggerController(config);

    loggerController.AddStyle("b", "font-weight: bold;");
    loggerController.AddStyle("red", "color: red;");
    loggerController.AddStyle("hl", "color: black; background-color: yellow;");
    
    loggerController.LogString("This text is <b>bold</b>, this text is <red>red</red>, this text is <hl>highlighted</hl>, and this text is <b><hl><red>bold, red, and highlighted</red></hl></b>.");
```

Note: Svelte reactivity is trigger using the assignment operator. To trigger an update, use:
```javascript
loggerController.model = loggerController.model;
```
```html
  <TextLogger model={loggerController.model}></TextLogger>
```
