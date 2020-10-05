import { Ammount, LabelText, AmmountLarge, Col, DefinitionTitle, Grid, H2, Paragraph, Row } from 'design-system';
import React from 'react';
import { View } from 'react-native';
import styled from 'styled-components/native';
// import { processColor } from 'react-native';
import { VictoryPie } from "victory-native";

const Container = styled(Grid)`
  background: #262F39;
  border: 1px solid #303C49;
  padding: 24px 16px;
  border-radius: 4px;
`
export function TokensChart(props) {

  return (
    <Container>
      <Row>
        <Col>
          <H2 fontWeight="regular">Total Balance</H2>
        </Col>
      </Row>
      <Row marginTop={23}> 
        <Col
          autoWidth
          style={{
            alignItems: 'flex-start',
            justifyContent: 'flex-start',
            padding: 0,
          }}
        >
          <VictoryPie
            style={{
              borderWidth: 1,
            }}
            width={158}
            height={158}
            innerRadius={(158 / 2) / 2}
            radius={158 / 2}
            data={[
              { x: "", y: 10 },
              { x: "", y: 40 },
              { x: "", y: 55 },
              { x: "", y: 30 },
              { x: "", y: 5 },        
            ]}
            colorScale={["#00C0D9", "#2DA1F8", "#03D49E", "#037CD7", "#97CEF8" ]}
            animate={{
              duration: 1000
            }}
          />
        </Col>
        <Col paddingLeft={10}>
          <Row>
            <Col autoWidth>
              <AmmountLarge style={{ fontSize: 18 }}>
                $14,238.09
              </AmmountLarge>
              <DefinitionTitle style={{ fontSize: 13 }}>
                Total Value USD
              </DefinitionTitle>
            </Col>
          </Row>
          <LegendItem color="#00C0D9" text="KEY Balance" />
          <LegendItem color="#2DA1F8" text="KEY Staked" />
          <LegendItem color="#03D49E" text="LOCK Balance" />
          <LegendItem color="#97CEF8" text="LOCK Staked" />
        </Col>
      </Row>
    </Container>
    
  )
}

function LegendItem({ color, text }) {
  return (
    <Row justifyContent="center" alignItems="center">
      <Col autoWidth paddingTop={2} paddingBottom={0}>
        <View
          style={{
            width: 21,
            height: 14,
            backgroundColor: color,
            borderRadius: 4,
          }}
        />
      </Col>
      <Col paddingTop={2} paddingBottom={0}>
        <LabelText>
          { text }
        </LabelText>
      </Col>
    </Row>
  )
}