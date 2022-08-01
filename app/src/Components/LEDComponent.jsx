export default function LEDComponent({ active, content, color, defaultColor, size }) {
  
  return (
    <div className={`led ${active ? color : defaultColor}`}>{content}</div>
  );
}
