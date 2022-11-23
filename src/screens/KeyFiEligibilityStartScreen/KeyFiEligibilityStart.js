import React, { useEffect, useCallback, useRef, useState } from 'react';
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
  ExplanatoryWhite,
	H2, H1, Button, Link, SKIcon
} from 'design-system';
import LinearGradient from 'react-native-linear-gradient';
import LockLogoImg from './lock-logo.png';
import { Image, Dimensions, View } from 'react-native';
import Carousel, {Pagination} from 'react-native-snap-carousel';
import { Theme } from 'design-system/theme';

// import { WalletTracker } from '../../WalletTracker';
// import { KycRequirementsList } from './KycRequirementsList';
// import KycChecklist from './KycChecklist';
// import { TotalKeyBalance } from './TotalKeyBalance';
// import { TotalKeyStaked } from './TotalKeyStaked';
// import { ScrollView } from 'react-native';
// import { TokensChart } from './TokensChart';

const LogoContainer = styled(LinearGradient)`
  width: 146px;
  height: 146px;
  border: 1px solid #1D505F;
  border-radius: 4px;
  align-items: center;
  justify-content: center;
`;
const LockLogo = () => null;

const TopBar = styled(View)`
  background: #2A3540;
  padding: 8px 24px;
  border-top-left-radius: 4px;
  border-top-right-radius: 4px;
  box-shadow: 0px 1px -1px #374758
  
`;
const WindowDimensions = Dimensions.get('window');

export function KeyFiEligibilityStart(props) {
  const carouselRef = useRef();
  const [activeSlide, setActiveSlide] = useState(0);

  const handleNext = () => {
    setTimeout(() => carouselRef.current.snapToNext(true, true), 100);
  }

	return (
		<ScreenContainer sidePadding>
			<Grid>
        <Row justifyContent="flex-end">
          <Col autoWidth style={{ marginRight: 24 }}>
            <Link onPress={props.onSkip}>Skip</Link>
          </Col>
        </Row>
        <Row>
          <Col>
            <TopBar>
            <ExplanatoryWhite>Get your Credentials Verified to use KeyFi.com!</ExplanatoryWhite> 
          </TopBar>
          </Col>
        </Row>
      </Grid>
      
      <Grid style={{ marginLeft: 40, marginRight: 40 }}>
        <Row justifyContent="center" marginTop={56} marginBottom={58}>
          <Col autoWidth>
            <LogoContainer colors={['#161A1F', '#1A2836']} start={{ x: 0, y: 0 }} end={{ x: 0, y: 1 }}>
              {/* <Image
                source={LockLogoImg}
                style={{ width: 55, height: 87 }}
              /> */}
              <SKIcon name="icon-payment-large" color={Theme.colors.primary} size={70} />
            </LogoContainer>
          </Col>
        </Row>
      </Grid>

      <Carousel
        ref={carouselRef}
        data={[{
          title: 'A DeFi aggregator platform',
          details: 'KeyFi.com is a first of its kind DeFi aggregator platform that lets you manage the top DeFi protocols. Get your Credentials verified to access KeyFi.com and be a part of a new and innovative AI-powered DeFI protocol.',
          action: () => (
            <Button onPress={handleNext}>
              Next
            </Button>
          )
        }, {
          title: 'Claim a KEY airdrop',
          details: 'By getting your Credentials verified, you\'ll also get to claim a limited-period KEY airdrop.',
          action: () => (
            <Button onPress={props.onStartStaking}>
              Get Credentials
            </Button>
          )
        }]}
        loop={false}
        activeSlideAlignment="center"
        inactiveSlideScale={0.85}
        inactiveSlideOpacity={0.7}
        renderItem={renderCarouselItem}
        sliderWidth={WindowDimensions.width}
        itemWidth={WindowDimensions.width}
        onSnapToItem={idx => setActiveSlide(idx)}
      />
      <Pagination
        dotsLength={2}
        activeDotIndex={activeSlide}
        dotStyle={{
            width: 12,
            height: 12,
            borderRadius: 5,
            marginHorizontal: 0,
            backgroundColor: 'rgba(255, 255, 255, 0.92)'
        }}
        inactiveDotOpacity={0.4}
        inactiveDotScale={0.7}
      />
		</ScreenContainer>
	);
}

function renderCarouselItem({ item }) {
  return (
    <Grid style={{ margin: 40, flex: 1 }}>
      <Row>
          <Col>
            <H1>{item.title}</H1>
          </Col>
        </Row>
        <Row>
          <Col>
            <Paragraph>
              {item.details}
            </Paragraph>
          </Col>
        </Row>
        <Row marginTop={5} style={{
            alignItems: 'flex-end',
            flex: 1
          }}>
          <Col>
            { <item.action />}
          </Col>
        </Row>
    </Grid>
  )
}
