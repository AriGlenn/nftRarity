# NftRarityComponent
### NFT Comparison and Rarity Info Component

New proposed feature for [createweb3dapp.com](createweb3dapp.com)

Compatible with the default dapp

Using Alchemy’s Enhanced APIs
* Uses the computeRarity API
* Uses the getNftMetadata API


#### Component features:
* Can get information about a select NFT
* Retrieves NFT’s attributes and their respective rarity scores (in comparison to other NFTs in the collection)
* Computes an overall rarity score for an NFT given its attributes
* Allows users to compare several NFTs at once (comparing the rarity of multiple NFTs in a collection)
* Displays NFT images along with their information in a vertical scroll interface (allowing users to easily view different NFTs’ attributes) 

#### Implementing this component:
(Method 1) To implement this component, create a Web3 Dapp by running the following command in your terminal: ```npx create-web3-dapp@latest```
After creation, navigate to the components folder and add the “NFTRarityComponent.jsx” file. Add the “getNftRarity.js” file to the pages/api/ directory and add the “NftRarity.module.css” file to the styles folder. Make sure to call the NFT Rarity Component in the index.jsx file.

(Method 2) To implement this component (similar to the templates available on createweb3dapp.com), copy the code from the “NFTRarityComponent.jsx” (which corresponds to the “code” tab under templates) into your component file. Copy the code from the “getNftRarity.js” (which corresponds to the “API” tab) and copy the style code from “NftRarity.module.css” (which corresponds to the “Styles” tab).

* If directly cloning the repository, make sure to insert your Alchemy API Key under the .env.local file (after ```ALCHEMY_API_KEY=```)

#### Running the component:
1) Enter the frontend directory (```cd frontend```)
2) Run the app (```npm run dev```)

#### Component rationale:
* The component implemented provides developers with the ability to add an NFT attribute and rarity comparison to their website. Developers wishing to build a site where users interact with NFTs, have the ability to provide their users with further information about the features of the NFTs. Users seeking to buy or sell NFTs, might want to compare select NFTs from the same collection to determine the rarity of the NFT’s features and the overall rarity of the NFT in the collection. With this new component, developers can simply follow the above implementation guide and add this new feature.
* Users now might be more inclined to trade NFTs on a site where they can easily view the rarity of different NFT attributes, bringing developers increased user traffic and business.
* Developers providing a platform for users to sell or collect NFTs might also implement such a component, as it allows users to ability to competitively price their NFT based on the rarity of its features, or help users collect NFTs that hold unique attributes in a collection.
