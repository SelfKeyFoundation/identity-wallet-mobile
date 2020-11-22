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
	H2
} from 'design-system';
import { WalletTracker } from '../../WalletTracker';
import { KycRequirementsList } from './KycRequirementsList';
import KycChecklist from './KycChecklist';
import { TotalKeyBalance } from './TotalKeyBalance';
import { TotalKeyStaked } from './TotalKeyStaked';
import { RewardLock } from './RewardLock';

import { Dimensions, ScrollView, View } from 'react-native';
import { TokensChart } from './TokensChart';
import Carousel from 'react-native-snap-carousel';
import { AboutStaking } from './AboutStaking';
import { TxHistoryContainer } from 'components';

const WindowDimensions = Dimensions.get('window');

export function StakingSetup(props) {
	// const dispatch = useDispatch();
	// const { requirements } = props;

	// rp: kycSelectors.relyingPartySelector(state, vendorId),
	// rpShouldUpdate: kycSelectors.relyingPartyShouldUpdateSelector(
	//  state,
	//  vendorId,
	//  authenticated
	//)

	// useEffect(() => {
	// 	dispatch(ducks.kyc.operations.loadRelyingPartyOperation('selfkey'))
	// }, []);

	return (
		<ScreenContainer sidePadding>
			<ScrollView>
				<Grid style={{ margin: 35 }}>
					<Row justifyContent="center">
						<Col autoWidth>
							<H2 style={{ fontSize: 18 }}>Create Stake</H2>
						</Col>
					</Row>
					<Row marginTop={15}>
						<Col>
							
						</Col>
					</Row>
					{/* <Row marginTop={-40}>
						<Col>
							<AboutStaking />
						</Col>
					</Row>
					<Row marginTop={-40}>
						<Col>
							<TokensChart />
						</Col>
					</Row>
					<Row marginTop={20}>
						<Col>
							<TxHistoryContainer />
						</Col>
					</Row> */}
				</Grid>
				{/* <KycRequirementsList requirements={requirements} style={{ margin: 20 }}/> */}
				{/* <KycChecklist
					requirements={requirements}
				/> */}
			</ScrollView>
		</ScreenContainer>
	);
}
