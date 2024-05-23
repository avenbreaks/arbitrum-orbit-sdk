import { ParentChainId } from './types/ParentChain';

export type SequencerInboxMaxTimeVariation = {
  delayBlocks: bigint;
  futureBlocks: bigint;
  delaySeconds: bigint;
  futureSeconds: bigint;
};

export function getDefaultSequencerInboxMaxTimeVariation(
  parentChainId: ParentChainId,
): SequencerInboxMaxTimeVariation {
  const delaySeconds = 60 * 60 * 24 * 4; // 4 days;
  const delayBlocks = delaySeconds / 12;

  const futureSeconds = 60 * 60; // 1 hour;
  const futureBlocks = futureSeconds / 12;

  return {
    delayBlocks: BigInt(delayBlocks),
    futureBlocks: BigInt(futureBlocks),
    delaySeconds: BigInt(delaySeconds),
    futureSeconds: BigInt(futureSeconds),
  };
}
