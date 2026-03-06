/**
 * ASCII Art Converter
 * A lightweight library to convert images to ASCII art.
 */
const AsciiArt = {
    // Character sets
    presets: {
        simple: ['@', '%', '#', '*', '+', '=', '-', ':', '.', ' '],
        // Ordered by density (dark to light)
        complex: '$@B%8&WM#*oahkbdpqwmZO0QLCJUYXzcvunxrjft/\\|()1{}[]?-_+~<>i!lI;:,"^`\'. '.split(''),
        // Characters for directional edges: vertical, diagonal\, diagonal/, horizontal
        edges: ['|', '\\', '/', '-', '+'] 
    },

    /**
     * Converts an image element to an ASCII string or HTML.
     * @param {HTMLImageElement} image - The source image element.
     * @param {object} options - Configuration options.
     * @param {number} options.width - The desired width in characters (default: 100).
     * @param {string} options.preset - 'simple', 'complex' or 'edge' (default: 'simple').
     * @param {boolean} options.color - Whether to generate colored HTML (default: false).
     * @param {boolean} options.invert - Whether to invert brightness (default: false).
     * @param {number} options.contrast - Contrast adjustment -128 to 128 (default: 0).
     * @param {string} options.mode - 'standard' or 'edge' (default: 'standard').
     * @param {number} options.threshold - Threshold for edge detection 0-255 (default: 50).
     * @returns {string} The ASCII art string (or HTML string).
     */
    convert: function(image, options = {}) {
        const width = options.width || 100;
        const preset = options.preset || 'simple';
        const color = options.color || false;
        const invert = options.invert || false;
        const contrast = options.contrast || 0;
        const mode = options.mode || 'standard';
        const threshold = options.threshold !== undefined ? options.threshold : 100;

        const chars = this.presets[preset] || this.presets.simple;
        
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');

        // Calculate height to maintain aspect ratio
        // Note: Fonts are usually taller than wide (approx 1:2), so we scale height down
        const fontAspectRatio = 0.55; 
        const height = Math.floor(width * (image.height / image.width) * fontAspectRatio);

        canvas.width = width;
        canvas.height = height;

        // Draw image to canvas, resizing it
        ctx.drawImage(image, 0, 0, width, height);

        // Get pixel data
        const imageData = ctx.getImageData(0, 0, width, height);
        const data = imageData.data;

        // Pre-calculate contrast factor
        const contrastFactor = (259 * (contrast + 255)) / (255 * (259 - contrast));

        // Helper to get brightness of a pixel at x, y
        const getBrightness = (x, y) => {
            if (x < 0 || x >= width || y < 0 || y >= height) return 0;
            const offset = (y * width + x) * 4;
            let r = data[offset];
            let g = data[offset + 1];
            let b = data[offset + 2];
            
            // Apply contrast
            if (contrast !== 0) {
                r = contrastFactor * (r - 128) + 128;
                g = contrastFactor * (g - 128) + 128;
                b = contrastFactor * (b - 128) + 128;
                r = Math.max(0, Math.min(255, r));
                g = Math.max(0, Math.min(255, g));
                b = Math.max(0, Math.min(255, b));
            }
            
            // Standard luminance
            return 0.2126 * r + 0.7152 * g + 0.0722 * b;
        };
        
        // Helper to get pixel color
        const getColor = (x, y) => {
             const offset = (y * width + x) * 4;
             return { r: data[offset], g: data[offset+1], b: data[offset+2] };
        };

        let output = '';

        for (let y = 0; y < height; y++) {
            for (let x = 0; x < width; x++) {
                let char = ' ';
                let r=255, g=255, b=255; // Default white/bright for edge color mode
                
                if (mode === 'edge') {
                    // Sobel operator kernel for simple edge detection
                    // Gx = [ -1 0 1 ]
                    //      [ -2 0 2 ]
                    //      [ -1 0 1 ]
                    // Gy = [ -1 -2 -1 ]
                    //      [  0  0  0 ]
                    //      [  1  2  1 ]
                    
                    const tl = getBrightness(x-1, y-1);
                    const t  = getBrightness(x,   y-1);
                    const tr = getBrightness(x+1, y-1);
                    const l  = getBrightness(x-1, y);
                    const r_pix = getBrightness(x+1, y);
                    const bl = getBrightness(x-1, y+1);
                    const b_pix = getBrightness(x,   y+1);
                    const br = getBrightness(x+1, y+1);
                    
                    const gx = ((-1 * tl) + (1 * tr)) + ((-2 * l) + (2 * r_pix)) + ((-1 * bl) + (1 * br));
                    const gy = ((-1 * tl) + (-2 * t) + (-1 * tr)) + ((1 * bl) + (2 * b_pix) + (1 * br));
                    
                    const magnitude = Math.sqrt(gx * gx + gy * gy);
                    
                    // Determine edge character based on gradient direction
                    if (magnitude > threshold) {
                        const angle = Math.atan2(gy, gx) * (180 / Math.PI);
                        // Normalize angle to 0-180
                        const absAngle = Math.abs(angle);
                        
                        // Map angle to chars: |, /, -, \
                        // Vertical edge (Gx high) -> angle near 0 or 180? No.
                        // Gx is horizontal gradient. If Gx is high, brightness changes horizontally, so edge is VERTICAL.
                        // atan2(gy, gx): if gy=0, gx=1 -> angle=0. Gradient is Horizontal -> Edge is Vertical (|)
                        // Wait, gradient vector points towards brightest change. Normal to edge.
                        // So if gradient is horizontal (0 deg), edge is vertical (90 deg).
                        
                        if (absAngle < 22.5 || absAngle > 157.5) {
                            char = '|'; // Gradient horizontal -> Edge vertical
                        } else if (absAngle > 22.5 && absAngle < 67.5) {
                            // Gradient diagonal -> Edge diagonal
                            // If gx>0, gy>0 (bottom right is bright), gradient is 45 deg down-right.
                            // Edge is perpendicular: /
                            // However, atan2 logic can be tricky. Let's simplify visual mapping.
                            // If angle is ~45 (gradient /), edge is \.
                            // Actually just mapping gradient direction often looks okay as "shading" direction.
                            // But for "lines", we want the edge direction.
                            // Tangent = Gradient + 90 degrees.
                            char = (gx * gy > 0) ? '/' : '\\'; 
                        } else if (absAngle > 67.5 && absAngle < 112.5) {
                            char = '-'; // Gradient vertical -> Edge horizontal
                        } else if (absAngle > 112.5 && absAngle < 157.5) {
                            char = (gx * gy > 0) ? '/' : '\\';
                        }
                    } else {
                        char = ' '; // Background
                    }
                    
                    if (invert) {
                        // In edge mode, invert usually means swapping background/foreground
                        // If we are drawing edges, invert might mean "white edges on black" vs "black edges on white"
                        // But here we are just outputting chars. 
                        // If invert is true, maybe we want non-edges to be full blocks? 
                        // Let's keep it simple: Invert simply swaps the logic? 
                        // Actually, standard invert on brightness is already handled in getBrightness?
                        // Wait, getBrightness logic handles input pixel.
                        // If we want "Black lines on White background", we use dark chars on light bg.
                        // If "White lines on Black background", we use light chars on dark bg.
                        // Currently our output is just text. CSS controls bg.
                        // So if user wants "Abstract", usually means few lines.
                    }
                    
                    if (color && char !== ' ') {
                        // Use original pixel color for the edge
                        const c = getColor(x,y);
                        r=c.r; g=c.g; b=c.b;
                    }

                } else {
                    // Standard Brightness Mode
                    let brightness = getBrightness(x, y);

                    if (invert) {
                        brightness = 255 - brightness;
                    }

                    // Map brightness to character index
                    const charIndex = Math.floor((brightness / 255) * (chars.length - 1));
                    const safeIndex = Math.max(0, Math.min(chars.length - 1, charIndex));
                    char = chars[safeIndex];
                    
                    if (color) {
                        const c = getColor(x,y);
                        r=c.r; g=c.g; b=c.b;
                    }
                }

                if (color) {
                    let displayChar = char;
                    if (char === '<') displayChar = '&lt;';
                    if (char === '>') displayChar = '&gt;';
                    if (char === ' ') displayChar = '&nbsp;';
                    
                    // For edge mode, if it's space, it's transparent/background
                    output += `<span style="color: rgb(${Math.floor(r)},${Math.floor(g)},${Math.floor(b)})">${displayChar}</span>`;
                } else {
                    output += char;
                }
            }
            output += color ? '<br>' : '\n';
        }

        return output;
    }
};

if (typeof module !== 'undefined' && module.exports) {
    module.exports = AsciiArt;
} else {
    window.AsciiArt = AsciiArt;
}
