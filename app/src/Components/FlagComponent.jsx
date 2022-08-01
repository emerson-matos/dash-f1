export default function FlagComponent({ size, position, align, flags }) {
  const dictionaryFlags = {
    0: "bg-gray-700",
    1: "bg-green-700",
    2: "bg-blue-700",
    3: "bg-yellow-700",
    4: "bg-red-700",
  };
  return (
    <div className={`flex-shrink flex-grow-0 ${align}`}>
      {[...Array(size)].map((x, i) => (
        <div key={i} className={`${position} ${dictionaryFlags[flags | 0]} rounded-full`}></div>
      ))}
    </div>
  );
}
