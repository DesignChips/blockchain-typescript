import { BlockChain } from './index';
import { Block } from './type';

export class Server {
  private blockchain = new BlockChain();

  public send(sender: string, recipient: string, amount: number): number {
    return this.blockchain.createTransaction(sender, recipient, amount);
  }

  public mine(recipient: string): Block {
    const lastBlock = this.blockchain.lastBlock();
    const lastProof = lastBlock.proof;
    const proof = BlockChain.proofOfWork(lastProof);

    // sender: "0" で採掘したことを表す
    this.blockchain.createTransaction('0', recipient, 1);

    return this.blockchain.createBlock(proof);
  }

  public chain(): Block[] {
    return this.blockchain.chain;
  }
}