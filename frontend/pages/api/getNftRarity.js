import { Network, Alchemy } from "alchemy-sdk";

export default async function handler(req, res) {
	// Get fields from JSON body
	const { contractAddress, tokenId, chain } = JSON.parse(req.body);

	// Only allow POST requests
	if (req.method !== "POST"){
		req.status(405).send({message: "Only POST requests are allowed"});
		return;
	}

  	// Create new alchemy from apiKey and network
  	const alchemy = new Alchemy({
  		apiKey: process.env.ALCHEMY_API_KEY,
  		network: Network[chain],
  	});

  	// Add error handling for code execution
  	try{
  		// Get rarity of attributes of NFT
  		const nftInfo = await alchemy.nft.computeRarity(contractAddress, tokenId);

		// Get NFT image
		const nftImage = await alchemy.nft.getNftMetadata(contractAddress, tokenId);

  		// Compute rarity of NFT
  		const formattedNftInfo = nftInfo.map((attribute) => {
			const prevalence = parseFloat(attribute.prevalence.toFixed(8));
			const value = attribute.value;
			const traitType = attribute.traitType;
  			return {
  				value,
  				traitType,
  				prevalence,
  			};
  		});

		// Compute average rarity score
		let avgPrevalence = 0;
		for (let i = 0; i < nftInfo.length; i++) {
			avgPrevalence += nftInfo[i].prevalence;
		}
		avgPrevalence /= nftInfo.length;

  		// Send back JSON data
  		res.status(200).json({
  			attributes: formattedNftInfo,
			rarityScore: avgPrevalence.toFixed(6),
			image: nftImage.media[0]["gateway"],
  		})

  	// Catch error handling	
  	} catch(e) {
  		console.warn(e);
    	res.status(500).send({
			message: "An error occured while executing, pleace check the terminal log for more info",
    	});
  	}
}