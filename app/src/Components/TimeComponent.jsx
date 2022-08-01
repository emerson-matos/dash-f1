export default function TimeComponent({ lapTime, lapData }) {
  return (
    <div>
      <h1 id="laptime" className="lap-time time">
        {lapTime}
      </h1>
      <h1 id="laptime-delta" className="delta">
        {lapData.m_lapTime}
      </h1>
      <div className="flex outline outline-offset-1 outline-1">
        <h1 id="s1" className="time flex-grow flex-1 px-4">
          {lapData.m_sector1.time}
        </h1>
        <h1 id="s2" className="time flex-grow flex-1 px-4">
          {lapData.m_sector2.time}
        </h1>
        <h1 id="s3" className="time flex-grow flex-1 px-4">
          {lapData.m_sector3.time}
        </h1>
      </div>
      <div className="flex outline outline-offset-1 outline-1">
        <h1
          id="s1-delta"
          className="delta relative flex-grow max-w-full flex-1 px-4"
        >
          {lapData.m_sector1.delta}
        </h1>
        <h1
          id="s2-delta"
          className="delta relative flex-grow max-w-full flex-1 px-4"
        >
          {lapData.m_sector2.delta}
        </h1>
        <h1
          id="s3-delta"
          className="delta relative flex-grow max-w-full flex-1 px-4"
        >
          {lapData.m_sector3.delta}
        </h1>
      </div>
    </div>
  );
}
