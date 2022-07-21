import { faker } from "@faker-js/faker";

import prisma from "../../src/config/db.js";

function createWifiInfo() {
  return {
    title: faker.lorem.word(),
    name: faker.lorem.word(),
    password: faker.internet.password(),
  };
}

const wifiFactory = {
  createWifiInfo,
};

export default wifiFactory;
