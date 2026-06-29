// lib/compress.ts
export async function compressImage(file: File, maxSizeKB = 800): Promise<File> {
  return new Promise((resolve) => {
    const img = new Image();
    const url = URL.createObjectURL(file);
    
    img.onload = () => {
      URL.revokeObjectURL(url); // clean up blob immediately after use
      
      const canvas = document.createElement('canvas');
      let { width, height } = img;
      
      // Scale down if too large
      const MAX_DIMENSION = 1200;
      if (width > MAX_DIMENSION || height > MAX_DIMENSION) {
        if (width > height) {
          height = Math.round((height * MAX_DIMENSION) / width);
          width = MAX_DIMENSION;
        } else {
          width = Math.round((width * MAX_DIMENSION) / height);
          height = MAX_DIMENSION;
        }
      }
      
      canvas.width = width;
      canvas.height = height;
      canvas.getContext('2d')!.drawImage(img, 0, 0, width, height);
      
      // Try quality levels until under maxSizeKB
      let quality = 0.85;
      const tryCompress = () => {
        canvas.toBlob(
          (blob) => {
            if (!blob) return resolve(file); // fallback to original
            
            if (blob.size > maxSizeKB * 1024 && quality > 0.2) {
              quality -= 0.1;
              tryCompress(); // try again with lower quality
              return;
            }
            
            resolve(new File([blob], file.name, { type: 'image/jpeg' }));
          },
          'image/jpeg',
          quality,
        );
      };
      
      tryCompress();
    };
    
    img.onerror = () => resolve(file); // fallback to original on error
    img.src = url;
  });
}