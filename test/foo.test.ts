import { square } from "../lib/foo";

describe("foo", (): void => {
  describe("square", (): void => {
    test("it returns \the square of the input.", async (): Promise<void> => {
      const input = 5;

      const output = square(input);

      expect(output).toEqual(25);
    });
  });
});
