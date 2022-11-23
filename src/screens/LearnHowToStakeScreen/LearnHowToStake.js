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
	H2, H1, Button, Link
} from 'design-system';
import LinearGradient from 'react-native-linear-gradient';
import LockLogoImg from './lock-logo.png';
import { Image, Dimensions, View } from 'react-native';
import Carousel, {Pagination} from 'react-native-snap-carousel';

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

export function LearnHowToStake(props) {
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
            <ExplanatoryWhite>Learn how to stake KEY and get LOCK</ExplanatoryWhite> 
          </TopBar>
          </Col>
        </Row>
      </Grid>
      
      <Grid style={{ marginLeft: 40, marginRight: 40 }}>
        <Row justifyContent="center" marginTop={56} marginBottom={58}>
          <Col autoWidth>
            <LogoContainer colors={['#161A1F', '#1A2836']} start={{ x: 0, y: 0 }} end={{ x: 0, y: 1 }}>
              <Image
                source={LockLogoImg}
                style={{ width: 55, height: 87 }}
              />
            </LogoContainer>
          </Col>
        </Row>
      </Grid>

      <Carousel
        ref={carouselRef}
        data={[{
          title: 'Staking: For every 10 000 KEY staked you get 1 LOCK',
          details: 'In order to get LOCK  you need to stake at least 10 000 KEY. For every 10 000 KEY you receive 1 LOCK token. Staking means locking the amount o KEY chosen for period of time. After this period you can withdraw the KEY staked and the LOCK rewards.',
          action: () => (
            <Button onPress={handleNext}>
              Next
            </Button>
          )
        }, {
          title: 'Staking: Get your KYC Credentials and start staking whenever you want to',
          details: 'To get through the KYC process is easy. You only need to provide the information required and soon enough you will get on your e-mail the KYC approval. You can start staking before getting the approval and withdraw the KEY anytime in case of rejection. We got you covered!',
          action: () => (
            <Button onPress={props.onStartStaking}>
              Start Staking
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
