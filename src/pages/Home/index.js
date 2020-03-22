import React from "react";
import { Nav, Header, Footer } from "@/components";
import { About, Projects, SignUp, Contact } from "./components";
export default function() {
  return (
    <>
      <Nav />
      <Header />

      <About />
      <Projects />
      <SignUp />
      <Contact />

      <Footer />
    </>
  );
}
