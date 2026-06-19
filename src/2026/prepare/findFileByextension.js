const tree = {
  name: "project",
  type: "folder",
  children: [
    {
      name: "docs",
      type: "folder",
      children: [{ name: "readme.txt", type: "file", ext: "txt" }],
    },
    {
      name: "src",
      type: "folder",
      children: [
        { name: "index.js", type: "file", ext: "js" },
        {
          name: "utils",
          type: "folder",
          children: [{ name: "helper.js", type: "file", ext: "js" }],
        },
      ],
    },
  ],
};


function findFilesByExtension(node, ext, currentPath = "") {
  // Формируем путь для текущего узла
  const newPath = `${currentPath}/${node.name}`;

  // Базовый случай: если это файл и расширение совпадает
  if (node.type === "file" && node.ext === ext) {
    return [newPath];
  }

  // Если это папка, рекурсивно обходим всех детей и собираем результаты в один массив
  if (node.type === "folder" && node.children) {
    return node.children.flatMap(child => findFilesByExtension(child, ext, newPath));
  }

  // Если файл не подошел по расширению или папка пустая
  return [];
}

console.log(findFilesByExtension(tree, "js"));
// → ['/project/src/index.js', '/project/src/utils/helper.js']

function findFilesByExtension2(node, ext, currentPath = "") {
  const newPath = `${currentPath}/${node.name}`;

  if (node.type === "file") {
    return node.ext === ext ? [newPath] : [];
  }

  if (node.type === "folder" && node.children) {
    return node.children.reduce((acc, child) => {
      return acc.concat(findFilesByExtension2(child, ext, newPath));
    }, []);
  }

  return [];
}
