import { KeyNamesEnum } from "@lib/enums";
import { KeyNamesUnion } from "@lib/types";

export const KeyNames: Map<KeyNamesUnion, KeyNamesEnum> = new Map([
  ["Backspace", KeyNamesEnum.Backspace],
  ["Tab", KeyNamesEnum.Tab],
  ["Enter", KeyNamesEnum.Enter],
  ["Shift", KeyNamesEnum.Shift],
  ["Control", KeyNamesEnum.Control],
  ["Alt", KeyNamesEnum.Alt],
  ["CapsLock", KeyNamesEnum.CapsLock],
  ["Escape", KeyNamesEnum.Escape],
  ["End", KeyNamesEnum.End],
  ["Home", KeyNamesEnum.Home],
  ["ArrowLeft", KeyNamesEnum.ArrowLeft],
  ["ArrowUp", KeyNamesEnum.ArrowUp],
  ["ArrowRight", KeyNamesEnum.ArrowRight],
  ["ArrowDown", KeyNamesEnum.ArrowDown],
  ["Insert", KeyNamesEnum.Insert],
  ["Delete", KeyNamesEnum.Delete],
  ["Meta", KeyNamesEnum.Meta],
  ["NumLock", KeyNamesEnum.NumLock],
  ["F1", KeyNamesEnum.F1],
  ["F2", KeyNamesEnum.F2],
  ["F3", KeyNamesEnum.F3],
  ["F4", KeyNamesEnum.F4],
  ["F5", KeyNamesEnum.F5],
  ["F6", KeyNamesEnum.F6],
  ["F7", KeyNamesEnum.F7],
  ["F8", KeyNamesEnum.F8],
  ["F9", KeyNamesEnum.F9],
  ["F10", KeyNamesEnum.F10],
  ["F11", KeyNamesEnum.F11],
  ["F12", KeyNamesEnum.F12],
]);
