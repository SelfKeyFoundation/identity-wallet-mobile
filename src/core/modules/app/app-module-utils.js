import { GuideSettingsModel } from '../../models';
import { v4 as uuid} from 'uuid';

export async function getGuideSettings() {
  const model = GuideSettingsModel.getInstance();
  let settings = await model.findOne();

  if (settings) {
    console.log('Guide settings found', settings);
  }
  // if (settings) {
  //   await model.removeById(settings.id);
  // }

  if (!settings || !settings.id) {
    settings = {
      id: 1,
      termsAccepted: false,
      views: 1,
      userId: uuid(),
    };

    await model.create(settings);
  }

  if (!settings.userId) {
    settings.userId = uuid();
  }

  return settings;
}

export async function updateViewCount() {
  const model = GuideSettingsModel.getInstance();
  const settings = await getGuideSettings();

  await model.updateById(settings.id, {
    views: (settings.views || 1) + 1,
  });

  return settings;
}

