// Photos in /public/images/bugs/only/.
// The order is part of the public API: `?image=N` serves bugImages[N]. Only append; never reorder.
export const bugImages = [
  'leaf-footed-bug-on-a-window-2.jpg',
  'black-widow-underbelly.jpg',
  'leaf-footed-bug-on-a-window-1.jpg',
  'big-brown-moth-2.jpg',
  'cotton-candy-moth.jpg',
  'easter-bugs-3.jpg',
  'ladybug-softy.jpg',
  'easter-bugs-1.jpg',
  'easter-bugs-2.jpg',
  'ladybug-macro.jpg',
  'beetle-on-a-leaf_27937308242_o.jpg',
  'macro-fly.jpg',
  'little-green-leaf-bug.jpg',
  'bug-juice.jpg',
  'jumping-spider.jpg',
  'rolley-polley.jpg',
  'big-harry-tarantula.jpg',
  'inch-worm-macro-2.jpg',
  'inch-worm-macro-1.jpg',
  'spider-in-white.jpg',
  'unknown-red-bug.jpg',
  'under-ladybug-skirt.jpg',
  'beetles-under-tree-bark-macro-1.jpg',
  'beetles-under-tree-bark-macro-2.jpg',
  'bug-silhouette-on-screen.jpg',
  'bumble-bee.jpg',
  'potato-beetle.jpg',
  'big-fly.jpg',
];

export const SPECIMEN_COUNT = bugImages.length;

// Helper function to get image by index with wrapping
export const getImageByIndex = (index: number) => {
  return bugImages[index % bugImages.length];
};
