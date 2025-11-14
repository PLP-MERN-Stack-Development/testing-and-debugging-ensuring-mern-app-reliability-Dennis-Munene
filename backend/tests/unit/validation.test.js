const { validateBug } = require('../../src/utils/validation');

test('rejects short title', () => {
  const result = validateBug({ title: 'ab', reporter: 'joe' });
  expect(result.error).toMatch(/at least 3/);
});

test('accepts valid bug', () => {
  const result = validateBug({ title: 'Bug title', reporter: 'joe' });
  expect(result.error).toBeNull();
});
