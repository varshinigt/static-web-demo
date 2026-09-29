const fs = require('fs');
const assert = require('assert');

console.log("🔍 Running CI test suite...");

// 1. Verify critical files exist
assert(fs.existsSync('src/index.html'), "❌ Error: src/index.html is missing!");
assert(fs.existsSync('src/style.css'), "❌ Error: src/style.css is missing!");

const html = fs.readFileSync('src/index.html', 'utf8');

const requiredTabs = [
  'PES University',
  'Software Engineering',
  'About Me',
  'CI/CD Pipeline',
  'Instructable',
  'Project Details'
];

// 2. Check required course tabs exist in HTML
requiredTabs.forEach(tabName => {
  const tabRegex = new RegExp(
    `<button[^>]*class=["'][^"']*tab-btn[^"']*["'][^>]*>\\s*${tabName}\\s*</button>`,
    'i'
  );

  assert(
    tabRegex.test(html),
    `❌ Test Failed: Mandatory tab "${tabName}" was not found in navigation!`
  );
});

// 3. Check every tab button has a matching content section
const buttonTargets = [...html.matchAll(/showTab\('([^']+)'\)/g)].map(m => m[1]);
buttonTargets.forEach(id => {
  assert(
    html.includes(`id="${id}"`),
    `❌ Test Failed: No content section found for tab "${id}"!`
  );
});

console.log("[PASSED] All static tab content checks passed successfully!");
