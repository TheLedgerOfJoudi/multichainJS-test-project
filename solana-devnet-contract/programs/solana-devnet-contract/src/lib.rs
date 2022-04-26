use anchor_lang::prelude::*;

declare_id!("EatSACs9Sn2mn9Zrzkhy3ogN92zJXh1u5tqxiu8K7svY");

#[program]
pub mod solana_devnet_contract {
    use super::*;

    pub fn store(ctx: Context<StoreCtx>, number: i32) -> Result<()> {
        let num: &mut Account<Number> = &mut ctx.accounts.number_account;
        num.content = number;
        Ok(())
    }
}

#[derive(Accounts)]
pub struct StoreCtx<'info> {
    // properly set the space later
    #[account(init, payer = authority, space = 32)]
    pub number_account: Account<'info, Number>,

    #[account(mut)]
    pub authority: Signer<'info>,

    #[account(address = anchor_lang::solana_program::system_program::ID)]
    pub system_program: AccountInfo<'info>
}

#[account]
pub struct Number {
    pub content: i32,
}