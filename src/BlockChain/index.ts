import { Block, Transaction } from './type';
import * as JsSha from 'jssha';
import { jsSHA } from 'jssha';
// import { set } from '../Utility/set';

export class BlockChain {
  public chain: Block[];
  public nodes: string[];
  private currentTransactions: Transaction[];

  /**
   * ブロックのハッシュ値を計算する
   *
   * @param {Block} block
   * @returns {string}
   */
  public static hash(block: Block): string {
    const blockString: string = JSON.stringify(block);
    const shaObj: jsSHA = new JsSha('SHA-256', 'TEXT');
    shaObj.update(blockString);
    return shaObj.getHash('HEX');
  }

  /**
   * プルーフ・オブ・ワーク
   * proofを計算する
   *
   * @param {number} lastProof
   * @returns {number}
   */
  public static proofOfWork(lastProof: number) {
    let proof: number = 0;
    while (!(BlockChain.validProof(lastProof, proof))) {
      proof += 1;
    }
    return proof;
  }

  /**
   * プルーフが解であるか判定する
   *
   * @param {number} lastProof
   * @param {number} proof
   * @returns {boolean}
   */
  public static validProof(lastProof: number, proof: number): boolean {
    const guess: string = JSON.stringify(`${lastProof}${proof}`);
    const guessHashObj: jsSHA = new JsSha('SHA-256', 'TEXT');
    guessHashObj.update(guess);
    const guessHash: string = guessHashObj.getHash('HEX');
    return guessHash.slice(0, 4) === '0000';
  }

  constructor() {
    this.chain = [];
    this.nodes = [];
    this.currentTransactions = [];
    this.createBlock(100, '1');
  }

  /**
   * ブロックの作成
   *
   * @param {number} proof
   * @param {string} previousHash
   * @returns {Block}
   */
  public createBlock(proof: number, previousHash: string | null = null): Block {

    const block: Block = {
      index: this.chain.length + 1,
      timestamp: new Date().getTime(),
      transactions: this.currentTransactions,
      proof,
      previousHash: previousHash || BlockChain.hash(this.lastBlock()),
    };

    this.currentTransactions = [];
    this.chain.push(block);
    return block;
  }

  /**
   * トランザクションの作成
   *
   * @param {string} sender
   * @param {string} recipient
   * @param {number} amount
   * @returns {number}
   */
  public createTransaction(sender: string, recipient: string, amount: number): number {
    const transaction: Transaction = {sender, recipient, amount};
    this.currentTransactions.push(transaction);

    return this.lastBlock().index + 1;
  }

  /**
   * 最後のブロックを取得 or エラーを投げる
   * @returns {Block}
   */
  public lastBlock(): Block {
    const chain: Block[] = this.chain;
    const last: Block | undefined = chain[chain.length - 1];
    if (last) {
      return last;
    } else {
      throw new Error('The chain should have at least one block as a genesis.');
    }
  }

  // public registerNode(address: string) {
  //   const parsedUrl = new URL(address);
  //   const node = this.nodes;
  //   node.push(parsedUrl.host);
  //   this.nodes = set(this.nodes);
  // }
  //
  // public validChain(chain: Block[]): boolean {
  //   let lastBlock = chain[0];
  //   let currentIndex = 1;
  //
  //   while (currentIndex < chain.length) {
  //     const block = chain[currentIndex];
  //     console.log(lastBlock);
  //     console.log(block);
  //     console.log('------------------------------');
  //
  //     if (block.previousHash !== BlockChain.hash(lastBlock)) {
  //       return false;
  //     }
  //
  //     if (!(BlockChain.validProof(lastBlock.proof, block.proof))) {
  //       return false;
  //     }
  //
  //     lastBlock = block;
  //     currentIndex += 1;
  //   }
  //   return true;
  // }
  //
  // public resolveConflicts() {
  //   const neighbours = this.nodes;
  //   const newChain = null;
  //
  //   const max_length = this.chain.length;
  //
  //   [].forEach.call(this.nodes, (node) => {
  //   })
  //
  // }
}


