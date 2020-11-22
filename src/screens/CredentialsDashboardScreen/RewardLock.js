import React from 'react';
import styled from 'styled-components/native';
import { Col, Grid, Paragraph, Row, AmmountLarge, FormattedNumber, Divider, TextInput, Button, DatePicker, SKIcon } from 'design-system';
import { Image } from 'react-native';
import LockLogo from './lock-logo.png';
import { StakingCard } from './StakingCard';

export function RewardLock() {
	return (
		<StakingCard color="#45E3C1">
			<Grid style={{ flex: 1 }}>
				<Row>
					<Col>
            <Paragraph style={{ fontSize: 12 }}>Reward LOCK </Paragraph>
					</Col>
          <Col autoWidth>
            <Image
              source={LockLogo}
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
                value={16}
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
            <Paragraph style={{ fontSize: 13, color: '#93B0C1' }}>LOK</Paragraph>
          </Col>
				</Row>
        <Divider />
        <Row>
          <Col>
            <TextInput
              label="Amount"
              placeholder="LOCK to withdraw"
            />
          </Col>
        </Row>
        <Row style={{ flex: 1, alignItems: 'flex-end', justifyContent: 'flex-end'}}>
          <Col>
            <Button type="shell-primary">Withdraw</Button>
          </Col>
        </Row>
			</Grid>
		</StakingCard>
	);
}
