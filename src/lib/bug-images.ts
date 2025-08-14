// List of bug images from /public/images/bugs/only/
export const bugImages = [
  'beetle-on-a-leaf_27937308242_o.jpg',
  'beetles-under-tree-bark-macro-1.jpg',
  'beetles-under-tree-bark-macro-2.jpg',
  'big-brown-moth-2.jpg',
  'big-fly.jpg',
  'big-harry-tarantula.jpg',
  'black-widow-underbelly.jpg',
  'bumble-bee.jpg',
  'bug-juice.jpg',
  'bug-silhouette-on-screen.jpg',
  'cotton-candy-moth.jpg',
  'easter-bugs-1.jpg',
  'easter-bugs-2.jpg',
  'easter-bugs-3.jpg',
  'inch-worm-macro-1.jpg',
  'inch-worm-macro-2.jpg',
  'jumping-spider.jpg',
  'ladybug-macro.jpg',
  'ladybug-softy.jpg',
  'leaf-footed-bug-on-a-window-1.jpg',
  'leaf-footed-bug-on-a-window-2.jpg',
  'little-green-leaf-bug.jpg',
  'macro-fly.jpg',
  'potato-beetle.jpg',
  'rolley-polley.jpg',
  'spider-in-white.jpg',
  'under-ladybug-skirt.jpg',
  'unknown-red-bug.jpg'
];

// Helper function to get image by index with wrapping
export const getImageByIndex = (index: number) => {
  return bugImages[index % bugImages.length];
};
