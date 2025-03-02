import * as fs from 'fs';
import * as https from 'https';
import * as path from 'path';
import { fileURLToPath } from 'url';
import { HeroIcons } from '../projects/hrms/src/app/icon';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(path.dirname(__filename));
// Paths
const iconsTsPath = path.join(__dirname, 'projects/hrms/src/app/icon.ts');
const outputDir = path.join(__dirname, 'projects/hrms/public/icons');

// Heroicons GitHub base URL
const HEROICONS_BASE_URL =
  'https://raw.githubusercontent.com/tailwindlabs/heroicons/refs/heads/master/src/24';

// Ensure the base output directory exists
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

// Read icons.ts file
const content = fs.readFileSync(iconsTsPath, 'utf-8');

// Extract icon types (solid/outline) and names using RegEx
const matches = [...content.matchAll(/"(assets\/icons\/(solid|outline)\/(.*?))"/g)];

// Define an interface for the extracted icons
interface IconData {
  type: string;
  name: string;
}

// Extract icon data
const icons: IconData[] = Object.entries(HeroIcons)
  .map(([key, value]) => {
    const match = value.match(/assets\/icons\/(solid|outline)\/(.+)/);
    return match ? { type: match[1], name: match[2] } : null;
  })
  .filter(Boolean) as unknown as IconData[];

if (fs.existsSync(outputDir)) {
  fs.rmSync(outputDir, { recursive: true, force: true });
  console.log('⚡ Removed existing icons directory.');
}
/**
 * Download an SVG from Heroicons
 * @param icon - The icon data (type and name)
 */
const downloadSvg = async (icon: IconData): Promise<void> => {
  const { type, name } = icon;
  const url = `${HEROICONS_BASE_URL}/${type}/${name}.svg`;
  const filePath = path.join(outputDir, type, `${name}.svg`);

  // Ensure the directory exists for the icon type (solid/outline)
  if (!fs.existsSync(path.join(outputDir, type))) {
    fs.mkdirSync(path.join(outputDir, type), { recursive: true });
  }

  // Skip download if file already exists
  if (fs.existsSync(filePath)) {
    console.log(`⚡ Skipping (already exists): ${type}/${name}`);
    return;
  }

  // Download the SVG file
  console.log(`⚡ Downloading: ${type}/${name}/${url}`);
  return new Promise((resolve, reject) => {
    https
      .get(url, (res) => {
        if (res.statusCode === 301 || res.statusCode === 302) {
          // Handle redirect
          const redirectUrl = res.headers.location;
          if (redirectUrl) {
            console.log(`⚡ Redirecting to: ${redirectUrl}`);
            fetch(redirectUrl); // Follow the redirect
            return;
          } else {
            console.error(`❌ Redirect URL is missing for ${type}/${name}`);
            return reject();
          }
        } else if (res.statusCode !== 200) {
          console.error(`❌ Failed to download: ${type}/${name}`);
          console.error(`❌ Status Code: ${JSON.stringify(res.statusMessage)}`);
          return reject();
        }

        const fileStream = fs.createWriteStream(filePath);
        res.pipe(fileStream);
        fileStream.on('finish', () => {
          fileStream.close();
          console.log(`✅ Downloaded: ${type}/${name}`);
          resolve();
        });
      })
      .on('error', (err) => {
        console.error(`❌ Error downloading ${type}/${name}:`, err);
        reject();
      });
  });
};

/**
 * Main function to download all icons
 */
const downloadAllIcons = async () => {
  console.log('🚀 Downloading Heroicons...');
  for (const icon of icons) {
    await downloadSvg(icon);
  }
  console.log('🎉 All icons downloaded!');
};

// Run the script
downloadAllIcons().catch((err) => console.error('Unexpected Error:', err));
