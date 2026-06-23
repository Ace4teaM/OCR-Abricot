import { jwtVerify } from "jose";

export async function verifyToken(token) {
  try {
    const { payload } = await jwtVerify(
      token,
      secret
    );

    return payload;

  } catch (error) {
    return null;
  }
}