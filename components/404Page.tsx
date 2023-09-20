import React from "react";
import Image from "next/image";
import notfound404_img from "../public/assets/images/notfound404_img.png";
import Link from "next/link";
const Pagenotfound = () => {
  return (
    <>
      <div className={`container mb-5 notfound_container`}>
        <Image
          src={notfound404_img}
          width={200}
          height={125}
          alt="page not found image"
        ></Image>
        <h3 className="notfound_heading ">Looking for something ?</h3>
        <p className="notfound_p color-black">
          We&apos;re sorry. The Web address you entered is not a functioning
          page on our site.
        </p>
        <Link href="/">
          <button className={`btn btn-danger notfound_btn`}>
            Go Home
          </button>
        </Link>
      </div>
    </>
  );
};

export default Pagenotfound;
