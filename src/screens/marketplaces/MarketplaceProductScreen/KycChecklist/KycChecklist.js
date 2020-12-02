import React, { useState, useRef } from 'react';
import styled from 'styled-components/native';
import { View, TouchableWithoutFeedback, Text } from 'react-native';
import { DocumentsEmptyAlert } from 'components';
import {
	Grid,
	Row,
	Col,
	Explanatory,
	TableText,
	SKIcon,
	ButtonLink,
	FormText,
	Alert,
	RadioButton, Checkbox, Paragraph, Button, ErrorMessage
} from 'design-system';
import FileViewer from 'react-native-file-viewer';
import fs from 'react-native-fs';
import { setFileViewer } from 'rjsf-native//RNForm';
import { useDispatch, useSelector } from 'react-redux';
import modules from 'core/modules';
import { containsFile } from 'core/modules/identity/json-schema-utils';

const Container = styled.ScrollView`
	flex: 1;
	background-color: ${props => props.theme.colors.baseDark};
	padding-bottom: 50px;
`;

const SectionHeader = styled(Grid)`
	margin: 15px 20px 0 20px;
`;

const SectionTitle = styled.Text`
	color: ${props => props.theme.colors.white};
	font-size: 24px;
	font-family: ${props => props.theme.fonts.regular};
	line-height: 30px;
`;

const SectionDescription = styled.Text`
	color: ${props => props.theme.colors.typography};
	font-size: 16px;
	font-family: ${props => props.theme.fonts.regular};
	line-height: 24px;
`;

const AttrValue = styled(TableText)`
	font-family: ${props => props.theme.fonts.bold};
`;

const AttrRow = styled(Row)`
	padding: 10px 0;
	border: 0 solid #475768;
	border-bottom-width: 1px;
`;

const AttrLabel = styled(Explanatory)`
	line-height: 19px;
`;

const EmptyItemsConatiner = styled.View`
	margin: 20px;
`;

const OptionsWrapper = styled.View`
	z-index: 2;
	position: absolute;
	display: flex;
	justify-content: flex-start;
	align-items: flex-end;
	right: 20px;
	width: 300px;
	height: 200px;
`;

const OptionsMenuWrapper = styled.View`
	padding: 20px;
	background: #313d49;
	border-radius: 20px;
`;

const OverflowContainer = styled.View`
	position: absolute;
	width: 100%;
	height: 100%;
	background: rgba(30, 38, 46, 0.53);
	z-index: 1;
`;

const IconWrapper = styled.View`
	padding: 10px;
`;

