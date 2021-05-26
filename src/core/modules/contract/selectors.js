import { getUsdPrice } from "blockchain/services/price-service";
import EthUnits from "blockchain/util/eth-units";
import modules from "..";
import { NetworkStore } from "../app/NetworkStore";

export function selectContractsTree(state) {
  return state.contracts;
}

export function selectContracts(state) {
  const tree = selectContractsTree(state);
  return tree.contracts.map(id => tree.contractsById[id]);
}

export function selectContractByAddress(state, address) {
  return selectContracts(state).find(c => c.address === address);
}

export function selectAllowances(state) {
  const tree = selectContractsTree(state);
  const wallet = modules.wallet.selectors.getWallet(state);
  return tree.allowances
    .map(id => tree.allowancesById[id])
    .filter(a => a.walletId === wallet.id);
}

export function selectAllowancesByTokenAddress(state, tokenAddress) {
  const allowances = selectAllowances(state);
  if (!tokenAddress) {
    return allowances;
  }
  return allowances.filter(a => a.tokenAddress === tokenAddress);
}

export function selectAllowanceByTokenAndContractAddress(state, tokenAddress, contractAddress) {
  return selectAllowances(state).find(
    a => a.tokenAddress === tokenAddress && a.contractAddress === contractAddress
  );
}

export function selectAllowance(state, tokenAddress, contractAddress) {
  const wallet = walletSelectors.getWallet(state);
  return selectAllowances(state).find(
    a =>
      a.tokenAddress === tokenAddress &&
      a.contractAddress === contractAddress &&
      a.walletId === wallet.id
  );
}

export function selectAllowanceEditor(state) {
  let editor = selectContractsTree(state).editor;

  if (editor.gas && editor.gasPrice) {
    const ethFee = EthUnits.toEther(editor.gasPrice * editor.gas, 'gwei');
    const usdFee = getUsdPrice(amount, NetworkStore.getNetwork().symbol);
    editor = { ...editor, ethFee, usdFee };
  }

  return editor;
}
