export default function ERSComponent({ ers }) {
  const ersMode = {
    0: "none",
    1: "medium",
    2: "hotlap",
    3: "overtake",
  };
  return (
    <div className="relative flex-grow flex-1 px-4">
      <div className="ers">ERS</div>
      <div id="ers" className="ers">
        {ersMode[ers | 0]}
      </div>
    </div>
  );
}
