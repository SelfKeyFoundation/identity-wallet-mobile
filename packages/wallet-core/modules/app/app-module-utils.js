import { GuideSettingsModel } from '../../models';
import uuid from 'uuid/v4';

export async function getGuideSettings() {
  const model = GuideSettingsModel.getInstance();
  let settings = await model.findOne();

  if (!settings) {
    settings = {
      id: 1,
      termsAccepted: false,
      views: 0,
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

  settings.views = (settings.views || 0) + 1;

  await model.updateById(settings.id, settings);

  return settings;
}

