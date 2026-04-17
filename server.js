import { execSync } from 'node:child_process';

const port = process.env.PORT || 3000;
console.log(`Starting server on port ${port}...`);
execSync(`npx serve dist -s -l ${port}`, { stdio: 'inherit' });
