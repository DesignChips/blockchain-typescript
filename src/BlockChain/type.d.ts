export interface Transaction {
  sender: string,
  recipient: string,
  amount: number,
}

export interface Block {
  index: number,
  timestamp: number,
  transactions: Transaction[],
  proof: number,
  previousHash: string,
}

export interface BlockChainServer {
  send(sender: string, recipient: string, amount: number): number,
  mine(recipient: string): Block,
  chain(): Block[],
}
