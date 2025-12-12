const FEATURES = [
  {
    icon: "/icons/features/chat.png",
    title: "24x7 Chats with specialists across the India"
  },
  {
    icon: "/icons/features/Phone.png",
    title: "End-to-End Encrypted video & voice Calls"
  },
  {
    icon: "/icons/features/calender.png",
    title: "Schedule an appointment with specialists"
  },
  {
    icon: "/icons/features/brain.png",
    title: "Mental Health & Counselling"
  },
  {
    icon: "/icons/features/therapy.png",
    title: "Therapy & Mindfulness Programs"
  },
  {
    icon: "/icons/features/food.png",
    title: "Healthy eating plans & lifestyle guidance"
  },
  {
    icon: "/icons/features/Hands.png",
    title: "Reproductive & hormonal wellness"
  },
  {
    icon: "/icons/features/child.png",
    title: "Child Health & Developmental Support"
  },
  {
    icon: "/icons/features/private.png",
    title: "Private support for reproductive health"
  }
]

export default function FeatureSection() {
  return (
    <section className="w-full flex justify-center py-12 md:py-16 bg-white font-sans">
      <div className="w-full max-w-[1000px] flex flex-col items-center px-4 md:px-6 lg:px-4">

        {/* Subheading */}
        <p className="text-[#865dd9] text-[14px] md:text-[16px] italic mb-2 font-medium tracking-wide">
          Features
        </p>

        {/* Main Heading */}
        <h2 className="text-center font-normal text-[28px] sm:text-[36px] md:text-[42px] leading-[1.2] mb-10 md:mb-14 text-black px-4">
          Discover Our Benefits &<br />Features
        </h2>

        {/* GRID - Vertical Layout with Mobile Responsive */}
        <div className="
          grid 
          grid-cols-1 
          sm:grid-cols-2 
          lg:grid-cols-3 
          gap-y-10
          sm:gap-y-12 
          gap-x-8
          sm:gap-x-12
          md:gap-x-16 
          w-full
          max-w-[900px]
        ">
          {FEATURES.map((item, index) => (
            <div 
              key={index} 
              className="flex flex-col items-start sm:items-start gap-4"
            >
              {/* Icon Circle */}
              <div className="
                w-[52px] 
                h-[52px]
                md:w-[56px] 
                md:h-[56px] 
                rounded-full 
                border-2 
                border-[#D6BCFA] 
                flex items-center justify-center
                flex-shrink-0
              ">
                <img 
                  src={item.icon} 
                  alt="" 
                  className="w-[24px] h-[24px] md:w-[26px] md:h-[26px]"
                />
              </div>

              {/* Text - Semi-bold and properly spaced */}
              <p className="
                text-[15px]
                md:text-[17px] 
                font-semibold 
                text-black
                leading-[1.45]
                text-left
                tracking-normal
              ">
                {item.title}
              </p>

            </div>
          ))}
        </div>

      </div>
    </section>
  )
}   