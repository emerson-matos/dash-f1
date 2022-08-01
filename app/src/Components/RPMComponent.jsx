import LEDComponent from './LEDComponent.jsx'

export default function RPMComponent({ size, rpm }) {
  const color = [
    "bg-yellow-200",
    "bg-green-300",
    "bg-red-500",
    "bg-blue-600",
    "bg-purple-900",
  ];
  return (
    <div className="flex justify-around content-start pt-3">
      {[...Array(size)].map((x, i) => (
        <LEDComponent key={i} bgColor={color[Math.floor(i / 3)]} defaultColor="bg-zinc-900" active={(rpm * size) / 100 > i} />
      ))}
    </div>
  );
}
