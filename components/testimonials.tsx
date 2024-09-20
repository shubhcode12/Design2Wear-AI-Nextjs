const Testimonials = () => {
  const testimonials = [
    {
      avatar: "https://randomuser.me/api/portraits/women/79.jpg",
      name: "Angela stian",
      title: "Fashion Designer",
      quote:
        "Design2Wear AI has been a game-changer for me. I used to spend hours trying to figure out what to wear, but now I can just ask the AI and it gives me a personalized outfit recommendation. It's so easy and convenient!",
    },
    {
      avatar:
        "https://images.unsplash.com/photo-1464863979621-258859e62245?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=386&q=80",
      name: "Jurica koletic",
      title: "Fashion Designer",
      quote:
        "I've been using Design2Wear AI for a few months now, and it's been a game-changer for me. I used to spend hours trying to figure out what to wear, but now I can just ask the AI and it gives me a personalized outfit recommendation. It's so easy and convenient!",
    },
    {
      avatar:
        "https://images.unsplash.com/photo-1590038767624-dac5740a997b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80",
      name: "Kavi laron",
      title: "Fashion Designer",
      quote:
        "Design2Wear AI has been a game-changer for me. I used to spend hours trying to figure out what to wear, but now I can just ask the AI and it gives me a personalized outfit recommendation. It's so easy and convenient!",
    },
  ];

  return (
    <div className="pb-20">
      <div id="testimonials" className="max-w-screen-xl mx-auto px-4 md:px-8">
        <div className="max-w-2xl sm:text-center md:mx-auto">
          <div className="flex justify-center items-center text-cente mb-2"></div>
          <h1 className="text-2xl lg:text-4xl font-semibold z-10 relative">
            What Our Users Say
          </h1>
          <h1 className="text-lg lg:text-xl font-normal z-10 relative max-w-[600px] text-center flex mx-auto justify-center items-center text-gray-500 mt-2">
            Discover why our users love our product. Read their experiences and
            see how we've helped them achieve their goals.
          </h1>
        </div>
        <div className="mt-12">
          <ul className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {testimonials.map((item, idx) => (
              <li key={idx} className=" border border-gray-500 p-4 rounded-xl">
                <figure>
                  <div className="flex items-center gap-x-4">
                    <img
                      src={item.avatar}
                      className="w-14 h-14 object-cover rounded-full"
                      alt={item.name}
                    />
                    <div>
                      <span className="block text-white font-semibold">
                        {item.name}
                      </span>
                      <span className="block text-gray-500 text-sm mt-0.5">
                        {item.title}
                      </span>
                    </div>
                  </div>
                  <blockquote>
                    <p className="mt-6 text-gray-500">{item.quote}</p>
                  </blockquote>
                </figure>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Testimonials;
