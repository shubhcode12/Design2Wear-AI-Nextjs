import { NextResponse } from "next/server";
import axios from "axios";
import FormData from "form-data";
import { app } from "@/config/firebase-config";

import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";

export async function POST(req: Request): Promise<Response> {
  const PROJECT_MODE = process.env.PROJECT_MODE;
  
  try {
    const { prompt } = await req.json();

    const payload = { prompt: prompt, output_format: "jpeg" };

    //if(PROJECT_MODE === "development") {
    //  return NextResponse.json({ success: true, imagePath: "https://firebasestorage.googleapis.com/v0/b/design2wear-b59c5.appspot.com/o/images%2F1726587634460.jpeg?alt=media&token=30bf49d0-9d0e-4d81-9f13-e2c294ade2ad" });
    //}

// network library
    const response = await axios.postForm(
      `https://api.stability.ai/v2beta/stable-image/generate/core`,
      axios.toFormData(payload, new FormData()),
      {
        validateStatus: undefined,
        responseType: "arraybuffer",
        headers: {
          Authorization: `Bearer sk-voPzQIoDoFG1M4clAIX9uFzgnp7dBgh5hlqZFOAVEzASiFua`,
          Accept: "image/*",
        },
      }
    );

    if (response.status === 200) {
      const storage = getStorage(app);
      const imageName = `${Date.now()}.jpeg`;
      const storageRef = ref(storage, `images/${imageName}`);      
      const uploadTask = uploadBytesResumable(storageRef, response.data);

      return new Promise<Response>((resolve, reject) => {
        uploadTask.on(
          "state_changed",
          (snapshot) => {
            const progress =
              (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            console.log("Upload is", progress, "% done");
          },
          (error) => {
            console.error(error);
            reject(NextResponse.json({ error: error.message }, { status: 500 }));
          },
          async () => {
            try {
              const url = await getDownloadURL(uploadTask.snapshot.ref);         
              console.log("Upload complete. URL:", url);
              resolve(NextResponse.json({ success: true, imagePath: url }));
            } catch (error) {
              reject(NextResponse.json({ error: "Failed to get download URL" }, { status: 500 }));
            }
          }
        );
      });
    } else {
      return NextResponse.json(
        { error: response.data.toString() },
        { status: response.status }
      );
    }
  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    } else {
      return NextResponse.json(
        { error: "An unknown error occurred" },
        { status: 500 }
      );
    }
  }
}
