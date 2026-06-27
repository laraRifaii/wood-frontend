import Button from "@/components/button/Button";
import Image from "next/image";
export default function NotFound() {
  return (
    <div
      className="relative min-h-screen flex items-center justify-center bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: "url('/images/background.jpg')" }}
    >
      {/* Dark overlay */}
      <div className="absolute inset-0 bg-[#343536]/60 " />

      {/* Content — must be above overlay */}
      <div className="relative z-10 text-center">
        <div className="m-0 text-white font-kyiv text-giant p-0 leading-none flex items-center justify-center gap-2">
          <span>4</span><span><img src='/icons/0.png' alt="0" className='w-40 h-60' /></span><span>4</span>
        </div>
        <div className="mb-2 font-kyiv text-white text-body">Woops</div>
        <p className="mb-2 text-[14px] text-white opacity-70">
         Oh, you must be lost, there is no such page.
        </p>
        <Button text="Go to the home page" href="/" />
        
      </div>
    </div>
  );
}
