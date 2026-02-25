import { execSync } from 'child_process';
import { rmSync } from 'fs';
import { join } from 'path';

const projectDir = '/vercel/share/v0-project';

// Remove node_modules
console.log('Removing node_modules...');
try {
  rmSync(join(projectDir, 'node_modules'), { recursive: true, force: true });
  console.log('Removed node_modules');
} catch (e) {
  console.log('node_modules already removed or not found');
}

// Remove package-lock.json
console.log('Removing package-lock.json...');
try {
  rmSync(join(projectDir, 'package-lock.json'), { force: true });
  console.log('Removed package-lock.json');
} catch (e) {
  console.log('package-lock.json already removed or not found');
}

// Run npm install
console.log('Running npm install...');
try {
  execSync('npm install', { cwd: projectDir, stdio: 'inherit' });
  console.log('npm install completed successfully');
} catch (e) {
  console.error('npm install failed:', e.message);
}
