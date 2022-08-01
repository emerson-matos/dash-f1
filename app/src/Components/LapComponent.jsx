export default function LapComponent({ lap }) {
  return (
    <div className="flex-grow flex-1 px-4">
      <h2 className="lap">LAP</h2>
      <h2 id="lap" className="lap">
        {lap | 0}
      </h2>
    </div>
  );
}
