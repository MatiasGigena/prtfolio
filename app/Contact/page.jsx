import MaskText from "../components/reusable/phrases";

const ContactPage = () => {
  const phrases = [
    "Front End Developer",
    "Back End Developer",
    "Full Stack Developer",
    "Mobile Developer",
  ];
  return (
    <div className="min-h-screen flex flex-col gap-[20vw] mt-[20vw] justify-center text-white items-center w-full">
      <MaskText phrases={phrases}/>
      <MaskText phrases={phrases}/>
      <MaskText phrases={phrases}/>
    </div>
  );
};
export default ContactPage;
