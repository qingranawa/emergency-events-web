import { pbkdf2Sync, randomBytes } from 'node:crypto';
import { spawnSync } from 'node:child_process';
import { mkdtempSync, rmSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import process from 'node:process';

const iterations = 120000;
const mode = process.argv.includes('--local') ? '--local' : process.argv.includes('--remote') ? '--remote' : null;
const username = (process.env.ADMIN_USERNAME || '').trim();
const password = process.env.ADMIN_PASSWORD || '';

if (!mode) {
    console.error('Usage: ADMIN_USERNAME=admin ADMIN_PASSWORD="..." node scripts/bootstrap-admin.mjs --remote');
    process.exit(1);
}
if (!/^[a-zA-Z0-9_.-]{3,80}$/.test(username)) {
    console.error('ADMIN_USERNAME must be 3-80 characters: letters, numbers, _, ., -');
    process.exit(1);
}
if (password.length < 10 || password.length > 200) {
    console.error('ADMIN_PASSWORD must be 10-200 characters');
    process.exit(1);
}

const saltBytes = randomBytes(16);
const salt = saltBytes.toString('base64url');
const hash = pbkdf2Sync(password, saltBytes, iterations, 32, 'sha256').toString('base64url');
const quote = value => `'${value.replaceAll("'", "''")}'`;
const sql = `INSERT INTO admin_users (username, password_salt, password_hash, failed_attempts, locked_until, updated_at) VALUES (${quote(username)}, ${quote(salt)}, ${quote(hash)}, 0, NULL, CURRENT_TIMESTAMP) ON CONFLICT(username) DO UPDATE SET password_salt = excluded.password_salt, password_hash = excluded.password_hash, failed_attempts = 0, locked_until = NULL, updated_at = CURRENT_TIMESTAMP;`;

const command = process.platform === 'win32' ? 'npx.cmd' : 'npx';
const persistArgs = mode === '--local' ? ['--persist-to', '.wrangler-test'] : [];
const temporaryDirectory = mkdtempSync(join(tmpdir(), 'emergency-admin-'));
const temporarySql = join(temporaryDirectory, 'bootstrap.sql');
writeFileSync(temporarySql, sql, 'utf8');
try {
    const result = spawnSync(command, ['wrangler', 'd1', 'execute', 'CONTENT_DB', mode, ...persistArgs, '--file', temporarySql], {
        cwd: process.cwd(),
        stdio: 'inherit',
        shell: process.platform === 'win32',
    });
    if (result.error) console.error(result.error.message);
    var exitStatus = result.status ?? 1;
} finally {
    rmSync(temporaryDirectory, { recursive: true, force: true });
}
process.exit(exitStatus);
