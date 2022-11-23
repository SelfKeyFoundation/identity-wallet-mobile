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
  Ammount
} from 'design-system';
import { WalletTracker } from '../../WalletTracker';

const RequirementCheckMark = styled(View)`
	width: 30px;
	height: 30px;
	border: 1px solid #495b70;
	border-radius: 50;
	background: ${props => (props.checked ? '#3B4B59' : '#F5A623')};
	align-items: center;
	justify-content: center;
`;
const RequirementsTitle = styled(Ammount)`
  color: white;
`

export function KycRequirementsList({ requirements = [], style }) {
	if (!requirements) {
		return null;
	}

	return (
		<Grid style={style}>
			<Row marginBottom={10}>
        <Col>
          <RequirementsTitle>KYC Requirements</RequirementsTitle>
        </Col>
      </Row>
			{requirements.map((item, idx) => {
				const checked = item.options.length;
				return (
					<Row alignItems="center">
						<Col autoWidth>
							<RequirementCheckMark checked={checked}>
								{checked ? (
									<SKIcon name="icon-check-bold" color="#1CBA7D" size={7} />
								) : (
									<Paragraph>{idx + 1}</Paragraph>
								)}
							</RequirementCheckMark>
						</Col>
						<Col>
							<DefinitionDescription>{item.title}</DefinitionDescription>
						</Col>
					</Row>
				);
			})}
		</Grid>
	);
}
