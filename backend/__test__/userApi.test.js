import app from "../server/config_server.js";
import request from "supertest";

describe("User API Tests", () => {
  it("GET / should return backend alive message", async () => {
    const res = await request(app).get("/");
    expect(res.statusCode).toBe(200);
    expect(res.text).toBe("BACKEND IS RUNNING SUCCESSFULLY!");
  });
});
