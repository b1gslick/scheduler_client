import { convertMinsToHrsMins } from "../../src/utils/helper";

type testConvertValue = [number, string];

it.each<testConvertValue>([
  [10001, "166:41"],
  [1, "00:01"],
  [59, "00:59"],
  [60, "01:00"],
  [61, "01:01"],
  [0, "00:00"],
  [540, "09:00"],
  [539, "08:59"],
  [600, "10:00"],
  [599, "09:59"],
  [10, "00:10"],
  [9, "00:09"],
])("Test provide %i to convertMinsToHrsMins expect %p", (value, expected) => {
  expect(convertMinsToHrsMins(value)).toStrictEqual(expected);
});
