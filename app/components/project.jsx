const Project = ({
  index,
  title,
  setModal,
  link,
  Description,
}) => {
  return (
    <div
      key={index}
      className='text-xl  sm:text-2xl md:text-3xl lg:text-4xl xl:text-7xl  font-medium hover:opacity-70 clase'
      onMouseEnter={() =>
        setModal({ active: true, index: index })
      }
      onMouseLeave={() =>
        setModal({ active: false, index: index })
      }
    >
      <a href={link} target='_blank'>
        <h1>{title}</h1>
        <p className='text-xs xl:text-base font-extralight w-full'>
          {Description}
        </p>
      </a>
    </div>
  );
};
export default Project;
