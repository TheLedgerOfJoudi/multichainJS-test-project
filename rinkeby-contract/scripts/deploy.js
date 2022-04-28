const {ethers} = require('hardhat')

async function main() {
    const Storage = await ethers.getContractFactory('Storage');
    const storage = await Storage.deploy();
    console.log("Deployed to " + storage.address);
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });

    //0xC135B9F4976de1FB0f3f8f9EE28F3Ae1B7Bc60D8