import "@testing-library/jest-dom";
import { toHaveNoViolations } from "jest-axe";
import React from "react";

global.React = React;

expect.extend(toHaveNoViolations);
