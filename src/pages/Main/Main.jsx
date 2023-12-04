import "./Main.css";

//components
import { Advantages } from "./Addons/Advantages";
import { Steps } from "./Addons/Steps";
import { Headnav } from "./Addons/Headnav/Headnav";
import { Footer } from "./Addons/Footer/Footer";
import { Menu } from "./Addons/Headnav/Menu";
import { Centerblock } from "./Addons/Centerblock/Centerblock";
import { Login } from "./Addons/Login/Login";

import { useEffect } from "react";
import { auth } from "../../feature/firebase/fire";
import { Navigate } from "react-router-dom";

import { gsap } from "gsap/gsap-core";
import ScrollTrigger from "gsap/ScrollTrigger";

export const Main = () => {
  useEffect(() => {
    gsap.to(".right-block", {
      y: "20",
      duration: 1,
      yoyo: true,
      repeat: -1,
      ease: "power1.inOut", // Эффект анимации
    });
    gsap.registerPlugin(ScrollTrigger);
    gsap.set(".advantage-animate", { x: -200, opacity: 0 });
    gsap.set(".steps-animate", { y: 500, opacity: 0 });
    handleAnimate();
    handleScroll();
    document.body.style.backgroundColor = "white";
  }, []);

  if (auth.currentUser) {
    return <Navigate to={"/author"} />;
  }

  const handleScroll = () => {
    gsap.to(".advantage-animate", {
      opacity: 1,
      x: 0,
      scrollTrigger: {
        trigger: ".advantage-animate",
        scrub: true,
        start: "top 75%",
        end: "top 10%",
      },
    });
    gsap.to(".steps-animate", {
      opacity: 1,
      y: 0,
      scrollTrigger: {
        trigger: ".steps-animate",
        scrub: true,
        start: "top 92%",
        end: "top 60%",
      },
    });
  };

  const handleAnimate = () => {
    var tl = gsap.timeline({ repeat: false });
    tl.fromTo(
      ".h-nav",
      {
        y: -200,
        opacity: 0,
      },
      {
        y: 0,
        opacity: 1,
        duration: 0.85,
      }
    );
    tl.fromTo(
      ".left-block",
      {
        x: -1000,
        opacity: 0,
      },
      {
        x: 0,
        opacity: 1,
        duration: 0.65,
      }
    );
    tl.fromTo(
      ".right-block",
      {
        opacity: 0,
      },
      {
        opacity: 1,
        duration: 1,
      }
    );
  };

  return (
    <section className="text-yaDark ">
      <Login />
      <Menu />
      <div className="container mx-auto sm:py-4">
        <div className="h-nav flex items-center justify-center gap-y-4 gap-x-6 md:justify-between mx-auto flex-wrap md:flex-nowrap ">
          <div className="hidden sm:flex items-center gap-3">
            <img
              src={require("@assets/logo.png")}
              alt=""
              className="w-16 md:w-20 xl:w-24 h-full object-cover"
            />
            <h1 className="text-2xl md:text-3xl xl:text-5xl font-bold whitespace-nowrap">
              Enchanting <br />
              Freelance
            </h1>
          </div>
          <Headnav />
        </div>
        <Centerblock />
      </div>
      <div className="advantage-animate mt-20">
        <Advantages />
      </div>
      <div className="steps-animate">
        <Steps />
      </div>

      <div>
        <Footer />
      </div>
    </section>
  );
};
