async function main() {
  const [signer] = await ethers.getSigners();

  const euro = await ethers.getContractAt("Euro", signer)
  await euro.mint("0x3F86c3A4D4857a6F92999f214e2eD3aE7BB852C1", 1)
}

main()
  .then(() => process.exit(0))
  .catch(error => {
    console.error(error);
    process.exit(1);
  });