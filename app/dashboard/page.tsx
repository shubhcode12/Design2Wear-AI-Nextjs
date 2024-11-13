"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import { title } from "@/components/primitives";
import confetti from "canvas-confetti";
import { useRouter } from "next/navigation";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { auth } from "@/config/firebase-config";
import { getDatabase, ref, set, push, get } from "firebase/database";
import { getCollection } from "@/firebase/network";
import { ArrowCircleDown2, Eye } from "iconsax-react";
import { siteConfig } from "@/config/site";


interface FormInputs {
  color: string;
  occasion: string;
  category: string;
  season: string;
  age: string;
  gender: string;
  style: string;
  pattern: string;
  skintone: string;
  fabric : string;
  size: string;
  customInput: string;
}

const Page = () => {
  const router = useRouter();
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const database = getDatabase();
  const [loading, setLoading] = useState<boolean>(false);
  const [collection, setCollection] = useState<Collection[]>([]);
  const [formInputs, setFormInputs] = useState<FormInputs>({
    color: "",
    occasion: "",
    category: "",
    season: "",
    age: "",
    gender: "",
    style: "",
    pattern: "",
    skintone: "",
    fabric : "",
    size: "",
    customInput: "",
  });

  const [selected, setSelected] = useState({
    color: "",
    occasion: "",
    size: "",
    material: "",
    pattern: "",
    category: "",
    season: "",
    age: "",
    gender: "",
    style: "",
    skintone: "",
    fabric : ""
  });

  const handleChipSelect = (field: keyof FormInputs, value: string) => {
    setFormInputs({
      ...formInputs,
      [field]: value,
    });
    setSelected({
      ...selected,
      [field]: value,
    });
  };

  const handleConfettiClick = () => {
    const end = Date.now() + 3 * 1000; // 3 seconds
    const colors = ["#a786ff", "#fd8bbc", "#eca184", "#f8deb1"];

    const frame = () => {
      if (Date.now() > end) return;

     
      confetti({
       particleCount: 2,
       angle: 120,
       spread: 55,
      startVelocity: 60,
      origin: { x: 1, y: 0.5 },
      colors: colors,
      });

      requestAnimationFrame(frame);
    };

    frame();
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const {
      gender,
      color,
      occasion,
      age,
      season,
      category,
      style,
      skintone,
      fabric,
      size,
      customInput,
    } = formInputs;

    const prompt = `Suggest an outfit for a user with the following preferences: 
      Gender: ${gender}, 
      Color: ${color}, 
      Occasion: ${occasion}, 
      Age: ${age}, 
      Season: ${season}, 
      Category: ${category}, 
      Style: ${style}, 
      Skintone: ${skintone}, 
      Fabric : ${fabric},
      Outfit Size: ${size}, 
      Custom Input: ${customInput}`;

    console.log(prompt);
    try {
      setLoading(true);

      const response = await axios.post("/api/generateImage", { prompt });
      console.log(response);
      if (response.data.success) {
        setImageUrl(response.data.imagePath);
        console.log(getAuth().currentUser?.uid);
        const imageRef = ref(
          database,
          `collection/${getAuth().currentUser?.uid}`
        );

        push(imageRef, {
          imageUrl: response.data.imagePath,
          prompt: prompt,
          timestamp: new Date().toISOString(),
        })
          .then(() => {
            console.log("Collection added to database");
          })
          .catch((error) => {
            console.error("Error adding user to database:", error);
          });
        setLoading(false);
        handleConfettiClick();
        const imageContainer = document.getElementById("image-container");
        if (imageContainer) {
          imageContainer.scrollIntoView({ behavior: "smooth" });
        }
      }
    } catch (error) {
      console.error("Error generating outfit:", error);
    }
  };

  const Chip = ({
    value,
    isSelected,
    onClick,
  }: {
    value: string;
    isSelected: boolean;
    onClick: () => void;
  }) => (
    <button
      onClick={onClick}
      className={`px-4 py-2 rounded-full mr-2 mb-2 cursor-pointer ${
        isSelected ? "bg-blue-500 text-white" : "bg-gray-200 text-gray-700"
      }`}>
      {value}
    </button>
  );

  useEffect(() => {
    let authInitialized = false;

    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (!authInitialized) {
        authInitialized = true;
        if (user) {
          fetchCollection();
        } else {
          console.log("No user logged in");
        }
      }
    });

    const fetchCollection = async () => {
      const user = auth.currentUser?.uid;

      if (user) {
        const collection = await getCollection(user);
        if (collection) {
          setCollection(collection);
        } else {
          console.log("No collection found for user");
        }
      } else {
        console.log("No user found");
      }
    };

    return () => unsubscribe();
  }, [router]);

  return (
    <section className="flex flex-col justify-center gap-4 py-8 md:py-10 ">
      <div className="inline-block max-w-sm lg:max-w-4xl text-start justify-center text-2xl mx-4">
        <h1 className={title({ size: "lg" })}>Let &nbsp;</h1>
        <h1 className={title({ color: "violet", size: "lg" })}>
          Design2Wear AI&nbsp;
        </h1>
        <h1 className={title({ color: "violet", size: "lg" })}>
          Let Design2Wear do magic for you
        </h1>
        <br />
      </div>

      <form onSubmit={handleSubmit} className="space-y-6 pt-10">        
        <div className="p-4">
          <label htmlFor="customInput" className="text-xl font-bold">
            How do you want your outfit to be?
          </label>
          <textarea
            id="customInput"
            name="customInput"
            onChange={(e) => handleChipSelect("customInput", e.target.value)}
            placeholder="Describe your outfit"
            className="block w-full h-40 p-2 border border-gray-300 rounded-lg mt-4"
          />
        </div>

        <div className="flex flex-wrap gap-4 p-0">
          <div className="p-4 overflow-scroll">
            <label htmlFor="colorSelect" className="text-xl font-bold">
              What is your color preference?
            </label>
            <div className="flex overflow-x-scroll pb-2 pt-4" id="colorSelect" role="group" aria-labelledby="colorLabel">
              {[
                "White",
                "Black",
                "Red",
                "Blue",
                "Green",
                "Purple",
                "Pink",
                "Gray",
                "Brown",
              ].map((color) => (
                <Chip
                  key={color}
                  value={color}
                  isSelected={selected.color === color.toLowerCase()}
                  onClick={() => handleChipSelect("color", color.toLowerCase())}
                  aria-label={`Select ${color}`}
                />
              ))}
            </div>
          </div>

          <div className="p-4 overflow-scroll">
            <label htmlFor="skintoneSelect" className="text-xl font-bold">What is your skintone?</label>
            <div className="flex overflow-x-scroll pb-2 pt-4" id="skintoneSelect" role="group" aria-labelledby="skintoneLabel">
              {["Light", "Medium", "Dark"].map((skintone) => (
                <Chip
                  key={skintone}
                  value={skintone}
                  isSelected={selected.skintone === skintone.toLowerCase()}
                  onClick={() =>
                    handleChipSelect("skintone", skintone.toLowerCase())
                  }
                  aria-label={`Select ${skintone}`}
                />
              ))}
            </div>
          </div>

          <div className="p-4 overflow-scroll">
            <label htmlFor="styleSelect" className="text-xl font-bold">
              What is your style preference?
            </label>
            <div className="flex overflow-x-scroll pb-2 pt-4" id="styleSelect" role="group" aria-labelledby="styleLabel">
              {["Casual", "Formal", "Sport", "Travel"].map((style) => (
                <Chip
                  key={style}
                  value={style}
                  isSelected={selected.style === style.toLowerCase()}
                  onClick={() => handleChipSelect("style", style.toLowerCase())}
                  aria-label={`Select ${style}`}
                />
              ))}
            </div>
          </div>

          <div className="p-4 overflow-scroll">
            <label htmlFor="occasionSelect" className="text-xl font-bold">What is your occasion?</label>
            <div className="flex overflow-x-scroll pb-2 pt-4" id="occasionSelect" role="group" aria-labelledby="occasionLabel">
              {[
                "Birthday",
                "Anniversary",
                "Wedding",
                "Party",
                "Date",
                "Work",
                "Casual",
              ].map((occasion) => (
                <Chip
                  key={occasion}
                  value={occasion}
                  isSelected={selected.occasion === occasion.toLowerCase()}
                  onClick={() =>
                    handleChipSelect("occasion", occasion.toLowerCase())
                  }
                  aria-label={`Select ${occasion}`}
                />
              ))}
            </div>
          </div>

          <div className="p-4 overflow-scroll">
            <label htmlFor="categorySelect" className="text-xl font-bold">
              Select your outfit category
            </label>
            <div className="flex overflow-x-scroll pb-2 pt-4" id="categorySelect" role="group" aria-labelledby="categoryLabel">
              {["Top", "Bottom", "Dress", "Pants", "Shorts"].map((category) => (
                <Chip
                  key={category}
                  value={category}
                  isSelected={selected.category === category.toLowerCase()}
                  onClick={() =>
                    handleChipSelect("category", category.toLowerCase())
                  }
                  aria-label={`Select ${category}`}
                />
              ))}
            </div>
          </div>

          <div className="p-4 overflow-scroll">
            <label htmlFor="genderSelect" className="text-xl font-bold">What is your gender?</label>
            <div className="flex overflow-x-scroll pb-2 pt-4" id="genderSelect" role="group" aria-labelledby="genderLabel">
              {["Male", "Female", "Unisex"].map((gender) => (
                <Chip
                  key={gender}
                  value={gender}
                  isSelected={selected.gender === gender.toLowerCase()}
                  onClick={() =>
                    handleChipSelect("gender", gender.toLowerCase())
                  }
                  aria-label={`Select ${gender}`}
                />
              ))}
            </div>
          </div>

          <div className="p-4 overflow-scroll">
            <label htmlFor="seasonSelect" className="text-xl font-bold">
              What is your season preference?
            </label>
            <div className="flex overflow-x-scroll pb-2 pt-4" id="seasonSelect" role="group" aria-labelledby="seasonLabel">
              {["Spring", "Summer", "Fall", "Winter"].map((season) => (
                <Chip
                  key={season}
                  value={season}
                  isSelected={selected.season === season.toLowerCase()}
                  onClick={() =>
                    handleChipSelect("season", season.toLowerCase())
                  }
                  aria-label={`Select ${season}`}
                />
              ))}
            </div>
          </div>

          <div className="p-4 overflow-scroll">
            <label htmlFor="ageSelect" className="text-xl font-bold">What is your age?</label>
            <div className="flex overflow-x-scroll pb-2 pt-4" id="ageSelect" role="group" aria-labelledby="ageLabel">
              {["18-25", "26-35", "36-45", "46-55", "56+"].map((age) => (
                <Chip
                  key={age}
                  value={age}
                  isSelected={selected.age === age.toLowerCase()}
                  onClick={() => handleChipSelect("age", age.toLowerCase())}
                  aria-label={`Select ${age}`}
                />
              ))}
            </div>
          </div>

          <div className="p-4 overflow-scroll">
            <label htmlFor="haircolorSelect" className="text-xl font-bold">
              Select your fabric preferance
            </label>
            <div className="flex overflow-x-scroll pb-2 pt-4" id="haircolorSelect" role="group" aria-labelledby="haircolorLabel">
              {["cotton", "silk", "polyster"].map((fabric) => (
                <Chip
                  key={fabric}
                  value={fabric}
                  isSelected={selected.fabric === fabric.toLowerCase()}
                  onClick={() =>
                    handleChipSelect("fabric", fabric.toLowerCase())
                  }
                  aria-label={`Select ${fabric}`}
                />
              ))}
            </div>
          </div>

          <div className="p-4 overflow-scroll">
            <label htmlFor="haircolorSelect" className="text-xl font-bold">
              What is your outfit size?
            </label>
            <div className="flex overflow-x-scroll pb-2 pt-4" id="haircolorSelect" role="group" aria-labelledby="haircolorLabel">
              {["xs", "s", "m", "l", "xl","xxl"].map((size) => (
                <Chip
                  key={size}
                  value={size}
                  isSelected={selected.size === size.toLowerCase()}
                  onClick={() =>
                    handleChipSelect("size", size.toLowerCase())
                  }
                  aria-label={`Select ${size}`}
                />
              ))}
            </div>
          </div>
        </div>

        <button
          type="submit"
          className="w-full bg-[#FF1CF7] text-white text-lg py-2 rounded-full hover:bg-blue-600 transition duration-300">
          GENERATE OUTFIT
        </button>
      </form>

      <div className={loading || !imageUrl ? "hidden" : ""}>
        {loading ? (
          <div className="flex justify-center items-center">
            <div className="loader"></div>
          </div>
        ) : (
          <div
            id="image-container"
            className="mt-10 border-2 border-gray-500 rounded-l p-10">
            <h1 className="text-2xl font-bold">
              You Look Better with Design2Wear AI
            </h1>
            <p className="text-sm text-gray-500">
              This is your outfit generated by Design2Wear AI
            </p>
            <div
              id="image-container"
              className="flex justify-start items-cente mt-4">
              <img
                src={imageUrl!}
                className="rounded-lg border-1 border-gray-300"
                alt="Outfit"
                width={512}
                height={512}
              />
            </div>
          </div>
        )}
      </div>
      <div className="mt-10 border-1 border-gray-500 rounded-lg p-10">
        <div className="">
          <h1 className="text-2xl font-bold">My Collection</h1>
          <p className="text-sm text-gray-500">
            Explore the outfits you have created with Design2Wear AI
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-4">
            {collection.length === 0 ? (
              <p>No outfits in your collection yet.</p>
            ) : (
              collection.map((item: any) => (
                <div key={item.id} className="relative p-1 rounded-lg group">
                  <img
                    src={item.imageUrl}
                    alt="Outfit"
                    className="w-full h-auto rounded-lg border-1 border-gray-500"
                  />

                  <div className="absolute bottom-4 right-4 flex space-x-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <a
                      href={item.imageUrl}
                      download
                      className="text-white text-2xl p-2 rounded-full bg-black bg-opacity-50 hover:bg-white hover:text-black transition-colors">
                      <ArrowCircleDown2
                        size="24"
                        color={siteConfig.colors.primary}
                      />
                    </a>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Page;
