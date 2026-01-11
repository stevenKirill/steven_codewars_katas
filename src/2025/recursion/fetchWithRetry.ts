// Вспомогательная функция паузы
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

async function fetchWithRetry<T>(url: string, props: RequestInit, count: number): Promise<T> {
  try {
    const result = await fetch(url, props);

    // Fetch не кидает ошибку при 404/500, нужно проверять вручную
    if (!result.ok) {
      throw new Error(`HTTP Error: ${result.status}`);
    }

    return await result.json();
  } catch (error) {
    // Используем <= 0 для защиты от отрицательных чисел
    if (count <= 0) {
      // Лучше пробрасывать реальную причину ошибки, а не просто "Timeout"
      throw error;
    } else {
      console.log(`Retrying... attempts left: ${count}`);
      // ВАЖНО: здесь используем count - 1
      return await fetchWithRetry<T>(url, props, count - 1);
    }
  }
}
