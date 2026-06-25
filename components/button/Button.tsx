import Link from "next/link";

interface ButtonProps {
  text: string;
  href?: string;
  onClick?: () => void;
  type?: "button" | "submit" | "reset";
}

export default function Button({ text, href, onClick, type = "button" }: ButtonProps) {
  if (href) {
    return (
      <Link
        href={href}
        className="inline-block px-6 py-2 text-sm font-medium tracking-wide bg-steel text-white transition-opacity rounded-full hover:opacity-80"
      >
        {text}
      </Link>
    );
  }

  return (
    <button
      type={type}
      onClick={onClick}
      className="px-6 py-3 text-sm font-medium tracking-wide bg-steel text-white transition-opacity hover:opacity-80 rounded-full"
    >
      {text}
    </button>
  );
}