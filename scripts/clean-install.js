const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

const projectDir = path.resolve(__dirname, '..');

// Remove package-lock.json
const lockFile = path.join(projectDir, 'package-lock.json');
if (fs.existsSync(lockFile)) {
  fs.unlinkSync(lockFile);
  console.log('Deleted package-lock.json');
} else {
  console.log('No package-lock.json found');
}

// Remove node_modules
const nodeModules = path.join(projectDir, 'node_modules');
if (fs.existsSync(nodeModules)) {
  console.log('Removing node_modules...');
  fs.rmSync(nodeModules, { recursive: true, force: true });
  console.log('Deleted node_modules');
} else {
  console.log('No node_modules found');
}

// Run fresh npm install
console.log('Running npm install...');
try {
  execSync('npm install', { cwd: projectDir, stdio: 'inherit' });
  console.log('npm install completed successfully');
} catch (e) {
  console.error('npm install failed:', e.message);
  process.exit(1);
}
