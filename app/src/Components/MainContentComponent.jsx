import TimeComponent from "./TimeComponent";
import GearComponent from "./GearComponent";
import LapComponent from "./LapComponent";
import DRSComponent from "./DRSComponent";
import ERSComponent from "./ERSComponent";
import SpeedComponent from "./SpeedComponent";
import PositionComponent from "./PositionComponent";
import TyresComponent from "./TyresComponent";

export default function MainContentComponent({
  speed,
  gear,
  drs,
  ers,
  sector,
  position,
  lap,
  lapTime,
  lapData,
  throttle,
  brake,
  tyres,
  tyresAge,
}) {
  return (
    <div className="flex flex-1 flex-col max-h-max justify-around">
      <div className="flex items-center">
        <LapComponent lap={lap} />
        <DRSComponent drs={drs} />
        <ERSComponent ers={ers} />
        <SpeedComponent speed={speed} />
      </div>
      <div className="flex justify-evenly">
        <div className="flex flex-col">
          <PositionComponent position={position} />
          <TyresComponent tyres={tyres} tyresAge={tyresAge} />
        </div>
        <GearComponent gear={gear} throttle={throttle} brake={brake} />
        <TimeComponent sector={sector} lapTime={lapTime} lapData={lapData} />
      </div>
    </div>
  );
}
