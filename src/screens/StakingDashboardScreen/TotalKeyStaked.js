import React from 'react';
import styled from 'styled-components/native';
import { Col, Grid, Paragraph, Row, AmmountLarge, FormattedNumber, Divider, TextInput, Button, ProgressBar } from 'design-system';
import { Image } from 'react-native';
import SKLogo from './sk-logo.png';
import LinearGradient from 'react-native-linear-gradient';
import { StakingCard } from './StakingCard';

const Container = styled.View`
  flex: 1;
	border: 0px solid #0fb8d0;
	border-left-width: 8px;
	border-radius: 4px;
`;

export function TotalKeyStaked() {
	return (
		<StakingCard color="#38C0D1">
      <Grid style={{ flex: 1 }}>
				<Row>
					<Col>
						<Paragraph style={{ fontSize: 12 }}>Total KEY Staked</Paragraph>
					</Col>
          <Col autoWidth>
            <Image
              source={SKLogo}
              style={{
                width: 29,
                height: 33
              }}
              />
          </Col>
				</Row>
				<Row justifyContent="flex-end" alignItems="flex-end" marginBottom={20}>
          <Col autoWidth>
						<AmmountLarge style={{ fontSize: 24 }}>
              <FormattedNumber
                currency={null}
                decimal={10}
                value={16000000}
                />
            </AmmountLarge>
					</Col>
          <Col
            autoWidth
            noPadding
            style={{
              marginBottom: -2,
              paddingRight: 5,
            }}
            >
            <Paragraph style={{ fontSize: 13, color: '#93B0C1' }}>KEY</Paragraph>
          </Col>
				</Row>
        <Divider />
        <Row>
          <Col>
            <TextInput
              label="Withdraw"
              placeholder="Amount of KEY to withdraw"
              />
          </Col>
        </Row>
        <Row justifyContent="flex-end">
          <Col noPadding autoWidth
            style={{
              marginTop: -8,
              paddingRight: 5,
            }}
            >
            <Paragraph style={{ fontSize: 13, color: '#93B0C1' }}>0 LOK</Paragraph>
          </Col>
        </Row>
        <Row marginTop={-20}>
          <Col>
            <ProgressBar label="Timelock Period" value={0.3}>
              23 days left
            </ProgressBar>
          </Col>
        </Row>
        <Row style={{ flex: 1, alignItems: 'flex-end', justifyContent: 'flex-end'}}>
          <Col>
            <Button disabled>Withdraw</Button>
          </Col>
        </Row>
			</Grid>
		</StakingCard>
	);
}
