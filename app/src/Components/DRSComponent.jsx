import LEDComponent from "./LEDComponent";
export default function DRSComponent({ drs }) {
  return (
    <h1 className="drs align-middle">
      <LEDComponent
        active={drs}
        bgColor="bg-green-900"
        defaultColor="bg-red-900"
        content="DRS"
      />
    </h1>
  );
}
