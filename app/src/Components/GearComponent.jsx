function Fill({percentage, color}) {
  return (
    <div
      className={`align-bottom ${color} w-3 rounded`} 
      style={{ height: `${percentage}%` }}
    ></div>
  );
}

export default function GearComponent({ gear, throttle, brake }) {
  return (
    <div className="flex place-items-center max-h-max justify-around">
      <div className="flex flex-col h-1/2 w-3 bg-lime-200 rounded-full align-bottom ">
        <div></div>
        <Fill percentage={brake} color="bg-red-600"/>
      </div>
      <h2 className="gear min-h-full">{gear === 0 ? "N" : gear < 0 ? "R" : gear}</h2>
      <div className="flex flex-col h-1/2 w-3 bg-lime-200 rounded-full">
        <div></div>
        <Fill percentage={throttle} color="bg-green-600"/>
      </div>
    </div>
  );
}
