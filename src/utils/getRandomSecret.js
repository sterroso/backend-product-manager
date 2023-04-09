import { randomBytes } from "crypto";

const secret = randomBytes(64, (err, buf) => {
  if (err) return { status: "error", error: err.message };

  return {
    status: "success",
    secret: `${buf.toString("hex")}`,
  };
});

export default secret;
