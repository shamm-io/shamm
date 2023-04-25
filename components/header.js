import { ConnectButton } from "web3uikit";
import Link from "next/link";
import { useRouter } from "next/router";

export default function Header() {

  const router = useRouter();

  return (
    <div className="fixed w-full bg-nero header-container top-0 z-10">
      <div className="container mx-auto px-4 text-center w-full max-w-5xl bg-transparent">
        <nav className="h-20 flex items-center">
          <div className="relative justify-self-start">
            <a title="Shamm Logo" className="font-extrabold leading-[48px] text-[30px] text-white" href="/">Shamm.</a>
            <a title="Shamm Logo" className="font-extrabold leading-[48px] text-[30px] text-white blur-sms absolute w-full h-full top-0 right-0" href="/">Shamm.</a>
          </div>
          <div className="w-full flex items-center justify-center gap-x-7 transition-colors text-base leading-[27px] font-medium text-dim-gray">
            <span className={router.pathname == "/about" ? "text-money-green font-medium" : ""}>
              <Link href="/about" className="hover:font-semibold hover:text-white transition-all">
                About us
              </Link>
            </span>
            <span className={router.pathname == "/browse" ? "text-money-green font-medium" : ""}>
              <Link href="/browse" className="hover:font-semibold hover:text-white transition-all">
                Browse projects
              </Link>
            </span>
            <span className={router.pathname == "/launch" ? "text-money-green font-medium" : ""}>
              <Link href="/launch" className="hover:font-semibold hover:text-white transition-all">
                Launch a project
              </Link>
            </span>
            <span>
              <Link href="/propose" className="hover:font-semibold hover:text-white transition-all">
                Contact us
              </Link>
            </span>
          </div>
          <div className="flex items-center justify-end gap-x-3 text-white whitespace-nowrap">
            {/* <div id="connectWalletButton">
              <ConnectButton moralisAuth={false} />
            </div> */}
            <Link href="/propose" className="font-medium text-sm border-2 py-1 px-3 border-white rounded-md">
              Sign up
            </Link>
            <Link href="/propose" className="font-medium text-sm border-2 py-1 px-3 border-black bg-black rounded-md shammBtn">
              Login
            </Link>
          </div>
        </nav>
      </div>
    </div>
  );
}
