import React, { useState, useRef } from 'react';
import styled from 'styled-components/native';
import { View, TouchableWithoutFeedback, Text } from 'react-native';
import { DocumentsEmptyAlert } from '../../../components';
import {
	Grid,
	Row,
	Col,
	Explanatory,
	TableText,
	SKIcon,
	ButtonLink,
	FormText,
} from 'design-system';
import FileViewer from 'react-native-file-viewer';
import fs from 'react-native-fs';
import { setFileViewer } from 'rjsf-native//RNForm';

const SectionHeader = styled(Grid)`
	margin: 15px 20px 0 20px;
`;

const SectionTitle = styled(Text)`
	color: ${props => props.theme.colors.white};
	font-size: 24px;
	font-family: ${props => props.theme.fonts.regular};
	line-height: 30px;
`;

const SectionDescription = styled(Text)`
	color: ${props => props.theme.colors.typography};
	font-size: 16px;
	font-family: ${props => props.theme.fonts.regular};
	line-height: 24px;
`;

const AttrValue = styled(TableText)`
	font-family: ${props => props.theme.fonts.bold};
`;

const AttrRow = styled(Row)`
	padding: 10px 20px;
	border: 0 solid #475768;
	border-bottom-width: 1px;
`;

const AttrLabel = styled(Explanatory)`
	line-height: 19px;
`;

const EmptyItemsConatiner = styled(View)`
	margin: 20px;
`;

const OptionsWrapper = styled(View)`
	z-index: 2;
	position: absolute;
	display: flex;
	justify-content: flex-start;
	align-items: flex-end;
	right: 20px;
	width: 300px;
	height: 200px;
`;

const OptionsMenuWrapper = styled(View)`
	padding: 20px;
	background: #313d49;
	border-radius: 20px;
`;

const OverflowContainer = styled(View)`
	position: absolute;
	width: 100%;
	height: 100%;
	background: rgba(30, 38, 46, 0.53);
	z-index: 1;
`;

const IconWrapper = styled(View)`
	padding: 10px;
`;

const OptionText = styled(Text)`
	color: ${props => props.theme.colors.white};
	font-size: 16px;
	line-height: 24px;
	font-family: ${props => props.theme.fonts.regular};
`;

const Backdrop = props => {
	return (
		<TouchableWithoutFeedback onPress={props.onPress}>
			<OverflowContainer />
		</TouchableWithoutFeedback>
	);
};

setFileViewer(path => {
	let filePath = path;

	if (!/(file|content):\/\//i.test(path)) {
		filePath = `${fs.DocumentDirectoryPath}/${path}`;
	}

	FileViewer.open(filePath);
});

const OptionsMenuAnchor = props => {
	const { id } = props;
	const viewRef = useRef();
	const [] = useState({ x: 0, y: 0 });

	const handlePress = () => {
		viewRef.current.measure((fx, fy, width, height, px, py) => {
			props.onPress({
				id,
				x: px,
				y: py,
			});
		});
	};

	return (
		<View ref={viewRef} renderToHardwareTextureAndroid={true}>
			<TouchableWithoutFeedback onPress={handlePress}>
				<IconWrapper>
					<SKIcon name="icon-expand-menu" size={16} color="#93B0C1" />
				</IconWrapper>
			</TouchableWithoutFeedback>
		</View>
	);
};

const OptionsView = props => {
	return (
		<OptionsWrapper style={{ top: props.y }}>
			<FormText />
			<TouchableWithoutFeedback onPress={props.onPress}>
				<IconWrapper>
					<SKIcon name="icon-expand-menu" size={16} color="#FFF" />
				</IconWrapper>
			</TouchableWithoutFeedback>
			<OptionsMenuWrapper>
				<Grid>
					<TouchableWithoutFeedback onPress={props.onEdit}>
						<Row alignItems="center">
							<Col autoWidth>
								<SKIcon name="icon-edit" color="#FFF" size={16} />
							</Col>
							<Col>
								<OptionText>Edit</OptionText>
							</Col>
						</Row>
					</TouchableWithoutFeedback>
					<TouchableWithoutFeedback onPress={props.onDelete}>
						<Row alignItems="center">
							<Col autoWidth>
								<SKIcon name="icon-delete" color="#FFF" size={16} />
							</Col>
							<Col>
								<OptionText>Delete</OptionText>
							</Col>
						</Row>
					</TouchableWithoutFeedback>
				</Grid>
			</OptionsMenuWrapper>
		</OptionsWrapper>
	);
};

