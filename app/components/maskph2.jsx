"use client";
import useMousePosition from "@/hooks/useMousePosition";
import MaskText from "../components/reusable/phrases";
import { useState } from "react";

const MaskTextPhrase = () => {
  const [hovered, isHovered] = useState(false);
  const { x, y } = useMousePosition();
  const size = hovered ? 200 : 40;
  const phrases = [
    "I'm {{Matias Gigena}}, your {{argentinian}} guide through the digital wonderland.",
    "Crafting the virtual world as a {{Front End Developer}}.",
    "Graduated from {{Soy Henry's}} immersive 800-hour bootcamp.",
    "Currently employed at {{Huntek}}.",
  ];
  const phrases1 = [
    "{{Advanced}} English speaker at {{C1}} level.",
    "Validated through international {{Certificate in Advanced English}} (CAE).",
    "Enriching experience at {{Harrows House International College}} in Swanage.",
    "Proud alumnus of Escuela del Mirador, a {{bilingual}} school.",
  ];
  const phrases2 = [
    "Beyond a developer, I'm a {{coding enthusiast}} refining my skills.",
    "Embracing {{leadership}}, {{approachability}}, and {{strong social skills}} for trust.",
    "Dedicated {{hard worker}}, pushing limits to {{elevate}} projects.",
    "Engaging coding pursuits and a friendly disposition for {{impactful contributions}}.",
  ];
  return (
    <div className="min-h-screen flex-col text-left text-white justify-center mt-20 items-center flex w-full">
      <h1 className="text-5xl sm:text-7xl">
        About <span className="text-white font-bold">ME.</span>
      </h1>
      <div className="gap-72 my-24 flex flex-col">
        <MaskText phrases={phrases} />
        <MaskText phrases={phrases1} />
        <MaskText phrases={phrases2} />
      </div>
    </div>
  );
};
export default MaskTextPhrase;