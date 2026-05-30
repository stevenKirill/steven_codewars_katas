import { createDeduplicatedTransport, type Request, type Response, type Transport } from './transport';

function assert(condition: boolean, message: string) {
  if (!condition) throw new Error(message);
}

async function testDeduplication() {
  let calls = 0;
  const fakeTransport: Transport = async (request) => {
    calls++;
    return { data: request.url };
  };

  const transport = createDeduplicatedTransport(fakeTransport);
  const req: Request = { url: '/api/user', method: 'GET' };

  const [r1, r2, r3] = await Promise.all([
    transport(req),
    transport(req),
    transport(req),
  ]);

  assert(calls === 1, `expected 1 call, got ${calls}`);
  assert(r1 === r2 && r2 === r3, 'results must be the same reference');
}

async function testHighPriority() {
  let calls = 0;
  let resolveFirst!: () => void;

  const fakeTransport: Transport = () =>
    new Promise<Response>((resolve) => {
      calls++;
      if (calls === 1) {
        resolveFirst = () => resolve({ data: 'old' });
        return;
      }
      resolve({ data: 'new' });
    });

  const transport = createDeduplicatedTransport(fakeTransport);
  const req: Request = { url: '/api/x', method: 'GET' };

  const p4 = transport(req);
  const p5 = transport({ ...req, highPriority: true });

  resolveFirst();
  const [r4, r5] = await Promise.all([p4, p5]);

  assert(calls === 2, `expected 2 calls, got ${calls}`);
  assert(r4.data === 'new' && r5.data === 'new', 'both must get new result');
  assert(r4 === r5, 'same reference');
}

async function testRepeatCount() {
  let calls = 0;
  const flakyTransport: Transport = async () => {
    calls++;
    if (calls < 4) throw new Error('fail');
    return { data: 'ok' };
  };

  const flaky = createDeduplicatedTransport(flakyTransport, { repeatCount: 3 });
  const result = await flaky({ url: '/api/data', method: 'GET' });

  assert(calls === 4, `expected 4 calls, got ${calls}`);
  assert(result.data === 'ok', 'must succeed on last attempt');
}

async function main() {
  await testDeduplication();
  await testHighPriority();
  await testRepeatCount();
  console.log('All tests passed');
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