function renderAttrValue(attr) {
	const value = attr.data.value;
	const schema = attr.type.content;
	let stringValue = value.toString();

	if (schema.type === 'object') {
		stringValue = Object.keys(value)
			.map(key => {
				const item = value[key];
				const propSchema = schema.properties[key];

				if (propSchema.enum) {
					const enumIndex = propSchema.enum.findIndex(eItem => item === eItem);
					return propSchema.enumNames[enumIndex];
				}

				return item;
			})
			.join(', ');
	}

	return stringValue;
}

function getFiles(value, files = []) {
	if (typeof value === 'array') {
		return Promise.all(value.map(v => getFiles(v, files)));
	}

	if (typeof value === 'object') {
		if (value.mimeType) {
			files.push(value);
		}

		Object.keys(value).map(async key => {
			getFiles(value[key], files);
		});
	}

	return files;
}

function renderDocumentValue(attr) {
	const value = attr.data.value;
	let images = getFiles(value);

	if (images) {
		if (images.length == 1) {
			const image = images[0];
			return (
				<TouchableWithoutFeedback
					onPress={() => FileViewer.open(`${fs.DocumentDirectoryPath}/${image.content}`)}
				>
					<Text>{image.fileName}</Text>
				</TouchableWithoutFeedback>
			);
		}

		return `${images.length} files`;
	}

	return '1 file';
}

export function ProfileOverviewTab(props) {
	const { profile } = props;
	const [currentOptionsMenu, setCurrentOptionsMenu] = useState();

	const handleOptions = isDocument => ({ id, x, y }) => {
		setCurrentOptionsMenu({
			id,
			isDocument,
			x,
			y: y + props.scrollY,
		});
	};

	const handleCloseMenu = () => {
		setCurrentOptionsMenu(null);
	};

	const handleEdit = () => {
		const { id, isDocument } = currentOptionsMenu;
		const attribute = profile.allAttributes.find(attr => attr.id === id);

		if (isDocument) {
			props.onEditDocument(attribute);
		} else {
			props.onEditAttribute(attribute);
		}

		handleCloseMenu();
	};

	const handleDelete = () => {
		const { id } = currentOptionsMenu;
		props.onDeleteAttribute(id);
		handleCloseMenu();
	};

	return (
		<>
			<SectionHeader>
				<Row>
					<Col>
						<SectionTitle>Informations</SectionTitle>
						<SectionDescription>{profile.infoAttributes.length} entries</SectionDescription>
					</Col>
					<Col autoWidth>
						<ButtonLink iconName="icon-add" onPress={props.onAddAttribute}>
							Add New
						</ButtonLink>
					</Col>
				</Row>
			</SectionHeader>
			<Grid>
				{profile.infoAttributes.map(attribute => {
					return (
						<AttrRow>
							<Col>
								<AttrLabel>{attribute.type.content.title}</AttrLabel>
								<AttrValue>{renderAttrValue(attribute)}</AttrValue>
							</Col>
							<Col autoWidth>
								<OptionsMenuAnchor id={attribute.id} onPress={handleOptions()} />
							</Col>
						</AttrRow>
					);
				})}
			</Grid>
			<SectionHeader>
				<Row>
					<Col>
						<SectionTitle>Documents</SectionTitle>
						<SectionDescription>{profile.documentAttributes.length} documents</SectionDescription>
					</Col>
					<Col autoWidth>
						<ButtonLink iconName="icon-add" onPress={props.onAddDocument}>
							Add New
						</ButtonLink>
					</Col>
				</Row>
			</SectionHeader>
			{!profile.documentAttributes.length ? (
				<EmptyItemsConatiner>
					<DocumentsEmptyAlert title="You don’t have any documents yet.">
						Hit the “Add New” button above to add documents relevant to your identity, needed for
						marketplace KYC processes.
					</DocumentsEmptyAlert>
				</EmptyItemsConatiner>
			) : (
				<Grid marginBottom={100}>
					{profile.documentAttributes.map(attribute => {
						return (
							<AttrRow>
								<Col>
									<AttrLabel>{attribute.type.content.title}</AttrLabel>
									<AttrValue>{renderDocumentValue(attribute)}</AttrValue>
								</Col>
								<Col autoWidth>
									<OptionsMenuAnchor id={attribute.id} onPress={handleOptions(true)} />
								</Col>
							</AttrRow>
						);
					})}
				</Grid>
			)}
			{currentOptionsMenu ? <Backdrop onPress={handleCloseMenu} /> : null}
			{currentOptionsMenu ? (
				<OptionsView
					y={currentOptionsMenu.y}
					onPress={handleCloseMenu}
					onDelete={handleDelete}
					onEdit={handleEdit}
				/>
			) : null}
		</>
	);
}
