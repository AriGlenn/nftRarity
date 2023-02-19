import { useState } from "react";
import styles from "../styles/NftRarity.module.css";

export default function NftRarityPanel({ }) {
  const [numNfts, setNumNfts] = useState(1);
  return (
    <div>
      <h1 className={styles.main_title}>
        NFT Comparision and Rarity Info
      </h1>
      <ul className={styles.sections}>
        {Array.from({ length: numNfts }).map((nft, index) => {
          return <NftRarityPanelHelper key={index} nft={nft} />;
        })}
      </ul>
      <button
        className={styles.button}
        onClick={() => {
          setNumNfts(numNfts + 1);
        }}
      >
        Add NFT to compare
      </button>
    </div>
  );
}


function NftRarityPanelHelper() {
  // Recording loading status of page
  const [loadStatus, setLoadStatus] = useState(false);
  const [nftAttributes, setNftAttributes] = useState("");
  const [contractAddress, setContractAddress] = useState("");
  const [tokenId, setTokenId] = useState("");
  const [chain, setChain] = useState("ETH_MAINNET");
  const [nftRarityScore, setNftRarityScore] = useState("");
  const [computedAttributes, setComputedAttributes] = useState(false);
  const [nftImage, setNftImage] = useState("");

  // Define function to be called when buttton clicked
  const getNftAttributes = async () => {
    // Update loading status
    setLoadStatus(true);
    // Add error handling for code execution
    try {
      // Make call to API
      const res = await fetch("/api/getNftRarity", {
        method: "POST",
        body: JSON.stringify({
          contractAddress: contractAddress,
          tokenId: tokenId,
          chain: chain,
        }),
      }).then((res) => res.json());

      setNftAttributes(res.attributes);
      setNftRarityScore(res.rarityScore);
      setNftImage(res.image)

    } catch (e) {
      console.log(e);
    }

    // Update loading status
    setLoadStatus(false);
    // Update status of attributes fetched
    setComputedAttributes(true);
  };

  if (loadStatus) {
    return <p>Loading results...</p>;
  }

  // Format HMTL for page
  return (
    <li className={styles.list_object}>
      <div className={styles.main_box}>
        <div>
          <h1>Get NFT Rarity Info</h1>
          <div className={styles.top_container}>
            {/* Get contractAddress for NFT */}
            <div>
              <div className={styles.div_padding_address}>
                <label>
                  Address:
                </label>
                <div>
                  <input className={styles.input_field}
                    value={contractAddress}
                    onChange={(e) => {
                      setContractAddress(e.target.value);
                    }}
                    placeholder="NFT Contract Address"
                  ></input>
                </div>
              </div>
              {/* Get token ID for NFT */}
              <div className={styles.div_padding_tokenid}>
                <label>Token ID:</label>
                <div>
                  <input className={styles.input_field}
                    value={tokenId}
                    onChange={(e) => {
                      setTokenId(e.target.value);
                    }}
                    placeholder="NFT Token ID"
                  ></input>
                </div>
              </div>
              <div className={styles.chain_selector}>
                <select
                  value={chain}
                  onChange={(e) => {
                    setChain(e.target.value);
                  }}
                >
                  <option value={"ETH_MAINNET"}> Mainnet </option>
                  <option value={"MATIC_MAINNET"}> Polygon </option>
                </select>
              </div>
              <button
                className={styles.button}
                onClick={() => {
                  getNftAttributes();
                }}
              >
                Get Rarity Info
              </button>
            </div>
            <div className={styles.image_box}>
              {nftImage && (
                <img className={styles.image_style} src={nftImage} alt="NFT image" />
              )}
            </div>
          </div>
          <div>
            <label>NFT Collection Rarity Score: </label>
            <label className={styles.rarity_score}> {nftRarityScore} </label>
          </div>
          <h2 className={styles.attribute_table_title}>Attributes</h2>
          <div>
            {nftAttributes?.length ? (
              <table id="Attributes">
                <tbody>
                  <tr>
                    <td className={styles.table_label}>Trait Type</td>
                    <td className={styles.table_label}>Value</td>
                    <td className={styles.table_label}>Prevalence</td>
                  </tr>
                  {nftAttributes.map((attribute) => {
                    const { value, traitType, prevalence } = attribute;
                    return (
                      <tr key={attribute.traitType}>
                        <td className={styles.table_row}>
                          {attribute.traitType.charAt(0).toUpperCase() + attribute.traitType.slice(1).toLowerCase()}
                        </td>
                        <td className={styles.table_row}>
                          {attribute.value}
                        </td>
                        <td className={styles.table_row}>
                          {attribute.prevalence}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            ) : computedAttributes ? (
              <h4>*No attributes found for selected NFT</h4>
            ) : (
              <h4>*Select an NFT to get its attribute score</h4>
            )}
          </div>
        </div>
      </div>
    </li>
  );
}
