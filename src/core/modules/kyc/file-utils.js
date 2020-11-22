import { System } from '../../system';


export async function resolveFileContent(data) {
	if (data.map) {
		return Promise.all(data.map(resolveFileContent))
	}

	if (typeof data === 'object') {
    const resolved = {};

		if (data.content && data.fileName && data.content.indexOf('data:') !== 0) {
      const fs = System.getFileSystem();
      const filePath = `${fs.DocumentDirectoryPath}/${data.content}`;
      const fileData = await fs.readFile(filePath, 'base64');
			data.content = `data:${data.mimeType};base64,${fileData}`;
			data.uri = `file:///${filePath}`;
		}

		await Promise.all(Object.keys(data).map(async (key) => {
			resolved[key] = await resolveFileContent(data[key])
		}));

		return resolved;
	}

	return data;
}