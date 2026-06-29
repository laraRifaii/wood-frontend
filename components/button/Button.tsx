import Link from "next/link";

interface ButtonProps {
  text: string;
  href?: string;
  disabled?:boolean;
  onClick?: () => void;
  type?: "button" | "submit" | "reset";
}

export default function Button({ text,disabled, href, onClick, type = "button" }: ButtonProps) {
  if (href) {
    return (
      <Link
        href={href}
        className="inline-block px-[24px] py-[4px] md:px-[50px] md:py-[0px] text-[15px] md:text-body font-medium tracking-wide bg-steel text-white transition-opacity rounded-full hover:opacity-80"
      >
        {text}
      </Link>
    );
  }

  return (
    <button
      type={type}
      disabled={disabled}
      onClick={onClick}
      className="px-[24px] py-[4px] md:px-[50px] md:py-[0px] text-[15px] md:text-body font-medium tracking-wide bg-steel text-white transition-opacity hover:opacity-80 rounded-full"
    >
      {text}
    </button>
  );
}