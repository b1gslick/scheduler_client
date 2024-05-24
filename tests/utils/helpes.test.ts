import { convertMinsToHrsMins } from "../../src/utils/helper";

it("Test convertMinsToHrsMins", () => {
  expect(convertMinsToHrsMins(10001)).toContain("166:41");
  expect(convertMinsToHrsMins(1)).toContain("00:01");
  expect(convertMinsToHrsMins(59)).toContain("00:59");
  expect(convertMinsToHrsMins(61)).toContain("01:01");
  expect(convertMinsToHrsMins(60)).toContain("01:00");
  expect(convertMinsToHrsMins(0)).toContain("00:00");
});
