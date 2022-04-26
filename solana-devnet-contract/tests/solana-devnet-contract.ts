import * as anchor from '@project-serum/anchor';
// import { Program } from '@project-serum/anchor';
// import { Idl } from '@project-serum/anchor';
// import { SolanaDevnetContract } from '../target/types/solana_devnet_contract';

describe('solana-devnet-contract', () => {
  anchor.setProvider(anchor.Provider.env());
  const program = anchor.workspace.SolanaDevnetContract;

  it('Stores a number', async () => {
    const numberAccountKeypair = anchor.web3.Keypair.generate()
    const tx = await program.rpc.store('1', {
      accounts: {
        authority: program.provider.wallet.publicKey,
        numberAccount: numberAccountKeypair.publicKey,
        systemProgram: anchor.web3.SystemProgram.programId,
      },
      signers: [numberAccountKeypair]
    });

    console.log("Your transaction signature", tx);
    const numbers = await program.account.number.all();
    console.log(numbers);
  });
});
