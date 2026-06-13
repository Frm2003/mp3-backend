import 'reflect-metadata';

import { ApplicationContext } from "@midnightjd/core";

const start = async () => {
    await ApplicationContext.init();
};

start();