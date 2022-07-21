import supertest from "supertest";

import app from "../src/app.js";
import prisma from "../src/config/db.js";
import userFactory from "./factories/userFactory.js";
import wifiFactory from "./factories/wifiFactory.js";

beforeEach(async () => {
  await prisma.$executeRaw`DELETE FROM users WHERE email = 'teste@teste.com'`;
  await prisma.$executeRaw`TRUNCATE TABLE wifi`;
});

describe("User tests suite", () => {
  it("given email and password, create user", async () => {
    const login = userFactory.createLogin();
    const response = await supertest(app).post(`/sign-up`).send(login);
    expect(response.status).toBe(201);

    const user = await prisma.users.findFirst({
      where: { email: login.email },
    });

    expect(user.email).toBe(login.email);
  });

  it("given an invalid input, returns 422", async () => {
    const login = userFactory.createLogin();
    delete login.password;

    const response = await supertest(app).post(`/sign-up`).send(login);
    expect(response.status).toBe(400);
  });

  it("given valid email and password, receive token", async () => {
    const login = userFactory.createLogin();
    const user: any = await userFactory.createUser(login);

    const response = await supertest(app).post(`/sign-in`).send({
      email: user.email,
      password: user.plainPassword,
    });
    const token = response.body.token;
    expect(token).not.toBeNull();
  });

  it("given invalid password, receive 401", async () => {
    const login = userFactory.createLogin();
    const user = userFactory.createUser(login);

    const response = await supertest(app)
      .post(`/sign-in`)
      .send({ ...login, password: "outropassword" });
    expect(response.status).toBe(401);
  });

  it("given email and password already in use, fail to create user", async () => {
    const login = userFactory.createLogin();
    await userFactory.createUser(login);

    const response = await supertest(app).post(`/sign-up`).send(login);
    expect(response.statusCode).toBe(409);
  });
});

describe("Wifi tests suite", () => {
  it("given valid inputs, create wifi", async () => {
    const login = userFactory.createLogin();
    await userFactory.createUser(login);

    let response = await supertest(app).post(`/sign-in`).send(login);
    const token = response.text;

    const wifi = wifiFactory.createWifiInfo();

    response = await supertest(app)
      .post(`/wifi`)
      .send(wifi)
      .set("Authorization", `Bearer ${token}`);

    expect(response.statusCode).toBe(201);

    const savedWifi = await prisma.wifi.findFirst({
      where: { title: wifi.title, name: wifi.name },
    });

    expect(wifi.title).toBe(savedWifi.title);
  });
});

afterAll(async () => {
  await prisma.$disconnect();
});
