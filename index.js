//importing required classes
const {
    Connection,
    PublicKey,
    clusterApiUrl,
    Keypair,
    LAMPORTS_PER_SOL,
    Transaction,
    Account,
   } = require("@solana/web3.js");

//Creating new wallet
const newPair = new Keypair();
console.log(newPair);
//Storing the public and private key
const publicKey = new PublicKey(newPair._keypair.publicKey).toString();
const secretKey = newPair._keypair.secretKey;
//Wallet creation complete

//Function to get balance of your wallet
const getWalletBalance = async () => {
    try{
        //Creates a connection object that’ll be used to get the balance
        //clusterApiUrl provides us the URL for devnet that we’ll be passing to create our connection object so that we get details of devnet
        const connection = new Connection(clusterApiUrl("devnet"), "confirmed");
        const myWallet = await Keypair.fromSecretKey(secretKey);
        //To query the balance of this wallet
        const walletBalance = await connection.getBalance(
            new PublicKey(myWallet.publicKey)
          );
          console.log(`=> For wallet address ${publicKey}`);
          console.log(`   Wallet balance: ${parseInt(walletBalance)/LAMPORTS_PER_SOL}SOL`);
      
    } catch(err) {
        console.log(err);
    }
};

//Function to airdrop SOL in the wallet
const airDropSol = async () => {
    try{
        //create a connection object and a walletKeyPair object for the airdrop function
        const connection = new Connection(clusterApiUrl("devnet"), "confirmed");
        const walletKeyPair = await Keypair.fromSecretKey(secretKey);
        //create an airdrop signature using the wallet details and the amount of SOL we want to airdrop 
        console.log(' -- Airdropping 5 SOL --');
        const fromAirDropSignature = await connection.requestAirdrop(
            new PublicKey(walletKeyPair.publicKey),
            5 * LAMPORTS_PER_SOL
        );
        await connection.confirmTransaction(fromAirDropSignature);
    } catch (err) {
        console.log(err);
    }
};

//Driver function
const driverFunction = async () => {
    await getWalletBalance();
    await airDropSol();
    await getWalletBalance();
};
driverFunction();