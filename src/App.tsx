import {
  BoldExtension,
  HeadingExtension,
  ItalicExtension,
  UnderlineExtension,
} from "remirror/extensions";
import {
  useRemirror,
  ComponentItem,
  Remirror,
  ThemeProvider,
  Toolbar,
} from "@remirror/react";
import { AllStyledComponent } from "@remirror/styles/emotion";
import type { ToolbarItemUnion } from "@remirror/react";
import "./App.css";

const extensions = () => [
  new HeadingExtension(),
  new BoldExtension({}),
  new ItalicExtension(),
  new UnderlineExtension(),
];

const toolbarItems: ToolbarItemUnion[] = [
  {
    type: ComponentItem.ToolbarGroup,
    label: "History",
    items: [
      {
        type: ComponentItem.ToolbarCommandButton,
        commandName: "undo",
        display: "icon",
      },
      {
        type: ComponentItem.ToolbarCommandButton,
        commandName: "redo",
        display: "icon",
      },
    ],
    separator: "end",
  },
  {
    type: ComponentItem.ToolbarGroup,
    label: "Simple Formatting",
    items: [
      {
        type: ComponentItem.ToolbarCommandButton,
        commandName: "toggleBold",
        display: "icon",
      },
      {
        type: ComponentItem.ToolbarCommandButton,
        commandName: "toggleItalic",
        display: "icon",
      },
      {
        type: ComponentItem.ToolbarCommandButton,
        commandName: "toggleUnderline",
        display: "icon",
      },
    ],
    separator: "end",
  },
  {
    type: ComponentItem.ToolbarGroup,
    label: "Heading Formatting",
    items: [
      {
        type: ComponentItem.ToolbarCommandButton,
        commandName: "toggleHeading",
        display: "icon",
        attrs: { level: 1 },
      },
      {
        type: ComponentItem.ToolbarCommandButton,
        commandName: "toggleHeading",
        display: "icon",
        attrs: { level: 2 },
      },
      {
        type: ComponentItem.ToolbarCommandButton,
        commandName: "toggleHeading",
        display: "icon",
        attrs: { level: 3 },
      },
    ],
    separator: "none",
  },
  {
    type: ComponentItem.ToolbarMenu,
    label: "Headings",
    items: [
      {
        type: ComponentItem.MenuGroup,
        role: "radio",
        items: [
          {
            type: ComponentItem.MenuCommandPane,
            commandName: "toggleHeading",
            attrs: { level: 1 },
          },
          {
            type: ComponentItem.MenuCommandPane,
            commandName: "toggleHeading",
            attrs: { level: 2 },
          },
          {
            type: ComponentItem.MenuCommandPane,
            commandName: "toggleHeading",
            attrs: { level: 3 },
          },
          {
            type: ComponentItem.MenuCommandPane,
            commandName: "toggleHeading",
            attrs: { level: 4 },
          },
          {
            type: ComponentItem.MenuCommandPane,
            commandName: "toggleHeading",
            attrs: { level: 5 },
          },
          {
            type: ComponentItem.MenuCommandPane,
            commandName: "toggleHeading",
            attrs: { level: 6 },
          },
        ],
      },
    ],
  },
];

export default function App() {
  const { manager, state, setState } = useRemirror({
    extensions,
    content: "<p>Initialized using <strong>html</strong> content.</p>",
    selection: "end",
    stringHandler: "html",
  });

  return (
    <AllStyledComponent>
      <ThemeProvider>
        <h1 className="title">Remirrored</h1>
        <Remirror
          manager={manager}
          initialContent={state}
          autoFocus
          onChange={(param) => setState(param.state)}
          autoRender="end"
        >
          <Toolbar items={toolbarItems} refocusEditor label="Top Toolbar" />
        </Remirror>
        <pre>{JSON.stringify(state, null, 2)}</pre>
      </ThemeProvider>
    </AllStyledComponent>
  );
}
