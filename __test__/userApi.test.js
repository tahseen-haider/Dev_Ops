import { inMemStorage } from "../server/config_server.js";
import request from "supertest";
import app from "../server/config_server.js";


describe("User API Tests", () => {
  beforeEach(() => {
    inMemStorage.length = 0;
    inMemStorage.push(
      { id: 1, name: "Tahsin", age: 24, profession: "Developer" },
      { id: 2, name: "Ali", age: 30, profession: "Designer" }
    );
  });

   it("GET / should return backend alive message", async () => {
    const res = await request(app).get("/");
    expect(res.statusCode).toBe(200);
    expect(res.text).toBe("BACKEND IS RUNNING SUCCESSFULLY!");
  });

  it("should return user data if user exists", async () => {
    const res = await request(app).get("/api/getUser/1");

    expect(res.statusCode).toBe(200);
    expect(res.body).toEqual({
      id: 1,
      name: "Tahsin",
      age: 24,
      profession: "Developer",
    });
  });
});
