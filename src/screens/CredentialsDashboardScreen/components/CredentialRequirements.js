import React, { useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { navigateBack } from 'core/navigation';
import ducks from 'core/modules';
import styled from 'styled-components/native';
import {
	Grid,
	Row,
	Col,
	ScreenContainer,
	Paragraph,
	DefinitionDescription,
  SKIcon,
  Ammount,
	Typography,
	Button
} from 'design-system';
// import { WalletTracker } from '../../WalletTracker';

const RequirementCheckMark = styled(View)`
	width: 30px;
	height: 30px;
	border: 1px solid #495b70;
	border-radius: 50;
	background: #3B4B59;
	align-items: center;
	justify-content: center;
`;

const RequirementsTitle = styled(Ammount)`
  color: white;
`;

const OptionLine = styled(View)`
	width: 1px;
	height: 16px;
	background: #364357;
`;

export function CredentialRequirements({ style }) {
	// if (!requirements) {
	// 	return null;
	// }
	
	const requirements = [{
		checked: false,
		options: [],
		title: 'Full Legal Name'
	}, {
		checked: false,
		options: [],
		title: 'Email address'
	}, {
		checked: false,
		options: [],
		title: 'Passport'
	}, {
		checked: false,
		options: [],
		title: 'Residency Certificate'
	}, {
		checked: false,
		options: [],
		title: 'Selfie'
	}];

	return (
		<Grid style={style}>
			<Row marginBottom={10}>
        <Col>
					<Typography>
						To be able to stake KEY you need to go  through  a basic KYC process.
					</Typography>
        </Col>
      </Row>
			{requirements.map((item, idx) => {
				const checked = item.options.length;
				return (
					<Row alignItems="center" justifyContent="center">
						<Col autoWidth style={{ alignItems: 'center' }}>
							<RequirementCheckMark checked={checked}>
								{checked ? (
									<SKIcon name="icon-check-bold" color="#1CBA7D" size={7} />
								) : (
									<Typography color="#93B0C1">{idx + 1}</Typography>
								)}
							</RequirementCheckMark>
							<OptionLine />
						</Col>
						<Col marginTop={-15}>
							<Typography fontWeight="bold" color="#93B0C1" size={16}>
								{item.title}
							</Typography>
						</Col>
					</Row>
				);
			})}
			<Row marginTop={20}>
				<Col>
					<Button>Start KYC Process</Button>
				</Col>
			</Row>
		</Grid>
	);
}
