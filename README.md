Security Scan Tool for React Hook Form

This project provides an automated security scanning tool for the react-hook-form package and its dependencies. Using a combination of ESLint, npm audit, and Snyk, the tool ensures that your code and libraries are free from common security vulnerabilities.

✨ Key Features

	•	Automated Security Setup: Ensures essential security tools are installed and configured.
	•	Security Scans:
	•	ESLint with security plugin.
	•	npm audit for dependency vulnerabilities.
	•	Snyk scan for deep analysis.
	•	Temporary Project Clone: Clones react-hook-form to perform deep security audits.
	•	Detailed Security Reports: JSON-based reports for easy integration with CI/CD systems.

🛠️ Getting Started

Prerequisites

Ensure that you have the following installed on your machine:

	•	Node.js (version 14.x or above)
	•	npm or yarn package manager
	•	Snyk CLI (if not already installed, the script will install it automatically)

Installation

	1.	Clone this repository:

git clone https://github.com/your-username/security-scan-tool.git
cd security-scan-tool


	2.	Make the script executable:

chmod +x security-scan.js


	3.	Run the security scan:

./security-scan.js



Configuration

By default, the ESLint configuration will extend the recommended security rules:

{
  "plugins": ["security"],
  "extends": ["plugin:security/recommended"]
}

You can modify .eslintrc.json to fit your specific project needs.

📊 Reports

After running the script, you will get three security reports:

	•	ESLint Report: Located in eslint-report.json, details code-level security issues.
	•	npm Audit Report: Located in audit-report.json, shows dependency vulnerabilities.
	•	Snyk Report: Located in snyk-report.json, provides a deep security scan of dependencies.

🧑‍💻 Contributing

Contributions, issues, and feature requests are welcome! Feel free to open a PR or issue to discuss any changes.

	1.	Fork the repository.
	2.	Create your feature branch (git checkout -b feature/new-feature).
	3.	Commit your changes (git commit -am 'Add new feature').
	4.	Push to the branch (git push origin feature/new-feature).
	5.	Create a new Pull Request.

📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

Modern UI Elements:

	•	Icons: Utilize modern, flat icons for features, prerequisites, etc. (Consider using Font Awesome or Heroicons).
	•	Code Blocks: Clear, syntax-highlighted blocks for readability.
	•	Visuals: Include relevant screenshots or animations for better UX.
	•	Badges: Add relevant project badges (e.g., Node.js version, Snyk scan status, etc.).

