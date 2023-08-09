const Project = ({ index, title, setModal, link }) => {
  return (
    <div
      key={index}
      className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl  font-medium hover:opacity-70 clase"
      onMouseEnter={() => setModal({ active: true, index: index })}
      onMouseLeave={() => setModal({ active: false, index: index })}>
      <a href={link}>
        <h1>{title}</h1>
        <p className="text-sm sm:text-base font-extralight w-full mt-4">Design & Development</p>
      </a>
    </div>
  );
};
export default Project;
