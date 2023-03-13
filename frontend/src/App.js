// import { ConnectWallet } from "@thirdweb-dev/react";


// export default function App() {
//   return (
//     <div className="container">
//       <div>
//         <ConnectWallet/>
//       </div>
//     </div>
//   );
// }

import { useMetamask } from "@thirdweb-dev/react";

export default function App() {
  const connectWithMetamask = useMetamask();

  return <button onClick={connectWithMetamask}>Connect Metamask</button>;
}