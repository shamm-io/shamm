import { ConnectButton } from "web3uikit";

export default function Header() {
  return (
    <div className="container mx-auto px-4 text-center w-full">
      <nav className="h-20 flex items-center">
        <div className="w-full flex items-center gap-x-7 transition-colors text-sm font-medium text-dim-gray">
          <a href="#" className="hover:text-black">Hello</a>
          <a href="#" className="hover:text-black">World</a>
          <a href="#" className="hover:text-black">Please</a>
          <a href="#" className="hover:text-black">Fund</a>
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
