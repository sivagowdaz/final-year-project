"use strict";(self.webpackChunkfrontend=self.webpackChunkfrontend||[]).push([[236],{65236:function(e){e.exports=JSON.parse('[{"inputs":[{"internalType":"address","name":"_nativeTokenWrapper","type":"address"},{"internalType":"address","name":"_trustedForwarder","type":"address"}],"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"account","type":"address"},{"indexed":true,"internalType":"address","name":"operator","type":"address"},{"indexed":false,"internalType":"bool","name":"approved","type":"bool"}],"name":"ApprovalForAll","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"string","name":"prevURI","type":"string"},{"indexed":false,"internalType":"string","name":"newURI","type":"string"}],"name":"ContractURIUpdated","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"newRoyaltyRecipient","type":"address"},{"indexed":false,"internalType":"uint256","name":"newRoyaltyBps","type":"uint256"}],"name":"DefaultRoyalty","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"uint8","name":"version","type":"uint8"}],"name":"Initialized","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"prevOwner","type":"address"},{"indexed":true,"internalType":"address","name":"newOwner","type":"address"}],"name":"OwnerUpdated","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"uint256","name":"packId","type":"uint256"},{"indexed":false,"internalType":"address","name":"recipient","type":"address"},{"indexed":false,"internalType":"uint256","name":"totalPacksCreated","type":"uint256"}],"name":"PackCreated","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"uint256","name":"packId","type":"uint256"},{"indexed":true,"internalType":"address","name":"opener","type":"address"},{"indexed":false,"internalType":"uint256","name":"numOfPacksOpened","type":"uint256"},{"components":[{"internalType":"address","name":"assetContract","type":"address"},{"internalType":"enum ITokenBundle.TokenType","name":"tokenType","type":"uint8"},{"internalType":"uint256","name":"tokenId","type":"uint256"},{"internalType":"uint256","name":"totalAmount","type":"uint256"}],"indexed":false,"internalType":"struct ITokenBundle.Token[]","name":"rewardUnitsDistributed","type":"tuple[]"}],"name":"PackOpened","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"uint256","name":"packId","type":"uint256"},{"indexed":false,"internalType":"address","name":"recipient","type":"address"},{"indexed":false,"internalType":"uint256","name":"totalPacksCreated","type":"uint256"}],"name":"PackUpdated","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"bytes32","name":"role","type":"bytes32"},{"indexed":true,"internalType":"bytes32","name":"previousAdminRole","type":"bytes32"},{"indexed":true,"internalType":"bytes32","name":"newAdminRole","type":"bytes32"}],"name":"RoleAdminChanged","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"bytes32","name":"role","type":"bytes32"},{"indexed":true,"internalType":"address","name":"account","type":"address"},{"indexed":true,"internalType":"address","name":"sender","type":"address"}],"name":"RoleGranted","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"bytes32","name":"role","type":"bytes32"},{"indexed":true,"internalType":"address","name":"account","type":"address"},{"indexed":true,"internalType":"address","name":"sender","type":"address"}],"name":"RoleRevoked","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"uint256","name":"tokenId","type":"uint256"},{"indexed":true,"internalType":"address","name":"royaltyRecipient","type":"address"},{"indexed":false,"internalType":"uint256","name":"royaltyBps","type":"uint256"}],"name":"RoyaltyForToken","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"operator","type":"address"},{"indexed":true,"internalType":"address","name":"from","type":"address"},{"indexed":true,"internalType":"address","name":"to","type":"address"},{"indexed":false,"internalType":"uint256[]","name":"ids","type":"uint256[]"},{"indexed":false,"internalType":"uint256[]","name":"values","type":"uint256[]"}],"name":"TransferBatch","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"operator","type":"address"},{"indexed":true,"internalType":"address","name":"from","type":"address"},{"indexed":true,"internalType":"address","name":"to","type":"address"},{"indexed":false,"internalType":"uint256","name":"id","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"value","type":"uint256"}],"name":"TransferSingle","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"string","name":"value","type":"string"},{"indexed":true,"internalType":"uint256","name":"id","type":"uint256"}],"name":"URI","type":"event"},{"inputs":[],"name":"DEFAULT_ADMIN_ROLE","outputs":[{"internalType":"bytes32","name":"","type":"bytes32"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"_packId","type":"uint256"},{"components":[{"internalType":"address","name":"assetContract","type":"address"},{"internalType":"enum ITokenBundle.TokenType","name":"tokenType","type":"uint8"},{"internalType":"uint256","name":"tokenId","type":"uint256"},{"internalType":"uint256","name":"totalAmount","type":"uint256"}],"internalType":"struct ITokenBundle.Token[]","name":"_contents","type":"tuple[]"},{"internalType":"uint256[]","name":"_numOfRewardUnits","type":"uint256[]"},{"internalType":"address","name":"_recipient","type":"address"}],"name":"addPackContents","outputs":[{"internalType":"uint256","name":"packTotalSupply","type":"uint256"},{"internalType":"uint256","name":"newSupplyAdded","type":"uint256"}],"stateMutability":"payable","type":"function"},{"inputs":[{"internalType":"address","name":"account","type":"address"},{"internalType":"uint256","name":"id","type":"uint256"}],"name":"balanceOf","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address[]","name":"accounts","type":"address[]"},{"internalType":"uint256[]","name":"ids","type":"uint256[]"}],"name":"balanceOfBatch","outputs":[{"internalType":"uint256[]","name":"","type":"uint256[]"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"}],"name":"canUpdatePack","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"contractType","outputs":[{"internalType":"bytes32","name":"","type":"bytes32"}],"stateMutability":"pure","type":"function"},{"inputs":[],"name":"contractURI","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"contractVersion","outputs":[{"internalType":"uint8","name":"","type":"uint8"}],"stateMutability":"pure","type":"function"},{"inputs":[{"components":[{"internalType":"address","name":"assetContract","type":"address"},{"internalType":"enum ITokenBundle.TokenType","name":"tokenType","type":"uint8"},{"internalType":"uint256","name":"tokenId","type":"uint256"},{"internalType":"uint256","name":"totalAmount","type":"uint256"}],"internalType":"struct ITokenBundle.Token[]","name":"_contents","type":"tuple[]"},{"internalType":"uint256[]","name":"_numOfRewardUnits","type":"uint256[]"},{"internalType":"string","name":"_packUri","type":"string"},{"internalType":"uint128","name":"_openStartTimestamp","type":"uint128"},{"internalType":"uint128","name":"_amountDistributedPerOpen","type":"uint128"},{"internalType":"address","name":"_recipient","type":"address"}],"name":"createPack","outputs":[{"internalType":"uint256","name":"packId","type":"uint256"},{"internalType":"uint256","name":"packTotalSupply","type":"uint256"}],"stateMutability":"payable","type":"function"},{"inputs":[],"name":"getDefaultRoyaltyInfo","outputs":[{"internalType":"address","name":"","type":"address"},{"internalType":"uint16","name":"","type":"uint16"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"_packId","type":"uint256"}],"name":"getPackContents","outputs":[{"components":[{"internalType":"address","name":"assetContract","type":"address"},{"internalType":"enum ITokenBundle.TokenType","name":"tokenType","type":"uint8"},{"internalType":"uint256","name":"tokenId","type":"uint256"},{"internalType":"uint256","name":"totalAmount","type":"uint256"}],"internalType":"struct ITokenBundle.Token[]","name":"contents","type":"tuple[]"},{"internalType":"uint256[]","name":"perUnitAmounts","type":"uint256[]"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"bytes32","name":"role","type":"bytes32"}],"name":"getRoleAdmin","outputs":[{"internalType":"bytes32","name":"","type":"bytes32"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"bytes32","name":"role","type":"bytes32"},{"internalType":"uint256","name":"index","type":"uint256"}],"name":"getRoleMember","outputs":[{"internalType":"address","name":"member","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"bytes32","name":"role","type":"bytes32"}],"name":"getRoleMemberCount","outputs":[{"internalType":"uint256","name":"count","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"_tokenId","type":"uint256"}],"name":"getRoyaltyInfoForToken","outputs":[{"internalType":"address","name":"","type":"address"},{"internalType":"uint16","name":"","type":"uint16"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"_bundleId","type":"uint256"}],"name":"getTokenCountOfBundle","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"_bundleId","type":"uint256"},{"internalType":"uint256","name":"index","type":"uint256"}],"name":"getTokenOfBundle","outputs":[{"components":[{"internalType":"address","name":"assetContract","type":"address"},{"internalType":"enum ITokenBundle.TokenType","name":"tokenType","type":"uint8"},{"internalType":"uint256","name":"tokenId","type":"uint256"},{"internalType":"uint256","name":"totalAmount","type":"uint256"}],"internalType":"struct ITokenBundle.Token","name":"","type":"tuple"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"_bundleId","type":"uint256"}],"name":"getUriOfBundle","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"bytes32","name":"role","type":"bytes32"},{"internalType":"address","name":"account","type":"address"}],"name":"grantRole","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"bytes32","name":"role","type":"bytes32"},{"internalType":"address","name":"account","type":"address"}],"name":"hasRole","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"bytes32","name":"role","type":"bytes32"},{"internalType":"address","name":"account","type":"address"}],"name":"hasRoleWithSwitch","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"_defaultAdmin","type":"address"},{"internalType":"string","name":"_name","type":"string"},{"internalType":"string","name":"_symbol","type":"string"},{"internalType":"string","name":"_contractURI","type":"string"},{"internalType":"address[]","name":"_trustedForwarders","type":"address[]"},{"internalType":"address","name":"_royaltyRecipient","type":"address"},{"internalType":"uint256","name":"_royaltyBps","type":"uint256"}],"name":"initialize","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"account","type":"address"},{"internalType":"address","name":"operator","type":"address"}],"name":"isApprovedForAll","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"forwarder","type":"address"}],"name":"isTrustedForwarder","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"bytes[]","name":"data","type":"bytes[]"}],"name":"multicall","outputs":[{"internalType":"bytes[]","name":"results","type":"bytes[]"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"name","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"nextTokenIdToMint","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"},{"internalType":"address","name":"","type":"address"},{"internalType":"uint256[]","name":"","type":"uint256[]"},{"internalType":"uint256[]","name":"","type":"uint256[]"},{"internalType":"bytes","name":"","type":"bytes"}],"name":"onERC1155BatchReceived","outputs":[{"internalType":"bytes4","name":"","type":"bytes4"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"},{"internalType":"address","name":"","type":"address"},{"internalType":"uint256","name":"","type":"uint256"},{"internalType":"uint256","name":"","type":"uint256"},{"internalType":"bytes","name":"","type":"bytes"}],"name":"onERC1155Received","outputs":[{"internalType":"bytes4","name":"","type":"bytes4"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"},{"internalType":"address","name":"","type":"address"},{"internalType":"uint256","name":"","type":"uint256"},{"internalType":"bytes","name":"","type":"bytes"}],"name":"onERC721Received","outputs":[{"internalType":"bytes4","name":"","type":"bytes4"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"_packId","type":"uint256"},{"internalType":"uint256","name":"_amountToOpen","type":"uint256"}],"name":"openPack","outputs":[{"components":[{"internalType":"address","name":"assetContract","type":"address"},{"internalType":"enum ITokenBundle.TokenType","name":"tokenType","type":"uint8"},{"internalType":"uint256","name":"tokenId","type":"uint256"},{"internalType":"uint256","name":"totalAmount","type":"uint256"}],"internalType":"struct ITokenBundle.Token[]","name":"","type":"tuple[]"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"owner","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"bytes32","name":"role","type":"bytes32"},{"internalType":"address","name":"account","type":"address"}],"name":"renounceRole","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"bytes32","name":"role","type":"bytes32"},{"internalType":"address","name":"account","type":"address"}],"name":"revokeRole","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"tokenId","type":"uint256"},{"internalType":"uint256","name":"salePrice","type":"uint256"}],"name":"royaltyInfo","outputs":[{"internalType":"address","name":"receiver","type":"address"},{"internalType":"uint256","name":"royaltyAmount","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"from","type":"address"},{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256[]","name":"ids","type":"uint256[]"},{"internalType":"uint256[]","name":"amounts","type":"uint256[]"},{"internalType":"bytes","name":"data","type":"bytes"}],"name":"safeBatchTransferFrom","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"from","type":"address"},{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"id","type":"uint256"},{"internalType":"uint256","name":"amount","type":"uint256"},{"internalType":"bytes","name":"data","type":"bytes"}],"name":"safeTransferFrom","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"operator","type":"address"},{"internalType":"bool","name":"approved","type":"bool"}],"name":"setApprovalForAll","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"string","name":"_uri","type":"string"}],"name":"setContractURI","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"_royaltyRecipient","type":"address"},{"internalType":"uint256","name":"_royaltyBps","type":"uint256"}],"name":"setDefaultRoyaltyInfo","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"_newOwner","type":"address"}],"name":"setOwner","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"_tokenId","type":"uint256"},{"internalType":"address","name":"_recipient","type":"address"},{"internalType":"uint256","name":"_bps","type":"uint256"}],"name":"setRoyaltyInfoForToken","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"bytes4","name":"interfaceId","type":"bytes4"}],"name":"supportsInterface","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"symbol","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"}],"name":"totalSupply","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"_tokenId","type":"uint256"}],"name":"uri","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"stateMutability":"payable","type":"receive"}]')}}]);