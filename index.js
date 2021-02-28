window.addEventListener("load", () => {
  const workspace = Blockly.inject("blocklyDiv", {
    media: "./blockly/media/",
    toolbox: document.getElementById("toolbox"),
  });

  const runButton = document.getElementById("run-button");

  runButton.addEventListener("click", () => {
    const code = Blockly.JavaScript.workspaceToCode(workspace);

    try {
      eval(code);
    } catch (e) {
      console.error(e.message);
      alert(e.message);
    }
  });

  function addCustomConsoleBlockToBlockly() {
    Blockly.Blocks["output_console"] = {
      init: function () {
        this.appendValueInput("value")
          .setCheck(null)
          .appendField("console")
          .appendField(
            new Blockly.FieldDropdown([
              ["log", "log"],
              ["warn", "warn"],
              ["error", "error"],
            ]),
            "stream"
          );
        this.setInputsInline(false);
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour(165);
        this.setTooltip("Sends the input value to the browser's console");
        this.setHelpUrl("");
      },
    };
  }
  addCustomConsoleBlockToBlockly();

  function addGeneratorHandlerForCustomConsoleBlock() {
    Blockly.JavaScript["output_console"] = function (block) {
      const stream = block.getFieldValue("stream");
      const value = Blockly.JavaScript.valueToCode(block, "value", Blockly.JavaScript.ORDER_ATOMIC);
      const code = `console.${stream}(${value});\n`;
      return code;
    };
  }
  addGeneratorHandlerForCustomConsoleBlock();

  Blockly.Xml.domToWorkspace(document.getElementById("startBlocks"), workspace);
});
