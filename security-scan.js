#!/usr/bin/env node

const { execSync } = require('child_process');
const fs = require('fs');

console.log('Starting security scan for react-hook-form...');

// Check if react-hook-form is installed
try {
  require.resolve('react-hook-form');
} catch (e) {
  console.log('Installing react-hook-form...');
  execSync('npm install react-hook-form', { stdio: 'inherit' });
}

// Ensure required tools are installed
try {
  execSync('npm ls eslint eslint-plugin-security snyk --depth=0', { stdio: 'ignore' });
} catch (e) {
  console.log('Installing required security tools...');
  execSync('npm install eslint eslint-plugin-security snyk --save-dev', { stdio: 'inherit' });
}

// ESLint configuration
const eslintConfig = {
  "plugins": ["security"],
  "extends": ["plugin:security/recommended"]
};
fs.writeFileSync('.eslintrc.json', JSON.stringify(eslintConfig, null, 2));

// Create a temporary directory for the scan
const tempDir = './temp-react-hook-form';
if (!fs.existsSync(tempDir)) {
  fs.mkdirSync(tempDir);
}

// Clone react-hook-form source code into the temporary directory
console.log('Cloning react-hook-form source code...');
execSync(`git clone https://github.com/react-hook-form/react-hook-form.git ${tempDir}`, { stdio: 'inherit' });

// Change to the temporary directory
process.chdir(tempDir);

// Install dependencies
console.log('Installing dependencies...');
execSync('npm install', { stdio: 'inherit' });

// Run ESLint security scan
console.log('Running ESLint security scan...');
execSync('npx eslint src/ --format json -o eslint-report.json', { stdio: 'inherit' });

// Run npm audit
console.log('Running npm audit...');
execSync('npm audit --production --json > audit-report.json', { stdio: 'inherit' });

// Run Snyk security test
console.log('Running Snyk security test...');
execSync('snyk test --json > snyk-report.json', { stdio: 'inherit' });

// Read and summarize results
const eslintResults = JSON.parse(fs.readFileSync('eslint-report.json', 'utf8'));
const auditResults = JSON.parse(fs.readFileSync('audit-report.json', 'utf8'));
const snykResults = JSON.parse(fs.readFileSync('snyk-report.json', 'utf8'));

console.log('\nSecurity Scan Summary:');
console.log(`- ESLint Issues: ${eslintResults.length}`);
console.log(`- npm Audit Vulnerabilities: ${auditResults.metadata.vulnerabilities.total}`);
console.log(`- Snyk Issues: ${snykResults.uniqueCount}`);

// Change back to the original directory
process.chdir('..');

// Optional: Remove the temporary directory
// fs.rmSync(tempDir, { recursive: true, force: true });

console.log('Security scan completed.');
