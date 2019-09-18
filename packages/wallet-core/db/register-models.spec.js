import glob from 'glob';
import { registerModels } from './register-models';
import { getModels } from './realm-service';

const modelsToSkip = ['BaseModel'];

function getMessage(model) {
  return `Model ${model} is registered`;
}

describe('core/db/register-models', () => {
  it('expect to have models registered', () => {
    const files = glob.sync(`${__dirname}/models/*Model.js`);
    const createdModels = files
      .map(f => f.split('/').pop().replace(/\.js/, ''))
      .filter(f => !modelsToSkip.find(m => m === f));

     registerModels();

     const registeredModels = getModels().map(m => getMessage(m.name));

     createdModels.forEach((modelName) => {
       const message = getMessage(modelName);
       const modelMessage = registeredModels.find(m => m === message);
       expect(modelMessage).toEqual(message);
     });
  });
});
