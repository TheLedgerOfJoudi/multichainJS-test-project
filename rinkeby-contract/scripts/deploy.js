const {ethers} = require('hardhat')

async function main() {
    const Storage = await ethers.getContractFactory('Storage');
    const storage = await Storage.deploy(1);
    console.log("Deployed to " + storage.address);
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });

    //0xFCb1aD772ec4CB6d8351dd417008984f9C16E18b