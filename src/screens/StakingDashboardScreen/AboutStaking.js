import { Col, Grid, H3, H4, Link, Paragraph, Row } from 'design-system';
import React from 'react';
import { Image } from 'react-native';
import { StakingCard } from "./StakingCard";
import VaultImage from './vault.png';

export function AboutStaking(props) {
  return (
    <StakingCard>
      <Grid>
				<Row>
					<Col>
            <Paragraph style={{ fontSize: 12 }}>About Staking</Paragraph>
					</Col>
				</Row>
        <Row>
          <Col>
            <H3 fontWeight="regular">You can stake anytime you want!</H3>
          </Col>
        </Row>
        <Row>
          <Col>
            <Paragraph style={{ fontSize: 13, color: '#93B0C1'}}>
            LOCK airdrop - Basic Information about yourself. This can be edited at any time, but not deleted. 
            </Paragraph>
            <Paragraph style={{ fontSize: 13, color: '#93B0C1'}}>
            STAKING - Any information you provide is stored locally and encrypted on-chain. SelfKey is a non custodiary wallet and it doesn’t store your documets anywhere.

            </Paragraph>
          </Col>
        </Row>
        <Row>
          <Col autoWidth>
            <Link
              style={{
                textDecorationLine: 'underline',
                fontSize: 14,
              }}
            >
                Read more
            </Link>
          </Col>
        </Row>
      </Grid>
      <Image
        source={VaultImage}
        style={{
          width: 191,
          height: 70,
          position: "absolute",
          right: 0,
          bottom: 0,
        }}
      />
    </StakingCard>
  )
}