const openFileDialog = (accept: string, capture?: "user" | "environment") => {
  return new Promise<File | null>((resolve) => {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = accept;
    if (capture) {
      input.capture = capture;
    }

    input.onchange = (e) => {
      const file = (e.target as HTMLInputElement).files?.[0];
      resolve(file || null);
    };

    input.click();
  });
};

const readFileAsDataURL = (file: File): Promise<string> => {
  return new Promise<string>((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
};

export const takePicture = async (): Promise<string | null> => {
  const file = await openFileDialog("image/*", "environment");
  if (!file) return null;
  return readFileAsDataURL(file);
};

export const selectFromGallery = async (): Promise<string | null> => {
  const file = await openFileDialog("image/*");
  if (!file) return null;
  return readFileAsDataURL(file);
};
