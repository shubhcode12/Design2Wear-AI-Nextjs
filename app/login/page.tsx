"use client";
import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { auth } from "../../config/firebase-config";
import { useRouter } from "next/navigation";
import { getDatabase, ref, set } from "firebase/database";
import { siteConfig } from "@/config/site";
import { title } from "@/components/primitives";

const Login = () => {
  const router = useRouter();
  const signInWithGoogle = () => {
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider)
      .then((result) => {      
        
        const { user } = result;
        const db = getDatabase();
        const userRef = ref(db, 'users/' + user.uid);
        set(userRef, {
          email: user.email,
          name: user.displayName,
          photoURL: user.photoURL,
          uid: user.uid,
          credits: 20
        }).then(() => {
          console.log("User added to database");
          router.push("/dashboard");
        }).catch((error) => {
          console.error("Error adding user to database:", error);
        });
        
      })
      .catch((error) => {
        console.error("Error during sign-in:", error);
      });
  };

  return (
    <div className="w-full flex justify-center items-center min-h-screen p-4">
      <div className="flex flex-col items-center gap-6 p-8 md:p-12 rounded-lg shadow-lg animate-fadeIn relative overflow-hidden">
        <div className="absolute inset-0 border-2 border-violet-500 rounded-lg animate-borderBeam"></div>
        <h1 className="text-[#FF1CF7] text-4xl font-bold animate-slideDown">
          Design2Wear AI&nbsp;
        </h1>
        <h1 className="text-3xl md:text-4xl font-bold text-center animate-slideUp">
          Login to your account
        </h1>
        <p className="text-base md:text-lg text-slate-500 text-center max-w-md animate-fadeIn">
          Explore the world of fashion with our AI-powered outfit generator.
        </p>
        <button
          onClick={signInWithGoogle}
          className="px-6 py-3 flex items-center gap-3 bg-white dark:bg-gray-700 rounded-full text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-gray-600 transition duration-300 ease-in-out transform hover:scale-105 animate-pulse shadow-md">
          <img
            className="w-6 h-6"
            src="https://www.svgrepo.com/show/475656/google-color.svg"
            loading="lazy"
            alt="google logo"
          />
          <span className="font-semibold">Login with Google</span>
        </button>
      </div>
    </div>
  );
};

export default Login;
