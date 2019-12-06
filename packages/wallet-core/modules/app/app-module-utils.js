import { GuideSettingsModel } from '../../models';

export async function getGuideSettings() {
  const model = GuideSettingsModel.getInstance();
  let settings = await model.findOne();

  if (!settings) {
    settings = {
      id: 1,
      termsAccepted: false,
    };

    await model.create(settings);
  }

  return settings;
}

