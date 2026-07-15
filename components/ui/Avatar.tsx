const GRADIENTS = [
  ["#8b5cf6", "#3b82f6"],
  ["#ec4899", "#8b5cf6"],
  ["#3b82f6", "#06b6d4"],
  ["#f59e0b", "#ec4899"],
  ["#10b981", "#3b82f6"],
];

function hashName(name: string) {
  let hash = 0;
  for (let i = 0; i < name.length; i++) hash = name.charCodeAt(i) + ((hash << 5) - hash);
  return Math.abs(hash);
}

export function Avatar({ name, size = 36 }: { name: string; size?: number }) {
  const initials = name
    .trim()
    .split(/\s+/)
    .map((n) => n[0]?.toUpperCase())
    .slice(0, 2)
    .join("");
  const [from, to] = GRADIENTS[hashName(name) % GRADIENTS.length];

  return (
    <span
      style={{
        width: size,
        height: size,
        background: `linear-gradient(135deg, ${from}, ${to})`,
        fontSize: size * 0.38,
      }}
      className="flex shrink-0 items-center justify-center rounded-full font-bold text-white"
    >
      {initials || "?"}
    </span>
  );
}
