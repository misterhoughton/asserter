import { styleText } from "node:util";

export class Logger {
  logAssertion(msg: string) {
    const assertionMessage = styleText("bgCyan", msg);
    console.log(assertionMessage);
  }

  logSuccess(msg: string) {
    const successMessage = styleText("green", msg);
    console.log(successMessage);
  }

  logFailure(msg: string) {
    const failureMessage = styleText("red", msg);
    console.log(failureMessage);
  }
}
