import { getConfigs, isDevMode } from "configs";
import { withLocalCache } from "core/Storage";
import { parseJson } from "core/utils";

function fetchInventory(prefix = '') {
	return fetch('https://airtable.selfkey.org/airtable?tableName=Inventory' + (prefix || ''))
    .then(res => res.json())
    .then(data => data.entities.map(item => item.data));
}

function fetchVendors(prefix = '') {
	return fetch('https://airtable.selfkey.org/airtable?tableName=Vendors' + (prefix || ''))
    .then(res => res.json())
    .then(data => data.entities.map(item => item.data));
}

function fetchFeatureFlags(prefix = '') {
	return fetch('https://airtable.selfkey.org/airtable?tableName=MobileFeatures' + (prefix || ''))
    .then(res => res.json())
    .then(data => {
      if (!data.entities) {
        debugger;
        return [];
      }
      return data.entities.map(item => item.data);
    });
}

const getInventory = withLocalCache({
  fetcher: fetchInventory,
  cacheId: 'inventory',
});

const getVendors = withLocalCache({
  fetcher: fetchVendors,
  cacheId: 'vendors',
});

const doGetFeatureFlags = withLocalCache({
  fetcher: fetchFeatureFlags,
  cacheId: 'featureFlags',
});


export async function getInventoryItem(vendorId, skuId) {
  const inventory = await getInventory(isDevMode() && 'Dev');
  const data = inventory.find(item => item.vendor_id === vendorId && item.sku === skuId);

  if (data.relying_party_config) {
    data.relyingPartyConfig = parseJson(data.relying_party_config);
  }

  return data;
}

export async function getVendor(vendorId) {
  const vendors = await getVendors(isDevMode() && 'Dev');
  const vendor = vendors.find(item => item.vendor_id === vendorId);

  if (vendor.relying_party_config) {
    vendor.relyingPartyConfig = parseJson(vendor.relying_party_config);
  }

  return vendor;
}

export async function getFeatureFlags() {
  const items = await doGetFeatureFlags(isDevMode() && 'Dev');
  const flags = {};
  
  items.forEach(item => {
    if (item.name) {
      flags[item.name] = true;//item.status === 'enabled';
    }
  });

  return flags;
}
