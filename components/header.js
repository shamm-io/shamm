import { ConnectButton } from "web3uikit";
import Link from "next/link";

export default function Header() {
  return (
    <div className="container mx-auto px-4 text-center w-full max-w-5xl">
      <nav className="h-20 flex items-center">
        <div className="w-full flex items-center gap-x-7 transition-colors text-sm font-medium text-dim-gray">
          <Link href="/propose" className="hover:text-black">
            Propose
          </Link>
          <Link href="/vote" className="hover:text-black">
            Vote
          </Link>
          <Link href="/propose" className="hover:text-black">
            Execute
          </Link>
          <Link href="/propose" className="hover:text-black">
            Request
          </Link>
        </div>
        <div className="flex items-center justify-end gap-x-2">
          <div id="connectWalletButton">
            <ConnectButton moralisAuth={false} />
          </div>
        </div>
      </nav>
    </div>
  );
}
