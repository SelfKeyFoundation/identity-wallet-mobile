import models from '../models';
import { registerModel } from './realm-service';

export function registerModels() {
  models.forEach(registerModel);
}
