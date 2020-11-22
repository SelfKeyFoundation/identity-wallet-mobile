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
	DefinitionTitle,
	H2,
	Typography
} from 'design-system';
import { ScrollView, Image } from 'react-native';
import { StakingCard } from 'components/StakingCard';
import LockLogoImage from './lock-logo.png';
import LinearGradient from 'react-native-linear-gradient';
import { Toggler } from 'components/Toggler';
import { CredentialRequirements } from './components/CredentialRequirements';


// TODO: Move to separated file
// Lock Logo

const LockLogoContainer = styled(LinearGradient)`
	border: 1px solid #1D505F;
	padding: 6.75px 9.75px;
	flex: 1;
	border-radius: 4px;
	align-items: center;
	justify-content: center;
`;

function LockLogo({ style }) {
	return (

			<LockLogoContainer
				colors={['#2E3945', '#222B34']}
				start={{ x: 0, y: 0 }}
				end={{ x: 0, y: 1 }}
				style={style}
				>
				<Image
					source={LockLogoImage}
					style={{
						width: 29,
						height: 33
					}}
					/>
			</LockLogoContainer>
	)
}

export function StakingSetup(props) {
	
	return (
		<ScreenContainer sidePadding>
			<ScrollView>
				<Grid style={{ margin: 35 }}>
					<Row justifyContent="center">
						<Col autoWidth>
							<H2 style={{ fontSize: 18 }}>Credential Dashboard</H2>
						</Col>
					</Row>
					<Row marginTop={15}>
						<Col>
							<StakingCard noBorder>
								<Row>
									<Col>
										<LockLogo />	
									</Col>
									<Col>
										<Typography>
											The two requirements to stake KEY for LOCK
										</Typography>
									</Col>
								</Row>
								<Row>
									<Col>
										<Typography fontSize={13}>
											There are two easy steps you need to complete before you can apply to receive LOCK tokens. Please complete the following two easy steps of the process.
										</Typography>
									</Col>
								</Row>
							</StakingCard>
						</Col>
					</Row>
					<Row>
						<Col>
							<Toggler
								items={[{
									id: 'credentials',
									title: 'KYC Credentials',
									body: <CredentialRequirements />
								}, {
									id: 'staking',
									title: 'KEY Staking',
									body: null
								}]}
								activeItemId="credentials"
							/>
						</Col>
					</Row>
				</Grid>
			</ScrollView>
		</ScreenContainer>
	);
}
