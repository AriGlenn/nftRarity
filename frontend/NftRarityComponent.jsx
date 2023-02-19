/*

ToDo:
-return most rare NFTs from a contract collection (?) // rarity comparision
-format rarity score down


Help:
-Hydration error
-only show "No attributes found for selected NFT" after ran and no results (not on load)
-implement mutlichain compatibility
-check overall prevalence score (average method)








ToDo when done:
-deploy to github
-rationale for why you chose that component and what use cases it might have for developers
-create readme + video explanation
-add gitignore
-clean up files


Questions (extra):
-better to do try, catch OR .catch((err) => console.error(err))
-what does: !nftSales?.length
-useEffect (?)
*/


import { useState } from "react";
import styles from "../styles/NftRarity.module.css";

export default function NftRarityPanel({ }) {

  // Recording loading status of page
  const [loadStatus, setLoadStatus] = useState(false);
  const [nftAttributes, setNftAttributes] = useState("");
  const [contractAddress, setcontractAddress] = useState("");
  const [tokenId, setTokenId] = useState("");
  const [chain, setChain] = useState("eth-mainnet");
  const [nftRarityScore, setNftRarityScore] = useState("");


  // Define function to be called when buttton clicked
  const getNftAttributes = async () => {
    // Update loading status
    setLoadStatus(true);

    console.log("Running getNftAttributes");
    // Add error handling for code execution
    try {
      // Make call to API
      const res = await fetch("/api/getNftRarity", {
        method: "POST",
        body: JSON.stringify({
          contractAddress: contractAddress,
          tokenId: tokenId,
        }),
      }).then((res) => res.json()); //.catch((err) => console.error(err))

      setNftAttributes(res.attributes);
      console.log(res.attributes);
      setNftRarityScore(res.rarityScore);
      console.log(res.rarityScore);

    } catch (e) {
      console.log(e);
    }



    // Update loading status
    setLoadStatus(false);
  };

  // Compiles on every render
  // useEffect(() => {
  // 	// Fetch data

  // 	console.log("Use effect running");
  // });


  if (loadStatus) {
    return <p>Loading results...</p>;
  }

  // Format HMTL for page
  return (

    <div>
      <div className={styles.center}>
        <h1>Get NFT Rarity Info</h1>
        {/* Get contractAddress for NFT */}
        <div className={styles.div_padding_address}>
          <label>
            Collection Address:
          </label>
          <div>
            <input
              value={contractAddress}
              onChange={(e) => {
                setcontractAddress(e.target.value);
              }}
              placeholder="NFT Contract Address"
            ></input>
          </div>
        </div>
      </div>
      <div className={styles.main_box}>
        <div className={styles.left_side}>
          {/* Get token ID for NFT */}
          <div className={styles.div_padding_tokenid}>
            <label>Token ID:</label>
            <div>
              <input
                value={tokenId}
                onChange={(e) => {
                  setTokenId(e.target.value);
                }}
                placeholder="NFT Token ID"
              ></input>
            </div>
          </div>
          <button
            className={styles.button}
            onClick={() => {
              console.log("Button clicked... getting attributes of NFT")
              getNftAttributes();
            }}
          >
            Get Rarity Info
          </button>
          <div>
            <label>NFT Collection Rarity Score: </label>
            <label className={styles.rarity_score}> {nftRarityScore} </label>
          </div>
          <h2 className={styles.attribute_table_title}>Attributes</h2>
          <div>
            {nftAttributes?.length ? (
              <table id="Attributes">
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
                        {/* {attribute.value.charAt(0).toUpperCase() + attribute.value.slice(1).toLowerCase()} */}
                        {attribute.value}
                      </td>
                      <td className={styles.table_row}>
                        {attribute.prevalence}
                      </td>
                    </tr>
                  );
                })}
              </table>
            ) : (
              <h1>No attributes found for selected NFT</h1>
            )}
          </div>
        </div>



        <div className={styles.right_side}>
          {/* Get token ID for NFT */}
          <div className={styles.div_padding_tokenid}>
            <label>Token ID:</label>
            <div>
              <input
                value={tokenId}
                onChange={(e) => {
                  setTokenId(e.target.value);
                }}
                placeholder="NFT Token ID"
              ></input>
            </div>
          </div>
          <button
            className={styles.button}
            onClick={() => {
              console.log("Button clicked... getting attributes of NFT")
              getNftAttributes();
            }}
          >
            Get Rarity Info
          </button>
          <div>
            <label>NFT Collection Rarity Score: </label>
            <label className={styles.rarity_score}> {nftRarityScore} </label>
          </div>
          <h2 className={styles.attribute_table_title}>Attributes</h2>
          <div>
            {nftAttributes?.length ? (
              <table id="Attributes">
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
                        {/* {attribute.value.charAt(0).toUpperCase() + attribute.value.slice(1).toLowerCase()} */}
                        {attribute.value}
                      </td>
                      <td className={styles.table_row}>
                        {attribute.prevalence}
                      </td>
                    </tr>
                  );
                })}
              </table>
            ) : (
              <h1>No attributes found for selected NFT</h1>
            )}
          </div>
        </div>

      </div>
    </div>


  );

}



