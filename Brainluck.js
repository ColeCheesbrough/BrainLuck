function brainLuck(code, input) {
  let output = "";
  let inputIndex = 0;
  let codeIndex = 0;
  let outputIndex = 0;
  let tapeIndex = 0;
  let tape = new Uint8Array(30000);
  let stepCount = 0;

  while (
    !(
      code[codeIndex] == "]" &&
      codeIndex == code.length - 1 &&
      tape[tapeIndex] == 0
    ) &&
    !(code[codeIndex] != "]" && codeIndex == code.length)
  ) {
    //console.log(tapeIndex,tape[tapeIndex],tape[tapeIndex+1],tape[tapeIndex],codeIndex,code[codeIndex],input,output)
    let action = code[codeIndex];

    switch (action) {
      case ">":
        tapeIndex++;
        break;
      case "<":
        tapeIndex -= 1;
        break;
      case "+":
        tape[tapeIndex]++;
        break;
      case "-":
        tape[tapeIndex] -= 1;

        break;
      case ".":
        output += String.fromCharCode(tape[tapeIndex]);

        break;
      case ",":
        tape[tapeIndex] = input[0].charCodeAt();
        input = input.slice(1, input.length);

        break;
      case "[":
        if (tape[tapeIndex] == 0) {
          let continueOn = true;
          let nestFlag = 0;
          while (continueOn) {
            codeIndex++;
            if (code[codeIndex] == "[") {
              nestFlag++;
            }
            if (nestFlag && code[codeIndex + 1] == "]") {
              nestFlag -= 1;
            } else if (code[codeIndex + 1] == "]") {
              continueOn = false;
            }
          }
          //codeIndex += 1;
        }
        break;
      case "]":
        if (tape[tapeIndex] != 0) {
          let continueOn = true;
          let nestFlag = 0;
          while (continueOn) {
            codeIndex -= 1;
            //console.log(codeIndex)

            if (code[codeIndex] == "]") {
              nestFlag++;
            }
            if (code[codeIndex - 1] == "[" && nestFlag) {
              nestFlag--;
            } else if (code[codeIndex - 1] == "[") {
              continueOn = false;
              codeIndex--;
            }
          }
        }
        break;
    }
    codeIndex++;
    stepCount++;
    if (stepCount > 5000000) {
      return 0;
    }
  }

  return output;
}
console.log(
  brainLuck(
    "++++++++[>++++[>++>+++>+++>+<<<<-]>+>+>->>+[<]<-]>>.>---.+++++++..+++.>>.<-.<.+++.------.--------.>>+.>++.",
    "Codewars" + String.fromCharCode(255)
  )
);
