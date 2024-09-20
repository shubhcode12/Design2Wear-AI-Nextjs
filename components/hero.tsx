import { Link } from "@nextui-org/link";
import { title } from "./primitives";
import { button as buttonStyles } from "@nextui-org/theme";
import Marquee from "./marquee";
import { siteConfig } from "@/config/site";


export default function Hero() {

    const heroImages = [
        "https://firebasestorage.googleapis.com/v0/b/design2wear-b59c5.appspot.com/o/images%2F1726587634460.jpeg?alt=media&token=30bf49d0-9d0e-4d81-9f13-e2c294ade2ad",
        "https://firebasestorage.googleapis.com/v0/b/design2wear-b59c5.appspot.com/o/images%2F1726587969475.jpeg?alt=media&token=6f1347ea-7c4b-4df8-b86c-6d0b1c5102bb",
        "https://firebasestorage.googleapis.com/v0/b/design2wear-b59c5.appspot.com/o/images%2FClose-Up%20Of%20Navy%20Blue%20Hoodie%20With%20Ribbed%20Cuffs.png?alt=media&token=8e235e99-1b8f-4df7-a967-2a6eab7bc23a",
        "https://firebasestorage.googleapis.com/v0/b/design2wear-b59c5.appspot.com/o/images%2F1726588516118.jpeg?alt=media&token=467d4d7b-c478-448e-b492-ceaf9a014057",
        "https://firebasestorage.googleapis.com/v0/b/design2wear-b59c5.appspot.com/o/images%2F1726650224796.jpeg?alt=media&token=58237bde-94ac-4e0a-b394-0af0861638d8",
        "https://firebasestorage.googleapis.com/v0/b/design2wear-b59c5.appspot.com/o/images%2F1726587634460.jpeg?alt=media&token=30bf49d0-9d0e-4d81-9f13-e2c294ade2ad",
        "https://firebasestorage.googleapis.com/v0/b/design2wear-b59c5.appspot.com/o/images%2F1726657293074.jpeg?alt=media&token=4532caeb-457d-490a-88bd-01c7d39072d5"
      ];
      
  return (
    <div className="inline-block max-w-sm lg:max-w-4xl text-center justify-center px-5">
        <h1 className={title({ size: "lg" })}>
          Discover Your Perfect Outfit with&nbsp;
        </h1>
        <h1 className={title({ color: "violet", size: "lg" })}>
          Design2Wear AI&nbsp;
        </h1>
        <br />

        <h2 className="font-normal text-gray-500 py-2 text-2xl mt-2">
          Our AI-powered fashion assistant helps you find the perfect outfit for
          any occasion, personalized to your style.
        </h2>

        <div className="flex gap-3 items-center justify-center mt-4">
          <Link    
            className={buttonStyles({
              color: "primary",
              radius: "full",
              variant: "shadow",
            })}
            href="/login">
            Lets Get Started
          </Link>
        </div>

        <div className="flex flex-col items-center justify-center mt-10">
          <div className="flex overflow-x-scroll w-full">
            <Marquee className="w-full" gap={0}>
            {heroImages.map((image, index) => (
              <div key={index}>
                <img src={image} className="w-80 h-80 object-contain border-2 border-gray-500 rounded-xl" alt={`Image ${index + 1}`} />
              </div>
            ))}
            </Marquee>
          </div>
        </div>
      </div>
  );
}