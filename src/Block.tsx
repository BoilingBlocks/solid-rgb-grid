import { Component, createSignal, onCleanup, onMount } from "solid-js";

type Props = {
  width: number;
  theme: "Redish" | "Greenish" | "Blueish";
};

function getRandomColor(theme: Props["theme"]): string {
  switch (theme) {
    case "Redish":
      return `rgba(${Math.floor(Math.random() * 255)}, 0, ${Math.floor(Math.random() * 255) / 4}, ${Math.random()})`;
    case "Greenish":
      return `rgba(0,${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255) / 2}, ${Math.random()})`;
    case "Blueish":
      return `rgba(${Math.floor(Math.random() * 255) / 4}, 0, ${Math.floor(Math.random() * 255)}, ${Math.random()})`;
    default:
      return `rgba(${Math.floor(Math.random() * 255)}, 0, ${Math.floor(Math.random() * 255) / 4}, ${Math.random()})`;
  }
}

export const Block: Component<Props> = (props) => {
  const width = () => `${props.width}px`;
  const [color, setColor] = createSignal(getRandomColor(props.theme));

  onMount(() => {
    const timer = setInterval(() => setColor(getRandomColor(props.theme)), 800);

    onCleanup(() => clearInterval(timer));
  });

  return <div style={{ width: width(), height: width(), background: color() }}></div>;
};
