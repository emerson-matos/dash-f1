import LEDComponent from './LEDComponent.jsx'

export default function RPMComponent({ size, rpm }) {
  return (
    <div class="flex justify-around content-start">
      <LEDComponent key={16} active={false} />
      {[...Array(size)].map((x, i) => (
        <LEDComponent key={i} active={(rpm * size) / 100 > i} />
      ))}
    </div>
  );
}
