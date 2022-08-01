export default function SpeedComponent({ speed }) {
  return (
    <div className="flex-grow flex-1 px-4">
      <div className="speed">KM/H</div>
      <h1 id="speed" className="speed">
        {speed}
      </h1>
    </div>
  );
}
