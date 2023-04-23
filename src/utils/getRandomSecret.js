import { randomBytes } from "node:crypto";

const MAX_LENGTH = 2048; // Avoid an excessively large key to be generated.

const validEncodingPatterns = [
  /^utf{-}?8$/i,
  /^utf{-}?16le$/i,
  /^latin1$/i,
  /^base64(url)?$/i,
  /^hex$/i,
  /^ascii$/i,
  /^binary$/i,
  /^ucs2$/i,
];

const secret = (options = { length: 18, format: "hex" }) => {
  const numLength = Number(options?.length || 0);

  const length =
    !isNaN(numLength) &&
    numLength > 0 &&
    numLength % 1 === 0 &&
    numLength <= MAX_LENGTH
      ? numLength
      : 18;

  let format = "hex";

  if (validEncodingPatterns.some((pattern) => pattern.test(options?.format))) {
    format = options.format;
  }

  return randomBytes(length).toString(format);
};

export default secret;
