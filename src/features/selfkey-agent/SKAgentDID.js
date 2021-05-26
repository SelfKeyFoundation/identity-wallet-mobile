import React from 'react';
import { Box, Button, Divider, Typography } from 'design-system';
import { useDispatch, useSelector } from 'react-redux';
import { skAgentOperations, skAgentSelectors } from './sk-agent-slice';

export function SKAgentDID() {
	const dispatch = useDispatch();
	const dids = useSelector(skAgentSelectors.getDIDs);

	return (
		<Box>
			{!dids || !dids.length ? (
				<Box row padding={8}>
					<Button
						onPress={() => {
							dispatch(skAgentOperations.createDID());
						}}
					>
						+ New DID
					</Button>
				</Box>
			) : null}
			{dids.map(item => {
				return (
					<Box marginBottom={18}>
						<Box flex={0} margin={12}>
							<Typography>{item}</Typography>
						</Box>
						<Divider />
					</Box>
				);
			})}
		</Box>
	);
}
