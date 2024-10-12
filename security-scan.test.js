const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

describe('Security Scan Tool', () => {

  // Check if the script installs react-hook-form if not installed
  test('should install react-hook-form if not already installed', () => {
    try {
      execSync('npm uninstall react-hook-form', { stdio: 'ignore' });
    } catch (e) {
      console.log('react-hook-form is not installed');
    }

    // Simulate the requirement
    require('./security-scan.js');
    const pkg = JSON.parse(fs.readFileSync('package.json', 'utf8'));
    expect(pkg.dependencies['react-hook-form']).toBeDefined();
  });

  // Verify the ESLint configuration file creation
  test('should create ESLint configuration file', () => {
    require('./security-scan.js');
    const eslintConfig = JSON.parse(fs.readFileSync('.eslintrc.json', 'utf8'));
    expect(eslintConfig.plugins).toContain('security');
    expect(eslintConfig.extends).toContain('plugin:security/recommended');
  });

  // Test if Snyk is run correctly
  test('should run Snyk test and generate report', () => {
    const snykReportPath = path.resolve('./temp-react-hook-form/snyk-report.json');
    require('./security-scan.js');
    expect(fs.existsSync(snykReportPath)).toBe(true);
  });

  // Ensure audit report is generated
  test('should generate npm audit report', () => {
    const auditReportPath = path.resolve('./temp-react-hook-form/audit-report.json');
    require('./security-scan.js');
    expect(fs.existsSync(auditReportPath)).toBe(true);
  });

  // Clean up temp folder after scan
  test('should remove temporary directory after scan', () => {
    require('./security-scan.js');
    const tempDirExists = fs.existsSync('./temp-react-hook-form');
    expect(tempDirExists).toBe(false);
  });

});
