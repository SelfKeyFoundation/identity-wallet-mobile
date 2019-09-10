import { registerModule } from './redux';
import modules from './modules';

Object.keys(modules).forEach(key => {
  registerModule(key, modules[key]);
});
