import CarComponent from "./Car/CarComponent";

export default function PositionComponent({ tyres, tyresAge }) {
  const tyresName = {
    7: "inter",
    8: "wet",
    15: "wet",
    16: "soft",
    17: "medium",
    18: "hard",
    19: "super soft",
    20: "softas",
    21: "medium",
    22: "hard",
  };
  return (
    <div className="">
      <div className="flex flex-row">
        <h1 className="p-6">
          tyres<br></br>
          {tyresName[tyres]}
        </h1>
        <h1 className="p-6">
          age<br></br>
          {tyresAge}
        </h1>
      </div>
      <CarComponent />
    </div>
  );
}
