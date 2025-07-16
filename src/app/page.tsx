"use client";

import { useState, useRef, FormEvent, ChangeEvent } from "react";
import Head from "next/head";

export default function Home() {
  const [status, setStatus] = useState<"none" | "success" | "fail">("none");
  const audioRef = useRef<HTMLAudioElement>(null);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const form = new FormData(e.currentTarget);
    const code =
      (form.get("num1") as string) +
      (form.get("num2") as string) +
      (form.get("num3") as string) +
      (form.get("num4") as string);

    if (audioRef.current) {
      if (code === "7129") {
        setStatus("success");
        audioRef.current.src = "/rickroll1.mp3";
      } else {
        setStatus("fail");
        audioRef.current.src = "/rickroll.mp3";
      }
      audioRef.current.play();
    }
  };

  const moveToNext = (
    e: ChangeEvent<HTMLInputElement>,
    nextFieldName: string
  ) => {
    if (e.target.value.length === 1) {
      const next = document.getElementsByName(nextFieldName)[0] as HTMLInputElement | undefined;
      next?.focus();
    }
  };

  return (
    <>
      <Head>
        <title>Escape Game</title>
      </Head>

      <h1>Enter the Code to escape</h1>

      <form onSubmit={handleSubmit} id="codeForm">
        <input
          type="text"
          name="num1"
          maxLength={1}
          pattern="[0-9]"
          required
          onInput={(e) => moveToNext(e as ChangeEvent<HTMLInputElement>, "num2")}
        />
        <input
          type="text"
          name="num2"
          maxLength={1}
          pattern="[0-9]"
          required
          onInput={(e) => moveToNext(e as ChangeEvent<HTMLInputElement>, "num3")}
        />
        <input
          type="text"
          name="num3"
          maxLength={1}
          pattern="[0-9]"
          required
          onInput={(e) => moveToNext(e as ChangeEvent<HTMLInputElement>, "num4")}
        />
        <input
          type="text"
          name="num4"
          maxLength={1}
          pattern="[0-9]"
          required
        />
        <br />
        <br />
        <button type="submit">Try code</button>
      </form>

      {status === "success" && (
        <div id="win">
          <div className="win-content">
            <img src="/jumpscare.jpg" alt="You Escaped!" />
            <p className="jumpscare-text">🎉 YOU ESCAPED!</p>
          </div>
        </div>
      )}

      {status === "fail" && (
        <div id="jumpscare">
          <div className="jumpscare-content">
            <img src="/jumpscare.gif" alt="BOO!" />
            <p className="jumpscare-text">💀 TRY AGAIN, LOSER!</p>
          </div>
        </div>
      )}

      <audio ref={audioRef} />
    </>
  );
}
