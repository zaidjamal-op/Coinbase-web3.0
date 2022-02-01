import CoinItem from "./CoinItem";

const CoinSelecter = ({ sanityTokens, walletAddress, thirdWebTokens, setAction, selectedToken, setSelectedToken}) => {
  return <div>
      <div className="w-full text-center text-xl font-bold p-3">
          Select Assets
      </div>
      <div className="grid grid-flow-row">
          {sanityTokens.map((token, index) => (
              <CoinItem
                key={index}
                token={token}
                sender={walletAddress}
                setSelectedToken={setSelectedToken}
                selectedToken={selectedToken}
                thirdWebTokens={thirdWebTokens}
                sanityTokens={sanityTokens}
                setAction={setAction}
              />
          ))}
      </div>
  </div>;
};

export default CoinSelecter;
