import { registerModule } from './redux';
import modules from './modules';

for (const module of modules) {
  registerModule(module);
}