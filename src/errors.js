/**
 * Not-a-character errors object
 */
export class CharacterError extends Error {
  /**
   * Default constructor
   * @param {String} message
   * @param {Int} code
   */
  constructor(message, code) {
    super(message);
    this.code = code;
  }
}
