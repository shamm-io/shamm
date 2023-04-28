import { ConnectButton } from "web3uikit";
import Link from "next/link";
import { useRouter } from "next/router";
import { initFirebase } from "@/firebase/firebase";
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { useAuthState } from "react-firebase-hooks/auth";
import { useState } from "react";

export default function Header() {
  initFirebase();
  const provider = new GoogleAuthProvider();
  const auth = getAuth();
  const [user, loading] = useAuthState(auth);
  const router = useRouter();
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(!open);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  const signIn = async () => {
    const result = await signInWithPopup(auth, provider);
  };

  return (
    <div className="fixed w-full bg-nero header-container top-0 z-10">
      <div className="container mx-auto px-4 text-center w-full max-w-5xl bg-transparent">
        <nav className="h-20 flex items-center">
          <div className="relative justify-self-start">
            <a
              title="Shamm Logo"
              className="font-extrabold leading-[48px] text-[30px] text-white"
              href="/"
            >
              Shamm.
            </a>
            <a
              title="Shamm Logo"
              className="font-extrabold leading-[48px] text-[30px] text-white blur-sms absolute w-full h-full top-0 right-0"
              href="/"
            >
              Shamm.
            </a>
          </div>
          <div className="w-full flex items-center justify-center gap-x-7 transition-colors text-base leading-[27px] font-medium text-dim-gray">
            <span
              className={
                router.pathname == "/about"
                  ? "text-money-green font-medium"
                  : ""
              }
            >
              <Link
                href="/about"
                className="hover:font-semibold hover:text-white transition-all"
              >
                About us
              </Link>
            </span>
            <span
              className={
                router.pathname == "/browse"
                  ? "text-money-green font-medium"
                  : ""
              }
            >
              <Link
                href="/browse"
                className="hover:font-semibold hover:text-white transition-all"
              >
                Browse projects
              </Link>
            </span>
            <span
              className={
                router.pathname == "/launch"
                  ? "text-money-green font-medium"
                  : ""
              }
            >
              <Link
                href="/launch"
                className="hover:font-semibold hover:text-white transition-all"
              >
                Launch a project
              </Link>
            </span>
            <span>
              <Link
                href="/propose"
                className="hover:font-semibold hover:text-white transition-all"
              >
                Contact us
              </Link>
            </span>
          </div>
          <div className="flex items-center justify-end gap-x-3 text-white whitespace-nowrap">
            {/* <div id="connectWalletButton">
              <ConnectButton moralisAuth={false} />
            </div> */}

            {user ? (
              <div className="relative">
                <div
                  className="cursor-pointer flex items-center gap-x-2"
                  onClick={handleOpen}
                >
                  <img
                    className="rounded-full"
                    height={30}
                    width={30}
                    src={user.photoURL}
                  ></img>
                  <span className="text-base text-money-green">
                    {user.displayName}
                  </span>
                  <svg
                    className="w-12"
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="#1BC622"
                    viewBox="0 0 16 16"
                  >
                    {" "}
                    <path
                      fillRule="evenodd"
                      d="M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708z"
                      fill="#1BC622"
                    ></path>{" "}
                  </svg>
                </div>
                {open ? (
                  <div className="absolute w-full top-10 text-left bg-nero py-2 px-5 border-2 shadow-card border-card-border rounded-lg">
                    <ul className="text-base leading-8">
                      <li className="hover:text-money-green hover:font-medium transition-all">
                        My Projects
                      </li>
                      <li className="hover:text-money-green hover:font-medium transition-all">
                        Project Contributions
                      </li>
                      <li
                        className="hover:text-money-green hover:font-medium transition-all"
                        onClick={() => auth.signOut()}
                      >
                        Logout
                      </li>
                    </ul>
                  </div>
                ) : (
                  ""
                )}
              </div>
            ) : (
              <>
                <button
                  className="font-medium text-sm border-2 py-1 px-3 border-white rounded-md"
                  onClick={signIn}
                >
                  Sign up
                </button>
                <button
                  className="font-medium text-sm border-2 py-1 px-3 border-black bg-black rounded-md shammBtn"
                  onClick={signIn}
                >
                  Login
                </button>
              </>
            )}
          </div>
        </nav>
      </div>
    </div>
  );
}
