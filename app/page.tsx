"use client";
import Badge from "@/components/chip";
import Integrations from "@/components/aboutus";
import { LastButNotLeast } from "@/components/last-but-not-least";
import Testimonials from "@/components/testimonials";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { auth } from "../config/firebase-config";
import Hero from "@/components/hero";
import AppPreview from "@/components/app-preview";
import PrototypeImg from "@/components/prototype-img";
export default function Home() {
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        router.push("/dashboard");
      }
    });

    return () => unsubscribe();
  }, [router]);

  return (
    
    <section className="flex flex-col items-center justify-center gap-4 py-8 md:py-10 ">
      <Badge />
      <Hero />
      <PrototypeImg />
      {/* <AppPreview /> */}
      <Integrations />
      <Testimonials />
      <LastButNotLeast />
    </section>
  );
}
