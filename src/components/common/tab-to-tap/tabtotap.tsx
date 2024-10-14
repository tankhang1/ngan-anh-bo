import { IconArrowUpCircleFilled } from "@tabler/icons-react";
import React, { Fragment, useEffect, useState } from "react";

const Tabtotop = () => {
  const [BacktoTop, setBacktopTop] = useState("");
  useEffect(() => {
    window.addEventListener("scroll", () => {
      if (window.scrollY > 100) {
        setBacktopTop("d-flex");
      } else setBacktopTop("d-none");
    });
  }, []);
  const screenup = () => {
    window.scrollTo({
      top: 10,
      behavior: "auto",
    });
  };
  return (
    <Fragment>
      <div className={`scrollToTop ${BacktoTop}`} onClick={screenup}>
        <span className="arrow">
          <IconArrowUpCircleFilled size={20} />
        </span>
      </div>
    </Fragment>
  );
};

export default Tabtotop;
