import Image from "next/image";

export default function Main({ children }: { children: React.ReactNode }) {
  return (
    <main className="relative h-[80vh]">
      <Image
        src="/path-to-your-image.jpg" // Replace with your image path
        alt="Background Image"
        layout="fill"
        objectFit="cover"
        quality={100}
        className="z-0"
      />
      <div className="absolute inset-0 flex items-center justify-center z-10">
        <h1 className="text-white text-4xl font-bold">Your Text Here</h1>
      </div>
      {children}
    </main>
  );
}
