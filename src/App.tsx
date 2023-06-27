import { For, type Component, onMount, createSignal, Index, onCleanup } from "solid-js";
import { Block } from "./Block";

const App: Component = () => {
  const themes = ["Redish", "Greenish", "Blueish"] as const;
  const [theme, setTheme] = createSignal<(typeof themes)[number]>("Redish");
  const [containerWidth, setContainerWidth] = createSignal<number>(0);

  onMount(() => {
    const timer = setInterval(() => {
      const isLandscape = window.innerHeight < window.innerWidth;
      if (isLandscape && window.innerHeight !== containerWidth()) {
        setContainerWidth(window.innerHeight);
      } else {
        setContainerWidth(window.innerWidth);
      }
    }, 250);
    onCleanup(() => clearInterval(timer));
  });

  const blocks = new Array<any>(100).fill(0);
  const blocksPerRow = 10;
  const gapPx = 20;
  const blockWidthPx = () => containerWidth() / blocksPerRow - gapPx;

  return (
    <>
      <select
        style={{ position: "absolute", top: "10px", left: "10px" }}
        onChange={(event) => setTheme(event.target.value as (typeof themes)[number])}
      >
        <Index each={themes}>{(theme) => <option value={theme()}>{theme()}</option>}</Index>
      </select>
      <div
        style={{
          display: "flex",
          "flex-wrap": "wrap",
          "justify-content": "center",
          "align-items": "center",
          gap: `${gapPx}px`,
          width: `${containerWidth()}px`,
          height: `${containerWidth()}px`,
          background: "none",
          margin: "auto",
        }}
      >
        <For each={blocks}>{() => <Block theme={theme()} width={blockWidthPx()} />}</For>
      </div>
    </>
  );
};

export default App;
