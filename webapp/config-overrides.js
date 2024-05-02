const {
  override,
  disableChunk,
} = require("customize-cra-5");

module.exports = override(
  disableChunk()
);