// <div class="container" style="display: flex; height: 100px;">
//     <div style="width: 50%; background: green;">
//         Left Div
//     </div>
//     <div style="flex-grow: 1; background: blue;">
//         Right Div
//     </div>
// </div>


// <tr>
//             <td>Trait Type</td>
//             <td>Value</td>
//             <td>Prevalence</td>
//           </tr>
//           {/* <tbody> */}
//             {/* {nftAttributes?.length ? (
//               // nftAttributes.map((attribute) => {
//               //   const { trait_type, value, prevalence } = nftAttribute;
//               //   return (
//               //      <tr key={trait_type}>
//               //         <td>{`Trait type: ${trait_type}`}</td>
//               //         <td>{`Value: ${value}`}</td>
//               //         <td>{`Prevalence: ${prevalence}`}</td>
//               //      </tr>
//               //   );
//               //   // return <NFTCard key={nft.tokenId} nft={nft} />;

//               // })
//               <p>THERE WERE NFTs found</p>
//             ) : loadStatus ? (
//               <p>Loading...</p>
//             ) : (
//               <p>No NFTs found</p>
//             )} */}


// {nftAttributes?.length ? (
//   loadAttributeTable()
// ) : loadStatus ? (
//   <p>Loading...</p>
// ) : (
//   <p>No attributes found for selected NFT</p>
// )}

//             {nftAttributes.map((attribute) => {
//               const { value, traitType, prevalence } = attribute;
//                 return (<tr key={traitType}>
//                   {/* <td>{`Trait type: ${traitType}`}</td>
//                   <td>{`Value: ${value}`}</td>
//                   <td>{`Prevalence: ${prevalence}`}</td> */}
//                   <td>{traitType}</td>
//                   <td>{value}</td>
//                   <td>{`Prevalence: ${prevalence}`}</td>
//                 </tr>)
//             })}

//           </tbody>


{/* // function loadAttributeTable() {
  //   return nftAttributes.map((nftAttribute) => {
  //     const { trait_type, value, prevalence } = nftAttribute;
  //     return (
  //        <tr key={trait_type}>
  //           <td>{`Trait type: ${trait_type}`}</td>
  //           <td>{`Value: ${value}`}</td>
  //           <td>{`Prevalence: ${prevalence}`}</td>
  //        </tr>
  //     );
  //  });
  // } */}






// function loadAttributeTable({ trait_type, value, prevalence }) {
//   return (
//     <div>
//       var table = document.getElementById("myTable");
//       var row = table.insertRow(0);
//       var cell1 = row.insertCell(0);
//       var cell2 = row.insertCell(1);
//       cell1.innerHTML = "NEW CELL1";
//       cell2.innerHTML = "NEW CELL2";
//     </div>
    // <div>
    //   <div>
    //     <img src={nft.media}></img>
    //   </div>
    //   <div>
    //     <div>
    //       <h3>{nft.trait_type}</h3>
    //       <p>
    //         #{nft.tokenId.slice(0, 4)}
    //         {nft.tokenId.length > 4 && "..."}
    //       </p>
    //     </div>
    //     <div>
    //       <a
    //         target={"_blank"}
    //         href={`https://etherscan.io/address/${nft.contract}`}
    //       >
    //         {nft.contract.slice(0, 4)}...{nft.contract.slice(38)}
    //       </a>
    //     </div>
    //     <div>
    //       <p>{nft.description.slice(0, 75)}</p>
    //     </div>
    //   </div>
    // </div>
//   );
// }