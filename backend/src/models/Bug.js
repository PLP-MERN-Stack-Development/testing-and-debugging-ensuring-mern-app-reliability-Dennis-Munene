// very small in-memory store for demonstration
let bugs = [];
let nextId = 1;

class BugModel {
  static findAll() {
    return Promise.resolve([...bugs]);
  }
  static create(data) {
    const bug = { id: nextId++, status: 'open', ...data, createdAt: new Date() };
    bugs.push(bug);
    return Promise.resolve(bug);
  }
  static findById(id) {
    const b = bugs.find(x => x.id === Number(id));
    return Promise.resolve(b);
  }
  static update(id, updates) {
    const idx = bugs.findIndex(x => x.id === Number(id));
    if (idx === -1) return Promise.resolve(null);
    bugs[idx] = { ...bugs[idx], ...updates };
    return Promise.resolve(bugs[idx]);
  }
  static delete(id) {
    const idx = bugs.findIndex(x => x.id === Number(id));
    if (idx === -1) return Promise.resolve(false);
    bugs.splice(idx, 1);
    return Promise.resolve(true);
  }
  // helper for tests to reset state
  static __reset() {
    bugs = [];
    nextId = 1;
  }
}

module.exports = BugModel;
