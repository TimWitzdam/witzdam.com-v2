type Props = {
  images: {
    src: string;
    alt: string;
  }[];
};

export default function ImageGallery(props: Props) {
  return (
    <div>
      <div className="grid grid-cols-1 gap-6">
        {props.images.map((image, index) => (
          <a
            href={image.src}
            target="_blank"
            key={index}
            className="relative group cursor-pointer"
          >
            <div className="absolute mt-2 ml-2 text-white text-xs bg-[#5C5C5C] bg-opacity-40 backdrop-blur-sm rounded-full px-5 py-2 z-10 transition-all">
              <span className="md:text-base">{image.alt}</span>
            </div>
            <img
              src={image.src}
              alt={image.alt}
              className="max-h-[500px] object-cover object-top aspect-video rounded-lg w-full"
              loading="lazy"
            />
            <div className="hidden absolute mb-2 mr-2 bottom-0 right-0 bg-[#5C5C5C] bg-opacity-40 backdrop-blur-sm rounded-xl z-10 p-2 md:block group-hover:bg-[#616060] transition-all">
              <svg
                width="16"
                height="14"
                viewBox="0 0 8 7"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M7.39836 1.03621C7.41836 0.816208 7.25622 0.621643 7.03621 0.601642L3.451 0.275714C3.23099 0.255713 3.03643 0.41785 3.01643 0.637857C2.99643 0.857864 3.15856 1.05243 3.37857 1.07243L6.56543 1.36214L6.27571 4.549C6.25571 4.76901 6.41785 4.96357 6.63786 4.98357C6.85786 5.00357 7.05243 4.84144 7.07243 4.62143L7.39836 1.03621ZM1.25607 6.30729L7.25607 1.30729L6.74393 0.692711L0.743926 5.69271L1.25607 6.30729Z"
                  fill="currentColor"
                />
              </svg>
            </div>
          </a>
        ))}
      </div>
    </div>
  );
}
