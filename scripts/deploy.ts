import { ethers } from "hardhat"

const OWNER_CUT_PER_MILLION = 25000


/**
 * @dev Steps:
 * Deploy the Collection implementation
 * Deploy the committee with the desired members. The owner will be the DAO bridge
 * Deploy the collection Manager. The owner will be the DAO bridge
 * Deploy the forwarder. Caller Is the collection manager.
 * Deploy the collection Factory. Owner is the forwarder.
 */
async function main() {
  const owner = process.env['OWNER']
  const acceptedToken = process.env['ACCEPTED_TOKEN']

  console.log('acceptedToken:', acceptedToken);
  console.log('owner:', owner);

  const Marketplace = await ethers.getContractFactory("Marketplace")
  const marketplace = await Marketplace.deploy(
    acceptedToken,
    OWNER_CUT_PER_MILLION,
    owner,
  )

  console.log('NFT Marketplace:', marketplace.address)
}

main()
  .then(() => process.exit(0))
  .catch(error => {
    console.error(error)
    process.exit(1)
  })