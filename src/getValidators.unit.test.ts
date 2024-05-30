import { createPublicClient, createTransport, http } from 'viem';
import { arbitrum } from 'viem/chains';
import { it, expect, vi } from 'vitest';
import { getValidators } from './getValidators';

// Xai
const rollupAdminLogicAddress = '0xc47dacfbaa80bd9d8112f4e8069482c2a3221336';

const client = createPublicClient({
  chain: arbitrum,
  transport: http(),
});

it('getValidators return all validators', async () => {
  const { isComplete, validators } = await getValidators(client, {
    rollupAddress: rollupAdminLogicAddress,
  });
  expect(validators).toEqual(['0x25EA41f0bDa921a0eBf48291961B1F10b59BC6b8']);
  expect(isComplete).toBeTruthy();
});

it('getValidators return all validators', async () => {
  const mockTransport = () =>
    createTransport({
      key: 'mock',
      name: 'Mock Transport',
      request: vi.fn(({ method, params }) => {
        console.log('method: ', method);
        if (method === 'eth_getLogs') {
          return [
            {
              address: '0x193e2887031c148ab54f5e856ea51ae521661200',
              args: { id: 6n },
              blockHash: '0x3bafb9574d8a3a7c09070935dc3ca936a5df06e2abd09cbd2a3cd489562e748f',
              blockNumber: 36723964n,
              data: '0x',
              eventName: 'OwnerFunctionCalled',
              logIndex: 42,
              removed: false,
              topics: Array(2),
              0: '0xea8787f128d10b2cc0317b0c3960f9ad447f7f6c1ed189db1083ccffd20f456e',
              1: '0x0000000000000000000000000000000000000000000000000000000000000006',
              length: 2,
              transactionHash: '0x448fdaac1651fba39640e2103d83f78ff4695f95727f318f0f9e62c3e2d77a10',
              transactionIndex: 3,
            },
          ];
        }

        if (method === 'eth_getTransactionByHash') {
          return {
            accessList: [],
            blockHash: '0x3bafb9574d8a3a7c09070935dc3ca936a5df06e2abd09cbd2a3cd489562e748f',
            blockNumber: 36723964n,
            chainId: 421614,
            from: '0xfd5735380689a53e6b048e980f34cb94be9fd0c7',
            gas: 7149526n,
            gasPrice: 147390000n,
            hash: '0x448fdaac1651fba39640e2103d83f78ff4695f95727f318f0f9e62c3e2d77a10',
            input:
              '0xcb73d6e2000000000000000000000000000000000000000000000000000000000000002000000000000000000000000000000000000000000000000000000000000000e0000000000000000000000000725d217057e509dd284ee0e13ac846cfea0b7bb100000000000000000000000000000000000000000000000000000000000005400000000000000000000000000000000000000000000000000000000000019999000000000000000000000000d1fe5b0a963a0e557aabb59cb61ffdd568b4605c00000000000000000000000000000000000000000000000000000000000000010000000000000000000000000000000000000000000000000000000005f5e100000000000000000000000000000000000000000000000000000000000000009600000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000016345785d8a00000754e09320c381566cc0449904c377a52bd34a6b9404432e80afd573b67f7b17000000000000000000000000fd5735380689a53e6b048e980f34cb94be9fd0c700000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000fe22e119e00000000000000000000000000000000000000000000000000000000000001c000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000001680000000000000000000000000000000000000000000000000000000000000003000000000000000000000000000000000000000000000000000000000000151800000000000000000000000000000000000000000000000000000000000000e1000000000000000000000000000000000000000000000000000000000000002757b22686f6d657374656164426c6f636b223a302c2264616f466f726b426c6f636b223a6e756c6c2c2264616f466f726b537570706f7274223a747275652c22656970313530426c6f636b223a302c2265697031353048617368223a22307830303030303030303030303030303030303030303030303030303030303030303030303030303030303030303030303030303030303030303030303030303030222c22656970313535426c6f636b223a302c22656970313538426c6f636b223a302c2262797a616e7469756d426c6f636b223a302c22636f6e7374616e74696e6f706c65426c6f636b223a302c2270657465727362757267426c6f636b223a302c22697374616e62756c426c6f636b223a302c226d756972476c6163696572426c6f636b223a302c226265726c696e426c6f636b223a302c226c6f6e646f6e426c6f636b223a302c22636c69717565223a7b22706572696f64223a302c2265706f6368223a307d2c22617262697472756d223a7b22456e61626c654172624f53223a747275652c22416c6c6f774465627567507265636f6d70696c6573223a66616c73652c2244617461417661696c6162696c697479436f6d6d6974746565223a747275652c22496e697469616c4172624f5356657273696f6e223a31312c2247656e65736973426c6f636b4e756d223a302c224d6178436f646553697a65223a32343537362c224d6178496e6974436f646553697a65223a34393135322c22496e697469616c436861696e4f776e6572223a22307846643537333533383036383941353365364230343865393830463334634239346265396644306337227d2c22636861696e4964223a36383231393137393432327d000000000000000000000000000000000000000000000000000000000000000000000000000000000000010000000000000000000000006a23ccc1c36d2aaa98aef2a4471cf807dd22e45b',
            maxFeePerGas: 174300000n,
            maxPriorityFeePerGas: 0n,
            nonce: 82,
            r: '0x49cabfb3327a9f8c0fb8da0d8b3b81daf2f46d09ebc3c640b09d788f51159b7f',
            s: '0x2ee5ae568a892beed3a763c33c8da4a3368be0b2422f2785fe00be76ecad08f8',
            to: '0x06e341073b2749e0bb9912461351f716decda9b0',
            transactionIndex: 3,
            type: 'eip1559',
            typeHex: '0x2',
            v: 1n,
            value: 0n,
            yParity: 1,
          };
        }
        return null;
      }) as any,
      type: 'mock',
    });

  const mockClient = createPublicClient({
    transport: mockTransport,
  });

  const { validators, isComplete } = await getValidators(mockClient, {
    rollupAddress: rollupAdminLogicAddress,
  });

  expect(validators).toEqual(['0x6a23CcC1c36D2aaA98AeF2a4471cf807DD22e45b']);
  expect(isComplete).toBeTruthy();
});