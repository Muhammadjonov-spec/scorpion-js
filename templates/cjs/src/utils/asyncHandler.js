/**
 * Controller funksiyalaridagi try-catch bloklarini avtomatlashtirish uchun wrapper
 * @param {Function} fn - Async controller funksiyasi
 * @returns {Function} Express middleware funksiyasi
 */
const asyncHandler = (fn) => (req, res, next) => {
  Promise.resolve(fn(req, res, next)).catch(next);
};

module.exports = { asyncHandler };
