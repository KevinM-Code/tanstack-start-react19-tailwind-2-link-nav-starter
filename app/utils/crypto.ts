import crypto from 'node:crypto'

const salt = 'salt'

export function hashPassword(password: string, salt: string) {
  return new Promise((resolve, reject) => {
    crypto.pbkdf2(password, salt, 100000, 64, 'sha256', (err, derivedKey) => {
      if (err) reject(err);
      else resolve(derivedKey.toString('hex'));
    });
  });
}


export async function verifyPassword(password, salt, storedHash) {
  const hash = await hashPassword(password, salt);
  return hash === storedHash;
}

// Example usage
(async () => {
  const password = 'mysecretpassword';
  const salt = crypto.randomBytes(16).toString('hex');
  const hash = await hashPassword(password, salt);

  console.log('Salt:', salt);
  console.log('Hash:', hash);

  const isValid = await verifyPassword('mysecretpassword', salt, hash);
  console.log('Is valid:', isValid);
})();