const OptionText = styled.Text`
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
					{props.onEdit ? <TouchableWithoutFeedback onPress={props.onEdit}>
						<Row alignItems="center">
							<Col autoWidth>
								<SKIcon name="icon-edit" color="#FFF" size={16} />
							</Col>
							<Col>
								<OptionText>Edit</OptionText>
							</Col>
						</Row>
					</TouchableWithoutFeedback> : null}
					<TouchableWithoutFeedback onPress={props.onAdd}>
						<Row alignItems="center">
							<Col autoWidth>
								<SKIcon name="icon-add-1" color="#FFF" size={16} />
							</Col>
							<Col>
								<OptionText>Add New</OptionText>
							</Col>
						</Row>
					</TouchableWithoutFeedback>
				</Grid>
			</OptionsMenuWrapper>
		</OptionsWrapper>
	);
};

function renderAttrValue(attr, isDocument) {
	if (isDocument) {
		return attr.name;
	}

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

function renderItemOptions({
	item,
	isDocument,
	onOptionSelect,
	selectedOptions
}) {
	const {options} = item;

	if (item.required && (!options || !options.length)) {
		return (
			<Alert color="#E98548">Missing information or document</Alert>
		);
	}
	
	if (options.length === 1) {
		return (
			<AttrValue>{renderAttrValue(options[0], isDocument)}</AttrValue>
		)
	}

	return (
		<>
			{
				options.map((option, idx) => {
					const selectedOption = selectedOptions[item.id];
					const checked = selectedOption ? selectedOption === option.id : idx === 0;
					const handleCheck = () => onOptionSelect(item.id, option.id)
					return (
						<Row>
								<Col autoWidth>
									<RadioButton checked={checked} onCheck={handleCheck}/>
								</Col>
								<TouchableWithoutFeedback onPress={handleCheck}>
									<Col>
										<AttrValue>{renderAttrValue(option, isDocument)}</AttrValue>
									</Col>
								</TouchableWithoutFeedback>
							</Row>
					)
				})
			}
		</>
	)
}

/**
 * KycCheckList
 * @param {*} props 
 */
export function KycChecklist(props) {
	const dispatch = useDispatch();
	const { requirements, profile } = props;
	const [isLoading, setLoading] = useState();
	const [scrollY, setScrollY] = useState(0);
	const [selectedOptions, setSelectedOptions] = useState({});
	const [agreement, setAgreement] = useState();
	const [agreementError, setAgreementError] = useState(false);
	const [requirementsError, setRequirementsError] = useState(false);

	const handleSubmit = () => {
		setRequirementsError(false);
		setAgreementError(false);

		if (!agreement) {
			setAgreementError(true);
			return;
		}

		const hasMisingItem = requirements.reduce((isMissing, item) => {
			return isMissing || (item.required && item.options.length === 0);
		}, false);

		if (hasMisingItem) {
			setRequirementsError(true);	
			return;
		}

		setLoading(true);

		setTimeout(() => {
			dispatch(modules.kyc.operations.submitApplicationOperation(
				props.vendorId,
				props.templateId,
				selectedOptions
			)).then(async () => {
				await props.onSuccess();
				setLoading(false);
			});
		}, 500);
	};

	const handleAgreementCheck = () => {
		setAgreement(!agreement);
		setAgreementError(false);
	}

	const handleOptionSelect = (itemId, optionId) => setSelectedOptions({
		...selectedOptions,
		[itemId]: optionId
	});

	const handleScroll = event => {
		setScrollY(event.nativeEvent.contentOffset.y);
	};

	const [currentOptionsMenu, setCurrentOptionsMenu] = useState();

	const handleOptions = (isDocument, canEdit) => ({ id, x, y }) => {
		setCurrentOptionsMenu({
			id,
			isDocument,
			x,
			y: y + scrollY - 110 + 55,
			canEdit: canEdit
		});
	};

	const handleCloseMenu = () => {
		setCurrentOptionsMenu(null);
	};

	const getRequirementAttribute = (id) => {
		const requirement = requirements.find(req => req.id === id);
		const options = requirement && requirement.options;
		let selectedOptionId = selectedOptions[id];
		let attrId = options && options[0].id;

		if (options && selectedOptionId) {
			const selectedOption = options.find(opt => opt.id === selectedOptionId);
			attrId = selectedOption ? selectedOption.id : attrId;
		}

		return profile.allAttributes.find(attr => attr.id === attrId);
	}

	const handleEdit = () => {
		const { id, isDocument } = currentOptionsMenu;
		const attribute = getRequirementAttribute(id);

		if (isDocument) {
			props.onEditDocument(attribute);
		} else {
			props.onEditAttribute(attribute);
		}

		handleCloseMenu();
	};

	const handleAdd = () => {
		const { isDocument, id } = currentOptionsMenu;
		const requirement = requirements.find(req => req.id === id);
		const type = requirement.type;

		if (isDocument) {
			props.onAddDocument(type.id);
		} else {
			props.onAddAttribute(type.id);
		}

		handleCloseMenu();
	};

	return (
		<Container onScroll={handleScroll} scrollEventThrottle={160} style={{ position: 'relative', paddingTop: 40 }}>
			<View style={{ position: 'relative' }}>
				<SectionHeader>
					<Row>
						<Col>
							<SectionTitle>Informations</SectionTitle>
							<SectionDescription>{requirements.length} entries</SectionDescription>
						</Col>
						{/* <Col autoWidth>
							<ButtonLink iconName="icon-add" onPress={props.onAddAttribute}>
								Add New
							</ButtonLink>
						</Col> */}
					</Row>
				</SectionHeader>
				<Grid style={{ margin: 20 }}>
					{requirements.map(item => {
						const isDocument = containsFile(item.type.content);

						return (
							<AttrRow>
								<Col>
									<AttrLabel>{item.title}</AttrLabel>
									<View style={{ marginTop: 5 }}>
										{
											renderItemOptions({
												item,
												isDocument,
												selectedOptions,
												onOptionSelect: handleOptionSelect
											})
										}
									</View>
								</Col>
								<Col autoWidth>
									<OptionsMenuAnchor id={item.id} onPress={handleOptions(isDocument, item.options.length)} />
								</Col>
							</AttrRow>
						);
					})}
					<Row marginTop={20}>
						<Col>
							<Checkbox checked={agreement} hasError={agreementError} onCheck={handleAgreementCheck}/>
						</Col>
						<Col style={{ paddingTop: 0 }}>
							<Paragraph>
								I understand SelfKey Wallet LLC will pass this information to KeyFI. that will open an account on their platform at my request and will communicate with me at my submitted email address above.
							</Paragraph>
							{
								agreementError ? (
									<ErrorMessage>
										Please confirm you understand what happens with your information
									</ErrorMessage>
								) : null
							}
						</Col>
					</Row>
					{requirementsError ? (
						<Row>
							<Col>
								<ErrorMessage>
									Error: You must provide all required information to proceed. Please update any missing details.
								</ErrorMessage>
							</Col>
						</Row>
					) : null}
					<Row marginBottom={70}>
						<Col>
							<Button type="shell-primary" onPress={props.onCancel}>Cancel</Button>
						</Col>
						<Col>
							<Button type="primary" onPress={handleSubmit} isLoading={isLoading}>Submit</Button>
						</Col>
					</Row>
				</Grid>
				{currentOptionsMenu ? <Backdrop onPress={handleCloseMenu} /> : null}
				{currentOptionsMenu ? (
					<OptionsView
						y={currentOptionsMenu.y}
						onPress={handleCloseMenu}
						onAdd={handleAdd}
						onEdit={currentOptionsMenu.canEdit && handleEdit}
					/>
				) : null}
			</View>
		</Container>
	);
}
