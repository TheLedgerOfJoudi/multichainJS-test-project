import * as anchor from '@project-serum/anchor';
import { Program } from '@project-serum/anchor';
import { Idl } from '@project-serum/anchor';
import { SolanaDevnetContract } from '../target/types/solana_devnet_contract';

describe('solana-devnet-contract', () => {
  
  // Configure the client to use the local cluster.
  anchor.setProvider(anchor.Provider.env());
  
  //const program = anchor.workspace.SolanaDevnetContract;

  
  it('It Creates a Joke!', async () => {
    /*
    // Create an address for the soon-to-be created Account
    const jokeAccountKeypair = anchor.web3.Keypair.generate()
    //console.log(program)
    // Craft the createJoke Instruction
  
    const tx = await program.rpc.createJoke('8', {
      accounts: {
        authority: program.provider.wallet.publicKey,
        jokeAccount: jokeAccountKeypair.publicKey,
        systemProgram: anchor.web3.SystemProgram.programId,
      },
      // We need to provide not only the publicKey
      // but also sign with the privateKey to prove that we own jokeAccountKeypair.publicKey
      signers: [jokeAccountKeypair]
    });

    console.log("Your transaction signature", tx);

    // Fetch all joke accounts
    const jokes = await program.account.joke.all();
    console.log(jokes);
    */
   parse({
    "version": "0.1.0",
    "name": "solana_devnet_contract",
    "instructions": [
      {
        "name": "createJoke",
        "accounts": [
          {
            "name": "jokeAccount",
            "isMut": true,
            "isSigner": true
          },
          {
            "name": "authority",
            "isMut": true,
            "isSigner": true
          },
          {
            "name": "systemProgram",
            "isMut": false,
            "isSigner": false
          }
        ],
        "args": [
          {
            "name": "jokeContent",
            "type": "string"
          }
        ]
      }
    ],
    "accounts": [
      {
        "name": "Joke",
        "type": {
          "kind": "struct",
          "fields": [
            {
              "name": "author",
              "type": "publicKey"
            },
            {
              "name": "content",
              "type": "string"
            }
          ]
        }
      }
    ],
    "metadata": {
      "address": "DsCyrbK8krsBS87vVU6uZS7L9J2kMuioim4eVvZcz2fV"
    }
  })
  });
});

const parse = (idl:Idl) => {
  const instructions = idl.instructions
  for (var i in instructions){
    const instruction = instructions[i];
    console.log(instruction)
  }
  }
