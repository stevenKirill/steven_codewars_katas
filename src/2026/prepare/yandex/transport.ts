// C. Сетевое дежавю
// Придя на новый проект, вы обнаружили проблему. Пока открывается страница, в сеть уходит много одинаковых запросов. Копнув глубже, вы обнаруживаете, что разные части приложения независимо запрашивают одни и те же данные, не зная, что такой запрос уже выполняется. Каждый запускает свой запрос, каждый ждёт своего ответа, и сервер несколько раз отвечает на один и тот же вопрос параллельно. Это создаёт лишнюю нагрузку на сервер и сеть. Ваша задача — исправить это.

// В проекте уже есть транспорт, через который идут все запросы.

// Вот его типизация:


type Request = {
  url: string;
  method: string;
  body?: Record<string, string>;
  highPriority?: boolean;
  signal?: AbortSignal;
}

type Response = {
  data: unknown
}

type Transport = (request: Request) => Promise<Response>
// От вас требуется написать функцию-декоратор createDeduplicatedTransport, которая решала бы проблему с запросами дубликатами.


type Options = {
  repeatCount?: number
}

type Deferred<T> = {
  promise: Promise<T>;
  resolve: (value: T) => void;
  reject: (reason: unknown) => void;
};

function createDeferred<T>(): Deferred<T> {
  let resolve!: (value: T) => void;
  let reject!: (reason: unknown) => void;
  const promise = new Promise<T>((res, rej) => {
    resolve = res;
    reject = rej;
  });

  return { promise, resolve, reject };
}

function getRequestKey(request: Request): string {
  const { url, method, body } = request;
  return `${method}:${url}:${body ? JSON.stringify(body) : ''}`;
}

export function createDeduplicatedTransport(
  transport: Transport,
  options: Options = {}
): Transport {
  const { repeatCount = 0 } = options;
  const pending = new Map<string, Deferred<Response>>();

  async function executeWithRetry(request: Request): Promise<Response> {
    let lastError: unknown;

    for (let attempt = 0; attempt <= repeatCount; attempt++) {
      try {
        return await transport(request);
      } catch (error) {
        lastError = error;
      }
    }

    throw lastError;
  }

  function launch(request: Request, key: string): Deferred<Response> {
    const deferred = createDeferred<Response>();
    pending.set(key, deferred);

    executeWithRetry(request).then(
      (response) => {
        if (pending.get(key) === deferred) {
          pending.delete(key);
          deferred.resolve(response);
        }
      },
      (error) => {
        if (pending.get(key) === deferred) {
          pending.delete(key);
          deferred.reject(error);
        }
      }
    );

    return deferred;
  }

  return (request: Request) => {
    const key = getRequestKey(request);
    const existing = pending.get(key);

    if (request.highPriority) {
      const deferred = launch(request, key);

      if (existing) {
        deferred.promise.then(
          (response) => existing.resolve(response),
          (error) => existing.reject(error)
        );
      }

      return deferred.promise;
    }

    if (existing) {
      return existing.promise;
    }

    return launch(request, key).promise;
  };
}
// highPriority: Запрос с этим флагом всегда запускает новый сетевой вызов, даже если точно такой же уже выполняется. Все, кто ждал результата предыдущего запроса, получат результат нового.

// repeatCount: При ошибке транспорта повторять запрос до repeatCount раз. Повторы делаются прозрачно: все подписчики ждут финального результата.

// Пример:


const transport = createDeduplicatedTransport(fakeTransport)

// Три части приложения запрашивают одно и то же
const p1 = transport({ url: "/api/user", method: "GET" })
const p2 = transport({ url: "/api/user", method: "GET" })
const p3 = transport({ url: "/api/user", method: "GET" })

// Все три получают один и тот же результат: транспорт вызван один раз
const [r1, r2, r3] = await Promise.all([p1, p2, p3])
// r1 === r2 && r2 === r3

// Приходит highPriority пока первый ещё выполняется
const p4 = transport({ url: "/api/x", method: "GET" })
const p5 = transport({ url: "/api/x", method: "GET", highPriority: true })

// Оба получают результат нового запроса
const [r4, r5] = await Promise.all([p4, p5])
// r4 === r5

// repeatCount
const flaky = createDeduplicatedTransport(flakyTransport, { repeatCount: 3 })

// Если транспорт упал — попробует ещё 3 раза перед тем как бросить ошибку
const result = await flaky({ url: "/api/data", method: "GET" })
