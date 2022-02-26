var __makeTemplateObject =
    (this && this.__makeTemplateObject) ||
    function (cooked, raw) {
        if (Object.defineProperty) {
            Object.defineProperty(cooked, "raw", { value: raw });
        } else {
            cooked.raw = raw;
        }
        return cooked;
    };
// src/MetaMaskButton.tsx
import React from "react";
import styled from "styled-components";
var Button = styled.button(
    templateObject_1 ||
        (templateObject_1 = __makeTemplateObject(["\n\n"], ["\n\n"]))
);
export default function MetaMaskButton(props) {
    console.log(props);
    return React.createElement(
        Button,
        null,
        React.createElement("h1", null, "123")
    );
}
var templateObject_1;
