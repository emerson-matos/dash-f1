export default function RPMComponent({ active }) {
  return <div class={active ? "" : "led-off"}></div>;
}
