async function main() {
  const [signer] = await ethers.getSigners();

  const euro = await ethers.getContractAt("Euro", signer)
  const myAddress = await signer.getAddress()
  console.log("My Balance", String(await euro.balanceOf(myAddress)))

  console.log("Total Supply", String(await euro.totalSupply()))
}

main()
  .then(() => process.exit(0))
  .catch(error => {
    console.error(error);
    process.exit(1);
  });