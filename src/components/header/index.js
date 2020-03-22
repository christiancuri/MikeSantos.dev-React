import React, { useEffect, useCallback } from "react";
import { TextScrambler } from "@/utils";

export default function() {
  const fn = () => {
    const el = document.getElementById("scrambler");
    const phrases = [
      "Web Developer",
      "Mobile Developer",
      "Software Engineer",
      "Cloud Engineer",
      "GreyHat Hacker"
    ];
    const scrambler = TextScrambler({ el, phrases, interval: 2000 });
    scrambler.start();
  };

  useEffect(useCallback(fn), []);
  return (
    <header className='masthead'>
      <div className='container d-flex h-100 align-items-center'>
        <div className='mx-auto text-center'>
          <h1 className='mx-auto my-0 text-uppercase'>MikeSantos</h1>
          <h2 className='text-white-50 mx-auto mt-2 mb-5'>
            Hello, i'm a <span id='scrambler'></span>
          </h2>
          <a href='#about' className='btn btn-primary js-scroll-trigger'>
            Get Started
          </a>
        </div>
      </div>
    </header>
  );
}
