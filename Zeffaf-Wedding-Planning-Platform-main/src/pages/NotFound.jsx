import { Link } from "react-router-dom";
import { HiHome } from "react-icons/hi";

import PageHeader from "../components/shared/PageHeader";
import SharedButton from "../components/shared/Button";

import ErrorImg from "../assets/images/404.png";
import BranchRight from "../assets/images/right.png";
import BranchLeft from "../assets/images/left.png";

export default function NotFound() {
  return (
    <>
      <div className="relative bg-gray-50 px-4 pb-24 overflow-hidden">
        <img
          src={BranchLeft}
          alt=""
          className="
    absolute
    left-[-30px]
    top-[160px]
    w-32
    md:w-40
    opacity-45
    rotate-[-6deg]
    pointer-events-none
    z-0
  "
        />

        <img
          src={BranchRight}
          alt=""
          className="
    absolute
    right-[-30px]
    top-[200px]
    w-32
    md:w-40
    opacity-45
    rotate-[6deg]
    pointer-events-none
    z-0
  "
        />

        <div className="relative z-10 flex flex-col items-center">
          <img
            src={ErrorImg}
            alt="404 Error"
            className="
              -mt-5
              w-[300px]
              md:w-[420px]
              lg:w-[520px]
              object-contain
            "
          />

          <h2 className="mt-6 text-2xl md:text-3xl font-semibold text-gray-900 text-center">
            Oops... Page Not Found!
          </h2>

          <p className="mt-3 text-gray-600 text-sm md:text-base text-center max-w-md">
            The page you looking for not found may be it not exist or removed.
          </p>
          <div className="mt-6">
            <Link to="/">
              <SharedButton
                variant="primary"
                size="md"
                icon={false}
                className="flex items-center"
              >
                <span className="flex items-center gap-3">
                  Go Back Home
                  <HiHome className="text-lg" />
                </span>
              </SharedButton>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
