
export const addWatermark = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    // Check if file is an image
    if (!file.type.match(/image.*/)) {
        // Return raw data if not an image (fallback)
        const reader = new FileReader();
        reader.onload = (e) => resolve(e.target?.result as string);
        reader.onerror = reject;
        reader.readAsDataURL(file);
        return;
    }

    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = (event) => {
      const img = new Image();
      img.src = event.target?.result as string;
      img.onload = () => {
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        if (!ctx) {
          reject(new Error('Canvas context not available'));
          return;
        }

        canvas.width = img.width;
        canvas.height = img.height;

        // Draw original image
        ctx.drawImage(img, 0, 0);

        // Watermark Configuration
        const text = "Hermes Saze Sabz | هرمس سازه سبز";
        const fontSize = Math.max(20, Math.floor(canvas.width * 0.04)); // Responsive font size
        
        // Add shadow/outline for visibility on any background
        ctx.shadowColor = "rgba(0,0,0,0.8)";
        ctx.shadowBlur = 4;
        ctx.shadowOffsetX = 2;
        ctx.shadowOffsetY = 2;

        ctx.font = `bold ${fontSize}px 'Vazirmatn', sans-serif`;
        ctx.fillStyle = "rgba(255, 255, 255, 0.85)"; // White with slight transparency
        ctx.textAlign = "right";
        ctx.textBaseline = "bottom";

        // Position: Bottom Right with padding relative to font size
        const paddingX = fontSize;
        const paddingY = fontSize / 2;
        
        ctx.fillText(text, canvas.width - paddingX, canvas.height - paddingY);

        // Return as Data URL (Base64)
        resolve(canvas.toDataURL(file.type));
      };
      img.onerror = (error) => reject(error);
    };
    reader.onerror = (error) => reject(error);
  });
};