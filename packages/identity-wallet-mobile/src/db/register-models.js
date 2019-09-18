import { TestModel } from './TestModel';
import { registerModel } from './realm-service';

const models = [
  TestModel,
];

models.forEach(registerModel);

