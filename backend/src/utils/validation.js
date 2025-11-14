function validateBug(data) {
  if (!data.title || data.title.trim().length < 3) {
    return { error: 'Title must be at least 3 chars' };
  }
  if (!data.reporter) return { error: 'Reporter required' };
  // additional checks...
  return { error: null };
}

module.exports = { validateBug };
