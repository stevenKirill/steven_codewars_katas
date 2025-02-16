// Плохой пример - блокировка Event Loop
function blockingOperation() {
  const start = Date.now();
  while(Date.now() - start < 5000) {}
}

// Хороший пример - разбиение на части
function nonBlockingOperation(items) {
  const chunk = items.slice(0, 100);
  if (chunk.length > 0) {
    processChunk(chunk);
    setTimeout(() => {
        nonBlockingOperation(items.slice(100));
    }, 0);
  }
}
