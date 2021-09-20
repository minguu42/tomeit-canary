export const makeSound = async (selectors: string): Promise<void> => {
  const audio = document.querySelector<HTMLMediaElement>(selectors);
  if (audio === null) {
    return;
  }
  await audio.play();
};
