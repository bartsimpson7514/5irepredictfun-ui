import { upperCase } from "../src/Utils/common";

describe("Upper case conversion utility", () => {
    it("Should return the string in upper case form", () => {
        expect(upperCase("john")).toBe("JOHN");
    });
    it("Should not return the string in lower case", () => {
        expect(upperCase("john")).not.toBe("john");
    });
});
