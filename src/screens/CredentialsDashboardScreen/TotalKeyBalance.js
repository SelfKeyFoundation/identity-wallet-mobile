import React from 'react';
import styled from 'styled-components/native';
import { Col, Grid, Paragraph, Row, AmmountLarge, FormattedNumber, Divider, TextInput, Button, DatePicker } from 'design-system';
import { Image } from 'react-native';
import SKLogo from './sk-logo.png';
import { StakingCard } from './StakingCard';

export function TotalKeyBalance() {
	return (
		<StakingCard color="#38C0D1">
			<Grid style={{ flex: 1 }}>
				<Row>
					<Col>
            <Paragraph style={{ fontSize: 12 }}>Total KEY Balance</Paragraph>
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
              label="Stake"
              placeholder="Add KEY amount for staking"
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
            {/* <DatePicker
              label="Timelock Period"
              placeholder="Period of staking"
              inputStyle={{
                height: 45
              }}
              onChange={() => {}}
            /> */}
            <TextInput
              label="Timelock Period"
              placeholder="Period of staking"
            />
          </Col>
        </Row>
        <Row style={{ flex: 1, alignItems: 'flex-end', justifyContent: 'flex-end'}}>
          <Col>
            <Button>Stake</Button>
          </Col>
        </Row>
			</Grid>
		</StakingCard>
	);
}
