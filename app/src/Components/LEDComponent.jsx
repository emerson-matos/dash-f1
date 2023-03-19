export default function LEDComponent({ active, content, bgColor, defaultColor }) {

  return (
    <div className={`led ${active ? bgColor : defaultColor}`}>{content}</div>
  );
}
