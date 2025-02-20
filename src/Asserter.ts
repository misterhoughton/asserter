import assert from "node:assert";
import { Logger } from "./Logger";

function countCalls(
  target: any,
  propertyKey: string,
  descriptor: PropertyDescriptor
) {
  let count = 0; // Keeps track of the number of times the method is called

  const originalMethod = descriptor.value; // Get the original method

  descriptor.value = function (...args: any[]) {
    count++; // Increment the call count
    console.log(`${propertyKey} has been called ${count} times.`); // Log the call count
    return originalMethod.apply(this, args); // Call the original method with its context and arguments
  };

  return descriptor;
}

export class Asserter {
  constructor(failureMessage, logger = new Logger()) {
    this._logger = logger;
    this._failureMessage = failureMessage;
  }

  private _logger;
  private _failureMessage;

  @countCalls
  expect<T>(stepName: string, actual: T, expected: T) {
    this._logger.logAssertion(`It ${stepName}`);
    try {
      assert.strictEqual(actual, expected, this._failureMessage);
      this._logger.logSuccess("passed");
    } catch (e) {
      this._logger.logFailure("Failed");
      this._logger.logFailure(`expected '${e.expected}' but got '${e.actual}'`);
      console.log(e);
    }
  }
}
