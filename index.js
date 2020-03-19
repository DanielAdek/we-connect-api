import { Server as Application } from './server/app';

const start = new Application();

console.log(' Unix epoch in UTC: =>', new Date(start.app_start));
